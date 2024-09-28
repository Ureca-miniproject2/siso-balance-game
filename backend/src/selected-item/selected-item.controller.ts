import { Controller, Param, Post, Req, UseGuards } from '@nestjs/common';
import { SelectedItemService } from './selected-item.service';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import {
  ApiCookieAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

@Controller('games/:gameId/items/:itemId/select')
@ApiTags('아이템 선택 api')
export class SelectedItemController {
  constructor(private readonly selectedItemService: SelectedItemService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post()
  @ApiCookieAuth('accessToken')
  @ApiOperation({ summary: '아이템 선택' })
  @ApiResponse({ status: 200, description: '정상' })
  async selectOrToggleItem(
    @Param('gameId') gameId: string,
    @Param('itemId') itemId: string,
    @Req() req: Request,
  ): Promise<void> {
    const kakaoId = req.user.kakaoId;

    await this.selectedItemService.selectOrToggleItem(kakaoId, gameId, itemId);
  }
}
