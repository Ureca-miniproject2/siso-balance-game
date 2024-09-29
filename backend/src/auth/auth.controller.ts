import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Logger,
  Post,
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

  @Post('logout')
  @ApiOperation({ summary: '로그아웃' })
  async logout(@Res() res: Response) {
    try {
      // 로그아웃 처리 (쿠키 삭제)
      res.clearCookie('accessToken', {
        httpOnly: true,
        secure: true,
        sameSite: 'strict',
      });

      // 성공 메시지 반환
      return res.status(HttpStatus.OK).json({ message: '로그아웃되었습니다.' });
    } catch (error) {
      // 예외 발생 시 처리
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        message: '로그아웃에 실패했습니다. 나중에 다시 시도해주세요.',
      });
    }
  }
}
