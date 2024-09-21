import { Injectable, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AuthService {
  private logger = new Logger('AuthService');

  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

  async getJWT(kakaoId: number, username: string) {
    const user = await this.kakaoValidateUser(kakaoId, username); // 카카오 정보 검증 및 회원가입 로직
    const accessToken = this.generateAccessToken(user); // AccessToken 생성
    return { accessToken };
  }

  async kakaoValidateUser(kakaoId: number, username: string): Promise<User> {
    let user: User = await this.usersRepository.findOneBy({ user_id: kakaoId }); // 유저 조회
    if (!user) {
      // 회원 가입 로직
      this.logger.log('회원가입 로직 실행');

      user = this.usersRepository.create({
        user_id: kakaoId,
        username,
      });
      this.logger.log('user: ' + user.user_id + ' ' + user.username);
    }
    user = await this.usersRepository.save(user);
    return user;
  }

  generateAccessToken(user: User): string {
    const payload = {
      userId: user.user_id,
    };
    return this.jwtService.sign(payload, {
      secret: process.env.JWT_SECRET,
      expiresIn: process.env.JWT_EXPIRES_IN,
    });
  }

  // async generateRefreshToken(user: User): Promise<string> {
  //   const payload = {
  //     userId: user.user_id,
  //   };

  //   const refreshToken = this.jwtService.sign(payload);

  //   return refreshToken;
  // }
}
