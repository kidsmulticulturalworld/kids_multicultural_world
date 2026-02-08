import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Carousel from 'react-bootstrap/Carousel';
import Footer from './Footer'
import Navbar from './Navbar';
import { useDispatch, useSelector } from 'react-redux';
import DateFormatter from './DateFormatter';
import { eventAction } from './Action';
import { Toast } from 'react-bootstrap';
import Message from './Message';
import Empty from './Empty';
import Loader2 from './Loader2';

const Events = () => {

    const dispatch= useDispatch()
    const eventt = useSelector(state => state.eventt)
    const {loading,error,eventt:even} = eventt
    const [show, setShow] = useState(false);

    useEffect(()=>{
        dispatch(eventAction())
    },[])

    return (
        <div>
            <Navbar />
            <div className='standard_width haefa'>
                <Carousel>
                    {even && even.slice(0, 3).map(x=>(
                        <Carousel.Item interval={3000} key={x.id}>
                            <div className="aboutLander2fx" 
                                style={{
                                    background : `linear-gradient(to right, rgba(0,0,0,.6), rgba(0,0,0,.6)),url(${x.cover_image ? x.cover_image : "/Images/andrea-mininni-VLlkOJdzLG0-unsplash.jpg"})`,
                                    backgroundRepeat : "no-repeat",
                                    backgroundSize : "cover" 
                                }}
                            >
                                <div className="font_40 bold8 text-white mt_7 center">
                                    {x.name}
                                </div>
                                <div className='font_22 center bold6 py_1 text-white minWidthCarosel'>
                                    {x.brief_description}
                                </div>
                                <div className="center text-white font_14 bold7">
                                    {/* <DateFormatter date={x.event_date} /> */}
                                    {x.date_in_words}
                                </div>
                                <div className='center pt_1'>
                                    <Link to={`/events-details/${x.id}`} className="aboutSign_upBtn">
                                        More Info
                                    </Link>
                                </div>
                            </div>
                        </Carousel.Item>
                    ))}
                </Carousel>
                <div className='sticky-top maxWidth'>
                    {error &&
                        <Toast onClose={() => setShow(false)} show={show} delay={2000} autohide>
                            <div className="pt_5">
                                <Message variant={"danger"}>Something went wrong. Please try again.</Message>
                            </div>
                        </Toast>
                    }
                </div>
                {loading && <Loader2 />}
                <div className='pt_7'>
                    <div className="font_28 bold6">
                        Upcoming Events
                    </div>
                    <div className="eventGridContainer">
                        {even && even.map((x,index)=>(
                            <div key={index} className='evntCont shadow_sm'>
                                <div>
                                    <Link to={`/events-details/${x.id}`}>
                                        <img src={`${x.cover_image}`} alt="Event" />
                                    </Link>
                                </div>
                                <div className="p-3">
                                    <div className="bold7">
                                        {x.name}
                                    </div>
                                    <div className="red font_14 bold6">
                                        {/* <DateFormatter date={x.event_date} /> */}
                                        {x.date_in_words}
                                    </div>
                                    <div className="font_14 text-muted pt_1">
                                        {x.brief_location1} • {x.brief_location2}
                                    </div>
                                    <div className="text-success bold8">
                                        $ {x.price}
                                    </div>
                                    <div className="pt_1">
                                        <Link to={`/events-details/${x.id}`} className="upcoming_Eevent_btn">
                                            Get Ticket
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))}
                        
                        {(even && even.length ===0) && <Empty data={"No event at the moment"} />}
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default Events