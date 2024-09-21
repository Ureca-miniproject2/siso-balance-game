import { IsNotEmpty } from 'class-validator';

export class CreateCommentDto {
  @IsNotEmpty()
  comment_text: string;

  @IsNotEmpty()
  user_id: number;

  @IsNotEmpty()
  item_id: number;
}
