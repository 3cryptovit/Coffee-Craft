import { Request, Response } from 'express';
import { InventoryService } from '../services/inventory.service';
import { validateRequest } from '../middleware/validation.middleware';
import { CheckInventoryDto, UpdateInventoryDto } from '../validation/inventory.schema';

export class InventoryController {
  constructor(private inventoryService: InventoryService) { }

  getInventory = async (req: Request, res: Response) => {
    try {
      const shopId = req.user?.shopId;
      if (!shopId) {
        return res.status(400).json({ message: 'Кофейня не определена' });
      }

      const inventory = await this.inventoryService.getInventory(shopId);
      res.json(inventory);
    } catch (error) {
      res.status(500).json({ message: 'Ошибка при получении инвентаря' });
    }
  };

  updateInventory = [
    validateRequest(UpdateInventoryDto),
    async (req: Request, res: Response) => {
      try {
        const { id } = req.params;
        const dto = req.body;
        const updatedInventory = await this.inventoryService.updateInventory(Number(id), dto);
        res.json(updatedInventory);
      } catch (error) {
        res.status(500).json({ message: 'Ошибка при обновлении инвентаря' });
      }
    }
  ];

  checkInventory = [
    validateRequest(CheckInventoryDto),
    async (req: Request, res: Response) => {
      try {
        const shopId = req.user?.shopId;
        if (!shopId) {
          return res.status(400).json({ message: 'Кофейня не определена' });
        }

        const dto = req.body;
        const result = await this.inventoryService.checkInventory(shopId, dto);
        res.json(result);
      } catch (error) {
        res.status(500).json({ message: 'Ошибка при проверке инвентаря' });
      }
    }
  ];
} 