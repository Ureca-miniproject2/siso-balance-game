import { IsNotEmpty } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  user_id: number;

  @IsNotEmpty()
  username: string;
}
