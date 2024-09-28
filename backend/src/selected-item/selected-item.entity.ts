import { ApiProperty } from '@nestjs/swagger';
import { User } from 'src/user/user.entity';
import { Item } from 'src/item/item.entity';
import { Game } from 'src/game/game.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  CreateDateColumn,
  Unique,
  JoinColumn,
} from 'typeorm';

@Entity()
@Unique(['user', 'game']) // 특정 사용자가 같은 게임에서 한 번만 선택하도록 제한
export class SelectedItem {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty({
    description: '선택된 아이템 기록의 고유 식별자',
    example: '12312-12312-12312-12312',
  })
  selected_item_id: string;

  @ManyToOne(() => User, (user) => user.selectedItems, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' }) // 외래 키 이름을 'user_id'로 명시적으로 설정
  @ApiProperty({
    description: '아이템을 선택한 사용자',
    type: () => User,
  })
  user: User;

  @ManyToOne(() => Game, (game) => game.selectedItems, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'game_id' }) // 외래 키 이름을 'game_id'로 명시적으로 설정
  @ApiProperty({
    description: '선택이 이루어진 게임',
    type: () => Game,
  })
  game: Game;

  @ManyToOne(() => Item, (item) => item.selectedItems, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'item_id' }) // 외래 키 이름을 'item_id'로 명시적으로 설정
  @ApiProperty({
    description: '선택된 아이템',
    type: () => Item,
  })
  item: Item;

  @CreateDateColumn()
  @ApiProperty({
    description: '아이템이 선택된 날짜와 시간',
    example: '2024-09-21T10:20:30Z',
  })
  selected_at: Date;
}
