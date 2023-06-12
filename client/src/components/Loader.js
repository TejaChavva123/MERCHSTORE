import { Spinner } from "react-bootstrap";
import React from 'react';

function Loader() {
  return (
    <Spinner animation="border" role="status" style={{display:"block",margin:"auto"}}>
        <span className="sr-only">Loading...</span>
    </Spinner>
  )
}

export default Loader