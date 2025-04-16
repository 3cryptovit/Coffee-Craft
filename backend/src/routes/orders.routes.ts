import { Router } from 'express';
import { PrismaClient } from '@prisma/client';
import { OrderController } from '../controllers/order.controller';
import { OrderService } from '../services/order.service';
import { checkAuth, checkRole } from '../middleware/auth';

const router = Router();
const prisma = new PrismaClient();
const orderService = new OrderService(prisma);
const orderController = new OrderController(orderService);

// Получить все заказы (только для barista и owner)
router.get('/', checkAuth, checkRole(['BARISTA', 'OWNER']), (req, res) =>
  orderController.getOrders(req, res)
);

// Получить заказы пользователя
router.get('/my', checkAuth, (req, res) =>
  orderController.getUserOrders(req, res)
);

// Создать новый заказ
router.post('/', (req, res) =>
  orderController.createOrder(req, res)
);

// Обновить статус заказа (только для barista и owner)
router.patch('/:id/status', checkAuth, checkRole(['BARISTA', 'OWNER']), (req, res) =>
  orderController.updateOrderStatus(req, res)
);

export default router; 