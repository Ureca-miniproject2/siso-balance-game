import { Controller, Param, Post, Req, UseGuards } from '@nestjs/common';
import { SelectedItemService } from './selected-item.service';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';

@Controller('games/:gameId/items/:itemId/select')
export class SelectedItemController {
  constructor(private readonly selectedItemService: SelectedItemService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post()
  async selectOrToggleItem(
    @Param('gameId') gameId: string,
    @Param('itemId') itemId: string,
    @Req() req: Request,
  ): Promise<void> {
    const kakaoId = req.user.kakaoId;

    await this.selectedItemService.selectOrToggleItem(kakaoId, gameId, itemId);
  }
}
