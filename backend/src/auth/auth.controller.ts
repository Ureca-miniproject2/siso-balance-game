import { User } from 'src/auth/user.entity';
import { AuthService } from './auth.service';
import { Body, Controller, Get, Logger, Post } from '@nestjs/common';
import { CreateUserDto } from 'src/auth/dto/create-user.dto';

@Controller('auth')
export class AuthController {
  private logger = new Logger('AuthController');

  constructor(private readonly authService: AuthService) {}

  @Get()
  findOne(): Promise<User> {
    this.logger.log('Handling Find One Users request');
    return this.authService.findOne(2);
  }

  @Post('/test')
  async test(@Body() createUserDto: CreateUserDto): Promise<User> {
    this.logger.log('Handling create user');
    return this.authService.createUser(createUserDto);
  }
}
