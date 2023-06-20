import React, { useEffect } from 'react'
import { Container, ListGroup } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Row,Col,Button,Card} from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import { addOrder } from '../actions/orderAction'
import { LIST_USER_ORDERS_RESET, ORDER_CREATE_RESET } from '../constants/orderConstants'
import PageTitle from '../components/PageTitle'

const Placeorderscreen = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const cart = useSelector(state=>state.cart);
    const {cartItems,Address,paymentMethod} = cart;
    cart.itemsPrice = cart.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0);

    const order_w = useSelector(state=>state.order);
    const {order,create} = order_w;

    useEffect(()=>{
        if (create){
            dispatch({type:LIST_USER_ORDERS_RESET})
            navigate(`/order/${order._id}`);
            dispatch({type:ORDER_CREATE_RESET})
        }
        if (!paymentMethod){
            navigate('/payment');
        }
    },[create,paymentMethod])
    const placeOrderHandler=()=>{
        const tobe_order={
            shippingAddress:Address,
            orderItems:cartItems,
            totalPrice:cart.itemsPrice,
            paymentMethod:paymentMethod
        }
        dispatch(addOrder(tobe_order));
    }
  return (
    <div>
        <main className='placeorderscreen my-5'>
            <Container>
                <Link className='btn btn-dark' to="/payment">
                        Go Back
                </Link>
                <PageTitle title="Place Order" />
                <Row>
                    <Col md={4}>
                        <ListGroup variant='flush'>
                            <ListGroup.Item className='my-3'>
                                <h1 className='text-center'>Shipping</h1>
                                <p><b>Address: </b><br></br>{Address.address}, {Address.city}, {Address.district} district, {Address.state}, {Address.country}, {Address.pincode}</p>
                            </ListGroup.Item>

                            <ListGroup.Item className='my-3'>
                                <h2 className='text-center'>Payment Method</h2>
                                <strong>Method: </strong>
                                {cart.paymentMethod}
                            </ListGroup.Item>

                        </ListGroup>
                    </Col>
                    <Col md={4}>
                        <Card>
                            <ListGroup variant='flush'>
                            <ListGroup.Item>
                              <h2 className='my-1 text-center'>Order Items</h2>
                            </ListGroup.Item>
                        
                        <ListGroup.Item className='text-center my-3'>
                            {cartItems.length === 0 ? (
                                        // <Message>Your cart is empty</Message>
                                <h1>Cart is Empty</h1>
                                ) : (
                                <ListGroup variant='flush'>
                                    {cartItems.map((item, index) => (
                                        <ListGroup.Item key={index}>
                                            <Row>
                                                <Col>
                                                <Link to={`/product/${item.product}`}>
                                                    {item.name}
                                                </Link>
                                                </Col>
                                                <Col xs={8} md={8}>
                                                {item.qty}x{item.price}Rs = {item.qty * item.price}Rs
                                                </Col>
                                            </Row>
                                        </ListGroup.Item>
                                        ))}
                                    </ListGroup>
                                    )}
                        </ListGroup.Item>
                        </ListGroup>
                        </Card>
                    </Col>
                    <Col md={4} >
                        <Card>
                            <ListGroup variant='flush'>
                            <ListGroup.Item>
                                <h2 className='text-center'>Order Summary</h2>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                <Col>Price</Col>
                                <Col>Rs. {cart.itemsPrice}</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                <Col>Delivery Charge</Col>
                                <Col>FREE</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Total</Col>
                                    <Col>Rs. {cart.itemsPrice}</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Button
                                type='button'
                                className='btn-block'
                                disabled={cart.cartItems === 0}
                                onClick={placeOrderHandler}
                                >
                                Place Order
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

export default Placeorderscreen
