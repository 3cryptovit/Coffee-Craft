import React from "react";
import { useOrderStore } from "../store/orderStore";
import { motion } from "framer-motion";

// Компонент для визуализации итогового напитка в стакане с послойным отображением
const Cup: React.FC = () => {
  const { selectedCup, selectedBase, selectedMilk, selectedSyrup, selectedTopping } =
    useOrderStore();

  if (!selectedCup) return null;

  // Пути к изображениям слоёв стакана и ингредиентов
  const cupImage = `/assets/cups/cup_${selectedCup.id}.png`;          // изображение самого стакана
  const baseLayerImage = "/assets/layers/base_layer.png";             // слой основы (кофе/шоколад)
  const milkLayerImage = "/assets/layers/milk_layer.png";             // слой молока/пенки
  const syrupLayerImage = "/assets/layers/syrup_layer.png";           // слой сиропа (узор/сироп)
  const toppingLayerImage = "/assets/layers/topping_layer.png";       // слой топпинга (посыпка/украшение)

  // Динамический размер стакана в зависимости от объема
  const cupSize = {
    width: Math.min(480, 320 + (selectedCup.volume_ml - 250) * 0.4),
    height: Math.min(720, 480 + (selectedCup.volume_ml - 250) * 0.6)
  };

  return (
    <motion.div
      className="relative mx-auto"
      style={{ width: cupSize.width, height: cupSize.height }}
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Стакан (контур/основа) */}
      <img
        src={cupImage}
        alt="Cup"
        className="absolute inset-0 w-full h-full object-contain drop-shadow-2xl"
      />
      {/* Слой основы напитка */}
      {selectedBase && (
        <img
          src={baseLayerImage}
          alt="Base layer"
          className="absolute inset-0 w-full h-full object-contain"
        />
      )}
      {/* Слой молока/пенки */}
      {selectedMilk && (
        <img
          src={milkLayerImage}
          alt="Milk layer"
          className="absolute inset-0 w-full h-full object-contain"
        />
      )}
      {/* Слой сиропа */}
      {selectedSyrup && (
        <img
          src={syrupLayerImage}
          alt="Syrup layer"
          className="absolute inset-0 w-full h-full object-contain"
        />
      )}
      {/* Слой топпинга */}
      {selectedTopping && (
        <img
          src={toppingLayerImage}
          alt="Topping layer"
          className="absolute inset-0 w-full h-full object-contain"
        />
      )}
    </motion.div>
  );
};

export default Cup;
