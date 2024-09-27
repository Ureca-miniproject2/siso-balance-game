import { Module } from '@nestjs/common';
import { ItemController } from './item.controller';
import { ItemService } from './item.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Item } from 'src/item/item.entity';
import { CommentService } from 'src/comment/comment.service';
import { Comment } from 'src/comment/comment.entity';
import { User } from 'src/user/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Item, Comment, User])],
  controllers: [ItemController],
  providers: [ItemService, CommentService],
})
export class ItemModule {}
