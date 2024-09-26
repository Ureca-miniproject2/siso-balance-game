import { ApiProperty } from '@nestjs/swagger';
import { GetGamesItemDto } from 'src/item/dto/getGamesItem.dto';

export class GameResponseDto {
  @ApiProperty({ type: [GetGamesItemDto], description: '게임 데이터 목록' })
  data: GetGamesItemDto[];

  @ApiProperty({ description: '전체 게임 수', example: 100 })
  total: number;
}
