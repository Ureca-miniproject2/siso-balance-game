import {
  Body,
  Controller,
  Get,
  Logger,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { GameService } from './game.service';
import { Game } from 'src/game/game.entity';
import { CreateGameDto } from 'src/game/dto/create-game.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('game')
export class GameController {
  private logger = new Logger('GameController');
  constructor(private readonly gameService: GameService) {}

  @Get()
  async findAll(
    @Query('page') page: number = 1, // 페이지 번호
    @Query('limit') limit: number = 10, // 페이지당 항목 수
  ): Promise<{ data: Game[]; total: number }> {
    this.logger.log('Handling Find All Games request');
    const games = await this.gameService.findAll({ page, limit });
    const total = await this.gameService.countGames(); // 전체 게임 수 계산
    return { data: games, total };
  }

  @UseGuards(AuthGuard('jwt'))
  @Post()
  async createGame(@Body() createGameDto: CreateGameDto): Promise<Game> {
    this.logger.log('Handling create game');
    return this.gameService.createGame(createGameDto);
  }
}
