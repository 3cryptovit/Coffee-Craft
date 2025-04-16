/*
  Warnings:

  - A unique constraint covering the columns `[shopId,ingredientId]` on the table `Inventory` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `updated_at` to the `User` table without a default value. This is not possible if the table is not empty.
*/

-- CreateEnum
CREATE TYPE "OrderStatus" AS ENUM ('PENDING', 'IN_PROGRESS', 'READY', 'COMPLETED', 'CANCELLED');

-- CreateEnum
CREATE TYPE "IngredientStage" AS ENUM ('BASE', 'TOPPING', 'DECORATION');

-- AlterTable
ALTER TABLE "User" 
ADD COLUMN "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN "is_active" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN "last_login" TIMESTAMP(3),
ADD COLUMN "phone" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Inventory_shopId_ingredientId_key" ON "Inventory"("shopId", "ingredientId");
