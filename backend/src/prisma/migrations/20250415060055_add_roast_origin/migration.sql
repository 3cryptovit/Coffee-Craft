-- CreateEnum
CREATE TYPE "IngredientType" AS ENUM ('COFFEE', 'MILK', 'SYRUP', 'TOPPING', 'DECORATION');

-- AlterTable
ALTER TABLE "Ingredient" ADD COLUMN     "type" "IngredientType" NOT NULL DEFAULT 'COFFEE';

-- CreateTable
CREATE TABLE "RoastLevel" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "RoastLevel_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Origin" (
    "id" SERIAL NOT NULL,
    "country" TEXT NOT NULL,

    CONSTRAINT "Origin_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_IngredientRoasts" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_IngredientOrigins" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_IngredientRoasts_AB_unique" ON "_IngredientRoasts"("A", "B");

-- CreateIndex
CREATE INDEX "_IngredientRoasts_B_index" ON "_IngredientRoasts"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_IngredientOrigins_AB_unique" ON "_IngredientOrigins"("A", "B");

-- CreateIndex
CREATE INDEX "_IngredientOrigins_B_index" ON "_IngredientOrigins"("B");

-- AddForeignKey
ALTER TABLE "_IngredientRoasts" ADD CONSTRAINT "_IngredientRoasts_A_fkey" FOREIGN KEY ("A") REFERENCES "Ingredient"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_IngredientRoasts" ADD CONSTRAINT "_IngredientRoasts_B_fkey" FOREIGN KEY ("B") REFERENCES "RoastLevel"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_IngredientOrigins" ADD CONSTRAINT "_IngredientOrigins_A_fkey" FOREIGN KEY ("A") REFERENCES "Ingredient"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_IngredientOrigins" ADD CONSTRAINT "_IngredientOrigins_B_fkey" FOREIGN KEY ("B") REFERENCES "Origin"("id") ON DELETE CASCADE ON UPDATE CASCADE;
