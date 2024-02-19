import { createContext, useContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

const OrderContext = createContext({
  orders: [],
  totalPrice: 0,
  setOrderItems: (nextItems) => {},
});

export function OrderItemProvider({ children }) {
  const [values, setValues] = useState({ orders: [], totalPrice: 0 });
  const location = useLocation();

  function getOrderInfo() {
    const localOrderItems = localStorage.getItem('orderItems');
    const localTotalPrice = localStorage.getItem('totalPrice');

    if (location.pathname === '/order') {
      setValues({
        orders: JSON.parse(localOrderItems) || [],
        totalPrice: Number(localTotalPrice) || 0,
      });
    }
  }

  function setOrderItems(nextItems) {
    console.log('nextItem', nextItems);
    setValues(nextItems);

    // 총 주문금액 계산
    let nextTotalPrice = 0;

    for (const item of nextItems) {
      const itemTotal = item.amount * item.price + item.shippingFee;
      nextTotalPrice += itemTotal;
    }

    localStorage.setItem('orderItems', JSON.stringify(nextItems));
    localStorage.setItem('totalPrice', nextTotalPrice.toString());
  }

  useEffect(() => {
    getOrderInfo();
  }, [location, values.totalPrice]);

  return (
    <OrderContext.Provider
      value={{
        orders: values.orders,
        totalPrice: values.totalPrice,
        setOrderItems: setOrderItems,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
}

export function useOrder() {
  const context = useContext(OrderContext);

  if (!context) {
    throw new Error('반드시 ModalProvider 안에서 사용해야 합니다.');
  }

  return context;
}
