import React, { useEffect, useState } from 'react'
import { Container} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import {Row,Col,Image,ListGroup,Card,Button,Form} from 'react-bootstrap';
import Rating from '../components/Rating' ;
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

import axios from 'axios';

const Productscreen = ({match}) => {
  let navigate = useNavigate();
  let {id}= useParams();
  const [qty,setQty] = useState(1);
  const [product,setProduct] = useState({});
  const arr = [...Array(product.countInStock).keys()];
  const addCartHandler = ()=>{
    navigate(`/cart/${id}?qty=${qty}`)
  }


  useEffect(()=>{
    const productFetch = async ()=>{
        const info = await axios.get(`/api/products/${id}`);
        setProduct(info.data);
    }
    productFetch();
  },[id])
  return (
    <div>
        <main className='productscreen my-5'>
            <Container>
                <Link className='btn btn-dark' to="/">
                    Go Back
                </Link>
                <Row>
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
                                <ListGroup.Item>
                                    <Row className='text-center'>
                                        <Col>Qty: </Col>
                                        <Col>
                                          <Form.Control  as="select" value={qty} onChange={(e)=>setQty(e.target.value)}>
                                            {arr.map(x=>(
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
                </Row>
            </Container>
        </main>
    </div>
  )
}

export default Productscreen
