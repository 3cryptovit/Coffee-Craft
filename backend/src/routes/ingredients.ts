import express from 'express';
import { PrismaClient } from '@prisma/client';

const router = express.Router();
const prisma = new PrismaClient();

// Получение списка всех ингредиентов
router.get('/', async (req, res) => {
  try {
    const ingredients = await prisma.ingredient.findMany({
      include: {
        category: true
      },
      orderBy: {
        category: {
          orderIndex: 'asc'
        }
      }
    });
    res.json(ingredients);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to get ingredients' });
  }
});

// Получение списка категорий
router.get('/categories', async (req, res) => {
  try {
    const categories = await prisma.ingredientCategory.findMany({
      include: {
        ingredients: true
      },
      orderBy: {
        orderIndex: 'asc'
      }
    });
    res.json(categories);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to get categories' });
  }
});

// Создание нового ингредиента
router.post('/', async (req, res) => {
  try {
    const {
      name,
      categoryId,
      sub_category,
      volume_ml,
      price,
      available,
      image_url,
      max_units
    } = req.body;

    const ingredient = await prisma.ingredient.create({
      data: {
        name,
        categoryId,
        sub_category,
        volume_ml,
        price,
        available,
        image_url,
        max_units
      }
    });

    // Создаем запись в инвентаре для всех кофеен
    const shops = await prisma.coffeeShop.findMany();
    for (const shop of shops) {
      await prisma.inventory.create({
        data: {
          shopId: shop.id,
          ingredientId: ingredient.id,
          in_stock: true,
          amount: 0
        }
      });
    }

    res.json(ingredient);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to create ingredient' });
  }
});

// Обновление ингредиента
router.put('/:id', async (req, res) => {
  try {
    const {
      name,
      categoryId,
      sub_category,
      volume_ml,
      price,
      available,
      image_url,
      max_units
    } = req.body;

    const ingredient = await prisma.ingredient.update({
      where: { id: parseInt(req.params.id) },
      data: {
        name,
        categoryId,
        sub_category,
        volume_ml,
        price,
        available,
        image_url,
        max_units
      }
    });

    res.json(ingredient);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to update ingredient' });
  }
});

// Удаление ингредиента
router.delete('/:id', async (req, res) => {
  try {
    // Удаляем связанные записи в инвентаре
    await prisma.inventory.deleteMany({
      where: { ingredientId: parseInt(req.params.id) }
    });

    // Удаляем ингредиент
    await prisma.ingredient.delete({
      where: { id: parseInt(req.params.id) }
    });

    res.json({ message: 'Ingredient deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to delete ingredient' });
  }
});

// Получение всех степеней обжарки
router.get('/roast-levels', async (req, res) => {
  try {
    const roastLevels = await prisma.roastLevel.findMany();
    res.json(roastLevels);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to get roast levels' });
  }
});

// Создание новой степени обжарки
router.post('/roast-levels', async (req, res) => {
  try {
    const { name } = req.body;
    const roastLevel = await prisma.roastLevel.create({
      data: { name }
    });
    res.json(roastLevel);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to create roast level' });
  }
});

// Получение всех стран происхождения
router.get('/origins', async (req, res) => {
  try {
    const origins = await prisma.origin.findMany();
    res.json(origins);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to get origins' });
  }
});

// Создание новой страны происхождения
router.post('/origins', async (req, res) => {
  try {
    const { country } = req.body;
    const origin = await prisma.origin.create({
      data: { country }
    });
    res.json(origin);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to create origin' });
  }
});

export default router;