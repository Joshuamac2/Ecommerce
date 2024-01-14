import { Card, Button, Form, Row, Col } from 'react-bootstrap';
import { CartContext } from '../../CartContext.js';
import { useContext, useState } from 'react';

function ProductShopCard(props) {
    const product = props.product;
    const cart = useContext(CartContext);
    const productQuantityInCart = cart.getProductQuantity(product.product_id);
    const availableQuantity = product.available_quantity;

    const [loading, setLoading] = useState(false);

    const handleAddToCart = async () => {
        if (!loading) {
            setLoading(true);
            await cart.addOneToCart(product.product_id);
            setLoading(false);
        }
    };

    const isButtonDisabled = productQuantityInCart >= availableQuantity;

    return (
        <Card>
            <Card.Body>
                <Card.Img src={product.image_url} />
                <Card.Title>{product.title}</Card.Title>
                <Card.Text>{product.price}</Card.Text>
                <Card.Text>Available quantity ({availableQuantity})</Card.Text>
                {productQuantityInCart > 0 ? (
                    <>
                        <Form as={Row}>
                            <Form.Label column="true" sm="6">
                                In Cart: {productQuantityInCart}
                            </Form.Label>
                            <Col sm="6">
                                <Button
                                    sm="6"
                                    onClick={() => cart.addOneToCart(product.product_id)}
                                    className="mx-2"
                                    disabled={isButtonDisabled}
                                >
                                    +
                                </Button>
                                <Button
                                    sm="6"
                                    onClick={() => cart.removeOneFromCart(product.product_id)}
                                    className="mx-2"
                                >
                                    -
                                </Button>
                            </Col>
                        </Form>
                        <Button
                            variant="danger"
                            onClick={() => cart.deleteFromCart(product.product_id)}
                            className="my-2"
                        >
                            Remove from cart
                        </Button>
                    </>
                ) : (
                    <Button
                        variant="primary"
                        onClick={handleAddToCart}
                        disabled={isButtonDisabled}
                    >
                        {isButtonDisabled ? 'Out of Stock' : (loading ? 'Adding...' : 'Add To Cart')}
                    </Button>
                )}
            </Card.Body>
        </Card>
    );
}

export default ProductShopCard;
