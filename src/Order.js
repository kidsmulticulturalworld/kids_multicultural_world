import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import DashboardNav from './DashboardNav'
import SideBar from './SideBar'
import { orderAction } from './Action'
import { useDispatch, useSelector } from 'react-redux'
import Loader from './Loader'
import DateFormatter from './DateFormatter'
import Message from './Message'
import Collapse from 'react-bootstrap/Collapse';
import Form from 'react-bootstrap/Form';
import Paginator from './Paginator'
import IsEmpty from './IsEmpty'

const Order = () => {
    const {pager} = useParams();
    const history = useNavigate()
    const userLogin = useSelector(state=> state.userLogin)
    const {userInfo} = userLogin
    const dispatch = useDispatch()
    const [open, setOpen] = useState(false);
    const [startDate, setStartDate] = useState();
    const [endDate, setEndDate] = useState();
    
    const orders = useSelector(state => state.orders)
    const {loading,error,orders:order,page,pages} = orders
    useEffect(()=>{
        dispatch(orderAction())
    },[])
    useEffect(()=>{
        if (!userInfo){
            history(`/login?redirect=/orders`)
        }
    },[userInfo])
    useEffect(()=>{
        if (startDate && endDate && pager){
            dispatch(orderAction({startDate,endDate,page:pager}))
        }else if(pager){
            dispatch(orderAction({page:pager}))
        }
    },[pager])


    const submitHandler = ()=>{
        if (startDate && endDate){
            dispatch(orderAction({startDate,endDate}))
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
                <div className='mainContentDashboardsubs'>
                    <div className="DashboardTicketsContainer">
                        <div>
                            {error && <Message variant={"danger"}>Error: Something went wrong.</Message>}
                            <div>
                                <div className="font_28 bold6">
                                    My Orders
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
                            {/* Can take just 4 */}
                            {loading && <Loader variant={"primary"}/>}
                            {order && order.map((x)=>(
                                <div className="p-3 border-bottom" key={x.id}>
                                    <div className="font_15 bold7">
                                        {x.name}
                                    </div>
                                    <div className="font_14 text-success">
                                        {process.env.REACT_APP_CURRENCY_SYMBOL}{x.price}
                                    </div>
                                    <div className="font_12 bold6 text-muted">
                                        <DateFormatter date={x.date} />
                                    </div>
                                </div>
                            ))}
                            {(order || !order) && IsEmpty(order) && !loading && !error && <Message variant={"warning"}>No orders</Message>}
                            {pages && <Paginator page={page} pages={pages} route={"orders"} />}
                        </div>
                        <div></div>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default Order