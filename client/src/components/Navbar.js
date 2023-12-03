import { Button, Navbar, Nav, Modal } from 'react-bootstrap';
import React, { useEffect, useState, useContext } from 'react';
import { CartContext } from '../CartContext.js';
import Cart from './Cart';
import Message from './message/Message';
import './styles/Navbar.css';
import { PiShoppingCartSimpleBold } from "react-icons/pi";

function NavbarComponent() {
  const cart = useContext(CartContext);

  const [showModal1, setShowModal1] = useState(false);
  const handleCloseModal1 = () => setShowModal1(false);
  const handleShowModal1 = () => setShowModal1(true);

  const [showModal2, setShowModal2] = useState(false);
  const handleCloseModal2 = () => setShowModal2(false);
  const handleShowModal2 = () => setShowModal2(true);

  const [totalCost, setTotalCost] = useState(null);

  const checkout = async () => {
    await fetch('http://localhost:4000/api/checkout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ items: cart.items }),
    })
      .then((response) => response.json())
      .then((response) => {
        if (response.url) {
          window.location.assign(response.url);
        }
      });
  }

  const productsCount = cart.items.reduce((sum, product) => sum + product.quantity, 0);

  useEffect(() => {
    const calculateTotalCost = () => {
      cart.getTotalCost().then(cost => {
        setTotalCost(cost);
      });
    };

    calculateTotalCost();
  }, [cart, cart.items, cart.getTotalCost]);

  console.log('Products in Cart:', cart.items);
  console.log('Products Count:', productsCount);

  return (
      <div>
      <h1 style={{ fontSize: '2rem', marginBottom: '5px', textAlign: 'center' }}>Company Name.</h1>
      <Navbar expand="sm" className="mb-0">
        <Nav style={{ fontSize: '1.2rem' }} className="mx-auto nav-container">
          <Nav.Link href="/">Home</Nav.Link>
          <Nav.Link href="/productmanager">Product Manager</Nav.Link>
          <Nav.Link onClick={handleShowModal1}>Contact Us</Nav.Link>    
        </Nav>
        <Nav.Link onClick={handleShowModal2} className="basket-link">
          <PiShoppingCartSimpleBold size={30} />
          <span className="basket-count">{productsCount}</span>
        </Nav.Link>
      </Navbar>
      <div className="line"></div>
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
          {productsCount > 0 ? (
            <>
              <p>Items in your cart</p>
              {cart.items.map((currentProduct) => (
                <Cart
                  key={currentProduct.product_id}
                  productData={currentProduct}
                />
              ))}
              {cart.getTotalCost() !== null ? (
                <>
                  <h1>Sub-Total: {parseFloat(totalCost).toFixed(2)}</h1>
                  <Button variant="success" onClick={checkout}>
                    Purchase items!
                  </Button>
                </>
              ) : (
                <p>Loading total cost...</p>
              )}
            </>
          ) : (
            <h1>There are no items in your cart!</h1>
          )}
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default NavbarComponent;