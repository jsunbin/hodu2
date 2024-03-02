import { createContext, useContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

const OrderContext = createContext({
  orders: [],
  totalItemPrice: 0,
  totalShippingFee: 0,
  totalPrice: 0,
  setOrderItems: (nextItems) => {},
});

export function OrderItemProvider({ children }) {
  const [values, setValues] = useState({
    orders: [],
    totalItemPrice: 0,
    totalShippingFee: 0,
    totalPrice: 0,
  });
  const location = useLocation();

  function getOrderInfo() {
    const localOrderItems = localStorage.getItem('orderItems');
    const localQuantity = localStorage.getItem('quantity');
    const localTotalItemPrice = localStorage.getItem('totalItemPrice');
    const localTotalShippingFee = localStorage.getItem('totalShippingFee');
    const localTotalPrice = localStorage.getItem('totalPrice');

    if (location.pathname === '/order') {
      setValues({
        orders: JSON.parse(localOrderItems) || [],
        quantity: Number(localQuantity) || 0,
        totalItemPrice: Number(localTotalItemPrice) || 0,
        totalShippingFee: Number(localTotalShippingFee) || 0,
        totalPrice: Number(localTotalPrice) || 0,
      });
    }
  }

  function setOrderItems(nextItems) {
    setValues(nextItems);

    // 결제할 아이템 금액 계산
    let nextTotalPrice = 0;
    let nextQuantity = 0;
    let nextTotalItemPrice = 0;
    let nextTotalShippingFee = 0;

    for (const item of nextItems) {
      const itemTotal = item.amount * item.price + item.shippingFee;
      nextTotalPrice += itemTotal;
      nextQuantity += item.amount;
      nextTotalItemPrice += item.amount * item.price;
      nextTotalShippingFee += item.shippingFee;
    }

    localStorage.setItem('orderItems', JSON.stringify(nextItems));
    localStorage.setItem('quantity', nextQuantity.toString());
    localStorage.setItem('totalItemPrice', nextTotalItemPrice.toString());
    localStorage.setItem('totalShippingFee', nextTotalShippingFee.toString());
    localStorage.setItem('totalPrice', nextTotalPrice.toString());
  }

  useEffect(() => {
    getOrderInfo();
  }, [location, values.totalPrice]);

  return (
    <OrderContext.Provider
      value={{
        orders: values.orders,
        quantity: values.quantity,
        totalItemPrice: values.totalItemPrice,
        totalShippingFee: values.totalShippingFee,
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
