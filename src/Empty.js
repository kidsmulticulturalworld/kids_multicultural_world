import React from 'react'

const Empty = ({data}) => {
    return (
        <div>
            <div className='emptyImg center2'>
                <img src="/Images/empty.gif" alt={data} className='emptyImg' />
            </div>
            <h3 className="center pt_3 text-info bold6">
                {data}
            </h3>
        </div>
    )
}

export default Empty