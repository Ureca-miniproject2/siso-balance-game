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
import { JwtService } from '@nestjs/jwt';

@Controller('game')
@ApiTags('게임 api')
export class GameController {
  private logger = new Logger('GameController');
  constructor(
    private readonly gameService: GameService,
    private readonly jwtService: JwtService,
  ) {}

  @Get()
  @ApiOperation({ summary: '모든 게임들을 불러옵니다.' })
  @ApiCreatedResponse({
    description: '모든 게임들을 불러옵니다.',
    type: GameResponseDto,
  })
  async findAll(
    @Query('page') page: number = 0, // 페이지 번호
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
    @Req() req: Request,
    @Param('game_id') game_id: string,
  ): Promise<ItemsResponseDto> {
    const token = req.cookies['accessToken']; // 쿠키에서 accessToken 읽기
    let user_id: string | null = null;
    if (token) {
      try {
        const decoded = this.jwtService.verify(token, {
          secret: process.env.JWT_SECRET,
        }); // 토큰 검증 및 디코딩
        user_id = decoded.userId; // user_id 추출
      } catch (error) {
        // 토큰 검증 실패 시 userId를 null로 유지하고 계속 진행
        console.log('유효하지 않은 토큰입니다.', error.message);
      }
    }
    return this.gameService.findItemsByGameId(game_id, user_id);
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
  @ApiOperation({ summary: '자신이 만든 게임들을 가져옵니다.' })
  @ApiCreatedResponse({
    description: '자신이 만든 게임들을 가져옵니다.',
    type: [GameResponseDto],
  })
  async findGamesByUserId(
    @Req() req: Request,
    @Query('page') page: number = 0, // 페이지 번호
    @Query('limit') limit: number = 10, // 페이지당 아이템 수
  ): Promise<GameResponseDto> {
    const kakaoId = req.user.kakaoId;
    const games = await this.gameService.findGamesByUserId(
      kakaoId,
      page,
      limit,
    );
    const total = games.length;

    return { data: games, total };
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
