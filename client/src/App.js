import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import NavbarComponent from './components/Navbar';
import { Container } from 'react-bootstrap';
import { BrowserRouter, Routes, Route} from "react-router-dom";
import Cancel from './pages/Cancel';
import Store from './pages/Store';
import Success from './pages/Success';
import Product from './pages/Product';
import YourComponent from './pages/YourComponent';
import CartProvider from './CartContext';

function App() {
  return (
    <CartProvider>
      <Container>
          <NavbarComponent></NavbarComponent>
          <BrowserRouter>
          <Routes>
            <Route path='/' element={<Store />} />
            <Route path='/product' element={<Product />} />
            <Route path='/products' element={<YourComponent />} />
            <Route path="/success" element={<Success />} />
            <Route path="/cancel" element={<Cancel />} />
          </Routes>
          </BrowserRouter>
     </Container>
    </CartProvider>
    
  );
}

export default App;
