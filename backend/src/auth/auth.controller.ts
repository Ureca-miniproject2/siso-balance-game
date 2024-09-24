import {
  Controller,
  Get,
  HttpCode,
  Logger,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Request, Response } from 'express';
import { AuthService } from 'src/auth/auth.service';

@Controller('auth')
@ApiTags('인증 api')
export class AuthController {
  private logger = new Logger('GameController');

  constructor(private readonly authService: AuthService) {}

  @Get('kakao')
  @ApiOperation({ summary: '카카오 로그인' })
  @UseGuards(AuthGuard('kakao'))
  @HttpCode(301)
  async kakaoLogin(@Req() req: Request, @Res() res: Response) {
    this.logger.log('Handling Kakao Login request');
    this.logger.log(req.user);
    const { accessToken } = await this.authService.getJWT(
      req.user.kakaoId,
      req.user.username,
    );
    res.cookie('accessToken', accessToken, { httpOnly: true });

    return res.redirect(process.env.REDIRECT_URI);
  }
}
