import {Button, Navbar, Modal} from 'react-bootstrap'
import { useState, useContext } from 'react';
import { CartContext } from '../CartContext.js';
import CartProduct from './CartProduct';
import Message from './Message';

function NavbarComponent() {
    const cart = useContext(CartContext);

    // Handles the Contact Us!
    const [showModal1, setShowModal1] = useState(false);
    const handleCloseModal1 = () => setShowModal1(false);
    const handleShowModal1 = () => setShowModal1(true);

    // Handles the cart checkout
    const [showModal2, setShowModal2] = useState(false);
    const handleCloseModal2 = () => setShowModal2(false);
    const handleShowModal2 = () => setShowModal2(true);

    // Forwarding user to Stripe
    const checkout = async () => {
        await fetch('http://localhost:4000/api/checkout', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({items: cart.items})
        }).then((response) => {
            return response.json();
        }).then((response) => {
            if(response.url) {
                window.location.assign(response.url); 
            }
        })
    }

    // Calculates the total of your cart
    const productsCount = cart.items.reduce((sum, product) => sum + product.quantity, 0);

    return (
        <>
        <Navbar expand="sm">
            <Navbar.Brand href="/">Home</Navbar.Brand>
            <Navbar.Toggle />
            <Button onClick={handleShowModal1}>Contact Us</Button>
            <Navbar.Collapse className="justify-content-end">
                <Button onClick={handleShowModal2}>Cart ({productsCount}) Items</Button>
            </Navbar.Collapse>
        </Navbar>
        <Modal show={showModal1} onHide={handleCloseModal1}>
            <Modal.Header closeButton>
                <Modal.Title>Contact Us!</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Message />
            </Modal.Body>
        </Modal>
        <Modal show={showModal2} onHide={handleCloseModal2}>
            <Modal.Header closeButton>
                <Modal.Title>Shopping Cart</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {productsCount > 0 ?
                    <>
                        <p>Items in your cart</p>
                        {cart.items.map((currentProduct, idx) => (
                            <CartProduct key={idx} id={currentProduct.id} quantity={currentProduct.quantity}></CartProduct>
                        ))}

                        <h1>Total: {cart.getTotalCost().toFixed(2)}</h1>

                        <Button variant="success" onClick={checkout} >
                            Purchase items!
                        </Button>
                    </>
                :
                    <h1>There are no items in your cart!</h1>    
                }
            </Modal.Body>
        </Modal>
        </>
    )
}

export default NavbarComponent;