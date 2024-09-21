import { Controller, Get, Logger, Param } from '@nestjs/common';
import { CommentService } from 'src/comment/comment.service';

@Controller('item')
export class ItemController {
  private logger = new Logger('ItemController');
  constructor(private commentService: CommentService) {}

  @Get(':item_id/comments')
  async getCommentsByItemId(@Param('item_id') item_id: number): Promise<any[]> {
    return this.commentService.findCommentsByItemId(item_id);
  }
}
