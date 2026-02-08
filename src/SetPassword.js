import React from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from './Navbar'

const SetPassword = () => {
  const history = useNavigate()
  const submitHandler = ()=>history("/home")
  
  return (
    <div>
        <Navbar />
        <div className='loginFormBg'>
            <div className="paddForm">
                <div className="loginContainerBox3">
                    <div className="center bold4 font_24">
                        Request sent!
                    </div>
                    <div className="center font_12 text-dark pb_1">
                        Email with instructions to reset your password have been sent to your mail.
                    </div>
                    
                    <div>
                        <button onClick={submitHandler}>
                            Home
                        </button>
                    </div>
                    
                </div>
            </div>
        </div>
    </div>
  )
}

export default SetPassword