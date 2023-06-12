import React from 'react';
import {Alert} from 'react-bootstrap';

function Message({variant,children}) {
  return (
    <Alert variant={variant} className='my-5'>
        {children}
    </Alert>
  )
}

Message.defaultProps = {
    variant: 'info'
}

export default Message