import { Comment } from 'src/comment/comment.entity';
import { Game } from 'src/game/game.entity';
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
  item_id: number;

  @Column()
  item_text: string;

  @ManyToOne(() => Game, (game) => game.items, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'game_id' }) // 외래 키 이름을 'game_id'로 명시적으로 설정
  game: Game;

  @OneToMany(() => Comment, (comment) => comment.item)
  comments: Comment[];
}
