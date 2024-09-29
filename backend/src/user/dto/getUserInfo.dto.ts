import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class GetUserInfoResponseDto {
  @IsNotEmpty()
  @ApiProperty({
    description: '사용자의 고유 식별자',
    example: '1234567890',
  })
  user_id: string;

  @IsNotEmpty()
  @ApiProperty({
    description: '사용자의 닉네임',
    example: 'username',
  })
  username: string;
}
