import { Module } from '@nestjs/common';
import { SelectedItemService } from './selected-item.service';
import { SelectedItemController } from './selected-item.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Item } from 'src/item/item.entity';
import { User } from 'src/user/user.entity';
import { Game } from 'src/game/game.entity';
import { SelectedItem } from 'src/selected-item/selected-item.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Item, User, Game, SelectedItem])],
  controllers: [SelectedItemController],
  providers: [SelectedItemService],
})
export class SelectedItemModule {}
