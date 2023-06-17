import React, { useEffect} from 'react';
import {useDispatch,useSelector} from 'react-redux';
import { Row,Col } from 'react-bootstrap';
import {Container} from 'react-bootstrap'
import Product from '../components/Product';
import {listProducts} from '../actions/productAction';

import Loader from '../components/Loader';
import Message from '../components/Message';

const Homescreen = () => {
  const dispatch = useDispatch();
  const productsList = useSelector(state=>state.productsList);
  const {loading,error,products} = productsList;
  useEffect(()=>{
    dispatch(listProducts());
  },[dispatch])
  return (
    <main className='my-5'>
      <Container>
      <h2 className="text-center p-5">Latest Merchandise</h2>
      {loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> :
        (<Row>
          {products?.map(product=>(
            <Col sm={12} md={6} lg={4} xl={4}>
              <Product product={product}/>
            </Col>
          ))}
        </Row>)}
      </Container>
    </main>
  )
}

export default Homescreen
