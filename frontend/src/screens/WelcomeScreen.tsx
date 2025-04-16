import React from 'react';
import { useNavigate } from 'react-router-dom';

const WelcomeScreen: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="container">
      <h1 className="text-center">Добро пожаловать в CoffeeCraft!</h1>
      <p className="text-center mt-4">Создайте свой идеальный кофе</p>
      <div className="flex justify-center mt-8">
        <button
          onClick={() => navigate('/select-cup')}
          className="px-8 py-4 bg-blue-500 text-white rounded-lg shadow-md hover:shadow-lg"
        >
          Начать заказ
        </button>
      </div>
    </div>
  );
};

export default WelcomeScreen; 