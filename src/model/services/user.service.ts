// src/services/userService.ts
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { UserRepository } from '../repositories/user.repository';
import { User } from '../entities/user.entity';

export class UserService {
  constructor(private readonly repository: UserRepository) {}

  async register(email: string, password: string) {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = User.create(email, hashedPassword);
    await this.repository.save(user);
    return user;
  }

  async authenticate(email: string, password: string) {
    const user = await this.repository.findByEmail(email);
    if (!user) throw new Error('Invalid email or password');

    const validPassword = await bcrypt.compare(password, user.props.password);
    if (!validPassword) throw new Error('Invalid email or password');

    const token = jwt.sign({ userId: user.props.id }, process.env.JWT_SECRET!, {
      expiresIn: '1h',
    });
    return { user, token };
  }
}
