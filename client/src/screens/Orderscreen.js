import React, { useEffect } from 'react'
import { Container, ListGroup } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Row,Col,Button,Card} from 'react-bootstrap'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { getorderDetails } from '../actions/orderAction'
import Message from '../components/Message'
import { createPayment } from '../actions/paymentAction'
import { orderPaid } from '../actions/paymentAction'
import { ORDER_PAYMENT_RESET } from '../constants/paymentConstants'
import { LIST_USER_ORDERS_RESET } from '../constants/orderConstants'

const Orderscreen = () => {
    const {id} = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const order_Details = useSelector(state=>state.orderDetails);
    const {order,loading,error} = order_Details;

    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin

    const payment = useSelector(state=>state.payment);
    const {orderId} = payment;
    const paymentUpdate = useSelector(state=>state.paymentUpdate);
    const {pay} = paymentUpdate;
    let paymentResult='';
    const openRazorpayCheckout = () => {
        const options = {
          key: 'rzp_test_U3EJ2zehEFP9lE',
          amount: order.totalPrice*100, 
          currency: 'INR', 
          name: 'MERCH STORE',
          description: 'BUYING SOME MERCHANDISE',
          order_id: orderId,
          handler: function (response) {
            paymentResult=response;
            if (paymentResult){
                console.log(paymentResult)
                dispatch(orderPaid(id,paymentResult));
                paymentResult=''
            }
          },
          prefill: {
            name: userInfo.firstName,
            email: userInfo.email,
          },
          theme: {
            color: '#F37254',
          },
        };
        const razorpayCheckout = new window.Razorpay(options);
        razorpayCheckout.open();
    };

    const paymentHandler = ()=>{
        if (orderId){
            openRazorpayCheckout();
        }
    }
    useEffect(()=>{
        if (!userInfo){
            navigate('/login');
        }
        if (!order||order._id!==id||pay){
            dispatch({type:ORDER_PAYMENT_RESET})
            dispatch(getorderDetails(id));
        }
        else{
            if (!order.isPaid){
                dispatch(createPayment(id));
            }
            else if (order.isPaid){
                dispatch({type:LIST_USER_ORDERS_RESET})
            }
        }
    },[dispatch,order,id,pay])
  return (
    <div>
        <main className='placeorderscreen my-3'>
            <Container>
                <Row>
                    <Col md={4}>
                        <ListGroup variant='flush'>
                            <ListGroup.Item className='my-1'>
                                <h1 className='text-center'>Shipping</h1>
                                <p>
                                   Name: {order.user.firstName} {order.user.lastName} <br> 
                                    </br>Email: {order.user.email}
                                </p>
                                
                                <p><b>Address: </b><br></br>{order.shippingAddress.address}, {order.shippingAddress.city}, {order.shippingAddress.district} district, {order.shippingAddress.state}, {order.shippingAddress.country}, {order.shippingAddress.pincode}</p>
                                {
                                    order.isDelivered ?
                                    <Message variant="success">Delivered</Message> :
                                    <Message variant="danger">Not Delivered</Message>
                                }
                            </ListGroup.Item>

                            <ListGroup.Item className='my-1'>
                                <h2 className='text-center'>Payment Method</h2>
                                <strong>Method: </strong>
                                {order.paymentMethod}
                                {
                                    order.isPaid ?
                                    <Message variant="success">Paid on {order.paidAt}</Message> :
                                    <Message variant="danger">Not Paid Yet</Message>
                                }
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
                            {order.orderItems.length === 0 ? (
                                        // <Message>Your cart is empty</Message>
                                <h1>Cart is Empty</h1>
                                ) : (
                                <ListGroup variant='flush'>
                                    {order.orderItems.map((item, index) => (
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
                        <ListGroup>
                                {
                                    !order.isPaid ?
                                <ListGroup.Item>
                                    <Button  type='button'
                                className='btn-block' onClick={paymentHandler}>Pay the Amount</Button>
                                </ListGroup.Item> : <Button type="button" className='btn-block'>Thank You for purchasing</Button>
                                }
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
                                <Col>Rs. {order.totalPrice}</Col>
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
                                    <Col>Rs. {order.totalPrice}</Col>
                                </Row>
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

export default Orderscreen
