import React, { useEffect } from 'react'
import {Container,Form,Row,Button,Col, ListGroup, Card} from 'react-bootstrap'
import { useLocation } from 'react-router-dom';
import { useState } from 'react';
import Message from '../components/Message';
import { useDispatch,useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getuserDetails, updateUserProfile } from '../actions/userAction';
import { USER_UPDATE_RESET } from '../constants/userConstant';
import Loader from '../components/Loader';
import { userOrdersList } from '../actions/orderAction';
import {LinkContainer} from 'react-router-bootstrap';

function Profilescreen() {
  const [firstName,setfirstName] = useState('');
    const [lastName,setlastName] = useState('');
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('');
    const [confirmpassword,setConfirmPassword] = useState('');
    const [message,setMessage] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin
    const userDetails = useSelector((state) => state.userDetails)
    const { loading, user } = userDetails
    const userUpdateProfile = useSelector((state) => state.userUpdate)
    const { update,error} = userUpdateProfile
    const userOrders = useSelector(state=>state.userOrders);
    const {Ordersloading,Orderserror,orders} = userOrders
    useEffect(()=>{
      if (!userInfo){
        navigate('/login');
      }
      else{
        if (!user || !user.firstName || update || !orders){
          dispatch({type:USER_UPDATE_RESET})
          dispatch(getuserDetails());
          dispatch(userOrdersList());
        }
        if (update===true){
          alert("Updated Successfully");
          setMessage('');
          setPassword('');
          setConfirmPassword('');
        }
        else{
          setfirstName(user.firstName);
          setlastName(user.lastName);
          setEmail(user.email);
        }
      }
    },[dispatch,userInfo,user,update,setMessage,setPassword,setConfirmPassword,orders])

    const submitHandler = (e)=>{
      e.preventDefault();
      if (password!==confirmpassword){
        setMessage("password and confirm password should match");
      }
      else{
        setMessage("");
      const user_to_update = {
        firstName: firstName,
        lastName: lastName,
        email:email,
        password:password
      }
      dispatch(updateUserProfile(user_to_update));
    }
    }
  return (
    <Container className='my-10 py-5'>
      <Row>
                <Col md={3}>
                    <h1 className='my-5 text-center'>Profile</h1>
                    {message && <Message variant='danger'>{message}</Message>}
                    {error && <Message variant="danger">{error}</Message>}
                    <Form onSubmit={submitHandler}>
                        <Form.Group className='my-2' controlID='firstName'>
                            <Form.Label>First Name</Form.Label>
                            <Form.Control type='name' value={firstName} placeholder='Enter the first Name' autoComplete="off" onChange={(e)=>setfirstName(e.target.value)}></Form.Control>
                        </Form.Group>
                        <Form.Group className='my-2' controlID='lastName'>
                            <Form.Label>Last Name</Form.Label>
                            <Form.Control type='name' value={lastName} placeholder='Enter the last Name' autoComplete="off" onChange={(e)=>setlastName(e.target.value)}></Form.Control>
                        </Form.Group>
                        <Form.Group className='my-2' controlID='email'>
                            <Form.Label>Email</Form.Label>
                            <Form.Control type='email' value = {email} placeholder='Enter the Email ID' autoComplete="off" onChange={(e)=>setEmail(e.target.value)}></Form.Control>
                        </Form.Group>
                        <Form.Group className='my-2' controlID='password'>
                            <Form.Label>Password</Form.Label>
                            <Form.Control type='password' placeholder='Enter the Password' autoComplete="current-password" onChange={(e)=>setPassword(e.target.value)}></Form.Control>
                        </Form.Group>
                        <Form.Group className='my-2' controlID='confirmpassword'>
                            <Form.Label>Confirm Password</Form.Label>
                            <Form.Control type='password' placeholder='Enter the Confirm Password' onChange={(e)=>setConfirmPassword(e.target.value)}></Form.Control>
                        </Form.Group>
                        <Button className='my-2' type='submit'>Update</Button>
                    </Form>
                </Col>
                <Col>
                  <h1 className='m-5 text-center'>Orders</h1>
                  {Ordersloading ? <Loader /> : Orderserror ? <Message variant='danger'>{Orderserror}</Message> :
                    (<Row className='justify-content-center'>
                      {orders?.map(order_each=>(
                        <Col className='m-2' md={5} xl={4}>
                          <Card>
                            <ListGroup>
                              <ListGroup.Item>
                                Booked On: {order_each.createdAt.substring(0,10)}
                              </ListGroup.Item>
                              <ListGroup.Item>
                                ShippingAddress: {order_each.shippingAddress.address} {order_each.shippingAddress.city}
                              </ListGroup.Item>
                              <ListGroup.Item>
                                Items : {
                                  order_each.orderItems.map(x=>x.name+" ") 
                                }
                              </ListGroup.Item>
                              <ListGroup.Item>
                                TotalPrice : {order_each.totalPrice}
                              </ListGroup.Item>
                              <ListGroup.Item>
                                <Col>
                                  Paid: {order_each.isPaid ? <i class="fa-solid fa-check"></i> : <i class="fa-solid fa-xmark"></i>} {<span>  </span>}
                                </Col>
                                <Col>
                                  Delivered: {order_each.isDelivered ? <i class="fa-solid fa-check"></i> : <i class="fa-solid fa-xmark"></i>}
                                </Col>
                              </ListGroup.Item>
                              <ListGroup.Item>
                                Delivered On: {order_each.isDelivered ? order_each.updatedAt.substring(0,10): "-"}
                              </ListGroup.Item>
                              <LinkContainer to={`/order/${order_each._id}`}>
                                <Button type="button" className="btn-block">
                                  Click here for Details
                                </Button>
                              </LinkContainer>
                            </ListGroup>
                          </Card>
                        </Col>
                      ))}
                    </Row>)
                  }
                </Col>
            </Row>

    </Container>
  )
}

export default Profilescreen
