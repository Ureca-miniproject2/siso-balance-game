import {
  Body,
  Controller,
  Delete,
  Get,
  Logger,
  Param,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { GameService } from './game.service';
import { CreateGameDto } from 'src/game/dto/create-game.dto';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import {
  ApiBody,
  ApiCookieAuth,
  ApiCreatedResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { GameResponseDto } from 'src/game/dto/gameResponse.dto';
import { ItemsResponseDto } from 'src/item/dto/itemsResponse.dto';
import { GameDto } from 'src/game/dto/game.dto';

@Controller('game')
@ApiTags('게임 api')
export class GameController {
  private logger = new Logger('GameController');
  constructor(private readonly gameService: GameService) {}

  @Get()
  @ApiOperation({ summary: '모든 게임들을 불러옵니다.' })
  @ApiCreatedResponse({
    description: '모든 게임들을 불러옵니다.',
    type: GameResponseDto,
  })
  async findAll(
    @Query('page') page: number = 1, // 페이지 번호
    @Query('limit') limit: number = 10, // 페이지당 항목 수
  ): Promise<GameResponseDto> {
    this.logger.log('Handling Find All Games request');
    const games = await this.gameService.findAll({ page, limit });
    const total = await this.gameService.countGames(); // 전체 게임 수 계산
    return { data: games, total };
  }

  @Get(':game_id/items')
  @ApiOperation({ summary: '게임의 아이템들을 모두 가져옵니다.' })
  @ApiCreatedResponse({
    description: '게임의 아이템들을 모두 가져옵니다.',
    type: ItemsResponseDto,
  })
  async getItemsByGameId(
    @Param('game_id') game_id: string,
  ): Promise<ItemsResponseDto> {
    return this.gameService.findItemsByGameId(game_id);
  }

  @UseGuards(AuthGuard('jwt'))
  @ApiCookieAuth('accessToken')
  @ApiOperation({ summary: '자신의 게임을 생성합니다.' })
  @ApiBody({
    type: CreateGameDto,
  })
  @Post()
  async createGame(
    @Req() req: Request,
    @Body() createGameDto: CreateGameDto,
  ): Promise<void> {
    const kakaoId = req.user.kakaoId;
    this.logger.log('Handling create game');
    return this.gameService.createGame(kakaoId, createGameDto);
  }

  @UseGuards(AuthGuard('jwt'))
  @ApiCookieAuth('accessToken')
  @Get('user')
  @ApiOperation({ summary: '사용자가 만든 게임들을 가져옵니다.' })
  @ApiCreatedResponse({
    description: '자신이 만든 게임들을 가져옵니다.',
    type: [GameDto],
  })
  async findGamesByUserId(
    @Req() req: Request,
    @Query('page') page: number = 1, // 페이지 번호
    @Query('limit') limit: number = 10, // 페이지당 아이템 수
  ): Promise<GameDto[]> {
    const kakaoId = req.user.kakaoId;
    return this.gameService.findGamesByUserId(kakaoId, page, limit);
  }

  @UseGuards(AuthGuard('jwt'))
  @ApiCookieAuth('accessToken')
  @Delete(':game_id')
  @ApiOperation({ summary: '자신의 게임을 삭제합니다.' })
  async deleteGame(
    @Req() req: Request,
    @Param('game_id') game_id: string,
  ): Promise<void> {
    const kakaoId = req.user.kakaoId;
    return this.gameService.deleteGame(kakaoId, game_id);
  }
}
