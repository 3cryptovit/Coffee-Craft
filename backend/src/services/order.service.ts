import { PrismaClient } from '@prisma/client';
import { CreateOrderDto } from '../types/order';
import { generateOrderHash } from '../utils/qr';

export class OrderService {
  constructor(private prisma: PrismaClient) { }

  async createOrder(dto: CreateOrderDto) {
    return this.prisma.order.create({
      data: {
        userId: 1, // Временное решение, пока нет авторизации пользователей
        shopId: dto.shopId,
        cupId: dto.cupId,
        status: 'PENDING',
        qr_hash: generateOrderHash(),
        total_volume: 0, // TODO: Рассчитать на основе ингредиентов
        total_price: 0, // TODO: Рассчитать на основе ингредиентов
        items: {
          create: dto.items.map(item => ({
            ingredientId: item.ingredientId,
            recipeId: item.recipeId,
            quantity: item.quantity,
            added_stage: item.added_stage,
            temperature: item.temperature
          }))
        }
      },
      include: {
        items: {
          include: {
            ingredient: true
          }
        }
      }
    });
  }

  async getOrders(status?: string) {
    return this.prisma.order.findMany({
      where: status ? { status } : undefined,
      include: {
        items: {
          include: {
            ingredient: true
          }
        },
        user: true,
        shop: true
      }
    });
  }

  async getUserOrders(userId: number) {
    return this.prisma.order.findMany({
      where: { userId },
      include: {
        items: {
          include: {
            ingredient: true
          }
        },
        shop: true
      }
    });
  }

  async updateOrderStatus(id: number, status: string) {
    return this.prisma.order.update({
      where: { id },
      data: { status }
    });
  }
} 