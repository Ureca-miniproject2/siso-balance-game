import { Comment } from 'src/comment/comment.entity';
import { Game } from 'src/game/game.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
} from 'typeorm';

@Entity()
export class Item {
  @PrimaryGeneratedColumn()
  item_id: number;

  @Column()
  item_text: string;

  @ManyToOne(() => Game, (game) => game.items, { onDelete: 'CASCADE' })
  game: Game;

  @OneToMany(() => Comment, (comment) => comment.item)
  comments: Comment[];
}
