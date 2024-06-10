import { AuthController } from '@/controllers/auth.controller';
import { Router } from 'express';
import { UserRepositoryPrisma } from '@/model/repositories/user.repository';
import { UserService } from '@/model/services/user.service';
import { prisma } from '@/utils/prisma.util';

const router = Router();
const userRepository = new UserRepositoryPrisma(prisma);
const userService = new UserService(userRepository);
const authController = new AuthController(userService);

router.post('/register', authController.register);
router.post('/login', authController.login);

export { router as authRoutes };
