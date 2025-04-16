import React from "react";
import { Ingredient } from "../types/order";
import { motion } from "framer-motion";
import clsx from "clsx";

interface IngredientCardProps {
  ingredient: Ingredient | null;
  title?: string;
  onSelect: () => void;
  isSelected?: boolean;
}

// Карточка для отображения ингредиента (название + доп. информация)
const IngredientCard: React.FC<IngredientCardProps> = ({
  ingredient,
  title,
  onSelect,
  isSelected = false,
}) => {
  // Если передан объект ingredient, используем его имя; иначе используем title (для опции "без ...")
  const displayName = ingredient ? ingredient.name : title || "";

  return (
    <motion.div
      onClick={onSelect}
      className={clsx(
        "cursor-pointer w-[220px] h-[220px]",
        "bg-black/40 backdrop-blur-md p-8 rounded-3xl",
        "flex flex-col items-center justify-center",
        "hover:bg-black/50 transition-all duration-200",
        "shadow-2xl hover:shadow-3xl",
        isSelected && "ring-4 ring-amber-500",
        "transform hover:scale-105"
      )}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <span className="text-2xl font-bold text-center">
        {displayName}
      </span>
      {/* При необходимости можно отобразить подзаголовок (например, обжарка/происхождение) */}
      {ingredient && ingredient.sub_category && (
        <span className="text-xl opacity-90 mt-3 text-center">
          {ingredient.sub_category}
        </span>
      )}
    </motion.div>
  );
};

export default IngredientCard;
