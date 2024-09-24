import { IsNotEmpty } from 'class-validator';

export class CreateCommentDto {
  @IsNotEmpty()
  comment_text: string;

  @IsNotEmpty()
  item_id: string;
}
