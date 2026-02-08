import React from 'react'
import DateFormatter from './DateFormatter'
import { useNavigate } from 'react-router-dom'
import Loader from './Loader'

const EventList = ({events,load}) => {
    const history = useNavigate()
    return (
        <>
            {load && <Loader variant={"primary"} />}
            {events && events.map((x,idd)=>(
                <div key={idd} className="eventDashboardContainer pointer border-bottom"
                    onClick={()=>history(`/events-details/${x.id}`)}
                >
                    <div>
                        <img src={`${x.cover_image}`} alt={x.name} />
                    </div>
                    <div >
                        <div className="font_12 bold7">
                            {x.name}
                        </div>
                        <span className='bold6 font_11 text-dark'>
                            Price and Date :
                        </span>
                        <span className="pl_1 text-success bold6 font_14">
                            {process.env.REACT_APP_CURRENCY_SYMBOL}{x.price}
                        </span>
                        <span className="pl_1 bold6 font_11 text-muted">
                            , <DateFormatter date={x.date} />
                        </span>
                        <div className=" font_11 bold8 text-dark">
                            {x.brief_location1} • {x.brief_location2}
                        </div>
                    </div>
                </div>
            ))}
        </>
    )
}

export default EventList