import { ApiProperty } from '@nestjs/swagger';
import { CommentDto } from 'src/comment/dto/comment.dto';

export class ItemCommentsResponseDto {
  @ApiProperty({ type: [CommentDto], description: '아이템 댓글 목록' })
  data: CommentDto[];

  @ApiProperty({ description: '전체 아이템 댓글 수', example: 100 })
  total: number;
}
