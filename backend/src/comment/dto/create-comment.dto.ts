import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateCommentDto {
  @IsNotEmpty()
  @ApiProperty({ description: 'The text of the comment' })
  comment_text: string;

  @IsNotEmpty()
  @ApiProperty({
    description: 'The ID of the item to which the comment belongs',
  })
  item_id: string;
}
