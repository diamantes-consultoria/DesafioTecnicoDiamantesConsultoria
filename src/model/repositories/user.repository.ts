import { PrismaClient } from '@prisma/client';
import { User } from '../entities/user.entity';

export interface UserRepository {
  save(user: User): Promise<void>;
  findByEmail(email: string): Promise<User | null>;
}

export class UserRepositoryPrisma implements UserRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async save(user: User): Promise<void> {
    const aUser = await this.prisma.user.findUnique({
      where: { email: user.props.email },
    });
    if (aUser) {
      throw new Error('User already exists.');
    }

    await this.prisma.user.create({
      data: {
        id: user.props.id,
        email: user.props.email,
        password: user.props.password,
      },
    });
  }

  async findByEmail(email: string): Promise<User | null> {
    const aUser = await this.prisma.user.findUnique({ where: { email } });
    if (!aUser) return null;
    return User.with(aUser.id, aUser.email, aUser.password);
  }
}
