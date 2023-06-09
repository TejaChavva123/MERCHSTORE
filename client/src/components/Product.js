import React from 'react';
import {Link} from 'react-router-dom';
import { Card } from 'react-bootstrap';
import Rating from './Rating'

const Product = ({product}) => {
  return (
    <Card className ="my-3 p-3 rounded border-1 shadow">
        <Link to={`/product/${product._id}`}>
            <Card.Img className='m-2' src={product.image} variant='top'/>
        </Link>

        <Card.Body>
            <Link to={`/product/${product._id}`}>
                <Card.Title as="div">
                    <strong>{product.name}</strong>
                </Card.Title>
            </Link>
            <Card.Text as="div">
                <Rating value={product.rating} num = {product.numReviews} />
            </Card.Text>
            <Card.Text as="h5">
                ₹{product.price}
            </Card.Text>
        </Card.Body>

    </Card>
  )
}

export default Product