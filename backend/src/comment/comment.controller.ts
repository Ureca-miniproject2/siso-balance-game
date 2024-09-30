import {
  Body,
  Controller,
  Delete,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { CommentService } from './comment.service';
import { CreateCommentDto } from 'src/comment/dto/create-comment.dto';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import {
  ApiBody,
  ApiCookieAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

@Controller('comment')
@ApiTags('댓글 api')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @UseGuards(AuthGuard('jwt'))
  @ApiCookieAuth('accessToken')
  @Post()
  @ApiOperation({ summary: '아이템에 댓글을 입력합니다.' })
  @ApiResponse({
    status: 200,
    description: '댓글이 성공적으로 입력되었습니다.',
  })
  @ApiResponse({
    status: 404,
    description: '아이템 또는 유저를 찾을 수 없습니다.',
  })
  @ApiBody({ type: CreateCommentDto })
  async createComment(
    @Req() req: Request,
    @Body() createCommentDto: CreateCommentDto,
  ): Promise<void> {
    const kakaoId = req.user.kakaoId;
    return this.commentService.createComment(kakaoId, createCommentDto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete(':comment_id')
  @ApiCookieAuth('accessToken')
  @ApiOperation({ summary: '아이템에 댓글을 삭제합니다.' })
  async deleteComment(
    @Req() req: Request,
    @Param('comment_id') comment_id: string,
  ): Promise<void> {
    const kakaoId = req.user.kakaoId;
    return this.commentService.deleteComment(kakaoId, comment_id);
  }
}
