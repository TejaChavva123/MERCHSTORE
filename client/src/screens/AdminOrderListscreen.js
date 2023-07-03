import React, { useEffect } from 'react'
import {Button,Container} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { useNavigate } from 'react-router-dom';
import Table from 'react-bootstrap/Table';
import { LinkContainer } from 'react-router-bootstrap';
import { fetchOrdersbyAdmin } from '../actions/adminAction';
import { ADMIN_ORDER_LIST_RESET } from '../constants/adminConstants';
import PageTitle from '../components/PageTitle';
const AdminOrderListscreen = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin
    const OrderList = useSelector(state=>state.adminOrdersList);
    const {orders,loading,error} = OrderList;

    useEffect(()=>{
        if (userInfo && userInfo.isAdmin){
            dispatch({type:ADMIN_ORDER_LIST_RESET});
            dispatch(fetchOrdersbyAdmin());
        }
        else{
            navigate('/login');
        }
    },[dispatch,userInfo,navigate])
  return (
    <Container className="my-3">
        <PageTitle title="Orders List" />
        {
            loading ? <Loader /> : error ? <Message variant="danger">{error}</Message> :
            (
                <Table striped bordered hover responsive className='text-center'>
                    <thead>
                        <tr>
                        <th>Order ID</th>
                        <th>User ID</th>
                        <th>List of Items</th>
                        <th>Booked On</th>
                        <th>Shipping Address</th>
                        <th>Price</th>
                        <th>Payment Status</th>
                        <th>Delivered</th>
                        <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                    {
                        orders?.map(order=>(
                            <tr key={order._id}>
                                <td>{order._id}</td>
                                <td>{order.user}</td>
                                <td>{
                                  order.orderItems.map(x=>x.name+" ") 
                                }</td>
                                <td>{order.createdAt.substring(0,10)}</td>
                                <td>{order.shippingAddress.state}</td>
                                <td>{order.totalPrice} INR</td>
                                <td>{order.isPaid ? order.paidAt.substring(0,10) : <i class="fa-solid fa-xmark"></i>}</td>
                                <td>{order.isDelivered ? order.updatedAt.substring(0,10): <i class="fa-solid fa-xmark"></i>}</td>
                                <td>
                                    <LinkContainer to={`/order/${order._id}`}>
                                        <Button type="button" className="btn-block">
                                        Details
                                        </Button>
                                    </LinkContainer>
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

export default AdminOrderListscreen
