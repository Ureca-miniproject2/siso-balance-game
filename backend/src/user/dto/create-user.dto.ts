import { IsNotEmpty } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  user_id: string;

  @IsNotEmpty()
  username: string;
}
