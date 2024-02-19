import React from 'react';
import { ModalProvider } from '../contexts/ModalProvider';
import { AuthProvider } from '../contexts/AuthProvider';
import { OrderItemProvider } from '../contexts/OrderItemProvider';

function Providers({ children }) {
  return (
    <ModalProvider>
      <AuthProvider>
        <OrderItemProvider>{children}</OrderItemProvider>
      </AuthProvider>
    </ModalProvider>
  );
}
function Container({ children }) {
  return <Providers>{children}</Providers>;
}

export default Container;
