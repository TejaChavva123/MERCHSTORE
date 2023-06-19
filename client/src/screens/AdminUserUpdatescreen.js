import React, { useEffect,useState } from 'react'
import {Container,Form,Row,Button,Col, ListGroup, Card} from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserDetailsbyID, updateUserByID } from '../actions/adminAction';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { useNavigate, useParams } from 'react-router-dom';
import { ADMIN_USER_UPDATE_RESET } from '../constants/adminConstants';

const AdminUserUpdatescreen = () => {
   const adminUserDetails = useSelector(state=>state.adminUserDetails);
   const {user,loading,error} = adminUserDetails;
    const {id} = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin
    const adminUserUpdate = useSelector(state=>state.adminUserUpdate);
    const {successUpdate} = adminUserUpdate;

    const [firstName,setfirstName] = useState('');
    const [lastName,setlastName] = useState('');
    const [email,setEmail] = useState('');
    const [isAdmin, setIsAdmin] = useState(false)
    
    useEffect(()=>{
      if (userInfo&&userInfo.isAdmin){
        if (!user || !user.firstName || user._id!==id || successUpdate){
          dispatch({type:ADMIN_USER_UPDATE_RESET})
          dispatch(fetchUserDetailsbyID(id))
        }
        else{
          setfirstName(user.firstName);
          setlastName(user.lastName);
          setEmail(user.email);
          setIsAdmin(user.isAdmin);
        }
        if (successUpdate){
          alert("Updated Successfully");
          navigate('/admin/userlist')
        }
      }
      else{
        navigate('/login')
      }
    },[dispatch,user,navigate,successUpdate])

    const submitHandler = (e)=>{
      e.preventDefault();
      const user_to_update = {
        firstName: firstName,
        lastName: lastName,
        email:email,
        isAdmin:isAdmin
      }
      dispatch(updateUserByID(user_to_update,id));
    }
    const changeHandler = ()=>{
      setIsAdmin(!isAdmin)
    }

  return (
    <Container className='justify-content-center my-10 py-5'>
          <Row className='justify-content-center'>
            <Col md={5}>
            <h1 className='my-5 text-center'>Profile</h1>
                    {error && <Message variant="danger">{error}</Message>}
                    {
                      loading ? <Loader /> : error ? <Message variant="danger">{error}</Message> :
                      (
                        <Form>
                          <Form.Group className='my-2' controlId='firstName'>
                              <Form.Label>First Name</Form.Label>
                              <Form.Control type='name' value={firstName} placeholder='Enter the first Name' autoComplete="off" onChange={(e)=>setfirstName(e.target.value)}></Form.Control>
                          </Form.Group>
                          <Form.Group className='my-2' controlId='lastName'>
                              <Form.Label>Last Name</Form.Label>
                              <Form.Control type='name' value={lastName} placeholder='Enter the last Name' autoComplete="off" onChange={(e)=>setlastName(e.target.value)}></Form.Control>
                          </Form.Group>
                          <Form.Group className='my-2' controlId='email'>
                              <Form.Label>Email</Form.Label>
                              <Form.Control type='email' value = {email} placeholder='Enter the Email ID' autoComplete="off" onChange={(e)=>setEmail(e.target.value)}></Form.Control>
                          </Form.Group>
                          <Form.Group controlId='isadmin'>
                              <Form.Check
                                type='checkbox'
                                label='Is Admin'
                                checked={isAdmin}
                                onChange={changeHandler}
                              ></Form.Check>
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

export default AdminUserUpdatescreen
