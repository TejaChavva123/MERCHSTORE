import React, { useEffect } from 'react'
import {Row,Col,Button, Container} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { deleteProductByID, fetchProductsbyAdmin } from '../actions/adminAction';
import { useNavigate } from 'react-router-dom';
import Table from 'react-bootstrap/Table';
import { LinkContainer } from 'react-router-bootstrap';
import { ADMIN_PRODUCT_DELETE_RESET, ADMIN_PRODUCT_LIST_RESET } from '../constants/adminConstants';
import PageTitle from '../components/PageTitle';

const AdminProductListscreen = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin
    const adminProductList = useSelector(state=>state.adminProductList);
    const {loading,error,products} = adminProductList

    const adminProductDelete = useSelector(state=>state.adminProductDelete);
    const {successDelete} = adminProductDelete;

    const deleteHandler = (id)=>{
        (alert("Deleted Successfully !! "))
        dispatch(deleteProductByID(id));
        
    }
    useEffect(()=>{
                if (userInfo&&userInfo.isAdmin){
                    dispatch({type:ADMIN_PRODUCT_DELETE_RESET})
                    dispatch({type:ADMIN_PRODUCT_LIST_RESET});
                    dispatch(fetchProductsbyAdmin())
                }
                else{
                    navigate('/login')
                }
    },[dispatch,successDelete])
  return (
    <Container className="my-3">
        <PageTitle title="Product List" />
        <Row className='justify-content-end'>
            <Col>
                <LinkContainer to="/admin/product/create">
                    <Button className='my-3'>
                        <i className='fas fa-plus'></i>  Create Product
                    </Button>
                </LinkContainer>
            </Col>
        </Row>
        {
            loading ? <Loader /> : error ? <Message variant="danger">{error}</Message> :
            (
                <Table striped bordered hover responsive className='text-center'>
                    <thead>
                        <tr>
                        <th>Product ID</th>
                        <th>User ID</th>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Category</th>
                        <th>Rating</th>
                        <th>Actions</th>
                        <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                    {
                        products?.map(product=>(
                            <tr key={product._id}>
                                <td>{product._id}</td>
                                <td>{product.user}</td>
                                <td>{product.name}</td>
                                <td>{product.price} INR</td>
                                <td>{product.category}</td>
                                <td>{product.rating}</td>
                                <td>
                                    <LinkContainer to={`/admin/product/edit/${product._id}`}>
                                        <Button className='btn-sm'><i className="fas fa-edit"></i></Button>
                                    </LinkContainer> 
                                </td>
                                <td>
                                <Button onClick={()=>deleteHandler(product._id)} className='btn-sm'><i className="fa-solid fa-trash"></i></Button>
                                </td>
                            </tr>
                        ))
                    }
                    </tbody>
                </Table>

            )
        }
    </Container>
  )
}

export default AdminProductListscreen

