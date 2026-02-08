import React, { useEffect, useRef } from 'react'
import emailjs from 'emailjs-com';
import { useDispatch, useSelector } from 'react-redux';
import { ticketVerifyAction } from './Action';
import Loader from './Loader';
import Message from './Message';
import DateFormatter from './DateFormatter';

const AllTickets = ({id,link,userEmail="kidsmulticulturalworldkmw@gmail.com"}) => {
    const dispatch = useDispatch()
    const tickets = useSelector(state => state.tickets)
    const {loading,error,ticket,events} = tickets
    useEffect(()=>{
        if (id){
            dispatch(ticketVerifyAction({id,link}))
        }
    },[id])
    const pdfRef = useRef()
    useEffect(() => {
        if (ticket && ticket.tickets && ticket.tickets.length > 0) {
            sendTicketsEmail(ticket.tickets);
        }
    }, [ticket]);
    
    const sendTicketsEmail = (tickets) => {
        // Generate the content for all tickets
        let tkc = tickets[0]
        const ticketsContent = tickets.map((x, index) => ({
            name: x.name,
            location: events.location,
            date_time: `${events.date_in_words}, ${events.startTime || ''}`,
            price: `${process.env.REACT_APP_CURRENCY_SYMBOL}${x.price}`,
            ticket_id: x.ticket_id,
            qr_image: x.qr_image,
        }));
    
        const templateParams = {
            to_name: userEmail,
            names:tkc.name,
            tickets: JSON.stringify(ticketsContent), // Send tickets as JSON string
        };
    
        emailjs
            .send(
                process.env.REACT_APP_SERVICE_ID,
                process.env.REACT_APP_TEMPLATE2,
                templateParams,
                process.env.REACT_APP_SECRETE
            )
            .then(
                (result) => {
                    console.log('Email successfully sent!', result.text);
                },
                (error) => {
                console.log('Failed to send email.', error.text);
                }
            );
    };
    const hostUrl = window.location.host
  return (
    <>
    {loading && <Loader /> }
    {error && <Message variant={"danger"}>Error! Please check email for receipt. Try again if you didn't get the mail.</Message>}
    {ticket &&
        <div className='pt_2'>
            <div ref={pdfRef}>
                {link === "all_tickets" ?
                    <div className='content_Tickets_container'>
                        {ticket.tickets.map((x,index)=>(
                            <div key={index} className='relative shadow-sm tickConatainer'>
                                <div className='tickets_detailerContainer'>
                                    <div className='text_TickestInfo'>
                                        <div className="font_20 bold7">
                                            {x.name}
                                        </div>
                                        <div>
                                            <img width="18" height="18" src="https://img.icons8.com/material/18/marker--v1.png" alt="marker--v1"/>
                                            <span className="font_12 bold5 pl_1">
                                                {events.location}
                                            </span>
                                        </div>
                                        <div>
                                            <img width="18" height="18" src="https://img.icons8.com/ios-filled/18/clock--v1.png" alt="clock--v1"/>
                                            <span className="font_12 bold5 pl_1 text-danger">
                                                Date & Time
                                            </span>
                                            <span className="font_12 pl_1">
                                                {/* <DateFormatter date={events.event_date} /> */}
                                                {events.date_in_words}, 
                                                {events.startTime ? events.startTime : ""}
                                            </span>
                                        </div>
                                        
                                        <div className='pt_1'>
                                            <span className="font_12 bold6">
                                                Price:
                                            </span>
                                            <span className="font_12 pl_1 bold8 text-success">
                                                {process.env.REACT_APP_CURRENCY_SYMBOL}{x.price}
                                            </span>
                                        </div>
                                        <div>
                                            <span className="font_12 bold6">
                                                Ticket ID:
                                            </span>
                                            <span className="font_12 pl_1">
                                                {x.ticket_id}
                                            </span>
                                        </div>
                                    </div>
                                    <div className='p-3'>
                                        <div className="center qrcodeImg">
                                            {hostUrl !== "localhost:3000" ?
                                                (<img src={`${x.qr_image}`} alt={`qr_code ${x.ticket_id}`}/> )
                                            : 
                                                (<img src={`http://localhost:8000${x.qr_image}`} alt={`qr_code ${x.ticket_id}`}/>)
                                             }
                                        </div>
                                        <div className='bold7 font_11 center'>
                                            Scan for more info and verification.
                                        </div>
                                    </div>
                                </div>
                                <img className='ticketImgBg' src="/Images/ticket_bg.svg" alt="." />
                            </div>
                        ))}
                        
                        <div className="extraTicket"></div>
                    </div>
                :
                    <div className='content_Tickets_container'>
                        <div className='relative shadow-sm tickConatainer'>
                            <div className='tickets_detailerContainer'>
                                <div className='text_TickestInfo'>
                                    <div className="font_20 bold7">
                                        {ticket.name}
                                    </div>
                                    <div>
                                        <img width="18" height="18" src="https://img.icons8.com/material/18/marker--v1.png" alt="marker--v1"/>
                                        <span className="font_12 bold5 pl_1">
                                            {events.location}
                                        </span>
                                    </div>
                                    <div>
                                        <img width="18" height="18" src="https://img.icons8.com/ios-filled/18/clock--v1.png" alt="clock--v1"/>
                                        <span className="font_12 bold5 pl_1 text-danger">
                                            Date & Time
                                        </span>
                                        <span className="font_12 pl_1">
                                            <DateFormatter date={events.event_date} />, 
                                            {events.startTime ? events.startTime : ""}
                                        </span>
                                    </div>
                                    
                                    <div className='pt_1'>
                                        <span className="font_12 bold6">
                                            Price:
                                        </span>
                                        <span className="font_12 pl_1 bold8 text-success">
                                            {process.env.REACT_APP_CURRENCY_SYMBOL}{ticket.price}
                                        </span>
                                    </div>
                                    <div>
                                        <span className="font_12 bold6">
                                            Ticket ID:
                                        </span>
                                        <span className="font_12 pl_1">
                                            {ticket.ticket_id}
                                        </span>
                                    </div>
                                </div>
                                <div className='p-3'>
                                    <div className="center qrcodeImg">
                                        <img src={`${ticket.qr_image}`} alt={`qr_code ${ticket.ticket_id}`}/>
                                    </div>
                                    <div className='bold7 font_11 center'>
                                        Scan for more info and verification.
                                    </div>
                                </div>
                            </div>
                            <img className='ticketImgBg' src="/Images/ticket_bg.svg" alt="." />
                        </div>
                    </div>
                }
            </div>
            
        </div>
    }
    </>
  )
}

export default AllTickets