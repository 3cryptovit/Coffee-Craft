import { z } from 'zod';
import { Role } from '@prisma/client';

export const registerSchema = z.object({
  username: z.string()
    .min(3, 'Имя пользователя должно содержать минимум 3 символа')
    .max(20, 'Имя пользователя не должно превышать 20 символов')
    .regex(/^[a-zA-Z0-9_]+$/, 'Имя пользователя может содержать только буквы, цифры и символ подчеркивания'),
  email: z.string()
    .email('Некорректный email')
    .max(100, 'Email не должен превышать 100 символов'),
  password: z.string()
    .min(6, 'Пароль должен содержать минимум 6 символов')
    .max(100, 'Пароль не должен превышать 100 символов')
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, 'Пароль должен содержать минимум одну заглавную букву, одну строчную букву и одну цифру'),
  role: z.nativeEnum(Role).optional(),
  shopId: z.number().optional()
});

export const loginSchema = z.object({
  username: z.string(),
  password: z.string()
});

export type LoginDto = z.infer<typeof loginSchema>; 