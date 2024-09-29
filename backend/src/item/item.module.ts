import { Module } from '@nestjs/common';
import { ItemController } from './item.controller';
import { ItemService } from './item.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Item } from 'src/item/item.entity';
import { CommentService } from 'src/comment/comment.service';
import { Comment } from 'src/comment/comment.entity';
import { User } from 'src/user/user.entity';
import { JwtModule, JwtService } from '@nestjs/jwt';

@Module({
  imports: [
    TypeOrmModule.forFeature([Item, Comment, User]),
    JwtModule.register({
      secret: process.env.JWT_SECRET, // JWT 서명에 사용될 비밀 키
      signOptions: { expiresIn: process.env.JWT_EXPIRES_IN }, // 토큰 만료 시간 설정
    }),
  ],
  controllers: [ItemController],
  providers: [ItemService, CommentService, JwtService],
})
export class ItemModule {}
