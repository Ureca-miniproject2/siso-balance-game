import {
  Body,
  Controller,
  Get,
  Logger,
  Param,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { GameService } from './game.service';
import { Game } from 'src/game/game.entity';
import { CreateGameDto } from 'src/game/dto/create-game.dto';
import { AuthGuard } from '@nestjs/passport';
import { Item } from 'src/item/item.entity';
import { Request } from 'express';

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

  @Get(':game_id/items')
  async getItemsByGameId(@Param('game_id') game_id: number): Promise<Item[]> {
    return this.gameService.findItemsByGameId(game_id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post()
  async createGame(
    @Req() req: Request,
    @Body() createGameDto: CreateGameDto,
  ): Promise<Game> {
    const kakaoId = req.user.kakaoId;
    this.logger.log('Handling create game');
    return this.gameService.createGame({ ...createGameDto, user_id: kakaoId });
  }
}
