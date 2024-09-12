import { IsNotEmpty } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  userId: number;

  @IsNotEmpty()
  username: string;
}
