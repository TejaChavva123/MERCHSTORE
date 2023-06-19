import React, { useEffect,useState } from 'react'
import {Container,Form,Row,Button,Col} from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux';
import { createProduct } from '../actions/adminAction';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { ADMIN_PRODUCT_CREATE_RESET } from '../constants/adminConstants';
const AdminProductCreatescreen = () => {
    const {id} = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin

    const adminProductCreate = useSelector(state=>state.adminProductCreate);
    const {successCreate,loading,error} = adminProductCreate;

    const [name,setName] = useState('');
    const [category,setCategory] = useState('');
    const [brand,setBrand] = useState('');
    const [price, setPrice] = useState(0);
    const [image, setImage] = useState('')
    const [countInStock, setCountInStock] = useState(0)
    const [description, setDescription] = useState('')
    const [upload,setUpload] = useState(false);
    
    useEffect(()=>{
      if (userInfo&&userInfo.isAdmin){
       if (successCreate){
        dispatch({type:ADMIN_PRODUCT_CREATE_RESET})
        alert("Product Created Successfully")
        navigate('/admin/productlist')
       }
      }
      else{
        navigate('/login')
      }
    },[dispatch,successCreate])

    const fileHandler = async(e)=>{
      const file = e.target.files[0];
      const formData = new FormData();
      formData.append('image',file);
      setUpload(true);
      try {
        const config = {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
        const { data } = await axios.post('/api/upload', formData,config)
        setImage(data)
        setUpload(false)
      } 
      catch (error) {
        setUpload(false)
      }


    }

    const submitHandler = (e)=>{
      e.preventDefault();
      const product_to_update = {
        name:name,
        category:category,
        price:price,
        brand:brand,
        countInStock:countInStock,
        description:description,
        image:image
      }
      dispatch(createProduct(product_to_update));
    }
  return (
    <Container className='justify-content-center my-10 py-5'>
    <Row className='justify-content-center'>
      <Col md={5}>
      <h1 className='my-5 text-center'>Create New Product</h1>
              {error && <Message variant="danger">{error}</Message>}
                  <Form>
                    <Form.Group className='my-2' controlId='name'>
                        <Form.Label>Name</Form.Label>
                        <Form.Control type='text' value={name} required placeholder='Enter the name' autoComplete="off" onChange={(e)=>setName(e.target.value)}></Form.Control>
                    </Form.Group>
                    <Form.Group className='my-2' controlId='price'>
                        <Form.Label>Price</Form.Label>
                        <Form.Control type='number' value={price} required  placeholder='Enter the price' autoComplete="off" onChange={(e)=>setPrice(e.target.value)}></Form.Control>
                    </Form.Group>
                    <Form.Group className='my-2' controlId='category'>
                        <Form.Label>Category</Form.Label>
                        <Form.Control type='text' value = {category} required placeholder='Enter the category' autoComplete="off" onChange={(e)=>setCategory(e.target.value)}></Form.Control>
                    </Form.Group>
                    <Form.Group className='my-2' controlId='brand'>
                        <Form.Label>Brand</Form.Label>
                        <Form.Control type='text' value = {brand} required  placeholder='Enter the brand' autoComplete="off" onChange={(e)=>setBrand(e.target.value)}></Form.Control>
                    </Form.Group>
                    <Form.Group className='my-2' controlId='description'>
                        <Form.Label>Description</Form.Label>
                        <Form.Control type='text' value = {description} required placeholder='Enter the description' autoComplete="off" onChange={(e)=>setDescription(e.target.value)}></Form.Control>
                    </Form.Group>
                    <Form.Group controlId='countInStock'>
                          <Form.Label>Count In Stock</Form.Label>
                          <Form.Control
                              type='number'
                              placeholder='Enter the countInStock'
                              required
                              value={countInStock}
                              onChange={(e) => setCountInStock(e.target.value)}
                          ></Form.Control>
                      </Form.Group>
                      <Form.Group controlId='image'>
                          <Form.Label>Image</Form.Label>
                          <Form.Control
                              required
                              type='text'
                              placeholder='Enter the url of Image'
                              value={image}
                              onChange={(e) => setImage(e.target.value)}
                          ></Form.Control>
                          <Form.Control  required type="file" id="image-file" label="choose file" onChange={fileHandler} />
                      </Form.Group>
                    <Button onClick={submitHandler} className='my-2' type='submit'>ADD NEW PRODUCT</Button>
                  </Form> 

      </Col>
    </Row>
</Container>
  )
}

export default AdminProductCreatescreen
