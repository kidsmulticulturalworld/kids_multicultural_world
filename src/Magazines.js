import React, { useEffect } from 'react'
import Navbar from './Navbar'
import Footer from './Footer'
import { useDispatch, useSelector } from 'react-redux'
import { magazineAction } from './Action'
import DateFormatter from './DateFormatter'
import Message from './Message'
import { Link } from 'react-router-dom'
import Loader from './Loader'
import Empty from './Empty'

const Magazines = () => {
    const dispatch= useDispatch()
    const magazine = useSelector(state => state.magazine)
    const {loading,error,magazines} = magazine

    useEffect(()=>{
        dispatch(magazineAction())
    },[])
    return (
        <div>
            <Navbar />
            <div className="standard_width">
                <div className="mageHeader">
                    <div className="pt_05 font_20 bold6 text-white">
                        Get featured in upcoming magazines
                    </div>
                    <div className='left_auto'>
                        <Link to={"/get-featured"} className="upcoming_mag_Btn2">
                            Get Started
                        </Link>
                    </div>
                    
                </div>
                {loading && <Loader />}
                {error && <Message variant={"danger"}>Something went wrong</Message>}
                <div className="magazin_covers">
                    {error && <Message variant={"danger"}>Error: Something went wrong.</Message>}
                    {magazines && 
                        magazines.map(x =>(
                            <a href={`${x.link}`} target='_blank' rel="noopener noreferrer">
                                <div className='mag shadow'>
                                    <img src={`${x.cover_image}`} alt={x.name} />
                                    <div className="p-3">
                                        <div className="font_12 bold5 text-muted">
                                            <DateFormatter date={x.date} />                           
                                        </div>
                                        <div className="font_15 bold6">
                                            {x.name}
                                        </div>
                                    </div>
                                </div>
                            </a>
                        ))
                    }
                    {(magazines && magazines.length ===0) && <Empty data={"No magazine available"} />}
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default Magazines