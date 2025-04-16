import { z } from 'zod';

export const CreateRecipeDto = z.object({
  name: z.string().min(1),
  cupId: z.number().int(),
  price: z.number().min(0),
  image_url: z.string().url().optional(),
  ingredients: z.array(z.object({
    ingredientId: z.number().int(),
    quantity: z.number().int().min(1)
  }))
});

export const UpdateRecipeDto = CreateRecipeDto.partial(); 