import React from 'react';
import {Link} from 'react-router-dom';
import { Card } from 'react-bootstrap';
import Rating from './Rating'

const Product = ({product}) => {
    const styles = {
        cardImage:{
            objectFit: 'cover',
            borderRadius:5
        }
    }
  return (
    <Card className ="my-2 p-3 rounded border-1 shadow">
        <Link to={`/product/${product._id}`}>
            <Card.Img className='m-2' src={product.image} style={styles.cardImage} variant='top'/>
        </Link>

        <Card.Body className='text-center'>
            <Link style={{ textDecoration: 'none',fontWeight:'bold'}} to={`/product/${product._id}`}>
                <Card.Title as="div">
                    <strong>{product.name}</strong>
                </Card.Title>
            </Link>
            <Card.Text as="div">
                <Rating value={product.rating} />
            </Card.Text>
            <Card.Footer as="h4">Price: ₹{product.price}</Card.Footer>
        </Card.Body>

    </Card>
  )
}

export default Product