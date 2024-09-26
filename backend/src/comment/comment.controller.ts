import { Body, Controller, Delete, Post, Req, UseGuards } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CreateCommentDto } from 'src/comment/dto/create-comment.dto';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { DeleteCommentDto } from 'src/comment/dto/delete-comment.dto';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';

@Controller('comment')
@ApiTags('댓글 api')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post()
  @ApiOperation({ summary: '아이템에 댓글을 입력합니다.' })
  @ApiBody({ type: CreateCommentDto })
  async createComment(
    @Req() req: Request,
    @Body() createCommentDto: CreateCommentDto,
  ): Promise<void> {
    const kakaoId = req.user.kakaoId;
    return this.commentService.createComment(kakaoId, createCommentDto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete()
  @ApiOperation({ summary: '아이템에 댓글을 삭제합니다.' })
  async deleteComment(
    @Req() req: Request,
    @Body() deleteCommentDto: DeleteCommentDto,
  ): Promise<void> {
    const kakaoId = req.user.kakaoId;
    return this.commentService.deleteComment(kakaoId, deleteCommentDto);
  }
}
