import { Comment } from 'src/comment/comment.entity';
import { Game } from 'src/game/game.entity';
import { Like } from 'src/like/like.entity';
import {
  Entity,
  Column,
  OneToMany,
  Unique,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
@Unique(['user_id'])
export class User {
  @PrimaryGeneratedColumn()
  user_id: number;

  @Column({ unique: true })
  username: string;

  @OneToMany(() => Game, (balanceGame) => balanceGame.user)
  games: Game[];

  @OneToMany(() => Comment, (comment) => comment.user)
  comments: Comment[];

  @OneToMany(() => Like, (like) => like.user)
  likes: Like[];
}
