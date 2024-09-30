import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { GetGamesItemDto } from 'src/item/dto/getGamesItem.dto';

export class GameUnitDto {
  @IsNotEmpty()
  @ApiProperty({ description: '게임의 ID' })
  game_id: string;

  @IsNotEmpty()
  @ApiProperty({ description: '게임 만든 시간' })
  created_at: Date;

  @IsNotEmpty()
  @ApiProperty({
    description: '게임의 아이템들',
    type: GetGamesItemDto,
  })
  items: GetGamesItemDto[];
}
