import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Container from './components/Container';
import {
  AuthLayout,
  FullLayout,
  SlideLayout,
  WrapLayout,
} from './components/Layout';
import LoginPage from './pages/LoginPage';
import ResisterPage from './pages/ResisterPage';
import HomePage from './pages/HomePage';
import ProductDetailsPage from './pages/ProductDetailsPage';
import CartPage from './pages/CartPage';
import OrderPage from './pages/OrderPage';
import './styles/reset.css';

function App() {
  return (
    <BrowserRouter>
      <Container>
        <Routes>
          <Route element={<AuthLayout />}>
            <Route path="login" element={<LoginPage />} />
            <Route path="register" element={<ResisterPage />} />
          </Route>
          <Route element={<SlideLayout />}>
            <Route index element={<HomePage />} />
          </Route>
          <Route element={<FullLayout />}>
            <Route path="/goods/:productId" element={<ProductDetailsPage />} />
          </Route>
          <Route element={<WrapLayout />}>
            <Route path="cart" element={<CartPage />} />
            <Route path="order" element={<OrderPage />} />
          </Route>
        </Routes>
      </Container>
    </BrowserRouter>
  );
}
export default App;
