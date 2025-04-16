import React from "react";

interface ToppingLayerProps {
  type: string;          // тип топпинга (шоколад, корица и т.д.)
  color?: string;        // цвет топпинга
  viewBoxHeight?: number; // высота SVG в пикселях
}

const ToppingLayer: React.FC<ToppingLayerProps> = ({
  type,
  color = "#8B4513",        // коричневый по умолчанию
  viewBoxHeight = 150       // стандартная высота стакана
}) => {
  // Функция для генерации случайных точек для посыпки
  const generateDots = () => {
    const dots = [];
    const count = 20; // количество точек
    const radius = 2; // радиус точки

    for (let i = 0; i < count; i++) {
      const x = Math.random() * 90;
      const y = Math.random() * 20; // только верхняя часть стакана
      dots.push(
        <circle
          key={i}
          cx={x}
          cy={y}
          r={radius}
          fill={color}
        />
      );
    }
    return dots;
  };

  // Функция для генерации узора в зависимости от типа топпинга
  const generatePattern = () => {
    switch (type) {
      case "chocolate":
        return (
          <>
            {/* Шоколадная стружка */}
            {generateDots()}
            {/* Волнистые линии */}
            <path
              d="M0 10 C20 15, 70 5, 90 10"
              fill="none"
              stroke={color}
              strokeWidth="1"
            />
          </>
        );
      case "cinnamon":
        return (
          <>
            {/* Порошок корицы */}
            {generateDots()}
            {/* Спираль */}
            <path
              d="M45 5 A5 5 0 1 1 45 15"
              fill="none"
              stroke={color}
              strokeWidth="1"
            />
          </>
        );
      default:
        return generateDots();
    }
  };

  return (
    <svg
      width="100%"
      height="100%"
      viewBox={`0 0 90 ${viewBoxHeight}`}
      xmlns="http://www.w3.org/2000/svg"
      className="absolute inset-0 z-30"
    >
      {generatePattern()}
    </svg>
  );
};

export default ToppingLayer; 