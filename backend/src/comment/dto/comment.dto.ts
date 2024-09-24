import { ApiProperty } from '@nestjs/swagger';

export class CommentDto {
  @ApiProperty({ description: 'The ID of the comment' })
  comment_id: number;

  @ApiProperty({ description: 'The text of the comment' })
  comment_text: string;

  @ApiProperty({ description: 'The date when the comment was created' })
  created_at: Date;

  @ApiProperty({ description: 'The date when the comment was last updated' })
  updated_at: Date;

  @ApiProperty({ description: 'The user who made the comment', type: String })
  user: string;
}
