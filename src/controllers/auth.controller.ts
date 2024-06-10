// src/controllers/authController.ts
import { Request, Response } from 'express';
import { UserService } from '../model/services/user.service';

export class AuthController {
  constructor(private readonly userService: UserService) {}

  register = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    try {
      const user = await this.userService.register(email, password);
      res.status(201).json(user);
    } catch (error) {
      res.status(400).json({ error: 'register error' });
    }
  };

  login = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    try {
      const { user, token } = await this.userService.authenticate(
        email,
        password,
      );
      res.status(200).json({ user, token });
    } catch (error) {
      res.status(400).json({ error: 'login error' });
    }
  };
}
