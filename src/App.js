import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import ResisterPage from './pages/ResisterPage';
import HomePage from './pages/HomePage';
import ProductDetailsPage from './pages/ProductDetailsPage';
import CartPage from './pages/CartPage';
import OrderPage from './pages/OrderPage';
import './styles/reset.css';
import AuthLayout from './components/Layout';

function App() {
  return (
    <BrowserRouter>
      {/* provider */}
      <Routes>
        <Route element={<AuthLayout />}>
          <Route path="login" element={<LoginPage />} />
          <Route path="register" element={<ResisterPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
export default App;
