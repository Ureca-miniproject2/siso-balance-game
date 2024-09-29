import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { User } from 'src/user/user.entity';

export class CommentDto {
  @IsNotEmpty()
  @ApiProperty({ description: 'The ID of the comment' })
  comment_id: string;

  @IsNotEmpty()
  @ApiProperty({ description: 'The text of the comment' })
  comment_text: string;

  @IsNotEmpty()
  @ApiProperty({ description: 'The date when the comment was created' })
  created_at: Date;

  @IsNotEmpty()
  @ApiProperty({ description: 'The date when the comment was last updated' })
  updated_at: Date;

  @IsNotEmpty()
  @ApiProperty({ description: 'The user who made the comment', type: String })
  user: User;

  @IsNotEmpty()
  @ApiProperty({ description: 'The number of likes the comment has received' })
  likeCount: number;

  @IsNotEmpty()
  @ApiProperty({ description: 'Whether the comment is the best comment' })
  isBest?: boolean;

  @IsNotEmpty()
  @ApiProperty({ description: 'Whether the user has liked the comment' })
  isLikedByUser?: boolean;
}
