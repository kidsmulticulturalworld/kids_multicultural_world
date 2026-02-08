import React from 'react'
import { Pagination } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

const Paginator = ({pages,page,route}) => {
  return (pages > 1 &&
    <div className='flex pt_2'>
        <div className="centerx">
            <Pagination>
                {[...Array(pages).keys()].map((x)=>(
                    <LinkContainer 
                        key={x+1}
                        to={`/${route}/${x + 1}`}
                    >
                        <Pagination.Item active={x+1 === page}>
                            {x+1}
                        </Pagination.Item>
                    </LinkContainer>
                ))}
            </Pagination>
        </div>
    </div>
  )
}

export default Paginator