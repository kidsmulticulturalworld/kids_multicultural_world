import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Footer from './Footer'
import Navbar from './Navbar'
import { useDispatch, useSelector } from 'react-redux'
import { eventDetailAction } from './Action'
import Loader from './Loader'
import DateFormatter from './DateFormatter'
import Modal from 'react-bootstrap/Modal';
import checkOutUserInfo from './checkOutUserInfo'
import Message from './Message'


const EventsDetails = () => {
    const ids = useParams();
    const dispatch= useDispatch()
    const history = useNavigate()
    const [show, setShow] = useState(false);
    const [numTickets, setNumTickets] = useState(1);
    const [emailf,setEmailf] = useState(null)

    const userLogin = useSelector(state=> state.userLogin)
    const {userInfo} = userLogin
    const [email, setEmail] = useState(userInfo ? userInfo.email : '');

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const eventDetail = useSelector(state => state.eventDetail)
    const {loading,error,eventh} = eventDetail

    const [totalPrice, setTotalPrice] = useState(0);


    useEffect(()=>{
        if(ids.id){
            dispatch(eventDetailAction(ids.id))
        }
    },[ids])
    useEffect(()=>{
        if(eventh){
            setTotalPrice(eventh.price)
        }
    },[eventh])
    const submitHandler = ()=>{
        if (!email){
            setEmailf(true)
        }else{
            setEmailf(null)
        }
        if (email){
            checkOutUserInfo({
                phone: eventh.id,
                email,
                address: false,
                name : false
            })
            history(`/checkout/${numTickets}/ticket`)
        }
    }

  return (
    <div className='EVENTS'>
        <Navbar />
        {loading && 
            <div className='loaderBg'>
                <Loader />
            </div>
        }
        {error && <Message variant={"danger"}>Error: Something went wrong.</Message>}
        {eventh && 
            <div className="standard_width">
                <div className="eventImgContainer">
                    <img src={`${eventh.cover_image}`} alt="Event" />
                </div>
                <div className="pt_4">
                    <div className="pb_1 bold8 font_20">
                        <DateFormatter date={eventh.event_date} info />
                    </div>
                    <button className='eventIckets_btn' onClick={handleShow}>
                        Get Ticket ${eventh.price}
                    </button>
                </div>
                <div className="standardEvent">
                    <div className="mt_7 bold6 font_28">
                        {eventh.name}
                    </div>
                    <div className="pt_3">
                        {eventh.brief_description}
                    </div>
                    <div className="mt_3 bold6 font_24">
                        When and where
                    </div>
                    <div className="flex pt_4 xbfd">
                        <div className="shadow p-4">
                            <img src="https://img.icons8.com/cotton/34/null/overtime--v2.png" alt='Icon'/>
                            <div className="pt_1">
                                <div className="font_18 bold7">
                                    Date and time
                                </div>
                                <div className="text-muted font_14 pt_2">
                                    <DateFormatter date={eventh.event_date} infos />
                                </div>
                                <div className="text-muted font_14">
                                    {eventh.startTime ? eventh.startTime : ""}{eventh.end_time ? ` – ${eventh.end_time}` : ""}
                                    {(eventh.startTime || eventh.end_time) ? " CDT" : ""}
                                </div>
                            </div>
                        </div>
                        <div className="shadow p-4 ml_2">
                            <img src="https://img.icons8.com/fluency/34/null/map-marker.png" alt='Icon'/>
                            <div className="pt_1">
                                <div className="font_18 bold7">
                                    Location
                                </div>
                                <div className="text-muted font_14 pt_2">
                                    {eventh.location}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="mt_5 bold6 font_24">
                        More Info About Event
                    </div>
                    <div className="mt_2">
                        {eventh.full_description}
                    </div>
                    <div className="mt_2">
                        {eventh.other_images ? eventh.other_images.map(x=>(
                            <div className='pb_2'>
                                <img src={`${x.image}`} alt="Event Images" />
                            </div>
                        ))
                        :
                            ""
                        }
                        
                    </div>
                </div>
                <button className='eventIckets_btn' onClick={handleShow}>
                    Get Ticket ${eventh.price}
                </button>
            </div>
        }
        <Footer />
        <Modal show={show} fullscreen={"sm-down"} onHide={() => setShow(false)}>
        
            <Modal.Body className='bg-white'>
                {eventh && 
                    <div className='relative'>
                        {eventh.name}
                        <div className="text-muted font_14 pt_2">
                            <DateFormatter date={eventh.event_date} infos />
                        </div>
                        <div>
                            
                            
                            <div className="form-group">
                                <div className='text-muted font_14 py_1'>
                                    Number of Ticket needed (<span className='text-primary bold7'>{numTickets}</span>)
                                </div>

                                <input 
                                    className="form-control w-75"
                                    type="range" 
                                    min="1" 
                                    max="20"
                                    value={numTickets}
                                    onChange={(e)=>{
                                        setNumTickets(e.target.value)
                                        setTotalPrice(e.target.value * eventh.price)
                                    }}
                                />
                                <div className="pt_1">
                                    <input 
                                        className={emailf ? "is-invalid form-control" : "form-control"}
                                        type="email"
                                        placeholder='Input email'
                                        value={email}
                                        onChange={(e)=>{
                                            setEmail(e.target.value)
                                        }}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className='text-muted font_14 bold6 py_1'>
                            Total : <span className="text-success">$</span> {totalPrice}
                        </div>
                        <span onClick={handleClose} className='cencelBtnIcon'>
                            <img width="34" height="34" src="https://img.icons8.com/ios/34/multiply.png" alt="multiply"/>
                        </span>
                        <button className='eventIckets_btn' onClick={submitHandler}>
                            Get Ticket ${totalPrice}
                        </button>

                    </div>
                }
            
            </Modal.Body>
      </Modal>
    </div>
  )
}

export default EventsDetails