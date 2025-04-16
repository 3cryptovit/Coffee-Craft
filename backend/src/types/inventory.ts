import { z } from 'zod';

export const updateInventorySchema = z.object({
  amount: z.number().min(0),
  in_stock: z.boolean()
});

export const checkInventorySchema = z.object({
  items: z.array(z.object({
    ingredientId: z.number(),
    quantity: z.number().min(1)
  }))
});

export type UpdateInventoryDto = z.infer<typeof updateInventorySchema>;
export type CheckInventoryDto = z.infer<typeof checkInventorySchema>; 