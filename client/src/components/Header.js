import React from 'react';
import {Navbar,Nav,Container} from 'react-bootstrap';
import {LinkContainer} from 'react-router-bootstrap';

const Header = () => {
    return (
        <>
            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                <Container>
                    <LinkContainer to="/">
                      <Navbar.Brand>MERCHSHOP</Navbar.Brand>
                    </LinkContainer>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav>
                            <LinkContainer to="/Products">
                              <Nav.Link>Products</Nav.Link>
                            </LinkContainer>
                        </Nav>
                        <Nav className="ml-auto">
                            <LinkContainer  to="/cart">
                              <Nav.Link><i className='fas fa-shopping-cart'></i> &nbsp;Cart</Nav.Link>
                            </LinkContainer>
                            <LinkContainer to="/login">
                              <Nav.Link><i className='fas fa-user'></i> &nbsp;Sign In</Nav.Link>
                            </LinkContainer>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    );
};

export default Header;
