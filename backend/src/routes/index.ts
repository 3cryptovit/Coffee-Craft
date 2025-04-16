import { Router } from 'express';
import authRoutes from './auth.routes';
import ingredientRoutes from './ingredients.routes';
import orderRoutes from './order.routes';
import recipeRoutes from './recipe.routes';
import shopRoutes from './shops';
import inventoryRoutes from './inventory.routes';

const router = Router();

router.use('/auth', authRoutes);
router.use('/ingredients', ingredientRoutes);
router.use('/orders', orderRoutes);
router.use('/recipes', recipeRoutes);
router.use('/shops', shopRoutes);
router.use('/inventory', inventoryRoutes);

export default router; 