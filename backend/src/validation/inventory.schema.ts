import { z } from 'zod';

export const UpdateInventoryDto = z.object({
  in_stock: z.boolean(),
  amount: z.number().int().min(0)
});

export const CheckInventoryDto = z.object({
  ingredientId: z.number().int(),
  quantity: z.number().int().min(1)
}); 