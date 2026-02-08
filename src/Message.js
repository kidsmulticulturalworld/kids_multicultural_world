import React from 'react'
import Alert from 'react-bootstrap/Alert';


const Message = ({children,variant}) => {
    return (
        <Alert variant={variant} className='font_14'>
            {children}
        </Alert>
    )
}
export default Message