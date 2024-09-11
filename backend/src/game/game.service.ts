import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/auth/user.entity';
import { CreateGameDto } from 'src/game/dto/create-game.dto';
import { Game } from 'src/game/game.entity';
import { Item } from 'src/item/item.entity';
import { Repository } from 'typeorm';

@Injectable()
export class GameService {
  constructor(
    @InjectRepository(Game)
    private gamesRepository: Repository<Game>,
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    @InjectRepository(Item)
    private itemsRepository: Repository<Item>,
  ) {}

  findAll(): Promise<Game[]> {
    return this.gamesRepository.find();
  }

  findOne(gameId: number): Promise<Game> {
    return this.gamesRepository.findOneBy({ game_id: gameId });
  }

  async createGame(createGameDto: CreateGameDto): Promise<Game> {
    const { userId, firstItemText, secondItemText } = createGameDto;

    // 1. 사용자 조회
    const user = await this.usersRepository.findOneBy({ user_id: userId });
    if (!user) {
      throw new Error('User not found');
    }

    // 2. 게임 생성
    const game = new Game();
    game.user = user;

    // 4. 첫 번째 아이템 생성
    const firstItem = new Item();
    firstItem.item_text = firstItemText;

    // 5. 두 번째 아이템 생성
    const secondItem = new Item();
    secondItem.item_text = secondItemText;

    // 6. 데이터베이스에 아이템 저장
    await this.itemsRepository.save(firstItem);
    await this.itemsRepository.save(secondItem);

    game.items = [firstItem, secondItem];
    // 7. 게임의 아이템 목록 업데이트
    return this.gamesRepository.save(game);
  }
}
