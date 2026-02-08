import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Footer from './Footer'
import Modal from 'react-bootstrap/Modal';
import Collapse from 'react-bootstrap/Collapse';
import Navbar from './Navbar'
import { useSelector } from 'react-redux'
import checkOutUserInfo from './checkOutUserInfo'
import prices from "./PricesOfSubscription"


const Classes = () => {

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
    
    const [totalPrice, setTotalPrice] = useState(0);
    const [numTickets, setNumTickets] = useState(1);

    const handleClose = () => {
        if (!userInfo){
            history(`/login?redirect=/classes`)
        }else{
            setShow(false)
        }
    };
    const handleShow = () => {
        if (!userInfo){
            history(`/login?redirect=/classes`)
        }else{
            setShow(true)
        }
    };
    
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
                action_performed : numTickets ? numTickets : 1,
                name : false
            })
            history(`/checkout/oneOnone/subscription`)
        }
    }

    return (
        <div>
            <Navbar />
            <div className="classLanding_page">
                <div className="classDivider relative">
                    <div>
                        <div className="ClassHeader text_align_center">
                            MENTORSHIP CLASSES
                        </div>
                        <div className="classesDescHeader no_justify">
                            KIDS MODELING, ACTING AND LIFE SKILLS CLASSES
                        </div>
                        <div className="pt_2">
                            <span className='text-muted justify_me'>
                                This classes is designed to empower the next generation 
                                of kids going into entertainment industry or whatever 
                                career part they may decide to venture into in  the future . 
                                <span onClick={handleShow} className='text-primary bold5 pointer'>Request a one on one mentorship class.</span>
                            </span>
                        </div>
                    </div>
                    <div>
                        <div className="diveid">
                            <div>
                                <img className='center_imager' src="/Images/KidatMentorshipclassI.jpg" alt="Kid in mentorship class" />
                            </div>
                            <div>
                                <img className='center_imager' src="/Images/KidAtMentorshipClass.jpg" alt="Kid in mentorship class" />
                            </div>
                            <div></div>
                            <div>
                                <img className='center_imager' src="/Images/ActingKid.jpg" alt="Kid in mentorship class" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="standard_width xr">
                <div className="standard_in">
                    <div className="pt_7 bold7 font_32">
                        Modeling Classes
                    </div>
                    <div className="model_class_CONtainer">
                        <div>
                            <img src="/Images/Modeling.jpg" alt="Modeling" />
                        </div>
                        <div>
                            <div className="mt_2">
                                
                                <div className="mt_3 text-muted justify_me">
                                    Modeling Class - Age 1yr to 17 years : Modeling Ethics, 
                                    Runway Modeling, Commercial Modeling and High Editorial, 
                                    Pose  and Confident building Class.   Taught by two 
                                    successful working models, this course is a 
                                    must-have guide filled with useful tips and hints for 
                                    all upcoming & professional models .        
                                </div>
                                <div className='pt_2'>
                                    <span className="pr_1 text-danger bold6">
                                        Price :
                                    </span>
                                    {process.env.REACT_APP_CURRENCY_SYMBOL}{prices["modelling"]}
                                     per month
                                </div>
                                <div className="pt_2">
                                    <Link to={userInfo ? "/modelling-classes" : "/login?redirect=/modelling-classes"} className="font_18 bold6 blue">
                                        Register
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="pt_7 bold7 font_32">
                        Acting Classes
                    </div>
                    <div className="model_class_CONtainer pb_7">
                        <div>
                            <img src="/Images/Acting.jpg" alt="Acting" />
                        </div>
                        <div>
                            <div className="mt_2">
                                <div className="mt_3 text-muted justify_me">
                                    Acting Class : We teach beginners & upcoming 
                                    actors- How to Prepare for an Audition , Read & 
                                    deliver scripts and self presentation. Our Courses 
                                    Are Designed for All Levels of Experience. 
                                    <p>Age range : 5 years to 17years </p>
                                    
                                </div>
                                <div className='pt_2'>
                                    <span className="pr_1 text-danger bold6">
                                        Price : 
                                    </span>
                                    {process.env.REACT_APP_CURRENCY_SYMBOL}{prices["acting"]} per month
                                </div>
                                <div className="pt_2">
                                    <Link to={userInfo ? "/acting-classes" : "/login?redirect=/acting-classes"} className="font_18 bold6 blue">
                                        Register
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="pt_7 bold7 font_32">
                        Life Skills
                    </div>
                    <div className="model_class_CONtainer pb_7">
                        <div>
                            <img src="/Images/Skills.jpg" alt="Skills" />
                        </div>
                        <div>
                            <div className="mt_2">
                                <div className="mt_3 text-muted justify_me">
                                    Life skills mentorship: 
                                    Twice a week guidance , 30mins prep talk and business 
                                    ideas building , rebranding and rebuilding self esteem. 

                                    <p>
                                        Age range : Children 1 yr to 17yrs accompanied with parents .
                                    </p>

                                     
                                </div>
                                <div className='pt_2'>
                                    <span className="pr_1 text-danger bold6">
                                        Price :
                                    </span>
                                    {process.env.REACT_APP_CURRENCY_SYMBOL}{prices["skills"]} per month or {process.env.REACT_APP_CURRENCY_SYMBOL}{prices["oneOnone"]} per 1 hour section
                                </div>
                                <div className="pt_2">
                                    <Link to={userInfo ? "/life-skills" : "/login?redirect=/life-skills"} className="font_18 bold6 blue">
                                        Register
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            <Footer />
            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>One on One Mentorship</Modal.Title>
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
                    <div className="form-group">
                        <div className='text-muted font_14 py_1'>
                            Number of hours (<span className='text-primary bold7'>{numTickets}</span>)
                        </div>

                        <input 
                            className="form-control w-75"
                            type="range" 
                            min="1" 
                            max="6"
                            value={numTickets}
                            onChange={(e)=>{
                                setNumTickets(e.target.value)
                                setTotalPrice(e.target.value * prices["oneOnone"])
                            }}
                        />
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
                                No refund policy
                            </span>
                        </span>
                    </div>
                    <Collapse in={open}>
                        <div id="example-collapse-text">
                            <div className="pt_2 text-muted font_12 justify_me">
                                All sales are final, Kids Multicultural World LLC does not 
                                offer any money-back guarantees. You recognize and agree that 
                                you shall not be entitled to a refund for any 
                                purchase under any circumstances. No Warranties
                            </div>
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
                        Total {process.env.REACT_APP_CURRENCY_SYMBOL}{totalPrice ? totalPrice : prices["oneOnone"]}
                    </button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default Classes