import React, { useEffect, useState } from 'react';

const YourComponent = () => {
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    try {
      const response = await fetch('http://localhost:4000/api/products');

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const productsData = await response.json();
      setProducts(productsData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div>
      <h1>Products</h1>
      <ul>
        {products.map((product) => (
          <li key={product.product_id}>{product.description}</li>
        ))}
      </ul>
    </div>
  );
};

export default YourComponent;
