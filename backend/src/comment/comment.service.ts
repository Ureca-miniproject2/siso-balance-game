import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Comment } from 'src/comment/comment.entity';
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
  ) {}

  async findCommentsByItemId(
    item_id: string,
    page: number,
    limit: number,
  ): Promise<Comment[]> {
    // 상위 3개의 댓글을 likeCount 순으로 정렬하여 가져오기
    const topComments = await this.commentsRepository.find({
      where: { item: { item_id } },
      select: [
        'comment_id',
        'comment_text',
        'created_at',
        'updated_at',
        'likeCount',
      ],
      relations: ['user'],
      order: { likeCount: 'DESC' },
      take: 3,
    });

    // 상위 3개의 댓글에 isBest를 true로 설정
    topComments.forEach((comment) => {
      comment['isBest'] = true;
    });

    // 나머지 댓글들을 최신순으로 가져오기 (페이지네이션 적용)
    const otherComments = await this.commentsRepository.find({
      where: { item: { item_id } },
      select: [
        'comment_id',
        'comment_text',
        'created_at',
        'updated_at',
        'likeCount',
      ],
      relations: ['user'],
      skip: (page - 1) * limit,
      take: limit,
      order: { created_at: 'DESC' },
    });

    // 나머지 댓글에 isBest를 false로 설정
    otherComments.forEach((comment) => {
      comment['isBest'] = false;
    });

    // 상위 3개 댓글과 나머지 댓글들을 합치기
    return [...topComments, ...otherComments];
  }

  async createComment(
    userId: string,
    createCommentDto: CreateCommentDto,
  ): Promise<void> {
    const { comment_text, item_id } = createCommentDto;

    const comment = new Comment();
    const item = new Item();
    const user = new User();

    item.item_id = item_id;
    comment.item = item;
    user.user_id = userId;

    comment.user = user;
    comment.comment_text = comment_text;

    comment.created_at = new Date();
    comment.updated_at = new Date();

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
}
