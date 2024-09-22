import { IsNotEmpty } from 'class-validator';

export class CreateGameDto {
  @IsNotEmpty()
  firstItemText: string;

  @IsNotEmpty()
  secondItemText: string;
}
