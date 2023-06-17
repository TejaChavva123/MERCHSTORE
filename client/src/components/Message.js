import React from 'react';
import {Alert} from 'react-bootstrap';

function Message({variant,children}) {
  return (
    <Alert variant={variant} className='text-center my-2'>
        {children}
    </Alert>
  )
}

Message.defaultProps = {
    variant: 'info'
}

export default Message