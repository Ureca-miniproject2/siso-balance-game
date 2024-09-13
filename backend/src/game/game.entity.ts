import { Item } from 'src/item/item.entity';
import { User } from 'src/user/user.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
  CreateDateColumn,
} from 'typeorm';

@Entity()
export class Game {
  @PrimaryGeneratedColumn()
  game_id: number;

  @CreateDateColumn()
  created_at: Date;

  @ManyToOne(() => User, (user) => user.games, { onDelete: 'CASCADE' })
  user: User;

  @OneToMany(() => Item, (item) => item.game)
  items: Item[];
}
