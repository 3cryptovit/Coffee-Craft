import { z } from 'zod';

export const recipeIngredientSchema = z.object({
  ingredientId: z.number(),
  quantity: z.number().min(1)
});

export const createRecipeSchema = z.object({
  name: z.string().min(1),
  cupId: z.number(),
  price: z.number().min(0),
  image_url: z.string().url().optional(),
  ingredients: z.array(recipeIngredientSchema)
});

export const updateRecipeSchema = createRecipeSchema.partial();

export type CreateRecipeDto = z.infer<typeof createRecipeSchema>;
export type UpdateRecipeDto = z.infer<typeof updateRecipeSchema>;
export type RecipeIngredientDto = z.infer<typeof recipeIngredientSchema>; 