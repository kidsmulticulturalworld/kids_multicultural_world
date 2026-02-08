import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import checkOutUserInfo from './checkOutUserInfo';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';

const Vote = ({voteValue,val,setShow,...props}) => {
    const [value, setValue] = useState(1)
    const [contestOver, setContestOver] = useState(false)
    const history = useNavigate()
    const payHandler = ()=> {
        checkOutUserInfo({value,id_:val.id_,contestant_name:val.name})
        setShow(false)
        setValue(1)
        history(`/checkout/vote-payment/vote`)
    }
    // let countDownDate = new Date(val ? val.end_date : "Jan 5, 2090 15:37:25").getTime();

    let countDownDate = moment.utc(val ? val.end_date : moment().utc()).valueOf();

    let x = val ? setInterval(function() {
        let now = moment.utc().valueOf();
        let distance = countDownDate - now;
        if (distance < 0) {
            clearInterval(x);
            setContestOver(true);
        }
    }, 1000): "00:00:00"

    return (
        <div>
            <Modal 
                {...props} 
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>{val && val.name}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {contestOver ? 
                        <div className='red bold6'>
                            This contest is over
                        </div>
                    :
                        <div>
                            <div>
                                <span className='bold7 pr_1'>
                                    Contestant Total Votes : 
                                </span>
                                {val && val.number_of_votes}
                            </div>
                            <div className="py-2 red bold6">
                                ${voteValue} per vote
                            </div>
                            <div className="pt_2">
                                <div className='text-success bold7'>
                                    Total cost: ${value * voteValue}
                                </div>
                                <div className="flex payBorder">
                                    <input 
                                        type="number"
                                        value={value}
                                        onChange={(e)=>setValue(e.target.value)}
                                    />
                                    <select
                                        value={value}
                                        onChange={(e)=>setValue(e.target.value)}
                                    >
                                        {Array.apply(null, Array(5000)).map((_,x)=>(
                                            <option value={x+1} key={x+1}>{x+1}</option>
                                        ))}
                                    </select>
                                </div>
                                
                            </div>
                        </div>
                    }
                </Modal.Body>
                <Modal.Footer>
                    {contestOver ?
                        <div />
                    :
                        <button className='vote btn bg_red text-white bold5' onClick={payHandler}>
                            Vote
                        </button>
                    }
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default Vote