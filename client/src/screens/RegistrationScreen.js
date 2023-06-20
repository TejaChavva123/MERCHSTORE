import React, { useEffect } from 'react'
import { useState } from 'react'
import {Link} from 'react-router-dom'
import {Container,Form,Row,Button,Col} from 'react-bootstrap'
import { useLocation,useNavigate} from 'react-router-dom';
import { useDispatch,useSelector } from 'react-redux';
import {userRegister} from '../actions/userAction';
import Message from '../components/Message';
import Loader from '../components/Loader';
import PageTitle from '../components/PageTitle';

const RegistrationScreen = ()=> {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [firstName,setfirstName] = useState('')
    const [lastName,setlastName] = useState('');
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('');
    const [confirmpassword,setConfirmPassword] = useState('');
    const [message,setMessage] = useState('');
    const location = useLocation();
    const redirect = location.search ? location.search.split("=")[1] : '/'
    const user_register= useSelector(state=>state.userRegister);
    const {userInfo,loading,error} = user_register;

    useEffect(()=>{
        if (userInfo){
            navigate('/')
        }
        // dispatch(userLogin(email,password));
    },[dispatch,userInfo,redirect])
    const submitHandler = (e)=>{
        e.preventDefault();
        if (password!==confirmpassword){
            setMessage("password and confirm password should match");
        }
        else{
            dispatch(userRegister(firstName,lastName,email,password));
        }
    }
  return (
  <Container className='my-10'>
    <PageTitle title="New User Registration Portal" />
            <Row  className='justify-content-center'>
                <Col xs={8} md={6}>
                    <h1 className='my-5 text-center'>SIGN IN</h1>
                    {message && <Message variant='danger'>{message}</Message>}
                    {error && <Message variant='danger'>{error}</Message>}
                    {loading && <Loader />}
                    <Form onSubmit={submitHandler}>
                        <Form.Group className='my-2' controlID='firstName'>
                            <Form.Label>First Name</Form.Label>
                            <Form.Control type='name' placeholder='Enter the first Name' onChange={(e)=>setfirstName(e.target.value)}></Form.Control>
                        </Form.Group>
                        <Form.Group className='my-2' controlID='lastName'>
                            <Form.Label>Last Name</Form.Label>
                            <Form.Control type='name' placeholder='Enter the last Name' onChange={(e)=>setlastName(e.target.value)}></Form.Control>
                        </Form.Group>
                        <Form.Group className='my-2' controlID='email'>
                            <Form.Label>Email</Form.Label>
                            <Form.Control type='email' placeholder='Enter the Email ID' onChange={(e)=>setEmail(e.target.value)}></Form.Control>
                        </Form.Group>
                        <Form.Group className='my-2' controlID='password'>
                            <Form.Label>Password</Form.Label>
                            <Form.Control type='password' placeholder='Enter the Password' onChange={(e)=>setPassword(e.target.value)}></Form.Control>
                        </Form.Group>
                        <Form.Group className='my-2' controlID='confirmpassword'>
                            <Form.Label>Confirm Password</Form.Label>
                            <Form.Control type='password' placeholder='Enter the Confirm Password' onChange={(e)=>setConfirmPassword(e.target.value)}></Form.Control>
                        </Form.Group>
                        <Button className='my-2' type='submit' variant='primary'>Register</Button>
                    </Form>
                    <Row className='my-2 py-8'>
                        <Col>
                        Already have an account ? <Link to={redirect ? `/login?redirect=${redirect}`:`/login`}>Log In</Link>
                        </Col>

                    </Row>
                </Col>
            </Row>
    </Container>
  )
}

export default RegistrationScreen