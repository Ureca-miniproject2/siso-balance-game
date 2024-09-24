import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateGameDto } from 'src/game/dto/create-game.dto';
import { GameDto } from 'src/game/dto/game.dto';
import { Game } from 'src/game/game.entity';
import { ItemDto } from 'src/item/dto/item.dto';
import { ItemsResponseDto } from 'src/item/dto/itemsResponse.dto';
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

  findOne(gameId: string): Promise<Game> {
    return this.gamesRepository.findOneBy({ game_id: gameId });
  }

  async findItemsByGameId(game_id: number): Promise<ItemsResponseDto> {
    // Game 엔티티에서 game_id를 기준으로 Item들을 가져옵니다.
    const items = await this.itemsRepository
      .createQueryBuilder('item')
      .leftJoinAndSelect('item.game', 'game')
      .where('game.game_id = :game_id', { game_id })
      .getMany();

    if (items.length === 0) {
      throw new Error('No items found for the given game_id');
    }
    const [firstItem, secondItem] = items;

    const response = new ItemsResponseDto();
    response.firstItem = this.toItemDto(firstItem);
    response.secondItem = this.toItemDto(secondItem);

    return response;
  }

  async createGame(
    userId: string,
    createGameDto: CreateGameDto,
  ): Promise<void> {
    const { firstItemText, secondItemText } = createGameDto;

    // 1. 사용자 조회
    const user = await this.usersRepository.findOneBy({ user_id: userId });
    if (!user) {
      throw new Error('유저를 찾을 수 없습니다.');
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
    await this.gamesRepository.save(game);
  }

  async findGamesByUserId(
    user_id: string,
    page: number = 1,
    limit: number = 10,
  ): Promise<GameDto[]> {
    const offset = (page - 1) * limit;

    // Game 엔티티에서 user_id에 따른 게임들을 페이지네이션하여 가져옵니다.
    const games = await this.gamesRepository
      .createQueryBuilder('game')
      .leftJoinAndSelect('game.items', 'item')
      .where('game.user.user_id = :user_id', { user_id })
      .orderBy('game.game_id', 'ASC')
      .skip(offset)
      .take(limit)
      .getMany();

    // Game 엔티티를 GameDto로 변환
    return games.map((game) => this.toGameDto(game));
  }

  async deleteGame(user_id: string, game_id: string): Promise<void> {
    const game = await this.gamesRepository.findOne({
      where: { game_id, user: { user_id } },
    });

    if (!game) {
      throw new Error('게임을 찾을 수 없습니다.');
    }

    await this.gamesRepository.remove(game);
  }

  private toItemDto(item: Item): ItemDto {
    const itemDto = new ItemDto();
    itemDto.item_id = item.item_id;
    itemDto.item_text = item.item_text;
    itemDto.game_id = item.game.game_id;
    itemDto.selected_count = item.comments ? item.comments.length : 0;
    return itemDto;
  }

  private toGameDto(game: Game): GameDto {
    const gameDto = new GameDto();
    gameDto.game_id = game.game_id;
    gameDto.first_item_text = game.items[0]?.item_text || '';
    gameDto.second_item_text = game.items[1]?.item_text || '';
    gameDto.created_at = game.created_at;
    gameDto.user_id = game.user.user_id;
    return gameDto;
  }
}
