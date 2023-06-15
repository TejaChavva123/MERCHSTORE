import React, { useState,useEffect} from 'react'
import { Container} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import {Row,Col,Image,ListGroup,Card,Button,Form} from 'react-bootstrap';
import Rating from '../components/Rating' ;
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useSelector,useDispatch} from 'react-redux';

import {detailsProduct} from '../actions/productAction';

import Loader from '../components/Loader';
import Message from '../components/Message';

const Productscreen = ({match}) => {
  let navigate = useNavigate();
  let {id}= useParams();
  const dispatch = useDispatch();
  const productDetails = useSelector(state=>state.productDetails);
  const {loading,error,product} = productDetails;
  const [qty,setQty] = useState(1);
  const addCartHandler = ()=>{
    navigate(`/cart/${id}?qty=${qty}`)
  }
  useEffect(()=>{
    dispatch(detailsProduct(id));
  },[dispatch,id])
  return (
    <div>
        <main className='productscreen my-5'>
            <Container>
                <Link className='btn btn-dark' to="/">
                    Go Back
                </Link>
                {loading ? <Loader /> : product ?  
                (<Row>
                    <Col className="my-4" md={4}>
                        <Image src={product.image} alt={product.name} fluid />
                    </Col>
                    <Col md={4}>
                        <ListGroup variant="flush" className="text-center">
                            <ListGroup.Item>
                                <h3>{product.name}</h3>
                                <h4>{product.category}</h4>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Rating value={product.rating} num={product.numReviews} />
                            </ListGroup.Item>
                            <ListGroup.Item>
                                Price: ₹ {product.price}
                            </ListGroup.Item>
                            <ListGroup.Item>
                                Description: Soon Will be Added
                            </ListGroup.Item>
                        </ListGroup>
                    </Col>
                    <Col md={4}>
                        <Card>
                          <ListGroup variant="flush">
                            <ListGroup.Item>
                                <Row>
                                    <Col>Price: </Col>
                                    <Col><strong>₹ {product.price}</strong></Col>
                                </Row>
                            </ListGroup.Item>
                           </ListGroup>
                           <ListGroup variant="flush">
                            <ListGroup.Item>
                                <Row>
                                    <Col>Staus: </Col>
                                    <Col>{product.countInStock >0 ? 'In Stock' : "Out of Stock"}</Col>
                                </Row>
                            </ListGroup.Item>
                            {product.countInStock>0 && (
                                <ListGroup.Item className='select-bar'>
                                    <Row>
                                        <Col>Qty: </Col>
                                        <Col>
                                          <Form.Control  as="select" value={qty} onChange={(e)=>setQty(e.target.value)}>
                                            {[...Array(product.countInStock).keys()].map(x=>(
                                                <option key={x+1} value={x+1}>{x+1}</option>
                                            ))}
                                          </Form.Control >
                                        </Col>
                                    </Row>
                                </ListGroup.Item>
                            )}
                            <ListGroup.Item>
                                <Button type="button" className='btn-block' onClick={addCartHandler}
                                    disabled={product.countInStock === 0}>
                                    ADD TO CART
                                </Button>
                            </ListGroup.Item>
                           </ListGroup>
                        </Card>
                        
                    </Col>
                </Row>):<Message variant='danger'>{error}</Message> }
            </Container>
        </main>
    </div>
  )
}

export default Productscreen
