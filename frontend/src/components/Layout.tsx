import React from "react";

interface LayoutProps {
  children: React.ReactNode;
}

// Общий компонент макета с размытым фоном кофе
const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="relative min-h-screen w-full overflow-hidden font-sans">
      {/* Фоновое изображение */}
      <img
        src="/bg-coffee.jpg"
        alt="Background"
        className="absolute inset-0 w-full h-full object-cover z-0"
      />

      {/* Затемнение + размытие */}
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm z-10" />

      {/* Контент */}
      <div className="relative z-20 flex flex-col items-center justify-center min-h-screen px-6 text-white">
        {children}
      </div>
    </div>
  );
};

export default Layout;
