import { Card, Button } from 'react-bootstrap';
import { CartContext } from '../CartContext';
import { useContext } from 'react';

function Cart(props) {
  const cart = useContext(CartContext);
  const { productData } = props;

  if (!productData) {
    return <p>Loading product data...</p>;
  }
  
  const price = parseFloat(productData.price);    
  const totalPrice = (productData.quantity * price).toFixed(2);
    
  if (isNaN(totalPrice)) {
    console.error('Total price is NaN. Quantity or price might be undefined or NaN.');
  }

  return (
    <>
      <Card>
        <Card.Img src={productData.image_url} style={{ width: 'auto', height: 'auto' }} />
        <Card.Body>
          <Card.Title>{productData.title}</Card.Title>
          <p>£{ (productData.quantity * productData.price).toFixed(2) }</p>
          <p>Qty: {productData.quantity}</p>
          <Button size="sm" onClick={() => cart.deleteFromCart(productData.product_id)}>
            Remove
          </Button>
        </Card.Body>
      </Card>
      <hr></hr>
    </>
  );
}

export default Cart;
