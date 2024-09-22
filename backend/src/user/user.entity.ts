import { ApiProperty } from '@nestjs/swagger';
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
  @ApiProperty({ description: '사용자의 id', example: 1 })
  user_id: number;

  @Column({ unique: true })
  @ApiProperty({
    description: '사용자의 username',
    example: 'username',
  })
  username: string;

  @OneToMany(() => Game, (balanceGame) => balanceGame.user)
  @ApiProperty({
    description: '사용자가 만든 게임들',
    type: () => [Game],
  })
  games: Game[];

  @OneToMany(() => Comment, (comment) => comment.user)
  @ApiProperty({
    description: '사용자가 작성한 댓글들',
    type: () => [Comment],
  })
  comments: Comment[];

  @OneToMany(() => Like, (like) => like.user)
  @ApiProperty({
    description: '사용자가 누른 좋아요들',
    type: () => [Like],
  })
  likes: Like[];
}
