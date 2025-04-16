import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useOrder } from '../contexts/OrderContext';

const SelectCupScreen: React.FC = () => {
  const navigate = useNavigate();
  const { setCupSize } = useOrder();

  const cupSizes = [
    { id: 'small', name: 'Маленькая (200 мл)', price: 0 },
    { id: 'medium', name: 'Средняя (300 мл)', price: 20 },
    { id: 'large', name: 'Большая (400 мл)', price: 40 },
  ];

  const handleSelect = (cupSizeId: string) => {
    setCupSize(cupSizeId);
    navigate('/select-base');
  };

  return (
    <div className="container">
      <h1 className="text-center">Выберите размер чашки</h1>
      <div className="flex flex-col items-center gap-4 mt-4">
        {cupSizes.map((cup) => (
          <button
            key={cup.id}
            onClick={() => handleSelect(cup.id)}
            className="w-full max-w-md p-4 bg-white rounded-lg shadow-md hover:shadow-lg"
          >
            <h2>{cup.name}</h2>
            {cup.price > 0 && <p>+{cup.price} ₽</p>}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SelectCupScreen; 