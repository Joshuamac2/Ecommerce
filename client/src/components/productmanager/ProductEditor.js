import React, { useState, useEffect } from 'react';
import { MDBCard, MDBCardBody, MDBCardImage, MDBCol } from 'mdb-react-ui-kit';
import './styles/ProductEditor.css';

function ProductEditor({ product, onSave }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [image_url, setImage_url] = useState('');
  const [available_quantity, setAvailable_quantity] = useState('');
  const [api_key, setApi_key] = useState('');
  const [warning, setWarning] = useState('');

  useEffect(() => {
    if (product) {
      setTitle(product.title || '');
      setDescription(product.description || '');
      setPrice(product.price || '');
      setImage_url(product.image_url || '');
      setAvailable_quantity(product.available_quantity || '');
      setApi_key(product.api_key || '');
    }
  }, [product]);

  const handleSave = () => {
    if (!api_key) {
      setWarning('Please enter an API Key');
      return;
    }

    const updatedProductInformation = {
      title,
      description,
      price,
      image_url,
      available_quantity,
      api_key,
    };

    fetch(`http://localhost:4000/api/products/${product.product_id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedProductInformation),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Success:', data);
        onSave(updatedProductInformation);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  return (
    <MDBCol md="4" lg="4" className="mb-5 ml-1 mr-5" style={{ marginBottom: "10px" }}>
      <MDBCard style={{ width: "25rem", height: "40rem", borderRadius: "15px", display: "flex", flexDirection: "column" }}>
        <MDBCardImage
          src={product.image_url}
          fluid
          className="w-100"
          style={{
            borderTopLeftRadius: "15px",
            borderTopRightRadius: "15px",
            height: "12rem",
          }}
        />
        <MDBCardBody style={{ display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
          <div style={{ flex: 1 }}>
          <div className="mb-3">
              <label htmlFor="image_url" className="form-label small-text">Image Url:</label>
              <input
                type="text"
                id="image_url"
                className="form-control small-text"
                value={image_url}
                onChange={(e) => setImage_url(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="title" className="form-label small-text">Title:</label>
              <input
                type="text"
                id="title"
                className="form-control small-text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="description" className="form-label small-text">Description:</label>
              <textarea
                id="description"
                className="form-control small-text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
          </div>
          <div className="d-flex justify-content-between">
            <div className="mb-3">
              <label htmlFor="price" className="form-label small-text">Price:</label>
              <input
                type="number"
                id="price"
                className="form-control small-text"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                inputMode="decimal"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="available_quantity" className="form-label small-text">Available Quantity:</label>
              <input
                type="number"
                id="available_quantity"
                className="form-control small-text"
                value={available_quantity}
                onChange={(e) => setAvailable_quantity(e.target.value)}
                inputMode="decimal"
              />
            </div>
          </div>
          <hr className="my-0" />
          <div className="d-flex justify-content-between align-items-center" style={{ marginTop: "10px" }}>
            <div className="mb-3" style={{ flex: 1 }}>
              <label htmlFor="title" className="form-label small-text">API Key:</label>
              {warning && <div className="warning">{warning}</div>}
              <input
                type="text"
                id="title"
                className="form-control small-text"
                value={api_key}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <button
              className="btn btn-dark"
              onClick={handleSave}
              style={{ fontSize: '0.7rem', padding: '0.2rem 1.1rem', height: '1.9rem', width: '9.5rem', marginLeft: '1rem', marginTop: '0.8rem' }}
            >
              💾 Save
            </button>
          </div>
        </MDBCardBody>
      </MDBCard>
    </MDBCol>
  );
}

export default ProductEditor;
