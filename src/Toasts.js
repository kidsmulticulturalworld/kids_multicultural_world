import React from 'react'
import { Toast } from 'react-bootstrap'

const Toasts = (props) => {
  return (
    <div className='sticky-top maxWidth'>
        <Toast 
            {...props}
            delay={2000} 
            autohide
        >
            <div className="pt_5">
                <div className={`alert alert-${props.toastVariant}`} role="alert">
                    <div className='font_11 bold7 text-white center'>
                        {props.toastMessage}
                    </div>
                </div>
            </div>
        </Toast>
    </div>
  )
}

export default Toasts