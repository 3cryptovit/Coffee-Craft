import React from "react";
import clsx from "clsx";

interface ButtonProps {
  onClick?: () => void;
  children: React.ReactNode;
  className?: string;
  disabled?: boolean;
}

// Универсальная кнопка с дизайном (TailwindCSS classes)
const Button: React.FC<ButtonProps> = ({
  onClick,
  children,
  className = "",
  disabled = false
}) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={clsx(
        "px-10 py-5 text-2xl font-bold rounded-3xl shadow-2xl",
        "bg-amber-600 hover:bg-amber-700 focus:outline-none",
        "focus:ring-4 focus:ring-amber-500 focus:ring-offset-4",
        "transition-all duration-200 transform hover:scale-105",
        "disabled:opacity-50 disabled:cursor-not-allowed",
        className
      )}
    >
      {children}
    </button>
  );
};

export default Button;
