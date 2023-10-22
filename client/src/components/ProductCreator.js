import React, { useState } from 'react';
import './styles/ProductCreator.css';


function ProductCreator() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [image_url, setImage_url] = useState('');
  const [available_quantity, setAvailable_quantity] = useState('');
  const [api_key, setApi_key] = useState('');

  const createProduct = async () => {
    const productInformation = {
      title,
      description,
      price,
      image_url,
      available_quantity,
      api_key,
    };

    try {
      const response = await fetch('http://localhost:4000/api/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(productInformation),
      });

      if (response.ok) {
        console.log('Product added successfully');
        setTitle('');
        setDescription('');
        setPrice('');
        setImage_url('');
        setAvailable_quantity('');
        setApi_key('');
      } else {
        console.error('Failed to add the product');
      }
    } catch (error) {
      console.error('Error adding product:', error);
    }
  };

  return (
    <div> 
      <h1 className="title-header">Create new product</h1>
      <div class="product-form">
        <div class="form-item">
          <label for="title">Title:</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div class="form-item">
          <label for="description">Description:</label>
          <input
            type="text"
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div class="form-item">
          <label for="price">Price:</label>
          <input
            type="number"
            id="price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            inputMode="decimal"
          />
        </div>
        <div class="form-item">
          <label for="image_url">Url link:</label>
          <input
            type="text"
            id="image_url"
            value={image_url}
            onChange={(e) => setImage_url(e.target.value)}
          />
        </div>
        <div class="form-item">
          <label for="available_quantity">Total Available Products:</label>
          <input
            type="number"
            id="available_quantity"
            value={available_quantity}
            onChange={(e) => setAvailable_quantity(e.target.value)}
            inputMode="decimal"
          />
        </div>
        <div class="form-item">
          <label for="api_key">API Key:</label>
          <input
            type="text"
            id="api_key"
            value={api_key}
            onChange={(e) => setApi_key(e.target.value)}
          />
        </div>
        <button onClick={createProduct}>Create product</button>
      </div>
    </div>
  );
}

export default ProductCreator;