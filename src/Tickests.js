import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import DashboardNav from './DashboardNav'
import SideBar from './SideBar'
import { useDispatch, useSelector } from 'react-redux'
import Message from './Message'
import { Collapse } from 'react-bootstrap'
import Form from 'react-bootstrap/Form';
import Paginator from './Paginator'
import Loader from './Loader'
import { eventTicketAction } from './Action'
import DateFormatter from './DateFormatter'
import EventList from './EventList'
import IsEmpty from './IsEmpty'


const Tickests = () => {
    const {pager} = useParams();
    const history = useNavigate()
    const userLogin = useSelector(state=> state.userLogin)
    const {userInfo} = userLogin
    const dispatch = useDispatch()
    const [open, setOpen] = useState(false);
    const [startDate, setStartDate] = useState();
    const [endDate, setEndDate] = useState();
    
    const ticket_list = useSelector(state => state.ticket_list)
    const {loading,error,tickets,events,page,pages} = ticket_list
    
    useEffect(()=>{
        dispatch(eventTicketAction())
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[dispatch])

    useEffect(()=>{
        if (!userInfo){
            history(`/login?redirect=/tickets`)
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[userInfo])

    useEffect(()=>{
        if (startDate && endDate && pager){
            dispatch(eventTicketAction({startDate,endDate,page:pager}))
        }else if(pager){
            dispatch(eventTicketAction({page:pager}))
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[pager, dispatch, startDate, endDate])

    const submitHandler = ()=>{
        if (startDate && endDate){
            dispatch(eventTicketAction({startDate,endDate}))
        }
    }
    
    return (
        <div>
            <div>
                <SideBar />
            </div>
            <div className='pt_1'></div>
            <div className='mainContent shadow'>
                <DashboardNav />
                <div className='mainContentDashboardsubs zaTickets'>
                    <div className="DashboardTicketsContainer">
                        <div>
                            {error && <Message variant={"danger"}>Error: Something went wrong.</Message>}
                            <div>
                                <div className="font_28 bold6">
                                    My Event Tickets
                                </div>
                                <div className=" pointer bold8 blue pb_3"
                                    onClick={() => setOpen(!open)}
                                    aria-controls="example-collapse-text"
                                    aria-expanded={open}
                                >
                                    Filter <img className={open ? 'rotate' : ""} width="18" height="18" src="https://img.icons8.com/material-rounded/18/expand-arrow--v1.png" alt="expand-arrow--v1"/>
                                </div>
                                <Collapse in={open}>
                                    <div id="example-collapse-text">
                                        <Form.Group className="mb-2 w-50" controlId="formBasicPassword">
                                            <Form.Label>Start date</Form.Label>
                                            <Form.Control 
                                                type="date" 
                                                placeholder="Start date" 
                                                onChange={(e)=>setStartDate(e.target.value)}
                                            />
                                        </Form.Group>
                                        <Form.Group className="mb-3 w-50" controlId="formBasicPassword">
                                            <Form.Label>End date</Form.Label>
                                            <Form.Control 
                                                type="date" 
                                                placeholder="End date" 
                                                onChange={(e)=>setEndDate(e.target.value)}
                                            />
                                        </Form.Group>
                                        <button 
                                            className={`btn btn-sm ${(startDate && endDate) ? "bg-primary btn-primary" : 'text-muted'} w-50`}
                                            onClick={submitHandler}
                                        >
                                            Search
                                        </button>
                                    </div>
                                </Collapse>
                            </div>
                            {loading && <Loader variant={"primary"}/>}
                            {tickets && tickets.map((x)=>(
                                <div className="tickets pointer" key={x.id}
                                    onClick={()=>history(`/confirm-tickets/${x.tickets[0].ticket_id}`)}
                                >
                                    <div className="font_15 bold7">
                                        {x.name}
                                    </div>
                                    <div className="font_14 text-muted">
                                        {x.tickets[0].event.location}
                                    </div>
                                    <div className="font_12 bold6 text-muted">
                                        Event date: <DateFormatter date={x.tickets[0].event.event_date} />
                                    </div>
                                    
                                </div>
                            ))}
                            {(tickets || !tickets) && IsEmpty(tickets) && !loading && !error && <Message variant={"warning"}>No Ticket</Message>}
                        </div>
                        <div className='zaTickets'>
                            <div className="flex">
                                <span className="font_20 bold6">
                                    Events
                                </span>
                                <Link to={"/events"} className="blue left_auto font_12 pt_05 bold7">
                                    View all
                                </Link>
                            </div>
                            <EventList events={events} />
                        </div>
                    </div>
                    {pages && <Paginator page={page} pages={pages} route={"tickets"} />}
                </div>
            </div>
        </div>
    )
}

export default Tickests