import { Request, Response } from 'express';
import { RecipeService } from '../services/recipe.service';
import { validateRequest } from '../middleware/validation.middleware';
import { CreateRecipeDto, UpdateRecipeDto } from '../validation/recipe.schema';

export class RecipeController {
  constructor(private recipeService: RecipeService) { }

  getRecipes = async (req: Request, res: Response) => {
    try {
      const recipes = await this.recipeService.getRecipes();
      res.json(recipes);
    } catch (error) {
      res.status(500).json({ message: 'Ошибка при получении рецептов' });
    }
  };

  getRecipeById = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const recipe = await this.recipeService.getRecipeById(Number(id));

      if (!recipe) {
        return res.status(404).json({ message: 'Рецепт не найден' });
      }

      res.json(recipe);
    } catch (error) {
      res.status(500).json({ message: 'Ошибка при получении рецепта' });
    }
  };

  createRecipe = [
    validateRequest(CreateRecipeDto),
    async (req: Request, res: Response) => {
      try {
        const dto = req.body;
        const recipe = await this.recipeService.createRecipe(dto);
        res.status(201).json(recipe);
      } catch (error) {
        res.status(500).json({ message: 'Ошибка при создании рецепта' });
      }
    }
  ];

  updateRecipe = [
    validateRequest(UpdateRecipeDto),
    async (req: Request, res: Response) => {
      try {
        const { id } = req.params;
        const dto = req.body;
        const recipe = await this.recipeService.updateRecipe(Number(id), dto);
        res.json(recipe);
      } catch (error) {
        res.status(500).json({ message: 'Ошибка при обновлении рецепта' });
      }
    }
  ];

  deleteRecipe = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      await this.recipeService.deleteRecipe(Number(id));
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ message: 'Ошибка при удалении рецепта' });
    }
  };
} 