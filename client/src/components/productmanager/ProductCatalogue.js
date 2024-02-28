import React, { useEffect, useState } from 'react';
import ProductCardManager from './ProductCardManager';
import ProductEditor from './ProductEditor';

const ProductCatalogue = () => {
  const [products, setProducts] = useState([]);
  const [editingProductId, setEditingProductId] = useState(null);

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

  const handleEdit = (productId) => {
    setEditingProductId(productId);
  };

  const handleDelete = (deletedProductId) => {
    setProducts((prevProducts) => prevProducts.filter((product) => product.product_id !== deletedProductId));
  };

  return (
    <div>
      <h1 style={{ marginLeft: '120px' }}>View and edit my products</h1>
      <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center' }}>
        {products.map((product) => (
          <div key={product.product_id} style={{ width: '45%' }}>
            {editingProductId === product.product_id ? (
              <ProductEditor
                product={product}
                onSave={() => setEditingProductId(null)}
              />
            ) : (
              <ProductCardManager
                key={product.product_id}
                product={product}
                onEdit={handleEdit}
                onDelete={handleDelete}
                pricingOptions={product.pricingOptions} 
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductCatalogue;
