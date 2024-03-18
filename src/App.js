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
import OrderSuccessPage from './pages/OrderSuccessPage';
import HomePage from './pages/HomePage';
import ProductDetailsPage from './pages/ProductDetailsPage';
import SearchPage from './pages/SearchPage';
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
            <Route
              path="order/success/:orderNumber"
              element={<OrderSuccessPage />}
            />
          </Route>
          <Route element={<SlideLayout />}>
            <Route index element={<HomePage />} />
          </Route>
          <Route element={<FullLayout />}>
            <Route path="/goods/:productId" element={<ProductDetailsPage />} />
          </Route>
          <Route element={<WrapLayout />}>
            <Route path="search" element={<SearchPage />} />
            <Route path="cart" element={<CartPage />} />
            <Route path="order" element={<OrderPage />} />
          </Route>
        </Routes>
      </Container>
    </BrowserRouter>
  );
}
export default App;
