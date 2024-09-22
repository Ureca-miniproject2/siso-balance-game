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

  async findCommentsByItemId(item_id: number): Promise<Comment[]> {
    return this.commentsRepository.find({
      where: { item: { item_id } },
      select: [
        'comment_id',
        'comment_text',
        'created_at',
        'updated_at',
        'user',
      ],
    });
  }

  async createComment(createCommentDto: CreateCommentDto): Promise<Comment> {
    const { user_id, comment_text, item_id } = createCommentDto;

    const comment = new Comment();
    const item = new Item();
    const user = new User();

    item.item_id = item_id;
    comment.item = item;
    user.user_id = user_id;

    comment.user = user;
    comment.comment_text = comment_text;

    comment.created_at = new Date();
    comment.updated_at = new Date();

    return this.commentsRepository.save(comment);
  }

  async deleteComment(
    userId: number,
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
