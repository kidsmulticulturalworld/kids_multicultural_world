import React, { useEffect, useState } from 'react'
import Navbar from './Navbar'
import Modal from 'react-bootstrap/Modal';
import Collapse from 'react-bootstrap/Collapse';
import checkOutUserInfo from './checkOutUserInfo';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import prices from "./PricesOfSubscription"
import TermsAndConditions from './TermsAndConditions';


const Acting = () => {
    const history = useNavigate()
    const userLogin = useSelector(state=> state.userLogin)
    const {userInfo} = userLogin
    const [show, setShow] = useState(false);
    const [open, setOpen] = useState(false);
    const [address, setAddress] = useState("");
    const [age, setAge] = useState("");
    const [phone, setPhone] = useState("");
    const [check, setCheck] = useState();

    const [checkf,setCheckf] = useState(null)
    const [phonef,setPhonef] = useState(null)
    const [agef,setAgef] = useState(null)
    const [addressf,setAddressf] = useState(null)

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    
    const submitHandler = ()=>{
        if (!phone){
            setPhonef(true)
        }else{
            setPhonef(null)
        }
        if (!age){
            setAgef(true)
        }else{
            setAgef(null)
        }
        if (!address){
            setAddressf(true)
        }else{
            setAddressf(null)
        }
        if (!check){
            setCheckf(true)
        }else{
            setCheckf(null)
        }
        if (address && age && phone && check){
            checkOutUserInfo({
                phone,
                email: age,
                address,
                action_performed : "acting",
                name : false
            })
            history(`/checkout/acting/subscription`)
        }
    }
    useEffect(()=>{
        if (!userInfo){
            history(`/login?redirect=/acting-classes`)
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[userInfo])
  return (
    <div>
        <Navbar />
        <div className='modelling'>
            <div className="first_side2 ">
                <div className="first_sideContent">
                    <div className="font_12 bold7 text-dark">
                        CLASSES
                    </div>
                    <div className="ModelsHeaderCont_ents">
                        Acting Class
                    </div>
                    <div className="pt_2 font_14 justify_me">
                        We teach beginners & upcoming actors- How to Prepare 
                        for an Audition , Read & deliver scripts and self 
                        presentation. Our Courses Are Designed for All 
                        Levels of Experience.  Age range : 5 years to 17years
                    </div>
                    <div className="modeling_BTN3 pointer" onClick={handleShow}>
                        Join Class {process.env.REACT_APP_CURRENCY_SYMBOL}{prices["acting"]}
                    </div>
                </div>
                
            </div>
            <div className="second_side">
                <div className="second_sideContent">
                    <img className='center_imager' src="/Images/Acting.jpg" alt="Acting" />
                    <div className="modeling_BTN5 pointer" onClick={handleShow}>
                        <img src="https://img.icons8.com/sf-regular/48/ffffff/long-arrow-right.png" alt='icon'/>
                    </div>
                </div>
            </div>
        </div>
        <Modal
            show={show}
            onHide={handleClose}
            backdrop="static"
            keyboard={false}
        >
            <Modal.Header closeButton>
                <Modal.Title>Acting Class</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="form-group">
                    <label>Full address</label>
                    <input 
                        type="text" 
                        className={addressf ? "is-invalid form-control" : "form-control"}
                        id="exampleInputText1" 
                        aria-describedby="TextHelp" 
                        placeholder="Enter home address" 
                        value={address}
                        onChange={(e)=>setAddress(e.target.value)}
                    />
                </div>
                <div className="form-row pt_2">
                    <div className="form-group">
                        <label>Age</label>
                        <input 
                            type="number" 
                            className={agef ? "is-invalid form-control" : "form-control"} 
                            id="inputEmail4" 
                            placeholder="Input age" 
                            value={age}
                            onChange={(e)=>setAge(e.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <label>Phone number</label>
                        <input 
                            type="text" 
                            className={phonef ? "is-invalid form-control" : "form-control"}
                            id="inputPassword4" 
                            placeholder="Input phone number" 
                            value={phone}
                            onChange={(e)=>setPhone(e.target.value)}
                        />
                    </div>
                </div>
                <div className="pt_2">
                    <span
                        onClick={() => setOpen(!open)}
                        aria-controls="example-collapse-text"
                        aria-expanded={open}
                        className='pointer'
                    >
                        <img width="18" height="18" src="https://img.icons8.com/ios/18/FABF0C/info--v1.png" alt="info--v1"/>
                        <span className="pl_1 text-warning font_12 bold6">
                            Terms & Conditions
                        </span>
                    </span>
                </div>
                <Collapse in={open}>
                    <div id="example-collapse-text">
                        <TermsAndConditions />
                    </div>
                </Collapse>
                
                <div className="form-check pt_1">
                    <input 
                        type="checkbox" 
                        className={checkf ? "is-invalid form-check-input" : "form-check-input"}
                        id="exampleCheck1" 
                        value={check}
                        onChange={(e)=>setCheck(e.target.checked)}
                    />
                    <label className="form-check-label">I agree</label>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <button variant="primary" 
                    onClick={submitHandler}
                >
                    Subscribe at {process.env.REACT_APP_CURRENCY_SYMBOL}{prices["acting"]}
                </button>
            </Modal.Footer>
        </Modal>
    </div>
  )
}

export default Acting