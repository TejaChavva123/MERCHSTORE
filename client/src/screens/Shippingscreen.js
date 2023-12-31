import React, { useEffect } from 'react'
import { useState } from 'react';
import {Container,Form,Row,Button,Col} from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux';
import { saveAddress } from '../actions/cartAction';
import { useNavigate } from 'react-router-dom';
import CheckOutHandler from '../components/CheckOutHandler';
import PageTitle from '../components/PageTitle';

function Shippingscreen() {
    
    const cart = useSelector(state=>state.cart);
    const {Address,saved} = cart;
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [city,setCity] = useState(Address.city);
    const [pincode,setPincode] = useState(Address.pincode);
    const [state,setState] = useState(Address.state);
    const [district,setDistrict] = useState(Address.district);
    const [address,setAddress] = useState(Address.address);
    const [country,setCountry] = useState("India");
    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin

    const indiaStates = [
        'Andhra Pradesh',
        'Arunachal Pradesh',
        'Assam',
        'Bihar',
        'Chhattisgarh',
        'Goa',
        'Gujarat',
        'Haryana',
        'Himachal Pradesh',
        'Jharkhand',
        'Karnataka',
        'Kerala',
        'Madhya Pradesh',
        'Maharashtra',
        'Manipur',
        'Meghalaya',
        'Mizoram',
        'Nagaland',
        'Odisha',
        'Punjab',
        'Rajasthan',
        'Sikkim',
        'Tamil Nadu',
        'Telangana',
        'Tripura',
        'Uttar Pradesh',
        'Uttarakhand',
        'West Bengal',
        'Andaman and Nicobar Islands',
        'Chandigarh',
        'Dadra and Nagar Haveli',
        'Daman and Diu',
        'Lakshadweep',
        'Delhi',
        'Puducherry',
      ];

      useEffect(()=>{
        if (!userInfo){
            navigate('/login');
        }
      },[userInfo])
const submitHandler =(e)=>{
    e.preventDefault();
    if (!state){
        setState(indiaStates[0]);
    }
    if (!country){
        setCountry("India");
    }
    dispatch(saveAddress({address,city,district,state,country,pincode}));
    if (saved===true){
        alert("Address Saved Successfully");
        navigate('/payment');
    }

}
  return (
    <Container className='my-10'>
        <PageTitle title="Shipping" />
        <CheckOutHandler tread1 tread2/>
            <Row  className='justify-content-center'>
                <Col xs={8} md={6}>
                    <h1 className='my-5 text-center'>Shipping Address</h1>
                    <Form onSubmit={submitHandler}>
                        <Form.Group className='my-2' controlId='address'>
                            <Form.Label>Address</Form.Label>
                            <Form.Control type='text-area' value={address} placeholder='Enter the Address' onChange={(e)=>setAddress(e.target.value)}></Form.Control>
                        </Form.Group>
                        <Form.Group className='my-2' controlId='city'>
                            <Form.Label>City</Form.Label>
                            <Form.Control type='text' value={city} placeholder='Enter the City' onChange={(e)=>setCity(e.target.value)}></Form.Control>
                        </Form.Group>
                        <Form.Group className='my-2' controlId='district'>
                            <Form.Label>District</Form.Label>
                            <Form.Control type='text' value={district} placeholder='Enter the District' onChange={(e)=>setDistrict(e.target.value)}></Form.Control>
                        </Form.Group>
                        <Form.Group className='my-2' controlId="stateSelect">
                            <Form.Label>State</Form.Label>
                            <Form.Control as="select" value={state ? state : "Andhra Pradesh"} onChange={(e)=>setState(e.target.value)}>
                            {indiaStates.map((state, index) => (
                                <option key={index} value={state}>
                                {state}
                                </option>
                            ))}
                            </Form.Control>
                        </Form.Group>
                        <Form.Group className='my-2' controlId="countrySelect">
                            <Form.Label>Country</Form.Label>
                            <Form.Control as="select" value={country} onChange={(e)=>setCountry(e.target.value)}>
                                <option value="India">
                                India
                                </option>
                            </Form.Control>
                        </Form.Group>
                        <Form.Group className='my-2' controlId='pincode'>
                            <Form.Label>Pincode</Form.Label>
                            <Form.Control type='text' value={pincode} placeholder='Enter the Pincode' onChange={(e)=>setPincode(e.target.value)}></Form.Control>
                        </Form.Group>
                        <Button className='my-2' type='submit' variant='primary'>Save</Button>
                    </Form>
                </Col>
            </Row>
    </Container>
  )
}

export default Shippingscreen
