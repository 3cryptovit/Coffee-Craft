import { Request, Response } from 'express';
import { AuthService } from '../services/auth.service';
import { validateRequest } from '../middleware/validation.middleware';
import { registerSchema, loginSchema } from '../validation/auth.schema';

export class AuthController {
  constructor(private authService: AuthService) { }

  register = [
    validateRequest(registerSchema),
    async (req: Request, res: Response) => {
      try {
        const user = await this.authService.register(req.body);
        res.status(201).json(user);
      } catch (error) {
        if (error instanceof Error) {
          res.status(400).json({ message: error.message });
        } else {
          res.status(500).json({ message: 'Ошибка при регистрации' });
        }
      }
    }
  ];

  login = [
    validateRequest(loginSchema),
    async (req: Request, res: Response) => {
      try {
        const { username, password } = req.body;
        const result = await this.authService.login(username, password);
        res.json(result);
      } catch (error) {
        if (error instanceof Error) {
          res.status(401).json({ message: error.message });
        } else {
          res.status(500).json({ message: 'Ошибка при авторизации' });
        }
      }
    }
  ];
} 