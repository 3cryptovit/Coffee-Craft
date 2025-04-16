import React, { createContext, useContext, useState } from 'react';

interface Order {
  base?: string;
  milk?: string;
  syrup?: string;
  topping?: string;
  totalPrice?: number;
}

interface OrderContextType {
  order: Order;
  setOrder: (order: Order) => void;
  resetOrder: () => void;
}

const OrderContext = createContext<OrderContextType | undefined>(undefined);

export const OrderProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [order, setOrder] = useState<Order>({});

  const resetOrder = () => {
    setOrder({});
  };

  return (
    <OrderContext.Provider value={{ order, setOrder, resetOrder }}>
      {children}
    </OrderContext.Provider>
  );
};

export const useOrder = () => {
  const context = useContext(OrderContext);
  if (!context) {
    throw new Error('useOrder must be used within an OrderProvider');
  }
  return context;
}; 