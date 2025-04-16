import { Router } from 'express';
import { PrismaClient } from '@prisma/client';

const router = Router();
const prisma = new PrismaClient();

// Создание тестовых чашек
router.post('/seed', async (req, res) => {
  try {
    await prisma.cup.createMany({
      data: [
        { label: 'Маленькая', volume_ml: 250, price_base: 100 },
        { label: 'Средняя', volume_ml: 350, price_base: 150 },
        { label: 'Большая', volume_ml: 450, price_base: 200 },
      ],
      skipDuplicates: true,
    });
    res.json({ message: 'Тестовые данные созданы' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to seed cups' });
  }
});

// Получение списка всех чашек
router.get('/', async (req, res) => {
  try {
    const cups = await prisma.cup.findMany();
    res.json(cups);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to get cups' });
  }
});

export default router; 