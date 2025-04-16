import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useOrder } from '../contexts/OrderContext';

const SelectSyrupScreen: React.FC = () => {
  const navigate = useNavigate();
  const { setSyrup } = useOrder();

  const syrups = [
    { id: 'none', name: 'Без сиропа', price: 0 },
    { id: 'vanilla', name: 'Ванильный сироп', price: 30 },
    { id: 'caramel', name: 'Карамельный сироп', price: 30 },
    { id: 'hazelnut', name: 'Фундучный сироп', price: 30 },
    { id: 'coconut', name: 'Кокосовый сироп', price: 30 },
  ];

  const handleSelect = (syrupId: string) => {
    setSyrup(syrupId);
    navigate('/select-topping');
  };

  return (
    <div className="container">
      <h1 className="text-center">Выберите сироп</h1>
      <div className="flex flex-col items-center gap-4 mt-4">
        {syrups.map((syrup) => (
          <button
            key={syrup.id}
            onClick={() => handleSelect(syrup.id)}
            className="w-full max-w-md p-4 bg-white rounded-lg shadow-md hover:shadow-lg"
          >
            <h2>{syrup.name}</h2>
            {syrup.price > 0 && <p>+{syrup.price} ₽</p>}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SelectSyrupScreen; 