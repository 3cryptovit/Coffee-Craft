import { Router } from 'express';
import { PrismaClient } from '@prisma/client';
import { authenticateToken, requireRole } from '../middleware';
import { Role } from '@prisma/client';

const router = Router();
const prisma = new PrismaClient();

// Получить все ингредиенты
router.get('/', async (req, res) => {
  try {
    const { category } = req.query;

    const ingredients = await prisma.ingredient.findMany({
      where: category ? {
        category: {
          name: category as string
        }
      } : undefined,
      include: {
        category: true
      }
    });

    res.json(ingredients);
  } catch (error) {
    res.status(500).json({ error: 'Ошибка при получении ингредиентов' });
  }
});

// Включить/выключить ингредиент (только для barista и owner)
router.patch('/:id/toggle', authenticateToken, requireRole([Role.BARISTA, Role.OWNER]), async (req, res) => {
  try {
    const { id } = req.params;

    const ingredient = await prisma.ingredient.findUnique({
      where: { id: parseInt(id) }
    });

    if (!ingredient) {
      return res.status(404).json({ error: 'Ингредиент не найден' });
    }

    const updatedIngredient = await prisma.ingredient.update({
      where: { id: parseInt(id) },
      data: { available: !ingredient.available }
    });

    res.json(updatedIngredient);
  } catch (error) {
    res.status(500).json({ error: 'Ошибка при обновлении ингредиента' });
  }
});

export default router; 