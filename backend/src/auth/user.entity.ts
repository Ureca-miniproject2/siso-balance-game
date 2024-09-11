import { BaseEntity, Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class User extends BaseEntity {
  @PrimaryColumn({ unique: true })
  userId: number;

  @Column()
  username: string;
}
