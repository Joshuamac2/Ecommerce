import { Card, Button, Form, Row, Col } from 'react-bootstrap';
import { CartContext } from '../../CartContext.js';
import { useContext } from 'react';

function ProductShopCard(props) {
    const product = props.product;
    const cart = useContext(CartContext);
    const productQuantity = cart.getProductQuantity(product.product_id);

    return (
        <Card>
            <Card.Body>
            <Card.Img src={product.image_url} />
                <Card.Title>{product.title}</Card.Title>
                <Card.Text>{product.price}</Card.Text>
                { productQuantity > 0 ?
                    <>
                        <Form as={Row}>
                            <Form.Label column="true" sm="6">In Cart: {productQuantity}</Form.Label>
                            <Col sm="6">
                                <Button sm="6" onClick={() => cart.addOneToCart(product.product_id, product)} className="mx-2">+</Button>
                                <Button sm="6" onClick={() => cart.removeOneFromCart(product.product_id)} className="mx-2">-</Button>
                            </Col>
                        </Form>
                        <Button variant="danger" onClick={() => cart.deleteFromCart(product.product_id)} className="my-2">Remove from cart</Button>
                    </>
                    :
                    <Button variant="primary" onClick={() => cart.addOneToCart(product.product_id)}>Add To Cart</Button>
                }
            </Card.Body>
        </Card>
    )
}

export default ProductShopCard;