import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import DashboardNav from './DashboardNav'
import SideBar from './SideBar'
import { useDispatch, useSelector } from 'react-redux'
import { dashboardAction } from './Action'
import EventList from './EventList'
import MagazineList from './MagazineList'
import prices from "./PricesOfSubscription"
import Message from './Message'
import Loader2 from './Loader2'

const Dashboard = () => {
    const history = useNavigate()
    const userLogin = useSelector(state=> state.userLogin)
    const {userInfo} = userLogin
    const dispatch = useDispatch()
    
    const dashboard = useSelector(state => state.dashboard)
    const {loading,error,subscriptions,events,magazine} = dashboard
    useEffect(()=>{
        dispatch(dashboardAction())
    },[])

    useEffect(()=>{
        if (!userInfo){
            history(`/login?redirect=/dashboard`)
        }
    },[userInfo])
    const checkSubscribed = (value)=>{
        try{
            const result = subscriptions.filter((sub) => (sub.name === value));
            return  result[0].name ? true : false
        }catch (e){
            return false
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
                <div className='mainContentDashboard'>
                    {error && <div><Message variant={"danger"}>Error: Something went wrong.</Message></div>}
                    {loading && <Message variant={"primary"}><Loader2 /></Message>}
                    <div className='classessContent_subs shadow-sm p-1'>
                        <div className="py-1 bold6 font_18 pl_1">
                            Classes
                        </div>
                        {subscriptions && 
                            <>
                                <div className="plansContainerInfos shadow-sm relative">
                                    <div className="">
                                        <div className="font_12 bold6 center">
                                            MODELLING CLASS
                                        </div>
                                        <div className='center'>
                                            <span className="font_16 bold7 blue">
                                                {process.env.REACT_APP_CURRENCY_SYMBOL}{prices["modelling"]}
                                            </span>
                                            <span className="font_14 bold7">
                                                /mth
                                            </span>
                                        </div>
                                        <div className=" bold5 font_11 center">
                                            Active
                                        </div>
                                        <div className="pt_1">
                                            {checkSubscribed("modelling") ? 
                                                <span className="subscribe_btns sbs bg-light font_14 bold7 text-muted border-sm">
                                                    Enrolled
                                                </span>
                                            :
                                                <Link to={"/modelling-classes"} className="subscribe_btns font_14 bold7 recolor">
                                                    Enrol
                                                </Link>
                                                
                                            }
                                        </div>
                                    </div>
                                </div>
                                <div className="pt_1">
                                    <div className="plansContainerInfos shadow-sm relative">
                                        <div className="">
                                            <div className="font_12 bold6 center">
                                                ACTING CLASS
                                            </div> 
                                            <div className='center'>
                                                <span className="font_16 bold7 blue">
                                                    {process.env.REACT_APP_CURRENCY_SYMBOL}{prices["acting"]}
                                                </span>
                                                <span className="font_14 bold7">
                                                    /mth
                                                </span>
                                            </div>
                                            <div className=" bold5 font_11 center">
                                                Active
                                            </div>
                                            <div className="pt_1">
                                                {checkSubscribed("acting") ? 
                                                    <span className="subscribe_btns sbs bg-light font_14 bold7 text-muted border-sm">
                                                        Enrolled
                                                    </span>
                                                :
                                                    <Link to={"/acting-classes"} className="subscribe_btns font_14 bold7 recolor">
                                                        Enrol
                                                    </Link>
                                                    
                                                }
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="pt_1">
                                    <div className="plansContainerInfos shadow-sm relative">
                                        <div className="">
                                            <div className="font_12 bold6 center">
                                                LIFE SKILLS
                                            </div>
                                            <div className='center'>
                                                <span className="font_16 bold7 blue">
                                                    {process.env.REACT_APP_CURRENCY_SYMBOL}{prices["skills"]}
                                                </span>
                                                <span className="font_14 bold7">
                                                    /mth
                                                </span>
                                            </div>
                                            <div className=" bold5 font_11 center">
                                                Active
                                            </div>
                                            <div className="pt_1">
                                                <div className="pt_1">
                                                    {checkSubscribed("skills") ? 
                                                        <span className="subscribe_btns sbs bg-light font_14 bold7 text-muted border-sm">
                                                            Enrolled
                                                        </span>
                                                    :
                                                        <Link to={"/life-skills"} className="subscribe_btns font_14 bold7 recolor">
                                                            Enrol
                                                        </Link>
                                                        
                                                    }
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </>
                        }
                    </div>
                    <div>
                        <div className="flex">
                            <span className="font_20 bold6">
                                Magazines <span className='text-primary font_12'>(new)</span>
                            </span>
                            <Link to={"/magazines"} className="blue left_auto font_12 pt_05 bold7">
                                View all
                            </Link>
                        </div>
                        <MagazineList mags={magazine} />
                    </div>
                    <div>
                        <div className="flex">
                            <span className="font_20 bold6">
                                Upcoming Events
                            </span>
                            <Link to={"/events"} className="blue left_auto font_12 pt_05 bold7">
                                View all
                            </Link>
                        </div>
                        
                        <EventList events={events} />
                        
                    </div>
                </div>
                <div className="bold9 font_14 pl_3">
                    {/* Subscriptions */}
                </div>
                <div className="bootDesign">
                    {/* <div className='bootContent'>
                        <div className="plansContainerInfo shadow-sm">
                            <div className="spand shadow-sm">
                                <div></div>
                            </div>
                            <div className="pt_1 ml_2">
                                <div className="bold6 font24">
                                    Product Plan tier one
                                </div>
                                <div>
                                    <Link to={"/home"} className="subscribe_btn">
                                        <span className="font_14 bold6 text-muted">
                                            Read more
                                        </span>
                                    </Link>
                                </div>
                            </div>
                        </div>
                        <div className="plansContainerInfo shadow-sm">
                            <div className="spand shadow-sm">
                                <div></div>
                            </div>
                            <div className="pt_1 ml_2">
                                <div className="bold6 font24">
                                    Product Plan tier one
                                </div>
                                <div>
                                    <Link to={"/home"} className="subscribe_btn">
                                        <span className="font_14 bold6 text-muted">
                                            Read more
                                        </span>
                                    </Link>
                                </div>
                            </div>
                        </div>
                        <div>
                            <div className="plansContainerInfo shadow-sm">
                                <div className="spand shadow-sm">
                                    <div></div>
                                </div>
                                <div className="pt_1 ml_2">
                                    <div className="bold6 font24">
                                        Product Plan tier one
                                    </div>
                                    <div>
                                        <Link to={"/home"} className="subscribe_btn">
                                            <span className="font_14 bold6 text-muted">
                                                Unsubscribe
                                            </span>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="ClassicItemsSales sm">
                            <img src="/Images/HairBonnets.jpeg" alt="" />
                        </div>
                    </div> */}
                    <div></div>
                    <div className="ClassicItemsSales">
                        <Link to={"/shop"}>
                            <img src="/Images/HairBonnets.jpeg" alt="Hair bonnet" />
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Dashboard