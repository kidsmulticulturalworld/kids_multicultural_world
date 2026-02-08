import React from 'react'
import Spinner from 'react-bootstrap/Spinner';

const Loader = ({variant}) => {
  return (
    <div>
        <Spinner animation="border" variant={variant ? variant : "secondary"} />
    </div>
  )
}

export default Loader