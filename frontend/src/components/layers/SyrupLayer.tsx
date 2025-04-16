import React from "react";

interface SyrupLayerProps {
  volume: number;        // объём слоя, мл
  maxVolume: number;     // общий объём стакана
  color?: string;        // цвет сиропа
  opacity?: number;      // прозрачность слоя
  viewBoxHeight?: number; // высота SVG в пикселях
}

const SyrupLayer: React.FC<SyrupLayerProps> = ({
  volume,
  maxVolume,
  color = "#FF69B4",        // розовый по умолчанию
  opacity = 0.5,            // полупрозрачный
  viewBoxHeight = 150       // стандартная высота стакана
}) => {
  const ratio = volume / maxVolume;
  const height = ratio * viewBoxHeight;
  const y = viewBoxHeight - height;

  return (
    <svg
      width="100%"
      height="100%"
      viewBox={`0 0 90 ${viewBoxHeight}`}
      xmlns="http://www.w3.org/2000/svg"
      className="absolute inset-0 z-20"
    >
      {/* Основной слой сиропа */}
      <rect
        x="0"
        y={y}
        width="90"
        height={height}
        fill={color}
        fillOpacity={opacity}
        rx="4"
      />
      {/* Узор сиропа */}
      <path
        d={`M0 ${y + height / 2} 
            C20 ${y + height / 2 + 10}, 
            70 ${y + height / 2 - 10}, 
            90 ${y + height / 2}`}
        fill="none"
        stroke={color}
        strokeWidth="1"
        strokeOpacity={opacity}
      />
    </svg>
  );
};

export default SyrupLayer; 