import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useOrder } from '../contexts/OrderContext';

const SelectToppingScreen: React.FC = () => {
  const navigate = useNavigate();
  const { setTopping } = useOrder();

  const toppings = [
    { id: 'none', name: 'Без топпинга', price: 0 },
    { id: 'whipped_cream', name: 'Взбитые сливки', price: 40 },
    { id: 'chocolate', name: 'Шоколадная крошка', price: 30 },
    { id: 'cinnamon', name: 'Корица', price: 20 },
    { id: 'cocoa', name: 'Какао', price: 20 },
  ];

  const handleSelect = (toppingId: string) => {
    setTopping(toppingId);
    navigate('/final');
  };

  return (
    <div className="container">
      <h1 className="text-center">Выберите топпинг</h1>
      <div className="flex flex-col items-center gap-4 mt-4">
        {toppings.map((topping) => (
          <button
            key={topping.id}
            onClick={() => handleSelect(topping.id)}
            className="w-full max-w-md p-4 bg-white rounded-lg shadow-md hover:shadow-lg"
          >
            <h2>{topping.name}</h2>
            {topping.price > 0 && <p>+{topping.price} ₽</p>}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SelectToppingScreen; 