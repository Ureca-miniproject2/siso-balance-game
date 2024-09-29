import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Comment } from 'src/comment/comment.entity';
import { CommentDto } from 'src/comment/dto/comment.dto';
import { CreateCommentDto } from 'src/comment/dto/create-comment.dto';
import { DeleteCommentDto } from 'src/comment/dto/delete-comment.dto';
import { Item } from 'src/item/item.entity';
import { User } from 'src/user/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(Comment)
    private commentsRepository: Repository<Comment>,
    @InjectRepository(Item)
    private itemsRepository: Repository<Item>,
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async findCommentsByItemId(
    item_id: string,
    kakao_id: string | null,
    page: number,
    limit: number,
  ): Promise<CommentDto[]> {
    if (kakao_id) {
      const user = await this.usersRepository.findOneBy({ user_id: kakao_id });
      if (!user) {
        throw new UnauthorizedException('유효하지 않은 사용자입니다.');
      }
    }

    // 댓글 가져오기
    const comments = await this.commentsRepository.find({
      where: { item: { item_id } },
      relations: ['user', 'likes', 'likes.user'],
      skip: page * limit,
      take: limit,
      order: { created_at: 'DESC' },
    });

    // 각 댓글이 사용자가 좋아요를 눌렀는지 여부 확인
    const commentDtos = comments.map((comment) => {
      const baseDto = {
        comment_id: comment.comment_id,
        comment_text: comment.comment_text,
        created_at: comment.created_at,
        updated_at: comment.updated_at,
        user: comment.user,
        likeCount: comment.likeCount,
        isLikedByUser: false,
        item_id: item_id,
      };

      if (kakao_id) {
        return {
          ...baseDto,
          isLikedByUser: comment.likes.some(
            (like) => like.user.user_id === kakao_id,
          ),
        };
      } else {
        return baseDto; // 로그인하지 않은 경우 isLikedByUser 필드 제외
      }
    });

    return commentDtos;
  }

  async findBestCommentsByItemId(
    item_id: string,
    kakao_id: string | null,
  ): Promise<CommentDto[]> {
    if (kakao_id) {
      const user = await this.usersRepository.findOneBy({ user_id: kakao_id });
      if (!user) {
        throw new UnauthorizedException('유효하지 않은 사용자입니다.');
      }
    }
    // 상위 3개의 댓글을 likeCount 순으로 정렬하여 가져오기
    const topComments = await this.commentsRepository.find({
      where: { item: { item_id } },
      relations: ['user', 'likes', 'likes.user'],
      select: [
        'comment_id',
        'comment_text',
        'created_at',
        'updated_at',
        'likeCount',
      ],
      order: { likeCount: 'DESC' },
      take: 2,
    });
    // 상위 3개의 댓글에 isBest를 true로 설정
    const topCommentDtos = topComments.map((comment) => {
      const baseDto = {
        comment_id: comment.comment_id,
        comment_text: comment.comment_text,
        created_at: comment.created_at,
        updated_at: comment.updated_at,
        user: comment.user,
        likeCount: comment.likeCount,
        isLikedByUser: false,
        item_id,
      };

      if (kakao_id) {
        return {
          ...baseDto,
          isLikedByUser: comment.likes.some(
            (like) => like.user.user_id === kakao_id,
          ),
        };
      } else {
        return baseDto;
      }
    });

    return topCommentDtos;
  }

  async createComment(
    userId: string,
    createCommentDto: CreateCommentDto,
  ): Promise<void> {
    const { comment_text, item_id } = createCommentDto;

    // 데이터베이스에서 해당 Item과 User를 조회
    const item = await this.itemsRepository.findOne({ where: { item_id } });
    if (!item) {
      throw new NotFoundException(`아이템을 찾을 수 없습니다.`);
    }

    const user = await this.usersRepository.findOne({
      where: { user_id: userId },
    });
    if (!user) {
      throw new NotFoundException(`유저를 찾을 수 없습니다.`);
    }

    // 새로운 Comment 객체 생성 및 필요한 필드 설정
    const comment = new Comment();
    comment.item = item;
    comment.user = user;
    comment.comment_text = comment_text;

    // 생성 및 수정 시간 자동 설정 (CreateDateColumn과 UpdateDateColumn이 자동 처리)
    await this.commentsRepository.save(comment);
  }

  async deleteComment(
    userId: string,
    deleteCommentDto: DeleteCommentDto,
  ): Promise<void> {
    const { comment_id } = deleteCommentDto;

    const comment = await this.commentsRepository.findOne({
      where: { comment_id, user: { user_id: userId } },
    });

    if (!comment) {
      throw new Error('삭제할 댓글이 없거나 권한이 없습니다.');
    }

    await this.commentsRepository.remove(comment);
  }

  async countComments(item_id: string): Promise<number> {
    return this.commentsRepository.count({ where: { item: { item_id } } });
  }
}
