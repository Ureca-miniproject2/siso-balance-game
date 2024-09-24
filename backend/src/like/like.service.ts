import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Comment } from 'src/comment/comment.entity';
import { Like } from 'src/like/like.entity';
import { User } from 'src/user/user.entity';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class LikeService {
  constructor(
    @InjectRepository(Like)
    private likesRepository: Repository<Like>,
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    @InjectRepository(Comment)
    private commentRepository: Repository<Comment>,

    private readonly dataSource: DataSource,
  ) {}

  async likeComment(userId: string, commentId: string): Promise<Like> {
    // 트랜잭션을 위해 queryRunner 생성
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const user = await queryRunner.manager.findOne(User, {
        where: { user_id: userId },
      });
      const comment = await queryRunner.manager.findOne(Comment, {
        where: { comment_id: commentId },
        lock: { mode: 'pessimistic_write' },
      });

      if (!user || !comment) {
        throw new NotFoundException('User or Comment not found');
      }

      const existingLike = await queryRunner.manager.findOne(Like, {
        where: { user, comment },
      });

      if (existingLike) {
        throw new ConflictException('You have already liked this comment');
      }

      const like = queryRunner.manager.create(Like, {
        user,
        comment,
      });

      const savedLike = await queryRunner.manager.save(like);

      // 좋아요 수 증가
      await queryRunner.manager.increment(
        Comment,
        { comment_id: commentId },
        'likeCount',
        1,
      );

      await queryRunner.commitTransaction();
      return savedLike;
    } catch (error) {
      // 에러 발생 시 트랜잭션 롤백
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      // 트랜잭션 종료 후 queryRunner 해제
      await queryRunner.release();
    }
  }

  async unlikeComment(userId: string, commentId: string): Promise<void> {
    // 트랜잭션을 위해 queryRunner 생성
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const user = await queryRunner.manager.findOne(User, {
        where: { user_id: userId },
      });
      const comment = await queryRunner.manager.findOne(Comment, {
        where: { comment_id: commentId },
        lock: { mode: 'pessimistic_write' },
      });

      if (!user || !comment) {
        throw new NotFoundException('User or Comment not found');
      }

      const like = await queryRunner.manager.findOne(Like, {
        where: { user, comment },
      });

      if (!like) {
        throw new NotFoundException('Like not found');
      }

      await queryRunner.manager.remove(like);

      // 좋아요 수 감소
      await queryRunner.manager.decrement(
        Comment,
        { comment_id: commentId },
        'likeCount',
        1,
      );

      await queryRunner.commitTransaction();
    } catch (error) {
      // 에러 발생 시 트랜잭션 롤백
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      // 트랜잭션 종료 후 queryRunner 해제
      await queryRunner.release();
    }
  }
}
