import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Item } from 'src/item/item.entity';
import { Like } from 'src/like/like.entity';
import { User } from 'src/user/user.entity';

@Entity()
export class Comment {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty({
    description: '댓글의 고유 식별자',
    example: '1212313',
  })
  comment_id: string;

  @Column()
  @ApiProperty({
    description: '댓글의 텍스트 내용',
    example: 'This is a comment.',
  })
  comment_text: string;

  @CreateDateColumn()
  @ApiProperty({
    description: '댓글이 생성된 날짜와 시간',
    example: '2024-09-21T10:20:30Z',
  })
  created_at: Date;

  @UpdateDateColumn()
  @ApiProperty({
    description: '댓글이 마지막으로 수정된 날짜와 시간',
    example: '2024-09-21T12:34:56Z',
  })
  updated_at: Date;

  @ManyToOne(() => User, (user) => user.comments, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  @ApiProperty({
    description: '댓글을 작성한 사용자',
    type: () => User,
  })
  user: User;

  @ManyToOne(() => Item, (item) => item.comments, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'item_id' })
  @ApiProperty({
    description: '댓글이 달린 아이템',
    type: () => Item,
  })
  item: Item;

  @OneToMany(() => Like, (like) => like.comment)
  @ApiProperty({
    description: '댓글에 달린 좋아요들',
    type: () => [Like],
  })
  likes: Like[];

  @Column({ default: 0 })
  @ApiProperty({
    description: '댓글에 달린 좋아요 수',
    example: 10,
  })
  likeCount: number; // 좋아요 수를 저장하는 필드 추가
}
