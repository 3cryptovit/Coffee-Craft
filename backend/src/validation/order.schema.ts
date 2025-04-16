import { z } from 'zod';

export const orderItemSchema = z.object({
  ingredientId: z.number(),
  recipeId: z.number().optional(),
  quantity: z.number().min(1),
  added_stage: z.string(),
  temperature: z.string()
});

export const createOrderSchema = z.object({
  cupId: z.number(),
  items: z.array(orderItemSchema)
});

export type CreateOrderDto = z.infer<typeof createOrderSchema>;
export type OrderItemDto = z.infer<typeof orderItemSchema>; 