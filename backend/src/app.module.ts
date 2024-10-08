import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { ItemModule } from './item/item.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeORMConfig } from 'src/configs/typeorm.config';
import { GameModule } from './game/game.module';
import { LikeModule } from './like/like.module';
import { CommentModule } from './comment/comment.module';
import { UserModule } from './user/user.module';
import { SelectedItemModule } from './selected-item/selected-item.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env.${process.env.NODE_ENV}`,
    }),
    TypeOrmModule.forRootAsync({
      useClass: typeORMConfig,
    }),
    AuthModule,
    ItemModule,
    GameModule,
    LikeModule,
    CommentModule,
    UserModule,
    SelectedItemModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
