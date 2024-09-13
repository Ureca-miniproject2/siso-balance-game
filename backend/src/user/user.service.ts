import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { User } from 'src/user/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  findOne(userId: number): Promise<User> {
    return this.usersRepository.findOneBy({ user_id: userId });
  }

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    // Create a new User entity from the DTO
    const user = new User();
    user.username = createUserDto.username;
    user.user_id = createUserDto.userId;

    // Save the entity to the database
    return this.usersRepository.save(user);
  }
}
