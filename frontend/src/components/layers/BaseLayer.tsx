import React from "react";

interface BaseLayerProps {
  volume: number;        // объём слоя, мл
  maxVolume: number;     // общий объём стакана
  color?: string;        // цвет слоя
  viewBoxHeight?: number; // высота SVG в пикселях
}

const BaseLayer: React.FC<BaseLayerProps> = ({
  volume,
  maxVolume,
  color = "#5C4033",         // тёмно-коричневый по умолчанию
  viewBoxHeight = 150        // стандартная высота стакана
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
      className="absolute inset-0 z-0"
    >
      <rect
        x="0"
        y={y}
        width="90"
        height={height}
        fill={color}
        rx="4"
      />
    </svg>
  );
};

export default BaseLayer; 