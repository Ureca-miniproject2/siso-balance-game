import {
  Body,
  Controller,
  Delete,
  Get,
  Logger,
  Param,
  ParseIntPipe,
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
import { ApiTags } from '@nestjs/swagger';

@Controller('game')
@ApiTags('게임 api')
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
    return this.gameService.createGame(kakaoId, createGameDto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('user')
  async findGamesByUserId(@Req() req: Request): Promise<Game[]> {
    const kakaoId = req.user.kakaoId;
    return this.gameService.findGamesByUserId(kakaoId);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete(':game_id')
  async deleteGame(
    @Req() req: Request,
    @Param('game_id', ParseIntPipe) game_id: number,
  ): Promise<void> {
    const kakaoId = req.user.kakaoId;
    return this.gameService.deleteGame(kakaoId, game_id);
  }
}
