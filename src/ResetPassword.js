import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { USER_LOGOUT } from './Constant';
import { passwordResetAction } from './Action';
import Message from './Message';
import Loader2 from './Loader2';
import Navbar from './Navbar';

const ResetPassword = () => {
    const [errorMsg,setErrorMsg] = useState()
    const [email,setEmail]= useState("")
    const dispatch = useDispatch()
    const history = useNavigate()
    const userLogin = useSelector(state => state.userLogin)
    const {userInfo} =userLogin

    const passwordReset = useSelector(state => state.passwordReset)
    const {error,loading,success} =passwordReset

    useEffect(()=>{
        if(userInfo){
            history("/home")
        }
        if(success && success.success === "success"){
            dispatch({type: USER_LOGOUT})
            history("/reset-password/request-sent")
        }
    },[history,userInfo,success,dispatch])
    const submitHandler = (e)=>{
        e.preventDefault()
        setErrorMsg("")
        if(!email){
            setErrorMsg("Email field cannot be empty")
        }else{
            dispatch(passwordResetAction(email))
        }
    }
  return (
    <div>
        <Navbar />
        <div className='loginFormBg'>
            <div className="paddForm">
                <div className="loginContainerBox3">
                    <div className="center bold4 font_24">
                        Reset Password
                    </div>
                    <div className="center font_12 text-dark pb_1">
                        Please enter your email to reset your password.
                    </div>
                    <input type="text" placeholder='Input Email' 
                        value={email}
                        onChange={(e)=>setEmail(e.target.value)}
                    />
                    {errorMsg && <Message variant={"danger"}>{errorMsg}</Message>}
                    {error && <Message variant={"danger"}>Sorry, something wrong. Please try again. </Message>}
                    <div>
                        <button onClick={submitHandler}>
                            {loading ? <Loader2 /> : "Submit"}
                        </button>
                    </div>
                    
                </div>
            </div>
        </div>
    </div>
  )
}

export default ResetPassword