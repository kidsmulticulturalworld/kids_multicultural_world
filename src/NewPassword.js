import React, { useEffect } from 'react'
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import { passwordSetAction } from './Action';
import Message from './Message';
import Loader2 from './Loader2';
import Navbar from './Navbar';

const NewPassword = () => {
    const token = useParams();
    const dispatch= useDispatch()
    const history = useNavigate()
    const location =useLocation()
    const userLogin = useSelector(state=> state.userLogin)
    const {userInfo} = userLogin

    const passwordSet = useSelector(state=> state.passwordSet)
    const {loading,error,success} = passwordSet

    const [formType,setFormType] = useState(false)
    const [password,setPassword] = useState("")
    const [confirm_password,setConfirm_password] = useState("")
    const [errorMsg,setErrorMsg] = useState()
    const redirect = location.search ? location.search.split("=")[1]: "/"
    
    const submitHandler = (e)=>{
        e.preventDefault()
        setErrorMsg("")
        if(password !== confirm_password){
            setErrorMsg("Password field did not match")
        }else if(password.length <5){
            setErrorMsg("Password must be more than 5 characters long")
        }else{
            dispatch(passwordSetAction({"password": password,"token": token.token}))
        }
    }

    useEffect(()=>{
        if(userInfo){
            history(redirect)
        }
        if (error){
            setErrorMsg("Invalid or expired token")
        }
        if (!token.token){
            setErrorMsg("Invalid token")
        }
    },[userInfo,error,history,dispatch,token,redirect])

    return (
        <div>
            <Navbar />
            <div className='loginFormBg'>
                <div className="paddForm">
                    <div className="loginContainerBox3">
                        {!success &&
                            <>
                                <div className="center bold4 font_24">
                                    New password
                                </div>
                                <div className="center text-dark pb_1">
                                    Enter your new password.
                                </div>
                            </>
                        }
                        {success &&
                            <>
                                <div className="center bold4 font_24">
                                    Success!
                                </div>
                                <div className="center text-dark pb_1">
                                    Your password was successfully reset.
                                    <Link to={'/login'}>Login</Link>
                                </div>
                            </>
                        }
                        {!success && 
                            <>
                                <div className="passwordFormContainer">
                                    <input 
                                        className='xb' 
                                        type={formType === false ? "password" : "text"} 
                                        placeholder='Password' 
                                        value={password}
                                        onChange={(e)=>setPassword(e.target.value)}
                                    />
                                    <div className='sight'>
                                        <img className={formType === false ? "pointer" : "d_none"} src="https://img.icons8.com/external-creatype-outline-colourcreatype/29/null/external-eye-essential-ui-v4-creatype-outline-colourcreatype.png"
                                            onClick={()=>setFormType(!formType)}
                                            alt='...'
                                        />
                                        <img className={formType === false ? "d_none" : "pointer"} src="https://img.icons8.com/external-creatype-glyph-colourcreatype/24/null/external-eyes-basic-creatype-glyph-colourcreatype-2.png"
                                            onClick={()=>setFormType(!formType)}
                                            alt='...'
                                        />
                                    </div>
                                </div>
                                <div className="passwordFormContainer">
                                    <input 
                                        className='xb' 
                                        type={formType === false ? "password" : "text"} 
                                        placeholder='Confirm password' 
                                        value={confirm_password}
                                        onChange={(e)=>setConfirm_password(e.target.value)}
                                    />
                                </div>
                            </>
                        }
                        {errorMsg ? <Message variant={"danger"} children={errorMsg} /> : error ?
                            <Message variant={"danger"} children={"Sorry, Something went wrong."} />
                            :""
                        }
                        
                        {!success &&
                            <div className='pt_1'>
                                <button onClick={submitHandler}>
                                    {loading ? <Loader2 /> : "Reset password"}
                                </button>
                            </div>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NewPassword