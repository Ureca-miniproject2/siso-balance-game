import { ApiProperty } from '@nestjs/swagger';
import { Comment } from 'src/comment/comment.entity';
import { Game } from 'src/game/game.entity';
import { SelectedItem } from 'src/selected-item/selected-item.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';

@Entity()
export class Item {
  @PrimaryGeneratedColumn()
  @ApiProperty({
    description: '아이템의 고유 식별자',
    example: 1,
  })
  item_id: string;

  @Column()
  @ApiProperty({
    description: '아이템의 텍스트 내용',
    example: 'This is an item text.',
  })
  item_text: string;

  @ManyToOne(() => Game, (game) => game.items, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'game_id' })
  @ApiProperty({
    description: '이 아이템이 속한 게임',
    type: () => Game,
  })
  game: Game;

  @OneToMany(() => Comment, (comment) => comment.item)
  @ApiProperty({
    description: '아이템에 달린 댓글들',
    type: () => [Comment],
  })
  comments: Comment[];

  @Column()
  @ApiProperty({
    description: '아이템이 선택된 횟수',
    example: 1,
  })
  selected_count: number;

  @OneToMany(() => SelectedItem, (selectedItem) => selectedItem.item)
  @ApiProperty({
    description: '아이템이 선택된 기록들',
    type: () => [SelectedItem],
  })
  selectedItems: SelectedItem[];
}
