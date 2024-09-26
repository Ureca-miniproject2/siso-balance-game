import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateGameDto {
  @IsNotEmpty()
  @ApiProperty({ description: 'First item text' })
  firstItemText: string;

  @IsNotEmpty()
  @ApiProperty({ description: 'Second item text' })
  secondItemText: string;
}
