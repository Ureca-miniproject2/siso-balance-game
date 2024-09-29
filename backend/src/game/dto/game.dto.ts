import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class GameDto {
  @IsNotEmpty()
  @ApiProperty({ description: 'The ID of the game' })
  game_id: string;

  @IsNotEmpty()
  @ApiProperty({ description: 'First item text' })
  first_item_text: string;

  @IsNotEmpty()
  @ApiProperty({ description: 'Second item text' })
  second_item_text: string;

  @IsNotEmpty()
  @ApiProperty({ description: 'Created date' })
  created_at: Date;

  @IsNotEmpty()
  @ApiProperty({ description: 'The user who made the game' })
  user_id: string;
}
