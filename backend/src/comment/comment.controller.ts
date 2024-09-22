import { Controller, Delete, Post, Req, UseGuards } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CreateCommentDto } from 'src/comment/dto/create-comment.dto';
import { Comment } from 'src/comment/comment.entity';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { DeleteCommentDto } from 'src/comment/dto/delete-comment.dto';

@Controller('comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post()
  async createComment(
    @Req() req: Request,
    createCommentDto: CreateCommentDto,
  ): Promise<Comment> {
    const kakaoId = req.user.kakaoId;
    return this.commentService.createComment({
      ...createCommentDto,
      user_id: kakaoId,
    });
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete()
  async deleteComment(
    @Req() req: Request,
    deleteCommentDto: DeleteCommentDto,
  ): Promise<void> {
    const kakaoId = req.user.kakaoId;
    return this.commentService.deleteComment(kakaoId, deleteCommentDto);
  }
}
