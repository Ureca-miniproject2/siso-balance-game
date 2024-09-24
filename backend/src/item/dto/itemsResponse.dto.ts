import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { ItemDto } from 'src/item/dto/item.dto';

export class ItemsResponseDto {
  @IsNotEmpty()
  @ApiProperty({ type: ItemDto, description: 'The list of items' })
  firstItem: ItemDto;

  @IsNotEmpty()
  @ApiProperty({ type: ItemDto, description: 'The list of items' })
  secondItem: ItemDto;
}
