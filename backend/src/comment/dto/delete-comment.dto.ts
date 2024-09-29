import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class DeleteCommentDto {
  @IsNotEmpty()
  @ApiProperty({ description: 'The ID of the comment to delete' })
  comment_id: string;
}
