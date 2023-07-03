import React, { useEffect } from 'react'
import {Button,Container} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { deleteUserByID, fetchUsersbyAdmin } from '../actions/adminAction';
import { useNavigate } from 'react-router-dom';
import Table from 'react-bootstrap/Table';
import { LinkContainer } from 'react-router-bootstrap';
import { ADMIN_USER_DELETE_RESET, ADMIN_USER_LIST_RESET } from '../constants/adminConstants';
import PageTitle from '../components/PageTitle';

const AdminUserListscreen = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin
    const admin = useSelector(state=>state.admin);
    const {loading,error,users} = admin

    const adminUserDelete = useSelector(state=>state.adminUserDelete);
    const {successDelete} = adminUserDelete;

    const deleteHandler = (id)=>{
        (alert("Deleted Successfully !!"))
        dispatch(deleteUserByID(id));
    }
    useEffect(()=>{
                if (userInfo&&userInfo.isAdmin){
                    dispatch({type:ADMIN_USER_DELETE_RESET})
                    dispatch({type:ADMIN_USER_LIST_RESET})
                     dispatch(fetchUsersbyAdmin())
                }
                else{
                    navigate('/login')
                }
    },[dispatch,successDelete])
  return (
    <Container className="my-3">
        <PageTitle title="Users List" />
        {
            loading ? <Loader /> : error ? <Message variant="danger">{error}</Message> :
            (
                <Table striped bordered hover responsive className='text-center'>
                    <thead>
                        <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Admin</th>
                        <th>Actions</th>
                        <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                    {
                        users ? (users.map(user=>(
                            <tr key={user._id}>
                                <td>{user._id}</td>
                                <td>{user.firstName+" "+user.lastName}</td>
                                <td><a href={`mailto:${user.email}`}>{user.email}</a></td>
                                <td>{user.isAdmin ? <i className="fa-solid fa-check"></i> : <i className="fa-solid fa-xmark"></i>}</td>
                                <td>
                                    <LinkContainer to={`/admin/user/edit/${user._id}`}>
                                        <Button className='btn-sm'><i className="fas fa-edit"></i></Button>
                                    </LinkContainer> 
                                </td>
                                <td>
                                <Button onClick={()=>deleteHandler(user._id)} className='btn-sm'><i className="fa-solid fa-trash"></i></Button>
                                </td>
                            </tr>) 
                        )) : <Message variant='info'>NO USERS CURRENTLY</Message>
                    }
                    </tbody>
                </Table>

            )
        }
    </Container>
  )
}

export default AdminUserListscreen
