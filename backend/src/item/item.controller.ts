import { Controller, Get, Logger, Param } from '@nestjs/common';
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
  ): Promise<Comment[]> {
    return this.commentService.findCommentsByItemId(item_id);
  }
}
