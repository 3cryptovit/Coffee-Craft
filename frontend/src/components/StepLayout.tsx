import React from "react";
import Button from "./Button";

interface StepLayoutProps {
  title: string;
  children: React.ReactNode;
  onNext?: () => void;
  onBack?: () => void;
  nextButtonText?: string;
  backButtonText?: string;
  isNextDisabled?: boolean;
}

const StepLayout: React.FC<StepLayoutProps> = ({
  title,
  children,
  onNext,
  onBack,
  nextButtonText = "Далее",
  backButtonText = "Назад",
  isNextDisabled = false,
}) => {
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

      {/* Основной контент */}
      <div className="relative z-20 flex flex-col items-center justify-center min-h-screen px-6 text-white">
        {/* Шапка */}
        <header className="w-full flex justify-center items-center py-12">
          <h1 className="text-4xl md:text-5xl font-bold text-center text-white mb-6">
            {title}
          </h1>
        </header>

        {/* Контент с подложкой */}
        <main className="flex-1 flex flex-col items-center justify-center w-full max-w-screen-2xl">
          <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 w-full shadow-2xl">
            <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-8">
              {children}
            </div>
          </div>
        </main>

        {/* Навигация */}
        <div className="fixed bottom-10 left-0 right-0 flex justify-center gap-6 z-50">
          {onBack && (
            <Button
              onClick={onBack}
              className="bg-white/10 hover:bg-white/20 text-lg py-4 px-8 rounded-xl backdrop-blur-md transition-all duration-300"
            >
              {backButtonText}
            </Button>
          )}
          {onNext && (
            <Button
              onClick={onNext}
              disabled={isNextDisabled}
              className="bg-coffee-accent hover:bg-coffee-light text-coffee-dark text-lg py-4 px-8 rounded-xl transition-all duration-300"
            >
              {nextButtonText}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default StepLayout; 