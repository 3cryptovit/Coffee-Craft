import { Router } from 'express';
import { InventoryController } from '../controllers/inventory.controller';
import { InventoryService } from '../services/inventory.service';
import { PrismaClient } from '@prisma/client';
import { authenticateToken, requireRole } from '../middleware';
import { Role } from '@prisma/client';

const router = Router();
const prisma = new PrismaClient();
const inventoryService = new InventoryService(prisma);
const inventoryController = new InventoryController(inventoryService);

// Получить инвентарь
router.get('/',
  authenticateToken,
  requireRole([Role.BARISTA, Role.OWNER]),
  inventoryController.getInventory
);

// Обновить количество ингредиента
router.put('/:id',
  authenticateToken,
  requireRole([Role.BARISTA, Role.OWNER]),
  inventoryController.updateInventory
);

// Проверить наличие ингредиентов
router.post('/check',
  authenticateToken,
  requireRole([Role.BARISTA, Role.OWNER]),
  inventoryController.checkInventory
);

export default router; 