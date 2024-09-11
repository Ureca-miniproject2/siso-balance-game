import { User } from 'src/auth/user.entity';
import { Item } from 'src/item/item.entity';
import { Like } from 'src/like/like.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Comment {
  @PrimaryGeneratedColumn()
  comment_id: number;

  @Column()
  comment_text: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @ManyToOne(() => User, (user) => user.comments, { onDelete: 'CASCADE' })
  user: User;

  @ManyToOne(() => Item, (item) => item.comments, { onDelete: 'CASCADE' })
  item: Item;

  @OneToMany(() => Like, (like) => like.comment)
  likes: Like[];
}
