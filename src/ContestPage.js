import React, { useEffect, useState } from 'react'
import Navbar from './Navbar'
import ContestantList from './ContestantList'
import Footer from './Footer'
import { useDispatch, useSelector } from 'react-redux'
import { contestAction } from './Action'
import { IS_DEV } from './Constant'
import DateFormatter from './DateFormatter'
import Loader2 from './Loader2'
import Message from './Message'
import Empty from './Empty'
import IsEmpty from './IsEmpty'
import { useParams } from 'react-router-dom'
import moment from 'moment'


const ContestPage = () => {
    const {id} = useParams();
    const dispatch = useDispatch()
    const contest = useSelector(state => state.contest)
    const {loading,error,value} = contest
    const [demo, setDemo] = useState("")
    const [contestOver, setContestOver] = useState(false)
    const winnerPrice = (x)=> x.split(",,")

    // let countDownDate = new Date(value ? value.end_date : "Jan 5, 2090 15:37:25").getTime();
    // let countDownDate = moment.utc(value ? value.end_date : "2090-01-05T15:37:25").valueOf();
    let countDownDate = moment.utc(value ? value.end_date : moment().utc()).valueOf();

    let x = value ? setInterval(function() {

        let now = moment.utc().valueOf();

        let distance = countDownDate - now;

        let days = Math.floor(distance / (1000 * 60 * 60 * 24));
        let hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        let seconds = Math.floor((distance % (1000 * 60)) / 1000);

        setDemo({days,hours,minutes,seconds})
        if (distance < 0) {
            clearInterval(x);
            setContestOver(true);
            setDemo("This contest is over");
        }
    }, 1000): "00:00:00"


    useEffect(()=>{
        if (!value){
            dispatch(contestAction(id))
        }
    },[id])
    
    return (
        <div>
            <Navbar />
            {loading && <div className='standard_width'><Loader2 /></div>}
            {error && <Message variant={"danger"}>Error: Something went wrong.</Message>}
            {!IsEmpty(value) &&
                <div className='standard_width VAR'>
                    {value.banner_image && (
                        <div className='contestPage'>
                            <img className='imgContest' src={IS_DEV ? value.banner_image : `${process.env.REACT_APP_BASE_URL}${value.banner_image}`} alt="Event" />
                        </div>
                    )}
                    
                    <div className='contestImg'>
                        <img className={value.banner_image ? "userIg center_imager" : "userIg2 center_imager"} src={IS_DEV ? value.cover_image : `${process.env.REACT_APP_BASE_URL}${value.cover_image}` } alt="Contest" />
                        <div className='contestDescription'>
                            <div className="font_32 bold6">
                                {value.name_of_event}
                            </div>
                            <div className='pt_2'>
                                <div className="bold5 bold6">
                                    {contestOver ? 
                                        <span className='text-danger'>Contest Over</span> 
                                    : 
                                        <>
                                            <div className='font_20'>
                                                Time left to vote
                                            </div>
                                            <div className='timerHolderContainer'>
                                                <div className='center'>
                                                    <span className='firstCOverTimer'>
                                                        <span>
                                                            {demo.days}
                                                        </span>
                                                    </span>
                                                    <span className="font_12">
                                                        Days
                                                    </span>
                                                </div>
                                                <span>
                                                    <img width="20" height="20" src="https://img.icons8.com/ios-filled/20/E53E7C/colon.png" alt="colon"/>
                                                </span>
                                                <div className='center'>
                                                    <span className='firstCOverTimer'>
                                                        <span>
                                                            {demo.hours}
                                                        </span>
                                                    </span>
                                                    <span className='font_12'>
                                                        Hours
                                                    </span>
                                                </div>
                                                <span>
                                                    <img width="20" height="20" src="https://img.icons8.com/ios-filled/20/E53E7C/colon.png" alt="colon"/>
                                                </span>
                                                <div className='center'>
                                                    <span className='firstCOverTimer'>
                                                        <span>
                                                            {demo.minutes}
                                                        </span>
                                                    </span>
                                                    <span className='font_12'>
                                                        Minutes
                                                    </span>
                                                </div>
                                                <span>
                                                    <img width="20" height="20" src="https://img.icons8.com/ios-filled/20/E53E7C/colon.png" alt="colon"/>
                                                </span>
                                                <div className='center'>
                                                    <span className='firstCOverTimer'>
                                                        <span>
                                                            {demo.seconds}
                                                        </span>
                                                    </span>
                                                    <span className='font_12'>
                                                        Seconds
                                                    </span>
                                                </div>
                                            </div>
                                        </>
                                    }
                                </div>
                            </div>
                            <div className='pt_2'>
                                <img width="20" height="20" src="https://img.icons8.com/ios-filled/20/CF0C36/calendar--v1.png" alt="calendar--v1"/>
                                <span className="bold5 pl_1 bold6">
                                    <DateFormatter date={value.start_date} contest /> - <DateFormatter date={value.end_date} contest />
                                </span>
                            </div>
                            <div className='pt-2'>
                                <img width="20" height="20" src="https://img.icons8.com/fluency-systems-filled/20/CF0C36/trophy.png" alt="trophy"/>
                                <span className="bold5 pl_1 bold6">
                                    {value.contestants.length} Contestants
                                </span>
                            </div>
                            
                        </div>
                    </div>
                    {value.winner_price &&
                        <div className="pt_3 bold6">
                            <span className='pr_1 font_22 bold7 red'>
                                Winners Price:
                            </span>
                            
                            <div>
                                <ul>
                                    {winnerPrice(value.winner_price).map((value,index) =>(
                                        <li key={index}>
                                            {value}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    }
                    {value.description &&
                        <div className="pt-4">
                            {value.description}
                        </div>
                    }
                    <div className='pt_7'>
                        <div className="red bold6 font_32 mb_5">
                            {contestOver ? "Winners" : "Contestants"}
                        </div>
                        <ContestantList contestOver={contestOver} val={value.contestants} voteVal={value.price_per_vote} />
                    </div>
                </div>
            }
                
            {IsEmpty(value) && !loading && <div className='standard_width'><Empty data={"No contest at the moment"} /></div>}
            
            {!loading && value && !contestOver && <div className="standard_width mt-5 alert alert-warning font_12">
                <img className='mr-2' width="25" height="25" src="https://img.icons8.com/ios-filled/25/533F03/high-priority.png" alt="high-priority"/> No Refunds, no portion of any vote fees or payments of any kind whatsoever previously provided to Kids Multicultural World shall be owed or be repayable to Purchaser or Voters. All votes go towards AMERICA NATION MULTICULTURAL WORLD FOUNDATION ORG.
            </div>}
            <Footer />
        </div>
    )
}

export default ContestPage