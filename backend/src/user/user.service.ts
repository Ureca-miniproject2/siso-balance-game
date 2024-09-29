import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async findOne(userId: string): Promise<User> {
    return await this.usersRepository.findOne({
      where: { user_id: userId },
      select: ['user_id', 'username'],
    });
  }
}
