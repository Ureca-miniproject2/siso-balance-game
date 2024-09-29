import { Controller, Get, Logger, Req, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import {
  ApiCookieAuth,
  ApiCreatedResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { GetUserInfoResponseDto } from 'src/user/dto/getUserInfo.dto';
import { Request } from 'express';

@Controller('user')
@ApiTags('유저 api')
export class UserController {
  private logger = new Logger('UserController');

  constructor(private readonly userService: UserService) {}

  @UseGuards(AuthGuard('jwt'))
  @ApiCookieAuth('accessToken')
  @Get()
  @ApiOperation({ summary: '유저 정보 가져오기' })
  @ApiCreatedResponse({
    description: '유저 정보 가져오기',
    type: GetUserInfoResponseDto,
  })
  async getUser(@Req() req: Request) {
    const kakaoId = req.user.kakaoId;
    return this.userService.findOne(kakaoId);
  }

  @Get('/ping')
  @ApiOperation({ summary: '테스트 api 입니다.' })
  ping(): string {
    return 'ping';
  }
}
