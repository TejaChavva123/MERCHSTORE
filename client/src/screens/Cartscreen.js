import React, { useEffect } from 'react'
import { Link,useParams,useLocation,useNavigate} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, Container, ListGroup, Image, Form, Button, Card } from 'react-bootstrap'
import Message from '../components/Message'
import {AddToCart,RemoveFromCart} from '../actions/cartAction'
import PageTitle from '../components/PageTitle'
const Cartscreen = () => {
    const params = useParams();
    const p_id = params.id;
    const location = useLocation();
    const navigate = useNavigate();
    const qty = location.search ? Number(location.search.split('=')[1].split('?')[0]) : 1;
    const size = location.search ? location.search.split('=')[2] : '';
    const dispatch = useDispatch();
    const cart = useSelector(state=>state.cart);
    const {cartItems} = cart;

    useEffect(()=>{
        if (p_id){
            dispatch(AddToCart(p_id,qty,size));
        }
        navigate('/cart');
    },[dispatch,qty,p_id,size]);

    const removeFromCartHandler = (id)=>{
        dispatch(RemoveFromCart(id));
    }

    const checkoutHandler = () => {
       navigate('/login?redirect=shipping')
    }
  return (
    <div>
        <main className='my-5 cartscreen'>
      <Container>
        <PageTitle title="Cart Screen" />
      <Row className='justify-content-center'>
      <Col md={10} className='text-center'>
        <h1 className='text-center'>Shopping Cart</h1>
        {cartItems.length === 0 ? (
          <Message>
            Looks like Cart is empty.. Add New Products &nbsp; <br></br><Link className='btn btn-light my-2' to='/'>Go Back</Link>
          </Message>
        ) : (
          <ListGroup variant='flush'>
            {cartItems.map((item) => (
              <ListGroup.Item key={item.product}>
                <Row>
                  <Col md={2} className='my-3'>
                    <Image src={item.image} alt={item.name} fluid rounded />
                  </Col>
                  <Col md={3} className='my-3'>
                    <Link to={`/product/${item.product}`}>{item.name}</Link>
                  </Col>
                  <Col md={2} className='my-3'>₹ {item.price}</Col>
                  <Col md={2} className='my-3'>
                    <Form.Control as='select' value={item.qty} onChange={(e) =>
                        dispatch(
                          AddToCart(item.product, Number(e.target.value),item.size)
                        )
                      }
                    >
                      {[...Array(item.countInStock).keys()].map((x) => (
                        <option key={x + 1} value={x + 1}>
                          {x + 1}
                        </option>
                      ))}
                    </Form.Control>
                  </Col>
                  <Col md={2} className='my-3'>
                    <Form.Control as='select' value={item.size} onChange={(e) =>
                        dispatch(
                          AddToCart(item.product, item.qty,e.target.value)
                        )
                      }
                    >
                      {item.sizes?.map((x) => (
                        <option key={x} value={x}>
                          {x}
                        </option>
                      ))}
                    </Form.Control>
                  </Col>
                  <Col md={1} className='my-3'>
                    <Button type='button' variant='primary' onClick={() => removeFromCartHandler(item.product)}>
                      <i className='fas fa-trash'></i>
                    </Button>
                  </Col>
                </Row>
              </ListGroup.Item>
            ))}
          </ListGroup>
        )}
      </Col>
      </Row>
      <Row className='justify-content-center'>
      <Col md={4} className='my-5'>
        <Card>
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <h4 className="text-center">Subtotal items - ({cartItems.reduce((acc, item) => acc + item.qty, 0)}) </h4><br />
              <h4 className="text-center">₹ {cartItems.reduce((acc, item) => acc + item.qty * item.price, 0).toFixed(2)}</h4>
            </ListGroup.Item>
            <ListGroup.Item>
              <Button type='button' className='btn-block' disabled={cartItems.length === 0} onClick={checkoutHandler}>
                Proceed To Checkout
              </Button>
            </ListGroup.Item>
          </ListGroup>
        </Card>
      </Col>
    </Row>
      </Container>
    </main>
      
    </div>
  )
}

export default Cartscreen
