import { Router } from 'express';
import { PrismaClient } from '@prisma/client';
import { authenticateToken, requireRole } from '../middleware';
import { Role } from '@prisma/client';
import { v4 as uuidv4 } from 'uuid';

const router = Router();
const prisma = new PrismaClient();

// Получить все заказы (только для barista и owner)
router.get('/', authenticateToken, requireRole([Role.BARISTA, Role.OWNER]), async (req, res) => {
  try {
    const orders = await prisma.order.findMany({
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
    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: 'Ошибка при получении заказов' });
  }
});

// Создать новый заказ
router.post('/', async (req, res) => {
  try {
    const { shopId, cupId, items } = req.body;

    // Рассчитываем общий объем и цену
    const cup = await prisma.cup.findUnique({
      where: { id: cupId }
    });

    if (!cup) {
      return res.status(400).json({ error: 'Чашка не найдена' });
    }

    const order = await prisma.order.create({
      data: {
        shopId,
        cupId,
        userId: 1, // Временное решение, пока нет авторизации пользователей
        total_volume: cup.volume_ml,
        total_price: cup.price_base,
        status: 'pending',
        qr_hash: uuidv4(),
        items: {
          create: items.map((item: any) => ({
            ingredientId: item.ingredientId,
            quantity: item.quantity,
            added_stage: item.addedStage,
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

    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({ error: 'Ошибка при создании заказа' });
  }
});

// Обновить статус заказа (только для barista и owner)
router.patch('/:id/status', authenticateToken, requireRole([Role.BARISTA, Role.OWNER]), async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const order = await prisma.order.update({
      where: { id: parseInt(id) },
      data: { status }
    });

    res.json(order);
  } catch (error) {
    res.status(500).json({ error: 'Ошибка при обновлении статуса заказа' });
  }
});

export default router; 