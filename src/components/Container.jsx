import React from 'react';
import { ModalProvider } from '../contexts/ModalProvider';
import { AuthProvider } from '../contexts/AuthProvider';

function Providers({ children }) {
  return (
    <ModalProvider>
      <AuthProvider>{children}</AuthProvider>
    </ModalProvider>
  );
}
function Container({ children }) {
  return <Providers>{children}</Providers>;
}

export default Container;
