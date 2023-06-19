import React from 'react';
import {Navbar,Nav,Container, NavDropdown} from 'react-bootstrap';
import {LinkContainer} from 'react-router-bootstrap';
import {useDispatch,useSelector} from 'react-redux';
import { userLogout } from '../actions/userAction';
import { useLocation,useNavigate} from 'react-router-dom';

const Header = () => {
    const dispatch = useDispatch();
    const userlogin = useSelector(state=>state.userLogin);
    const {userInfo} = userlogin;
    const location = useLocation();
    const navigate = useNavigate();
    const redirect = location.search ? location.search.split("=")[1] : '/'
    const logoutHandler = ()=>{
      dispatch(userLogout())
      navigate(redirect);
    }
    return (
        <>
            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                <Container>
                    <LinkContainer to="/">
                      <Navbar.Brand>MERCHSTORE</Navbar.Brand>
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
                            {
                              userInfo ? 
                              (<NavDropdown title={userInfo.firstName} id='username'>
                                <LinkContainer to='profile'>
                                  <NavDropdown.Item>Profile</NavDropdown.Item>
                                </LinkContainer>
                                <NavDropdown.Item onClick={logoutHandler}>Log Out</NavDropdown.Item>
                              </NavDropdown>)
                              
                              
                             :
                              (<LinkContainer to="/login">
                              <Nav.Link><i className='fas fa-user'></i> &nbsp;Sign In</Nav.Link>
                            </LinkContainer>)
                              
                            }
                            {
                              userInfo && userInfo.isAdmin &&
                              (<NavDropdown title="Admin" id='admin'>
                                <LinkContainer to="/admin/userlist">
                                  <NavDropdown.Item>Users</NavDropdown.Item>
                                </LinkContainer>
                                <LinkContainer to="/admin/productlist">
                                  <NavDropdown.Item>Products</NavDropdown.Item>
                                </LinkContainer>
                                <LinkContainer to="/admin/orderlist">
                                  <NavDropdown.Item>Orders</NavDropdown.Item>
                                </LinkContainer>
                              </NavDropdown>)

                            }
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    );
};

export default Header;
