import React from 'react'
import Spinner from 'react-bootstrap/Spinner';

const Loader2 = ({variant}) => {
    return (
        <div className={variant ? `text-${variant}` : "secondary"}>
            <Spinner
                variant={variant ? variant : "secondary"}
                as="span"
                animation="grow"
                size="sm"
                role="status"
                aria-hidden="true"
            />
            Loading...
        </div>
    )
}

export default Loader2