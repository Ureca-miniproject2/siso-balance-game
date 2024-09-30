import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class ItemDto {
  @IsNotEmpty()
  @ApiProperty({ description: 'The ID of the item' })
  item_id: string;

  @IsNotEmpty()
  @ApiProperty({ description: 'The text of the item' })
  item_text: string;

  @IsNotEmpty()
  @ApiProperty({ description: 'The ID of the game to which the item belongs' })
  game_id: string;

  @IsNotEmpty()
  @ApiProperty({ description: 'The number of comments on the item' })
  selected_count: number;

  @IsNotEmpty()
  @ApiProperty({ description: 'The boolean of user selected' })
  isSelected: boolean;
}
