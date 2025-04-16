import React from "react";

interface MilkLayerProps {
  volume: number;        // объём слоя, мл
  maxVolume: number;     // общий объём стакана
  color?: string;        // цвет молока
  foamColor?: string;    // цвет пены
  foamHeight?: number;   // высота пены в пикселях
  viewBoxHeight?: number; // высота SVG в пикселях
}

const MilkLayer: React.FC<MilkLayerProps> = ({
  volume,
  maxVolume,
  color = "#F5F5F5",        // белый по умолчанию
  foamColor = "#FFFFFF",    // белый для пены
  foamHeight = 20,          // высота пены
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
      className="absolute inset-0 z-10"
    >
      {/* Основной слой молока */}
      <rect
        x="0"
        y={y}
        width="90"
        height={height - foamHeight}
        fill={color}
        rx="4"
      />
      {/* Слой пены */}
      <rect
        x="0"
        y={y + height - foamHeight}
        width="90"
        height={foamHeight}
        fill={foamColor}
        rx="4"
      />
      {/* Волны пены */}
      <path
        d={`M0 ${y + height - foamHeight} 
            C20 ${y + height - foamHeight + 5}, 
            70 ${y + height - foamHeight - 5}, 
            90 ${y + height - foamHeight}`}
        fill="none"
        stroke={foamColor}
        strokeWidth="2"
      />
    </svg>
  );
};

export default MilkLayer; 