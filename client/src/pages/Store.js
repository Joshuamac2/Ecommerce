import React, { useEffect, useState } from 'react';
import { Row, Col } from 'react-bootstrap';
import ProductCardShop from '../components/productmanager/ProductCardShop';

function Store() {
  const [productsArray, setProductsArray] = useState([]); 

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:4000/api/products');

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const productsData = await response.json();
        setProductsArray(productsData); 
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchProducts(); 
  }, []);

  return (
    <>
      <h1 align="center" className="p-3">
        Welcome to the store!
      </h1>
      <Row xs={1} md={3} className="g-4">
        {productsArray.map((product, idx) => (
          <Col align="center" key={idx}>
            <ProductCardShop product={product} />
          </Col>
        ))}
      </Row>
    </>
  );
}

export default Store;