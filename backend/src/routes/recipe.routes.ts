import { Router } from 'express';
import { RecipeController } from '../controllers/recipe.controller';
import { RecipeService } from '../services/recipe.service';
import { PrismaClient } from '@prisma/client';
import { authenticateToken, requireRole } from '../middleware';
import { Role } from '@prisma/client';

const router = Router();
const prisma = new PrismaClient();
const recipeService = new RecipeService(prisma);
const recipeController = new RecipeController(recipeService);

// Получить все рецепты
router.get('/', recipeController.getRecipes);

// Получить рецепт по ID
router.get('/:id', recipeController.getRecipeById);

// Создать рецепт
router.post('/',
  authenticateToken,
  requireRole([Role.BARISTA, Role.OWNER]),
  recipeController.createRecipe
);

// Обновить рецепт
router.put('/:id',
  authenticateToken,
  requireRole([Role.BARISTA, Role.OWNER]),
  recipeController.updateRecipe
);

// Удалить рецепт
router.delete('/:id',
  authenticateToken,
  requireRole([Role.BARISTA, Role.OWNER]),
  recipeController.deleteRecipe
);

export default router; 