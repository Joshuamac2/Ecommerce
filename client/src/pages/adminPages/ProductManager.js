import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import ProductCreator from "../../components/productmanager/ProductCreator";
import ProductCatalogue from "../../components/productmanager/ProductCatalogue";

function ProductManager({ setAuth }) {
  const navigate = useNavigate();

  useEffect(() => {
    const isAuthenticated = checkAuthentication(); 

    if (!isAuthenticated) {
      setAuth(false);
      navigate("/adminlogin")
    }

    return () => {
    };
  }, [setAuth, navigate]);

  const checkAuthentication = () => {
    const token = localStorage.getItem('token');
    return !!token; 
  };

  return (
    <div>
      <div>
        <ProductCreator />
      </div>
      <div>
        <ProductCatalogue />
      </div>
    </div>
  );
}

export default ProductManager;