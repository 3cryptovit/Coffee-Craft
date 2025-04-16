import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useOrder } from '../contexts/OrderContext';

const SelectMilkScreen: React.FC = () => {
  const navigate = useNavigate();
  const { setMilk } = useOrder();

  const milkTypes = [
    { id: 'regular', name: 'Обычное молоко', price: 0 },
    { id: 'soy', name: 'Соевое молоко', price: 30 },
    { id: 'almond', name: 'Миндальное молоко', price: 40 },
    { id: 'oat', name: 'Овсяное молоко', price: 35 },
  ];

  const handleSelect = (milkId: string) => {
    setMilk(milkId);
    navigate('/select-syrup');
  };

  return (
    <div className="container">
      <h1 className="text-center">Выберите тип молока</h1>
      <div className="flex flex-col items-center gap-4 mt-4">
        {milkTypes.map((milk) => (
          <button
            key={milk.id}
            onClick={() => handleSelect(milk.id)}
            className="w-full max-w-md p-4 bg-white rounded-lg shadow-md hover:shadow-lg"
          >
            <h2>{milk.name}</h2>
            {milk.price > 0 && <p>+{milk.price} ₽</p>}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SelectMilkScreen; 