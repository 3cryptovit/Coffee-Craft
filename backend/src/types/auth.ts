import { z } from 'zod';
import { registerSchema, loginSchema } from '../validation/auth.schema';

export type RegisterDto = z.infer<typeof registerSchema>;
export type LoginDto = z.infer<typeof loginSchema>;

export interface AuthResponse {
  token: string;
  user: {
    id: number;
    username: string;
    email: string | null;
    role: string;
    shopId: number | null;
  };
}

export interface JwtPayload {
  userId: number;
  role: string;
} 