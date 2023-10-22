import React from 'react';
import './stylesPages/ProductManager.css';
import ProductCatalogue from "../components/ProductCatalogue";
import ProductCreator from "../components/ProductCreator";

function ProductManager() {
  return (
    <div className="test-container">
      <div className="left-content">
        <ProductCreator />
      </div>
      <div className="right-content">
        <ProductCatalogue />
      </div>
    </div>
  );
}

export default ProductManager;
