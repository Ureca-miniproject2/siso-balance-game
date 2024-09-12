import { Body, Controller, Get, Logger, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from 'src/user/user.entity';
import { CreateUserDto } from 'src/user/dto/create-user.dto';

@Controller('user')
export class UserController {
  private logger = new Logger('UserController');

  constructor(private readonly userService: UserService) {}

  @Get()
  findOne(): Promise<User> {
    this.logger.log('Handling Find One Users request');
    return this.userService.findOne(2);
  }

  @Post('/test')
  async test(@Body() createUserDto: CreateUserDto): Promise<User> {
    this.logger.log('Handling create user');
    return this.userService.createUser(createUserDto);
  }
}
