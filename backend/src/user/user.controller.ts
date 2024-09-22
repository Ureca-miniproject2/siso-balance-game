import { Controller, Get, Logger } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from 'src/user/user.entity';
import { ApiTags } from '@nestjs/swagger';

@Controller('user')
@ApiTags('유저 api')
export class UserController {
  private logger = new Logger('UserController');

  constructor(private readonly userService: UserService) {}

  @Get()
  findOne(): Promise<User> {
    this.logger.log('Handling Find One Users request');
    return this.userService.findOne(2);
  }

  @Get('/ping')
  ping(): string {
    return 'ping';
  }
}
