import React, { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import Navbar from './Navbar'
import { useDispatch, useSelector } from 'react-redux'
import { loginAction } from './Action'
import Loader2 from './Loader2'
import Message from './Message'

const Login = () => {
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")
    const [formType,setFormType] = useState(false)

    const [errorMsg,setErrorMsg] = useState()
    const dispatch = useDispatch()
    const location = useLocation()

    const redirect = location.search ? location.search.split("=")[1]: "/profile"

    const userLogin = useSelector(state => state.userLogin)
    const {error,loading,userInfo} =userLogin

    const history = useNavigate()
    

    useEffect(()=>{
        if (userInfo){
            history(redirect)
        }
    },[history,userInfo,redirect,dispatch,loading])

    const submitHandler = (e)=>{
        // e.preventDefault()
        setErrorMsg("")
        if(!password || !email){
            setErrorMsg("Password or email field cannot be empty")
        }else if(password.length <5){
            setErrorMsg("Invalid password or email")
        }else{
            dispatch(loginAction(email,password))
        }
    }

    return (
        <div>
            <Navbar />
            <div className='loginFormBg'>
                <div className="paddForm">
                    <div className="loginContainerBox3">
                        <div className="center bold4 font_24">
                            Login
                        </div>
                        <div className="center text-dark pb_1">
                            Welcome Back
                        </div>
                        <input type="text" placeholder='Input Email' 
                            value={email}
                            onChange={(e)=>setEmail(e.target.value)}
                        />
                        <div className="passwordFormContainer">
                            <input className='xb' type={formType === false ? "password" : "text"} placeholder='Password' 
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
                        {errorMsg && 
                            <Message variant={"danger"} children={errorMsg} />
                        }
                        {error && 
                            <Message variant={"danger"} children={"Invalid email or password"} />
                        }
                        <div>
                            <button onClick={submitHandler}>
                                {loading ? <Loader2 /> : "Submit"}
                            </button>
                        </div>
                        <div className="pt_1">
                            <Link to={"/reset-password"} className="text-primary">
                                Forgot password?
                            </Link>
                        </div>
                        <div className="pt_1">
                            Don't have an account? <Link className='text-primary pl-1' to={"/sign-up"}>Sign up</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login