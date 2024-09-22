import { Controller, Get, Logger, Param, ParseIntPipe } from '@nestjs/common';
import { ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Comment } from 'src/comment/comment.entity';
import { CommentService } from 'src/comment/comment.service';

@Controller('item')
@ApiTags('아이템 api')
export class ItemController {
  private logger = new Logger('ItemController');
  constructor(private commentService: CommentService) {}

  @Get(':item_id/comments')
  @ApiOperation({ summary: '아이템의 댓글들을 가져옵니다.' })
  @ApiCreatedResponse({
    description: '아이템의 댓글들을 가져옵니다.',
    type: [Comment],
  })
  async getCommentsByItemId(
    @Param('item_id', ParseIntPipe) item_id: number,
  ): Promise<any[]> {
    return this.commentService.findCommentsByItemId(item_id);
  }
}
