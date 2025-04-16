import { PrismaClient, Role } from '@prisma/client';
import { hash, compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import { RegisterDto } from '../types/auth';

export class AuthService {
  constructor(private prisma: PrismaClient) { }

  async register(data: RegisterDto) {
    const existingUser = await this.prisma.user.findFirst({
      where: {
        OR: [
          { username: data.username },
          { email: data.email }
        ]
      }
    });

    if (existingUser) {
      throw new Error('Пользователь с таким именем или email уже существует');
    }

    const hashedPassword = await hash(data.password, 10);

    const user = await this.prisma.user.create({
      data: {
        username: data.username,
        email: data.email,
        password: hashedPassword,
        role: data.role || Role.USER,
        shopId: data.shopId
      }
    });

    return {
      id: user.id,
      username: user.username,
      email: user.email,
      role: user.role,
      shopId: user.shopId
    };
  }

  async login(username: string, password: string) {
    const user = await this.prisma.user.findUnique({
      where: { username }
    });

    if (!user) {
      throw new Error('Неверное имя пользователя или пароль');
    }

    const isValidPassword = await compare(password, user.password);
    if (!isValidPassword) {
      throw new Error('Неверное имя пользователя или пароль');
    }

    const token = sign(
      {
        id: user.id,
        username: user.username,
        role: user.role,
        shopId: user.shopId
      },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '24h' }
    );

    return {
      token,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        role: user.role,
        shopId: user.shopId
      }
    };
  }
} 