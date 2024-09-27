import { Module } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CommentController } from './comment.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Comment } from 'src/comment/comment.entity';
import { Item } from 'src/item/item.entity';
import { User } from 'src/user/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Comment, Item, User])],
  controllers: [CommentController],
  providers: [CommentService],
})
export class CommentModule {}
