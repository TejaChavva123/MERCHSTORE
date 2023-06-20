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
    const qty = location.search ? Number(location.search.split('=')[1]) : 1;
    const dispatch = useDispatch();
    const cart = useSelector(state=>state.cart);
    const {cartItems} = cart;

    useEffect(()=>{
        if (p_id){
            dispatch(AddToCart(p_id,qty));
        }
        navigate('/cart');
    },[dispatch,qty,p_id]);

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
      <Row>
      <Col md={8} className='text-center'>
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
                  <Col md={2}>
                    <Image src={item.image} alt={item.name} fluid rounded />
                  </Col>
                  <Col md={3}>
                    <Link to={`/product/${item.product}`}>{item.name}</Link>
                  </Col>
                  <Col md={2}>₹ {item.price}</Col>
                  <Col md={2}>
                    <Form.Control as='select' value={item.qty} onChange={(e) =>
                        dispatch(
                          AddToCart(item.product, Number(e.target.value))
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
                  <Col md={2}>
                    <Button type='button' variant='light' onClick={() => removeFromCartHandler(item.product)}>
                      <i className='fas fa-trash'></i>
                    </Button>
                  </Col>
                </Row>
              </ListGroup.Item>
            ))}
          </ListGroup>
        )}
      </Col>
      <Col md={4}>
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
