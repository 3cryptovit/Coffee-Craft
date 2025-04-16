import express from 'express';
import { PrismaClient } from '@prisma/client';
import { authenticateToken, requireRole } from '../middleware';
import { Role } from '@prisma/client';

const router = express.Router();
const prisma = new PrismaClient();

// Получение списка всех кофеен
router.get('/', async (req, res) => {
  try {
    const shops = await prisma.coffeeShop.findMany({
      include: {
        users: true,
        inventory: {
          include: {
            ingredient: true
          }
        }
      }
    });
    res.json(shops);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to get shops' });
  }
});

// Создание новой кофейни (только для админов)
router.post('/', authenticateToken, requireRole([Role.OWNER]), async (req, res) => {
  try {
    const { name, location } = req.body;

    const shop = await prisma.coffeeShop.create({
      data: {
        name,
        location,
        is_active: true
      }
    });

    // Создаем записи в инвентаре для всех ингредиентов
    const ingredients = await prisma.ingredient.findMany();
    for (const ingredient of ingredients) {
      await prisma.inventory.create({
        data: {
          shopId: shop.id,
          ingredientId: ingredient.id,
          in_stock: true,
          amount: 0
        }
      });
    }

    res.json(shop);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to create shop' });
  }
});

// Обновление информации о кофейне
router.put('/:id', authenticateToken, requireRole([Role.OWNER]), async (req, res) => {
  try {
    const { name, location, is_active } = req.body;

    const shop = await prisma.coffeeShop.update({
      where: { id: parseInt(req.params.id) },
      data: {
        name,
        location,
        is_active
      }
    });

    res.json(shop);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to update shop' });
  }
});

// Получение инвентаря кофейни
router.get('/:id/inventory', authenticateToken, async (req, res) => {
  try {
    const inventory = await prisma.inventory.findMany({
      where: { shopId: parseInt(req.params.id) },
      include: {
        ingredient: true
      }
    });

    res.json(inventory);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to get inventory' });
  }
});

// Обновление инвентаря
router.put('/:id/inventory/:ingredientId', authenticateToken, async (req, res) => {
  try {
    const { in_stock, amount } = req.body;

    const inventory = await prisma.inventory.findFirst({
      where: {
        shopId: parseInt(req.params.id),
        ingredientId: parseInt(req.params.ingredientId)
      }
    });

    if (!inventory) {
      return res.status(404).json({ error: 'Запись не найдена' });
    }

    const updatedInventory = await prisma.inventory.update({
      where: { id: inventory.id },
      data: {
        in_stock,
        amount
      },
      include: {
        ingredient: true
      }
    });

    res.json(updatedInventory);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to update inventory' });
  }
});

export default router; 