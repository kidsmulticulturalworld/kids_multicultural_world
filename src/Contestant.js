import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import Navbar from './Navbar';
import Vote from './Vote';
import { useDispatch, useSelector } from 'react-redux';
import { contestantAction } from './Action';
import { IS_DEV } from './Constant';
import Loader2 from './Loader2';
import Message from './Message';

const Contestant = () => {
    const {id} = useParams();
    const dispatch = useDispatch()
    const contestant = useSelector(state => state.contestant)
    const {loading,error,value} = contestant
    let url = window.location.origin
    let url_set = `${url}/contestant/${id}`
    const [show, setShow] = useState(false);
    const [showCopied, setShowCopied] = useState(false);
    const showModal = () =>{
        setShow(true);
    }

    const copyLink = () => {
        navigator.clipboard.writeText(url_set)
        setShowCopied(true);
        setTimeout(() => {
            setShowCopied(false);
        }, 1500);
    }
    
    useEffect(()=>{
        dispatch(contestantAction(id))
    },[id])
    return (
        <div>
            <Navbar />
            {loading && <div className='contestantsView'><Loader2 /></div>}
            {error && <div className='contestantsView'><Message variant={"danger"}>Error: Something went wrong.</Message></div>}

            {value &&
                <>
                    <div className="contestantsView">
                        <div className='justify_between p-2'>
                            <span 
                                className='red bold6 pointer'
                                onClick={copyLink}
                            >
                                Copy link
                            </span>
                            {showCopied &&
                                <div className="text-success bold6 font_12">
                                    Copied!
                                </div>
                            }
                            <Link to='/contests'>
                                <img width="35" height="35" src="https://img.icons8.com/ios/35/multiply.png" alt="multiply"/>
                            </Link>
                        </div>
                        <div className='center max_ContestImgH'>
                            <img src={IS_DEV ? value.cover_image : `${process.env.REACT_APP_BASE_URL}${value.cover_image}` } alt={value.name} />
                        </div>
                        <div className='p-3 borderTops'>
                            <div className="bold6">
                                {value.name}
                            </div>
                            <div className="flex">
                                <div className='center3'>
                                    <span className='pr_1'>
                                        Votes : 
                                    </span>
                                    {value.number_of_votes}
                                </div>
                                <div className='left_auto'>
                                    <button onClick={showModal} className='vote font_12 bold6 btn btn-sm bg_red text-white'>
                                        Vote
                                    </button>
                                </div>
                            </div>
                        </div>
                        
                    </div>
                    <Vote 
                        show={show} 
                        onHide={()=>setShow(false)}
                        setShow={setShow}
                        val={value}
                        voteValue={value.vote_price}
                    />
                </>
            }
        </div>
    )
}

export default Contestant