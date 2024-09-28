import { ApiProperty } from '@nestjs/swagger';
import { Item } from 'src/item/item.entity';
import { SelectedItem } from 'src/selected-item/selected-item.entity';
import { User } from 'src/user/user.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
  CreateDateColumn,
  JoinColumn,
} from 'typeorm';

@Entity()
export class Game {
  @PrimaryGeneratedColumn()
  @ApiProperty({ description: '게임의 id', example: '1' })
  game_id: string;

  @CreateDateColumn()
  @ApiProperty({
    description: '게임이 생성된 날짜와 시간',
    example: '2024-09-21T10:20:30Z',
  })
  created_at: Date;

  @ManyToOne(() => User, (user) => user.games, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' }) // 외래 키 이름을 'game_id'로 명시적으로 설정
  @ApiProperty({
    description: '게임을 만든 사용자',
    type: () => User,
  })
  user: User;

  @OneToMany(() => Item, (item) => item.game)
  @ApiProperty({
    description: '게임에 포함된 아이템들',
    type: () => [Item],
  })
  items: Item[];

  @OneToMany(() => SelectedItem, (selectedItem) => selectedItem.game)
  @ApiProperty({
    description: '게임에서 선택된 아이템들',
    type: () => [SelectedItem],
  })
  selectedItems: SelectedItem[];
}
