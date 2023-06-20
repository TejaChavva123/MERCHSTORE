import React, { useEffect,useState } from 'react'
import {Container,Form,Row,Button,Col} from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux';
import { fetchProductDetailsbyID, updateProductByID } from '../actions/adminAction';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { useNavigate, useParams } from 'react-router-dom';
import { ADMIN_PRODUCT_UPDATE_RESET } from '../constants/adminConstants';
import axios from 'axios';
import PageTitle from '../components/PageTitle';
const AdminProductUpdatescreen = () => {
    const {id} = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin
    const adminProductDetails = useSelector(state=>state.adminProductDetails);
    const {product,loading,error} = adminProductDetails
    const adminProductUpdate = useSelector(state=>state.adminProductUpdate);
    const {successUpdate} = adminProductUpdate;

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
        if (!product || !product.name || product._id!==id || successUpdate){
            dispatch({type:ADMIN_PRODUCT_UPDATE_RESET});
            dispatch(fetchProductDetailsbyID(id));
        }
        else{
            setName(product.name)
            setPrice(product.price)
            setImage(product.image)
            setBrand(product.brand)
            setCategory(product.category)
            setCountInStock(product.countInStock)
            setDescription(product.description)
        }
        if (successUpdate){
            alert("Updated Successfully");
            navigate('/admin/productlist')
        }
      }
      else{
        navigate('/login')
      }
    },[dispatch,product,navigate,successUpdate])

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
      dispatch(updateProductByID(product_to_update,id));
    }
  return (
    <Container className='justify-content-center my-10 py-5'>
      <PageTitle title="Product Updation" />
          <Row className='justify-content-center'>
            <Col md={5}>
            <h1 className='my-5 text-center'>Product Profile</h1>
                    {error && <Message variant="danger">{error}</Message>}
                    {
                      loading ? <Loader /> : error ? <Message variant="danger">{error}</Message> :
                      (
                        <Form>
                          <Form.Group className='my-2' controlId='name'>
                              <Form.Label>Name</Form.Label>
                              <Form.Control type='text' value={name} placeholder='Enter the name' autoComplete="off" onChange={(e)=>setName(e.target.value)}></Form.Control>
                          </Form.Group>
                          <Form.Group className='my-2' controlId='price'>
                              <Form.Label>Price</Form.Label>
                              <Form.Control type='number' value={price} placeholder='Enter the price' autoComplete="off" onChange={(e)=>setPrice(e.target.value)}></Form.Control>
                          </Form.Group>
                          <Form.Group className='my-2' controlId='category'>
                              <Form.Label>Category</Form.Label>
                              <Form.Control type='text' value = {category} placeholder='Enter the category' autoComplete="off" onChange={(e)=>setCategory(e.target.value)}></Form.Control>
                          </Form.Group>
                          <Form.Group className='my-2' controlId='brand'>
                              <Form.Label>Brand</Form.Label>
                              <Form.Control type='text' value = {brand} placeholder='Enter the brand' autoComplete="off" onChange={(e)=>setBrand(e.target.value)}></Form.Control>
                          </Form.Group>
                          <Form.Group className='my-2' controlId='description'>
                              <Form.Label>Description</Form.Label>
                              <Form.Control type='text' value = {description} placeholder='Enter the description' autoComplete="off" onChange={(e)=>setDescription(e.target.value)}></Form.Control>
                          </Form.Group>
                          <Form.Group controlId='countInStock'>
                                <Form.Label>Count In Stock</Form.Label>
                                <Form.Control
                                    type='number'
                                    placeholder='Enter the countInStock'
                                    value={countInStock}
                                    onChange={(e) => setCountInStock(e.target.value)}
                                ></Form.Control>
                            </Form.Group>
                            <Form.Group controlId='image'>
                                <Form.Label>Image</Form.Label>
                                <Form.Control
                                    type='text'
                                    placeholder='Enter the url of Image'
                                    value={image}
                                    onChange={(e) => setImage(e.target.value)}
                                ></Form.Control>
                                <Form.Control  type="file" id="image-file" label="choose file" onChange={fileHandler} />
                                {/* <Form.File
                                    id='image-file'
                                    label='Choose File'
                                    custom
                                    onChange={fileHandler}
                               /> */}
                            </Form.Group>
                          <Button onClick={submitHandler} className='my-2' type='submit'>Update</Button>
                        </Form> 

                      )
                    }
            </Col>
          </Row>
    </Container>
  )
}

export default AdminProductUpdatescreen
