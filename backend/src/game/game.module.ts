import { Module } from '@nestjs/common';
import { GameService } from './game.service';
import { GameController } from './game.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Game } from 'src/game/game.entity';
import { Item } from 'src/item/item.entity';
import { User } from 'src/user/user.entity';
import { JwtStrategy } from 'src/auth/strategies/jwt.strategy';
import { SelectedItem } from 'src/selected-item/selected-item.entity';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [TypeOrmModule.forFeature([Game, User, Item, SelectedItem])],
  controllers: [GameController],
  providers: [GameService, JwtStrategy, JwtService],
})
export class GameModule {}
