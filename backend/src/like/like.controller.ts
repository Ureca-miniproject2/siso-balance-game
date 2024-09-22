import {
  Controller,
  Delete,
  Param,
  ParseIntPipe,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { LikeService } from './like.service';
import { AuthGuard } from '@nestjs/passport';
import { Like } from 'src/like/like.entity';
import { Request } from 'express';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller('like')
export class LikeController {
  constructor(private readonly likeService: LikeService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post(':comment_id')
  @ApiOperation({ summary: '댓글 좋아요' })
  @ApiResponse({ status: 201, description: '댓글이 이미 좋아요상태 입니다.' })
  @ApiResponse({ status: 404, description: '유저 또는 댓글이 없습니다.' })
  @ApiResponse({
    status: 409,
    description: '이미 좋아요를 눌렀어요!',
  })
  async likeComment(
    @Req() req: Request,
    @Param('comment_id', ParseIntPipe) commentId: number,
  ): Promise<Like> {
    const kakaoId = req.user.kakaoId;
    return this.likeService.likeComment(kakaoId, commentId);
  }

  @Delete(':comment_id')
  @ApiOperation({ summary: '댓글 좋아요 취소' })
  @ApiResponse({ status: 200, description: '댓글 좋아요가 이미 취소되었어요.' })
  @ApiResponse({ status: 404, description: '댓글 좋아요가 없습니다.' })
  async unlikeComment(
    @Req() req: Request,
    @Param('comment_id', ParseIntPipe) commentId: number,
  ) {
    const kakaoId = req.user.kakaoId;
    return this.likeService.unlikeComment(kakaoId, commentId);
  }
}
