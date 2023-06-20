import React, { useEffect } from 'react'
import { useState } from 'react'
import {Link} from 'react-router-dom'
import {Container,Form,Row,Button,Col} from 'react-bootstrap'
import { useLocation,useNavigate} from 'react-router-dom';
import { useDispatch,useSelector } from 'react-redux';
import {userLogin} from '../actions/userAction';
import Message from '../components/Message';
import Loader from '../components/Loader';
import PageTitle from '../components/PageTitle';

const LoginScreen = ()=> {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('');
    const location = useLocation();
    const redirect = location.search ? location.search.split("=")[1] : '/'
    const userlogin = useSelector(state=>state.userLogin);
    const {userInfo,loading,error} = userlogin;

    useEffect(()=>{
        if (userInfo){
            navigate(`${redirect}`)
        }
    },[dispatch,userInfo,redirect])
    const submitHandler = (e)=>{
        e.preventDefault();
        dispatch(userLogin(email,password));
    }
  return (
  <Container className='my-10'>
    <PageTitle title="Login Portal" />
            <Row  className='justify-content-center'>
                <Col xs={8} md={6}>
                    <h1 className='my-5 text-center'>SIGN IN</h1>
                    {error && <Message variant='danger'>{error}</Message>}
                    {loading && <Loader />}
                    <Form onSubmit={submitHandler}>
                        <Form.Group className='my-2' controlID='email'>
                            <Form.Label>Email</Form.Label>
                            <Form.Control type='email' placeholder='Enter the Email ID' onChange={(e)=>setEmail(e.target.value)}></Form.Control>
                        </Form.Group>
                        <Form.Group className='my-2' controlID='password'>
                            <Form.Label>Password</Form.Label>
                            <Form.Control type='password' placeholder='Enter the Password' onChange={(e)=>setPassword(e.target.value)}></Form.Control>
                        </Form.Group>
                        <Button className='my-2' type='submit' variant='primary'>Log In</Button>
                    </Form>
                    <Row className='my-2 py-8'>
                        <Col>
                        New Customer ? <Link to={redirect ? `/register?redirect=${redirect}`:`/redirect`}>Register</Link>
                        </Col>

                    </Row>
                </Col>
            </Row>
    </Container>
  )
}

export default LoginScreen
