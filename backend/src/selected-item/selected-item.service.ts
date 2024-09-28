import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource } from 'typeorm';
import { SelectedItem } from './selected-item.entity';
import { User } from 'src/user/user.entity';
import { Item } from 'src/item/item.entity';
import { Game } from 'src/game/game.entity';
import { NotFoundException, ConflictException } from '@nestjs/common';

@Injectable()
export class SelectedItemService {
  constructor(
    @InjectRepository(SelectedItem)
    private selectedItemRepository: Repository<SelectedItem>,
    @InjectRepository(Item)
    private itemRepository: Repository<Item>,
    @InjectRepository(Game)
    private gameRepository: Repository<Game>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private readonly dataSource: DataSource,
  ) {}

  async selectOrToggleItem(
    user_id: string,
    game_id: string,
    item_id: string,
  ): Promise<void> {
    const queryRunner = this.dataSource.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const user = await this.userRepository.findOneBy({ user_id });
      if (!user) {
        throw new NotFoundException('User not found');
      }

      const game = await this.gameRepository.findOneBy({ game_id });
      const item = await this.itemRepository.findOneBy({ item_id });
      if (!game || !item) {
        throw new NotFoundException('Game or item not found');
      }

      const existingSelection = await queryRunner.manager.findOne(
        SelectedItem,
        {
          where: {
            user: { user_id: user.user_id },
            game: { game_id: game.game_id },
          },
          relations: ['item'],
        },
      );

      if (existingSelection) {
        if (existingSelection.item.item_id === item.item_id) {
          // 동일한 아이템을 선택하면 취소 (삭제)
          await queryRunner.manager.remove(existingSelection);
          await this.updateItemSelectionCount(queryRunner, item, -1); // 선택 횟수 감소
        } else {
          // 다른 아이템을 선택하면 이전 선택을 취소하고 새로운 아이템 선택
          await queryRunner.manager.remove(existingSelection);
          await this.updateItemSelectionCount(
            queryRunner,
            existingSelection.item,
            -1,
          ); // 이전 아이템 선택 횟수 감소
          await this.createNewSelection(queryRunner, user, game, item); // 새로운 선택
        }
      } else {
        // 중복 확인
        const duplicateCheck = await queryRunner.manager.findOne(SelectedItem, {
          where: { user, game, item },
        });
        if (duplicateCheck) {
          throw new ConflictException('Duplicate selection exists');
        }
        // 처음 선택하는 경우
        await this.createNewSelection(queryRunner, user, game, item);
      }

      await queryRunner.commitTransaction();
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }

  private async createNewSelection(
    queryRunner: any,
    user: User,
    game: Game,
    item: Item,
  ): Promise<void> {
    const newSelection = this.selectedItemRepository.create({
      user,
      game,
      item,
    });
    await queryRunner.manager.save(newSelection);
    await this.updateItemSelectionCount(queryRunner, item, 1); // 선택 횟수 증가
  }

  private async updateItemSelectionCount(
    queryRunner: any,
    item: Item,
    countChange: number,
  ): Promise<void> {
    if (item.selected_count === undefined || item.selected_count === null) {
      item.selected_count = 0; // 기본값 설정
    }
    item.selected_count += countChange;
    await queryRunner.manager.save(item);
  }
}
