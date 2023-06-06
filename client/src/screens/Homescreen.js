import React from 'react';
import products from '../data/products'
import { Row,Col } from 'react-bootstrap';
import {Container} from 'react-bootstrap'
import Product from '../components/Product';

const Homescreen = () => {
  return (
    <main className='my-5'>
      <Container>
      <h2 className="text-center p-5">Latest Merchandise</h2>
        <Row>
          {products.map(product=>(
            <Col sm={12} md={6} lg={4} xl={3}>
              <Product product={product}/>
            </Col>
          ))}
        </Row>
      </Container>
    </main>
  )
}

export default Homescreen
