import { ApiProperty } from '@nestjs/swagger';
import { Comment } from 'src/comment/comment.entity';
import { User } from 'src/user/user.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  CreateDateColumn,
  Unique,
} from 'typeorm';

@Entity()
@Unique(['comment', 'user'])
export class Like {
  @PrimaryGeneratedColumn()
  @ApiProperty({ description: '좋아요의 id', example: 1 })
  like_id: number;

  @CreateDateColumn()
  @ApiProperty({
    description: '좋아요가 생성된 날짜와 시간',
    example: '2024-09-21T10:20:30Z',
  })
  created_at: Date;

  @ManyToOne(() => User, (user) => user.likes, { onDelete: 'CASCADE' })
  @ApiProperty({
    description: '좋아요를 누른 사용자',
    type: () => User,
  })
  user: User;

  @ManyToOne(() => Comment, (comment) => comment.likes, { onDelete: 'CASCADE' })
  @ApiProperty({
    description: '좋아요를 누른 달린 댓글',
    type: () => Comment,
  })
  comment: Comment;
}
