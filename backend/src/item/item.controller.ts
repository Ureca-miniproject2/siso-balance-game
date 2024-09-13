import { Controller } from '@nestjs/common';
import { ItemService } from 'src/item/item.service';

@Controller('item')
export class ItemController {
  constructor(private itemService: ItemService) {}
}
