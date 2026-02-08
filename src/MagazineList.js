import React from 'react'
import DateFormatter from './DateFormatter'
import Loader from './Loader'

const MagazineList = ({mags,load}) => {
    return (
        <>
            {load && <Loader variant={"primary"} />}
            {mags && mags.map((x,id)=>(
                <div key={id} className="magazineDashboardContainer pointer"
                    onClick={()=>window.location.href=x.link}
                >
                    <div>
                        <img src={`${x.cover_image}`} alt={x.name} />
                    </div>
                    <div className='border-bottom'>
                        <div className="font_12 bold7">
                            {x.name}
                        </div>
                        <span className='bold6 font_12 text-dark'>
                            Released date :
                        </span>
                        <span className="pl_1 bold6 font_12 text-muted">
                            <DateFormatter date={x.date} />
                        </span>
                        <div className=" bold6 text-success">
                            {process.env.REACT_APP_CURRENCY_SYMBOL}{x.price}
                        </div>
                    </div>
                </div>
            ))}
            
        </>
    )
}

export default MagazineList