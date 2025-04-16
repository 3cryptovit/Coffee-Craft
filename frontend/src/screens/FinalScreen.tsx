import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useOrder } from '../contexts/OrderContext';

const FinalScreen: React.FC = () => {
  const navigate = useNavigate();
  const { order, resetOrder } = useOrder();

  const handleNewOrder = () => {
    resetOrder();
    navigate('/');
  };

  return (
    <div className="container">
      <h1 className="text-center">Ваш заказ готов!</h1>
      <div className="flex flex-col items-center gap-4 mt-4">
        <div className="w-full max-w-md p-4 bg-white rounded-lg shadow-md">
          <h2>Детали заказа:</h2>
          <p>Основа: {order.base}</p>
          <p>Молоко: {order.milk}</p>
          <p>Сироп: {order.syrup}</p>
          <p>Топпинг: {order.topping}</p>
          <p className="mt-4 font-bold">Итого: {order.totalPrice} ₽</p>
        </div>
        <button
          onClick={handleNewOrder}
          className="w-full max-w-md p-4 bg-blue-500 text-white rounded-lg shadow-md hover:shadow-lg"
        >
          Сделать новый заказ
        </button>
      </div>
    </div>
  );
};

export default FinalScreen; 