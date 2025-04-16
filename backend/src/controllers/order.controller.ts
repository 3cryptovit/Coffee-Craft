import { Request, Response } from 'express';
import { OrderService } from '../services/order.service';
import { createOrderSchema } from '../types/order';

export class OrderController {
  constructor(private orderService: OrderService) {}

  async createOrder(req: Request, res: Response) {
    try {
      const validatedData = createOrderSchema.parse(req.body);
      const order = await this.orderService.createOrder(validatedData);
      res.status(201).json(order);
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({ error: error.message });
      } else {
        res.status(500).json({ error: 'Ошибка при создании заказа' });
      }
    }
  }

  async getOrders(req: Request, res: Response) {
    try {
      const { status } = req.query;
      const orders = await this.orderService.getOrders(status as string);
      res.json(orders);
    } catch (error) {
      res.status(500).json({ error: 'Ошибка при получении заказов' });
    }
  }

  async getUserOrders(req: Request, res: Response) {
    try {
      const userId = req.user?.userId;
      if (!userId) {
        return res.status(401).json({ error: 'Требуется авторизация' });
      }
      const orders = await this.orderService.getUserOrders(userId);
      res.json(orders);
    } catch (error) {
      res.status(500).json({ error: 'Ошибка при получении заказов' });
    }
  }

  async updateOrderStatus(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { status } = req.body;
      const order = await this.orderService.updateOrderStatus(parseInt(id), status);
      res.json(order);
    } catch (error) {
      res.status(500).json({ error: 'Ошибка при обновлении статуса заказа' });
    }
  }
} 