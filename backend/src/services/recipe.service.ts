import { PrismaClient } from '@prisma/client';
import { CreateRecipeDto, UpdateRecipeDto } from '../types/recipe';

export class RecipeService {
  constructor(private prisma: PrismaClient) { }

  async getRecipes() {
    return this.prisma.recipe.findMany({
      include: {
        cup: true,
        ingredients: {
          include: {
            ingredient: true
          }
        }
      }
    });
  }

  async getRecipeById(id: number) {
    return this.prisma.recipe.findUnique({
      where: { id },
      include: {
        cup: true,
        ingredients: {
          include: {
            ingredient: true
          }
        }
      }
    });
  }

  async createRecipe(dto: CreateRecipeDto) {
    return this.prisma.recipe.create({
      data: {
        name: dto.name,
        cupId: dto.cupId,
        price: dto.price,
        image_url: dto.image_url,
        ingredients: {
          create: dto.ingredients.map(ingredient => ({
            ingredientId: ingredient.ingredientId,
            quantity: ingredient.quantity
          }))
        }
      },
      include: {
        cup: true,
        ingredients: {
          include: {
            ingredient: true
          }
        }
      }
    });
  }

  async updateRecipe(id: number, dto: UpdateRecipeDto) {
    return this.prisma.recipe.update({
      where: { id },
      data: {
        name: dto.name,
        cupId: dto.cupId,
        price: dto.price,
        image_url: dto.image_url,
        ingredients: dto.ingredients ? {
          deleteMany: {},
          create: dto.ingredients.map(ingredient => ({
            ingredientId: ingredient.ingredientId,
            quantity: ingredient.quantity
          }))
        } : undefined
      },
      include: {
        cup: true,
        ingredients: {
          include: {
            ingredient: true
          }
        }
      }
    });
  }

  async deleteRecipe(id: number) {
    return this.prisma.recipe.delete({
      where: { id }
    });
  }
} 