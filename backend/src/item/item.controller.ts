import { Controller, Get, Logger, Param, Query } from '@nestjs/common';
import { ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Comment } from 'src/comment/comment.entity';
import { CommentService } from 'src/comment/comment.service';
import { CommentDto } from 'src/comment/dto/comment.dto';

@Controller('item')
@ApiTags('아이템 api')
export class ItemController {
  private logger = new Logger('ItemController');
  constructor(private commentService: CommentService) {}

  @Get(':item_id/comments')
  @ApiOperation({ summary: '아이템의 댓글들을 가져옵니다.' })
  @ApiCreatedResponse({
    description: '아이템의 댓글들을 가져옵니다.',
    type: [CommentDto],
  })
  async getCommentsByItemId(
    @Param('item_id') item_id: string,
    @Query('page') page: number = 1, // 페이지 번호
    @Query('limit') limit: number = 10,
  ): Promise<Comment[]> {
    return this.commentService.findCommentsByItemId(item_id, page, limit);
  }

  @Get(':item_id/comments/best')
  @ApiOperation({ summary: '아이템의 베스트 댓글들을 가져옵니다.' })
  @ApiCreatedResponse({
    description: '아이템의 베스트 댓글들을 가져옵니다.',
    type: [CommentDto],
  })
  async getBestCommentsByItemId(
    @Param('item_id') item_id: string,
  ): Promise<Comment[]> {
    return this.commentService.findBestCommentsByItemId(item_id);
  }
}
