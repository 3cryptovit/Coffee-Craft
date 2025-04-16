import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useOrder } from '../contexts/OrderContext';

const SelectBaseScreen: React.FC = () => {
  const navigate = useNavigate();
  const { setBase } = useOrder();

  const bases = [
    { id: 'espresso', name: 'Эспрессо', price: 100 },
    { id: 'americano', name: 'Американо', price: 120 },
    { id: 'cappuccino', name: 'Капучино', price: 150 },
    { id: 'latte', name: 'Латте', price: 160 },
  ];

  const handleSelect = (baseId: string) => {
    setBase(baseId);
    navigate('/select-milk');
  };

  return (
    <div className="container">
      <h1 className="text-center">Выберите основу для кофе</h1>
      <div className="flex flex-col items-center gap-4 mt-4">
        {bases.map((base) => (
          <button
            key={base.id}
            onClick={() => handleSelect(base.id)}
            className="w-full max-w-md p-4 bg-white rounded-lg shadow-md hover:shadow-lg"
          >
            <h2>{base.name}</h2>
            <p>{base.price} ₽</p>
          </button>
        ))}
      </div>
    </div>
  );
};

export default SelectBaseScreen; 