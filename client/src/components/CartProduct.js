import { Card, Button } from 'react-bootstrap';
import { CartContext } from '../CartContext.js';
import { useContext } from "react";
import { getProductData } from "../productsStore";

function CartProduct(props) {
    const cart = useContext(CartContext);
    const id = props.id;
    const quantity = props.quantity;
    const productData = getProductData(id);
    return (
        <>  
            <Card>
                <Card.Img src={process.env.PUBLIC_URL + '/photos/' + productData.pic}  style={{ width: 'auto', height: 'auto' }} />
            </Card>
            <h3>{productData.title}</h3>
            <p>{quantity} total</p>
            <p>£{ (quantity * productData.price).toFixed(2) }</p>
            <Button size="sm" onClick={() => cart.deleteFromCart(id)}>Remove</Button>
            <hr></hr>
        </>
    )
}

export default CartProduct;