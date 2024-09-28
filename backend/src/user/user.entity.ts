import { ApiProperty } from '@nestjs/swagger';
import { Comment } from 'src/comment/comment.entity';
import { Game } from 'src/game/game.entity';
import { Like } from 'src/like/like.entity';
import { SelectedItem } from 'src/selected-item/selected-item.entity';
import { Entity, Column, OneToMany, Unique, PrimaryColumn } from 'typeorm';

@Entity()
@Unique(['user_id'])
export class User {
  @PrimaryColumn()
  @ApiProperty({
    description: '사용자의 고유 식별자',
    example: '1234567890',
  })
  user_id: string;

  @Column({ unique: true })
  @ApiProperty({
    description: '사용자의 닉네임',
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
    description: '사용자가 단 댓글들',
    type: () => [Comment],
  })
  comments: Comment[];

  @OneToMany(() => Like, (like) => like.user)
  @ApiProperty({
    description: '사용자가 누른 좋아요들',
    type: () => [Like],
  })
  likes: Like[];

  @OneToMany(() => SelectedItem, (selectedItem) => selectedItem.user)
  @ApiProperty({
    description: '사용자가 선택한 아이템들',
    type: () => [SelectedItem],
  })
  selectedItems: SelectedItem[];
}
