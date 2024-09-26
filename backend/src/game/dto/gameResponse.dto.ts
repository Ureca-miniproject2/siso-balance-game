import { ApiProperty } from '@nestjs/swagger';
import { GameDto } from 'src/game/dto/game.dto';
import { GetGamesItemDto } from 'src/item/dto/getGamesItem.dto';

export class GameResponseDto {
  @ApiProperty({ type: [GameDto], description: '게임 데이터 목록' })
  data: GetGamesItemDto[];

  @ApiProperty({ description: '전체 게임 수', example: 100 })
  total: number;
}
