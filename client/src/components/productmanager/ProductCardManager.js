import React, { useState } from 'react';
import ProductEditor from './ProductEditor';
import {
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
} from "mdb-react-ui-kit";

const ProductCardManager = ({ product, onEdit, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);

  const handleEdit = () => {
    setIsEditing(true);
    onEdit(product.product_id);
  };

  const handleDelete = async () => {
    const confirmDeletion = window.confirm('Are you sure you want to delete this product?');

    if (confirmDeletion) {
      try {

        const response = await fetch(`http://localhost:4000/api/products/${product.product_id}`, {
          method: 'DELETE',
        });

        if (response.ok) {
          onDelete(product.product_id); 
          console.log('Product deleted successfully');
        } else {
          console.error('Failed to delete product');
        }
      } catch (error) {
        console.error('Error deleting product:', error);
      }
    }
  };

  return (
    <MDBCol md="4" lg="4" className="mb-5 ml-1 mr-5" style={{ marginBottom: "10px" }}>
      {isEditing ? (
        <ProductEditor product={product} onSave={() => setIsEditing(false)} />
      ) : (
        <MDBCard style={{ width: "25rem", height: "40rem", borderRadius: "15px", display: "flex", flexDirection: "column" }}>
          <MDBCardImage
            src={product.image_url}
            fluid
            className="w-100"
            style={{
              borderTopLeftRadius: "15px",
              borderTopRightRadius: "15px",
              height: "20rem",
            }}
          />
          <MDBCardBody style={{ display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
            <div style={{ flex: 1 }}>
              <p>
                <p className="text-dark">
                  {product.title}
                </p>
              </p>
              <p className="small text-muted">{product.description}</p>
            </div>
            <div className="d-flex justify-content-between">
              <p>
                <p className="text-dark">
                  Price: £{product.price}
                </p>
              </p>
              <p className="text-dark">Available products: ({product.available_quantity})</p>
            </div>
            <hr className="my-0" />
            <div className="d-flex justify-content-between" style={{ marginTop: "10px" }}>
              <button
                type="button"
                className="btn btn-light"
                style={{ fontSize: '0.7rem', padding: '0.2rem 0.5rem' }}
                data-mdb-ripple-color="dark"
                onClick={handleDelete} 
              >
                🗑️ Remove
              </button>
              <button
                onClick={handleEdit}
                className="btn btn-dark"
                style={{ fontSize: '0.7rem', padding: '0.2rem 0.5rem' }}
                data-mdb-ripple-init
              >
                ✎ Edit
              </button>
            </div>
          </MDBCardBody>
        </MDBCard>
      )}
    </MDBCol>
  );
};

export default ProductCardManager;
