import { Module } from '@nestjs/common';
import { GameService } from './game.service';
import { GameController } from './game.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Game } from 'src/game/game.entity';
import { User } from 'src/auth/user.entity';
import { Item } from 'src/item/item.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Game, User, Item])],
  controllers: [GameController],
  providers: [GameService],
})
export class GameModule {}
