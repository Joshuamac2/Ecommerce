import React, { useEffect, useState } from 'react';
import './styles/ProductCatalogue.css'; 

const ProductCatalogue = () => {
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

    <div className="product-container">
  <h1 className="product-header">Product Catalogue</h1>
  <ul className="product-list">
    {products.map((product) => (
      <li key={product.product_id} className="product-item">
        <img className="product-image" src={product.image_url} alt={product.title} />
        <div className="product-details">
          <h3>{product.title}</h3>
          <p className="product-description">{product.description}</p>
          <p className="product-price">Price: £{product.price} | Available products: ({product.available_quantity})</p>
        </div>
      </li>
    ))}
  </ul>
</div>

  );
};

export default ProductCatalogue;
