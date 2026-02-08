import React, { useState } from 'react'
import Navbar from './Navbar'
import Footer from './Footer'
import { Collapse, Modal } from 'react-bootstrap';
import prices from "./PricesOfSubscription"
import { useNavigate } from 'react-router-dom';
import checkOutUserInfo from './checkOutUserInfo';

const GetFeatured = () => {
    const history = useNavigate()

    const [show, setShow] = useState(false);
    const [open, setOpen] = useState(false);
    const [address, setAddress] = useState("");
    const [name, setName] = useState("");
    const [age, setAge] = useState("");
    const [phone, setPhone] = useState("");
    const [check, setCheck] = useState();
    const [gender, setGender] = useState();
    const [email, setEmail] = useState();
    const [fullName, setFullName] = useState();

    const [fullNamef,setFullNamef] = useState(null)
    const [emailf,setEmailf] = useState(null)
    const [genderf,setGenderf] = useState(null)
    const [checkf,setCheckf] = useState(null)
    const [phonef,setPhonef] = useState(null)
    const [agef,setAgef] = useState(null)
    const [namef,setNamef] = useState(null)
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

        if (!name){
            setNamef(true)
        }else{
            setNamef(null)
        }
        if (!gender){
            setGenderf(true)
        }else{
            setGenderf(null)
        }
        if (!email){
            setEmailf(true)
        }else{
            setEmailf(null)
        }
        if (!fullName){
            setFullNamef(true)
        }else{
            setFullNamef(null)
        }
        
        if (
            address && 
            age && 
            phone && 
            check && 
            name && 
            gender && 
            email && 
            fullName
        ){
            checkOutUserInfo({
                phone,
                email,
                address,
                action_performed : "featured",
                name,
                info : {
                    age,
                    gender,
                    fullName
                }
            })
            history(`/checkout/featured/magazine`)
        }
    }
  return (
    <div>
        <Navbar />
        <div className="standard_width">
            <div className="get_featured_mag_container">
                <div className='ImgMagrequest'>
                    <img src="./Images/kidsMag.webp" alt="kids world magizine cover" />
                </div>
                <div className='justify_me'>
                    <h1 className='bold8 center'>
                        WORLD MAGAZINE REGISTRATION
                    </h1>
                    <div className="pt-2">
                        Kids Multicultural World Magazine Registration 
                    </div>
                    <div className="pt-2">
                        Kids Multicultural World Magazine is a bimonthly magazine that celebrates multiculturalism, global cultures and kids achievements across the world. 
                    </div>
                    <div className="pt_2">
                        We are always looking for new models 0-17 years old. 
                        Upload 5 photos either professional or best phone 
                        pictures. We are a culture & talent driven organization-you 
                        are welcome to submit photos that displays cultural attires and 
                        talents.
                    </div>
                    <div className="pt_2">
                        The best picture get featured on the cover. This is not a paid gig but is fantastic for your model & Acting portfolio.
                    </div>
                    <div className="pt_2">
                        <h6 className="bold7">
                            NOTE:
                        </h6>
                        <div>
                            We do not provide free copies of the magazine, 
                            you can order them through our publisher Magcloud. We will 
                            notify you by email if your pictures 
                            were published with the link of the magazine edition.
                        </div>
                        <div className="pt_2">
                            Good Luck! 
                        </div>
                        <div className="pt_3">
                            <button className="btn btn-secondary bg-secondary center"
                                onClick={handleShow}    
                            >
                                Register Here
                            </button>
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
                <Modal.Title>Register Here</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="form-group">
                    <label>Full Name</label>
                    <input 
                        type="text" 
                        className={namef ? "is-invalid form-control" : "form-control"}
                        id="exampleInputText1" 
                        aria-describedby="TextHelp" 
                        placeholder="Enter your full name" 
                        value={name}
                        onChange={(e)=>setName(e.target.value)}
                    />
                </div>
                <div className="form-row pt_2">
                    <div className="form-group">
                        <label>Age</label>
                        <input 
                            type="number" 
                            className={agef ? "is-invalid form-control" : "form-control"} 
                            id="inputEmail4" 
                            placeholder="Age" 
                            value={age}
                            onChange={(e)=>setAge(e.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <label>Gender</label>
                        <select 
                            className={genderf ? "is-invalid form-control" : "form-control"}
                            value={gender}
                            onChange={(e)=>setGender(e.target.value)}
                        >
                            <option value="">Gender</option>
                            <option value="male">Male</option>
                            <option value="female">female</option>
                        </select>
                    </div>
                </div>
                <div className="form-group pt_2">
                    <label>Full address</label>
                    <input 
                        type="text" 
                        className={addressf ? "is-invalid form-control" : "form-control"}
                        id="exampleInputText1" 
                        aria-describedby="TextHelp" 
                        placeholder="Home address" 
                        value={address}
                        onChange={(e)=>setAddress(e.target.value)}
                    />
                </div>
                <div className="form-group pt_2">
                    <label>Phone number(parent)</label>
                    <input 
                        type="text" 
                        className={phonef ? "is-invalid form-control" : "form-control"}
                        id="inputPassword4" 
                        placeholder="Phone number" 
                        value={phone}
                        onChange={(e)=>setPhone(e.target.value)}
                    />
                </div>
                <div className="form-group pt_2">
                    <label>Email</label>
                    <input 
                        type="email" 
                        className={emailf ? "is-invalid form-control" : "form-control"} 
                        placeholder="Email address" 
                        value={email}
                        onChange={(e)=>setEmail(e.target.value)}
                    />
                </div>
                <div className="form-group pt_2">
                    <label>Consent full name</label>
                    <input 
                        type="text" 
                        className={fullNamef ? "is-invalid form-control" : "form-control"} 
                        placeholder="Consent full name" 
                        value={fullName}
                        onChange={(e)=>setFullName(e.target.value)}
                    />
                </div>
                <div className="pt_2 bold6 text-success font_12">
                    Entry fee {process.env.REACT_APP_CURRENCY_SYMBOL}{prices["featured"]}
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
                        <div className="pt_2 text-muted font_12">
                            You consent to receive communications from us electronically. 
                            We will communicate with you by e-mail or phone. You agree 
                            that all agreements, notices, disclosures, and other 
                            communications that we provide to you electronically satisfy 
                            any legal requirement that such communications be in writing.
                        </div>
                        <div className="pt_2 text-muted font_12">
                            Applicants will pay <span className="bold6 text-muted font_12">$50 Entry Fee</span>
                        </div>
                        <div className="pt_2 text-muted font_12">
                            ONCE ENTRY IS COMPLETE your photo(s) will post publicly on Facebook/Instagram.
                        </div>
                        <div className="pt_2 text-muted font_12">
                            Your personal information is confidential, we will not share it. We need your information to confirm this is a real person and that you authorized the feature of a minor in the magazine. 
                        </div>
                        <div className="pt_2 text-muted font_12">
                            Pictures without photographer credit will not be published.
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
                    Submit
                </button>
            </Modal.Footer>
        </Modal>
    </div>
  )
}

export default GetFeatured