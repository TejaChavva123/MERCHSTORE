import React, { useEffect, useState } from 'react';
import { Row,Col,Form,Button} from 'react-bootstrap';
import {Container} from 'react-bootstrap'
import CheckOutHandler from '../components/CheckOutHandler';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { savePaymentMethod } from '../actions/cartAction';

const Paymentscreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [paymentMethod,setPaymentMethod] = useState('Razorpay');
  const cart = useSelector(state=>state.cart);
  const {Address} = cart;
  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin
  useEffect(()=>{
    if (!userInfo){
        navigate('/login');
    }
    if (!Address){
        navigate('/shipping')
    }
  })
  const submitHandler=(e)=>{
    e.preventDefault();
    dispatch(savePaymentMethod(paymentMethod));
    navigate('/placeorder')
  }
  return (
    <Container className='my-10'>
        <CheckOutHandler tread1 tread2 tread3 />
        <Row  className='justify-content-center'>
            <Col xs={8} md={8}>
                <h1 className='my-5 text-center'>Payment</h1>
                <Form onSubmit={submitHandler}>
                    <Form.Group className='my-2' controlId='payment'>
                        <Form.Label as='legend'>Select Payment Method</Form.Label>
                        {['checkbox'].map((type) => (
                            <div key={`default-${type}`} className="mb-3">
                            <Form.Check
                                type={type}
                                id='Razorpay' value='Razorpay'
                                label='Razorpay' onChange={(e)=>setPaymentMethod(e.target.value)}checked
                            />
                            </div>
                        ))}
                    </Form.Group>
                    <Button className='my-2' type='submit' variant='primary'>Continue</Button>
                </Form>
            </Col>
            
        </Row>
    </Container>
  )
}

export default Paymentscreen
