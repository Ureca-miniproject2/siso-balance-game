import { Body, Controller, Get, Logger, Post, UseGuards } from '@nestjs/common';
import { GameService } from './game.service';
import { Game } from 'src/game/game.entity';
import { CreateGameDto } from 'src/game/dto/create-game.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('game')
export class GameController {
  private logger = new Logger('GameController');
  constructor(private readonly gameService: GameService) {}

  @Get()
  findAll(): Promise<Game[]> {
    this.logger.log('Handling Find All Games request');
    return this.gameService.findAll();
  }

  @UseGuards(AuthGuard('jwt'))
  @Post()
  async createGame(@Body() createGameDto: CreateGameDto): Promise<Game> {
    this.logger.log('Handling create game');
    return this.gameService.createGame(createGameDto);
  }
}
