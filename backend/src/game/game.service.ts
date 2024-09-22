import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateGameDto } from 'src/game/dto/create-game.dto';
import { Game } from 'src/game/game.entity';
import { Item } from 'src/item/item.entity';
import { User } from 'src/user/user.entity';
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

  async findAll({
    page = 1,
    limit = 10,
  }: {
    page: number;
    limit: number;
  }): Promise<any[]> {
    const offset = (page - 1) * limit;

    // Game과 관련된 Item들을 JOIN
    const games = await this.gamesRepository
      .createQueryBuilder('game')
      .leftJoinAndSelect('game.items', 'item')
      .orderBy('game.game_id', 'ASC')
      .skip(offset)
      .take(limit)
      .getMany();

    return games.map((game) => {
      return { ...game };
    });
  }

  async countGames(): Promise<number> {
    return this.gamesRepository.count(); // 전체 게임 수 반환
  }

  findOne(gameId: number): Promise<Game> {
    return this.gamesRepository.findOneBy({ game_id: gameId });
  }

  async findItemsByGameId(game_id: number): Promise<Item[]> {
    // Game 엔티티에서 game_id를 기준으로 Item들을 가져옵니다.
    const items = await this.itemsRepository
      .createQueryBuilder('item')
      .leftJoinAndSelect('item.game', 'game')
      .where('game.game_id = :game_id', { game_id })
      .getMany();

    if (items.length === 0) {
      throw new Error('No items found for the given game_id');
    }

    return items;
  }

  async createGame(createGameDto: CreateGameDto): Promise<Game> {
    const { user_id, firstItemText, secondItemText } = createGameDto;

    // 1. 사용자 조회
    const user = await this.usersRepository.findOneBy({ user_id });
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

  async findGamesByUserId(user_id: number): Promise<Game[]> {
    return this.gamesRepository.find({
      where: { user: { user_id } },
    });
  }
}
