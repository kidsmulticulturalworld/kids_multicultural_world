import React, { useEffect } from 'react'
import Footer from './Footer'
import Navbar from './Navbar'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { IS_DEV } from './Constant'
import { allContestAction } from './Action'
import Message from './Message'
import Loader2 from './Loader2'
import IsEmpty from './IsEmpty'

const AllContest = () => {
    const dispatch = useDispatch()
    const all_contest = useSelector(state => state.all_contest)
    const {loading,error,value} = all_contest
    useEffect(()=>{
        if (!value){
            dispatch(allContestAction())
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[dispatch])
    return (
        <div>
            <Navbar />
            {loading && <div className='standard_width'><Loader2 /></div>}
            {error && <Message variant={"danger"}>Error: Something went wrong.</Message>}
            <div className='standard_width VAR'>
                <div className='pt_7'>
                    <div className="red bold6 font_32 mb_5">
                        Contests
                    </div>
                    <div className='VARR'>
                        <div className='shop'>
                            {!IsEmpty(value) && value.map((val,index) => {
                                if(val.activate){
                                    return (
                                        <div className="contestList rounded shadow" key={index}>
                                            <Link to={`/contest/${val.id}`}>
                                                <img className='center_imager rounded' src={IS_DEV ? val.cover_image : `${val.cover_image}` } alt="Contest" />
                                            </Link>
                                            <div className='p-3'>
                                                <Link to={`/contest/${val.id}`} className="bold6">
                                                    {val.name_of_event}
                                                </Link>
                                            </div>
                                        </div>
                                    )
                                }
                                return null;
                            })}
                        </div>
                    </div>
                </div>
                
            </div>
            <Footer />
        </div>
    )
}

export default AllContest