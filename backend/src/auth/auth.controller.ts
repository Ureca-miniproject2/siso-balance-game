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
import { Request, Response } from 'express';
import { AuthService } from 'src/auth/auth.service';

@Controller('auth')
export class AuthController {
  private logger = new Logger('GameController');

  constructor(private readonly authService: AuthService) {}

  @Get('kakao')
  @UseGuards(AuthGuard('kakao'))
  @HttpCode(301)
  async kakaoLogin(@Req() req: Request, @Res() res: Response) {
    this.logger.log('Handling Kakao Login request');
    const { accessToken } = await this.authService.getJWT(
      req.user.kakaoId,
      req.user.username,
    );
    res.cookie('accessToken', accessToken, { httpOnly: true });

    return res.redirect(process.env.REDIRECT_URI);
  }
}
