import { Module } from '@nestjs/common';
import { LikeService } from './like.service';
import { LikeController } from './like.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Like } from 'src/like/like.entity';
import { User } from 'src/user/user.entity';
import { Comment } from 'src/comment/comment.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Like, User, Comment])],
  controllers: [LikeController],
  providers: [LikeService],
})
export class LikeModule {}
