import { Controller, Get, Logger } from '@nestjs/common';
import { UserService } from './user.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@Controller('user')
@ApiTags('유저 api')
export class UserController {
  private logger = new Logger('UserController');

  constructor(private readonly userService: UserService) {}

  @Get('/ping')
  @ApiOperation({ summary: '테스트 api 입니다.' })
  ping(): string {
    return 'ping';
  }
}
