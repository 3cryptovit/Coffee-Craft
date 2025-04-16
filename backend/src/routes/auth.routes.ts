import { Router } from 'express';
import { PrismaClient } from '@prisma/client';
import { AuthController } from '../controllers/auth.controller';
import { AuthService } from '../services/auth.service';

const router = Router();
const prisma = new PrismaClient();
const authService = new AuthService(prisma);
const authController = new AuthController(authService);

// Регистрация
router.post('/register', authController.register);

// Авторизация
router.post('/login', authController.login);

export default router; 