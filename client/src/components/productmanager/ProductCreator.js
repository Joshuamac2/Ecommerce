import React, { useState } from 'react';
import './styles/ProductCreator.css';

function ProductCreator() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [image_url, setImage_url] = useState('');
  const [available_quantity, setAvailable_quantity] = useState('');
  const [api_key, setApi_key] = useState('');
  const [warning, setWarning] = useState('');

  const createProduct = async () => {

    if (!api_key) {
      setWarning('Please enter an API Key');
      return;
    }

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
      <div className="product-form">
        <div className="form-left">
          <div className="form-item">
            <label htmlFor="title" className="bold-title">Title:</label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="form-item">
            <label htmlFor="description" className="bold-title">Description:</label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
        </div>
        <div className="form-right">
          <div className="form-item">
            <label htmlFor="image_url" className="bold-title">Image URL:</label>
            <input
              type="text"
              id="image_url"
              value={image_url}
              onChange={(e) => setImage_url(e.target.value)}
            />
          </div>
          <div className="form-item-group">
            <div className="form-item">
              <label htmlFor="available_quantity" className="bold-title">Available Quantity:</label>
              <input
                type="number"
                id="available_quantity"
                value={available_quantity}
                onChange={(e) => setAvailable_quantity(e.target.value)}
                inputMode="decimal"
              />
            </div>
            <div className="form-item">
              <label htmlFor="price" className="bold-title">Price:</label>
              <input
                type="number"
                id="price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                inputMode="decimal"
              />
            </div>
          </div>
          <div className="form-item">
            <label htmlFor="api_key" className="bold-title">API Key:</label>
            {warning && <div className="warning">{warning}</div>}
            <input
              type="text"
              id="api_key"
              value={api_key}
              onChange={(e) => setApi_key(e.target.value)}
            />
          </div>
          <div className="button-container bold-title">
            <button onClick={createProduct}>Create product</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductCreator;