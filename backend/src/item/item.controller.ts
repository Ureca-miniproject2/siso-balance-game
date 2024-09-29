import { Controller, Get, Logger, Param, Query, Req } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { CommentService } from 'src/comment/comment.service';
import { CommentDto } from 'src/comment/dto/comment.dto';
import { ItemCommentsResponseDto } from 'src/item/dto/itemCommentsResponse.dto';

@Controller('item')
@ApiTags('아이템 api')
export class ItemController {
  private logger = new Logger('ItemController');
  constructor(
    private commentService: CommentService,
    private readonly jwtService: JwtService,
  ) {}

  @Get(':item_id/comments')
  @ApiOperation({ summary: '아이템의 댓글들을 가져옵니다.' })
  @ApiCreatedResponse({
    description: '아이템의 댓글들을 가져옵니다.',
    type: ItemCommentsResponseDto,
  })
  async getCommentsByItemId(
    @Req() req: Request,
    @Param('item_id') item_id: string,
    @Query('page') page: number = 0, // 페이지 번호
    @Query('limit') limit: number = 10,
  ): Promise<ItemCommentsResponseDto> {
    const token = req.cookies['accessToken']; // 쿠키에서 accessToken 읽기

    let userId: string | null = null;
    if (token) {
      try {
        const decoded = this.jwtService.verify(token); // 토큰 검증 및 디코딩
        userId = decoded.user_id; // user_id 추출
      } catch (error) {
        // 토큰 검증 실패 시 userId를 null로 유지하고 계속 진행
        console.log('유효하지 않은 토큰입니다.', error.message);
      }
    }
    const comments = await this.commentService.findCommentsByItemId(
      item_id,
      userId,
      page,
      limit,
    );
    return { data: comments, total: comments.length };
  }

  @Get(':item_id/comments/best')
  @ApiOperation({ summary: '아이템의 베스트 댓글들을 가져옵니다.' })
  @ApiCreatedResponse({
    description: '아이템의 베스트 댓글들을 가져옵니다.',
    type: [CommentDto],
  })
  async getBestCommentsByItemId(
    @Req() req: Request,
    @Param('item_id') item_id: string,
  ): Promise<CommentDto[]> {
    const token = req.cookies['accessToken']; // 쿠키에서 accessToken 읽기
    console.log('token:', token);
    let userId: string | null = null;
    if (token) {
      try {
        const decoded = this.jwtService.verify(token); // 토큰 검증 및 디코딩
        userId = decoded.user_id; // user_id 추출
      } catch (error) {
        // 토큰 검증 실패 시 userId를 null로 유지하고 계속 진행
        console.log('유효하지 않은 토큰입니다.', error.message);
      }
    }
    console.log('userId:', userId);
    return this.commentService.findBestCommentsByItemId(item_id, userId);
  }
}
