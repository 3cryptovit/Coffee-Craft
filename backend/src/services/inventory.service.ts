import { PrismaClient } from '@prisma/client';
import { CheckInventoryDto, UpdateInventoryDto } from '../types/inventory';

export class InventoryService {
  constructor(private prisma: PrismaClient) { }

  async getInventory(shopId: number) {
    return this.prisma.inventory.findMany({
      where: { shopId },
      include: {
        ingredient: true
      }
    });
  }

  async updateInventory(id: number, dto: UpdateInventoryDto) {
    return this.prisma.inventory.update({
      where: { id },
      data: {
        amount: dto.amount,
        in_stock: dto.in_stock
      },
      include: {
        ingredient: true
      }
    });
  }

  async checkInventory(shopId: number, dto: CheckInventoryDto) {
    const inventory = await this.prisma.inventory.findMany({
      where: {
        shopId,
        ingredientId: {
          in: dto.items.map(item => item.ingredientId)
        }
      },
      include: {
        ingredient: true
      }
    });

    const missingItems = dto.items.filter(item => {
      const inventoryItem = inventory.find(i => i.ingredientId === item.ingredientId);
      return !inventoryItem || inventoryItem.amount < item.quantity || !inventoryItem.in_stock;
    });

    return {
      hasAllItems: missingItems.length === 0,
      missingItems: missingItems.map(item => ({
        ingredientId: item.ingredientId,
        requiredQuantity: item.quantity,
        availableQuantity: inventory.find(i => i.ingredientId === item.ingredientId)?.amount || 0
      }))
    };
  }
} 