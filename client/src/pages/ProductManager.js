import React from 'react';
import ProductCreator from "../components/productmanager/ProductCreator";
import ProductCatalogue from "../components/productmanager/ProductCatalogue";

function ProductManager() {
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
