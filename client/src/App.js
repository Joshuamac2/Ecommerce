import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container } from 'react-bootstrap';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import NavbarComponent from './components/Navbar';
import Cancel from './pages/Cancel';
import Success from './pages/Success';
import Store from './pages/Store';
import { CartProvider } from './CartContext'; 
import ProductManager from './pages/adminPages/ProductManager';
import AdminDashboard from './pages/adminPages/AdminDashboard';
import AdminLogin from './pages/adminPages/AdminLogin';
import AdminRegister from './pages/adminPages/AdminRegister';
import AdminRegisterConfirmation from './pages/adminPages/AdminRegisterConfirmation'
import UserManager from './pages/adminPages/UserManager';
import ForgottenPassword from './pages/adminPages/passwordRecovery/ForgottenPassword'
import OTPInput from './pages/adminPages/passwordRecovery/OTPInput';
import Reset from './pages/adminPages/passwordRecovery/Reset';

import { createContext } from "react";
export const RecoveryContext = createContext();

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const [page, setPage] = useState("login");
  const [email, setEmail] = useState("");
  const [otp, setOTP] = useState("");


  const setAuth = (boolean) => {
    setIsAuthenticated(boolean);
  }

  async function isAuth() {
    try {

      const token = localStorage.token;

      if (!token) {
        setIsAuthenticated(false);
        return;
      }

      const response = await fetch("http://localhost:4000/api/auth/verify", {
        method: "GET",
        headers: {
          jwt_token: localStorage.token,
          "Content-Type": "application/json",
        }
      });

      const parseRes = await response.json()

      parseRes === true ? setIsAuthenticated(true) : setIsAuthenticated(false)
    } catch (err) {
      console.error(err.message);
    }
  }

  useEffect(() => {
    const checkAuth = async () => {
      await isAuth();
    };

    checkAuth();
  }, []); 

  return (
    <CartProvider>
      <RecoveryContext.Provider
      value={{ page, setPage, otp, setOTP, setEmail, email }}>
      <Container>
        <NavbarComponent />
        <ToastContainer />
        <BrowserRouter>
          <Routes>
            <Route 
              path='/' 
              element={<Store />} />
            <Route 
              path="/success" 
              element={<Success />} />
            <Route 
              path="/cancel" 
              element={<Cancel />} />
            <Route
              path="/adminlogin"
              element={!isAuthenticated ? <AdminLogin setAuth={setAuth} /> : <Navigate to="/admindashboard" />}
            />
            <Route
              path="/forgottenpassword"
              element={<ForgottenPassword/>}
            />
            <Route
              path="/otp"
              element={<OTPInput/>}
            />
            <Route
              path="/reset-password"
              element={<Reset/>}
            />
            <Route
              path="/adminregister"
              element={!isAuthenticated ? <AdminRegister setAuth={setAuth} /> : <Navigate to="/admindashboard" />}
            />
            <Route 
              path='/adminregistrationconfirmation' 
              element={<AdminRegisterConfirmation />} />
            <Route
              path="/admindashboard"
              element={isAuthenticated ? <AdminDashboard setAuth={setAuth} /> : <Navigate to="/adminlogin" />}
            />
            <Route
              path="/productmanager"
              element={<ProductManager setAuth={setAuth} />}
              />
            <Route
              path="/usermanager"
              element={<UserManager setAuth={setAuth} />}
              />
          </Routes>
        </BrowserRouter>
      </Container>
      </RecoveryContext.Provider>
    </CartProvider>
  );
}

export default App;