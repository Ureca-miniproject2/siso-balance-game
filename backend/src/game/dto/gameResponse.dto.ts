import { ApiProperty } from '@nestjs/swagger';
import { GameUnitDto } from 'src/game/dto/gameUnit.dto';

export class GameResponseDto {
  @ApiProperty({ type: [GameUnitDto], description: '게임 데이터 목록' })
  data: GameUnitDto[];

  @ApiProperty({ description: '전체 게임 수', example: 100 })
  total: number;
}
