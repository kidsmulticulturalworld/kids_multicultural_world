import React, { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import Navbar from './Navbar'
import { useDispatch, useSelector } from 'react-redux'
import { signUpAction } from './Action'
import Message from './Message'
import Loader2 from './Loader2'

const SignUp = () => {
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")
    const [otherNames,setOtherNames] = useState("")
    const [first_name,setFirst_name] = useState("")
    const [zipCode,setZipCode] = useState("")
    const [fullAddress,setFullAddress] = useState("")
    const [phone,setPhone] = useState("")
    const [state,setState] = useState("")
    const [city,setCity] = useState("")
    const [agree,setAgree] = useState(false)
    // const [confirm_password,setConfirm_password] = useState("")
    const [formType,setFormType] = useState(false)
    const [checkForm, setCheckForm] = useState(false)
    const [errorPass,setErrorPass] = useState(false)

    const history = useNavigate()
    
    const dispatch= useDispatch()
    const location =useLocation()
    const userLogin = useSelector(state=> state.userLogin)
    const {userInfo} = userLogin

    const singUp = useSelector(state=> state.singUp)
    const {loading,error,success,userInfo:userInfo2} = singUp


    const [errorMsg,setErrorMsg] = useState()
    const redirect = location.search ? location.search.split("=")[1]: "/profile"
    // const submitHandler = ()=>{
    //     history("/tiers")
    // }
    function password_validate(p) {
        return new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})").test(p)
    }

    const submitHandler = ()=>{
        setErrorMsg("")
        setErrorPass(false)
        // if(!first_name || !email || !password || !confirm_password){
        if(!first_name || 
            !email || !password ||
            !fullAddress || !state
            || !city || !phone || !agree ||
            !zipCode || !otherNames
            ){
            setCheckForm(true)
        // }else if(password !== confirm_password){
        //     setCheckForm(false)
        //     setErrorMsg("Password field did not match")
        }else if(password.length <5){
            setCheckForm(false)
            setErrorMsg("Password must be more than 5 characters long")
            
        }else if(!password_validate(password)){
            setCheckForm(false)
            setErrorPass(true) 
        }else{
            setCheckForm(false)
            setErrorMsg("")
            setErrorPass(false)
            dispatch(signUpAction({
                "password": password,
                "email": email,
                "first_name" : first_name,
                "other_names" : otherNames,
                "zip_code" : zipCode,
                phone,
                fullAddress,
                state,
                city
            }))
        }
    }
    useEffect(()=>{
        if(userInfo || userInfo2){
            if (redirect){
                history(redirect)
            }else{
                history(`/profile`)
            }
        }
        if (error){
            setErrorMsg("User with this email already exist")
        }
    },[userInfo,userInfo2,error,success,history,redirect])

    
    return (
        <div>
            <Navbar />
        
            <div className='loginFormBg2'>
                <div className='pt_1'>
                    <div className='signUpFormContainer shadow'>
                        <div className='signUpForms'>
                            <div className="bold7 font_24 red">
                                Sign Up
                            </div>
                            <div className='pt_1 font_15 bold6'>
                                Get started with Kids Multicultural World
                            </div>
                            {errorMsg && 
                                <Message variant={"danger"} children={errorMsg}></Message>
                            }
                            {errorPass &&
                                <div>
                                    <Message variant={"danger"}>
                                        <ul>
                                            <li className='font_11'>
                                                Password must contain at least 1 lowercase alphabetical character
                                            </li>
                                            <li className='font_11'>
                                                Password must contain at least 1 uppercase alphabetical character
                                            </li>
                                            <li className='font_11'>
                                                Password must contain at least 1 numeric character
                                            </li>
                                            <li className='font_11'>
                                                Password must contain at least one special character
                                            </li>
                                            <li className='font_11'>
                                                Password must be eight characters or longer
                                            </li>
                                        </ul>
                                    </Message>
                                </div>
                            }
                            <div className='registerContent pt_1'>
                                <input type="text" placeholder='First Name' 
                                    className={(checkForm && !first_name) ? "xdForm" : ""}
                                    value={first_name}
                                    onChange={(e)=>setFirst_name(e.target.value)}
                                />
                                <input type="text" placeholder='Other Names' 
                                    className={(checkForm && !otherNames) ? "xdForm" : ""}
                                    value={otherNames}
                                    onChange={(e)=>setOtherNames(e.target.value)}
                                />
                                <input type="email" placeholder='Email' 
                                    className={(checkForm && !email) ? "xdForm" : ""}
                                    value={email}
                                    onChange={(e)=>setEmail(e.target.value)}
                                />



                                <input type="text" placeholder='Phone Number' 
                                    className={(checkForm && !phone) ? "xdForm" : ""}
                                    value={phone}
                                    onChange={(e)=>setPhone(e.target.value)}
                                />
                                <div className="signUp_address">
                                    <input type="text" placeholder='Full Address' 
                                        className={(checkForm && !fullAddress) ? "xdForm xcv" : "xcv"}
                                        value={fullAddress}
                                        onChange={(e)=>setFullAddress(e.target.value)}
                                    />
                                    <input type="text" placeholder='Zip Code' 
                                        className={(checkForm && !zipCode) ? "xdForm font_11 xcv2" : "font_11 xcv2"}
                                        value={zipCode}
                                        onChange={(e)=>setZipCode(e.target.value)}
                                    />
                                </div>
                                <div className="signUp_address2">
                                    <input type="text" placeholder='State' 
                                        className={(checkForm && !state) ? "xdForm xcv" : "xcv"}
                                        value={state}
                                        onChange={(e)=>setState(e.target.value)}
                                    />
                                    <input type="text" placeholder='City' 
                                        className={(checkForm && !city) ? "xdForm xcv2" : "xcv2"}
                                        value={city}
                                        onChange={(e)=>setCity(e.target.value)}
                                    />
                                </div>
                                <div className={(checkForm && !password) ? "xdForm passwordFormContainer" : "passwordFormContainer"}>
                                    <input className="xb" type={formType === false ? "password" : "text"} placeholder='Password' 
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
                                <div className='flex ckecb0x'>
                                    <div className="flex">
                                        <input type="checkbox"
                                            value={email}
                                            onChange={(e)=>setAgree(e.target.checked)}
                                        />
                                    </div>
                                    <span className={(checkForm && !agree) ? "text-danger pl_1" : "pl_1"}>I agree with the <Link className={(checkForm && !agree) ? "text-danger" : "text-primary"} to={"/terms-of-service"}>terms of use</Link> </span>
                                </div>
                                <div className='pt_2'>
                                    {loading ?
                                        <button>
                                            <Loader2 variant={"light"} />
                                        </button>
                                    :
                                        <button onClick={submitHandler}>
                                            Submit
                                        </button>
                                    }
                                    
                                </div>
                                <div className="pt_2">
                                    Already have an account? <Link className='text-primary pl-1' to={"/login"}>Login</Link>
                                </div>
                            </div>
                        </div>
                        <div className='classics'>
                            <img src="/Images/loginImg4.jpeg" alt="..." />
                        </div>
                    </div>
                </div>
                <div className="pb-1"></div>
            </div>
        </div>
    )
}

export default SignUp