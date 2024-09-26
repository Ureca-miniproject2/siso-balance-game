import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class GetGamesItemDto {
  @IsNotEmpty()
  @ApiProperty({ description: 'The ID of the item' })
  item_id: string;

  @IsNotEmpty()
  @ApiProperty({ description: 'The text of the item' })
  item_text: string;

  @IsNotEmpty()
  @ApiProperty({ description: 'The number of comments on the item' })
  selected_count: number;
}
