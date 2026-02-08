import React, { useState } from 'react'
import Vote from './Vote'
import { Link } from 'react-router-dom';
import { IS_DEV } from './Constant';

const ContestantList = ({val,voteVal,contestOver}) => {
    const [show, setShow] = useState(false);
    const [value, setValue] = useState("");
    const showModal = (x) =>{
        setValue(x)
        setShow(true);
    }
    return (
        !contestOver ? <div className='VARR'>
            <div className='shop'>
                {val && val.map(x=>(
                    <div className="contestList rounded shadow" key={x.id_}>
                        <Link to={`/contestant/${x.id_}`}>
                            <img className='center_imager rounded' src={IS_DEV ? x.cover_image : `${process.env.REACT_APP_BASE_URL}${x.cover_image}` } alt="Contestant" />
                        </Link>
                        <div className='p-3 borderTops'>
                            <div className="bold6">
                                {x.name}
                            </div>
                            <div className="flex lil">
                                <div className='center3'>
                                    <span className='pr_1'>
                                        Votes : 
                                    </span>
                                    {x.number_of_votes}
                                </div>
                                <div className='left_auto'>
                                    <button onClick={()=>showModal(x)} className='font_12 bold6 btn btn-sm bg_red text-white'>
                                        Vote
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <Vote 
                show={show} 
                onHide={()=>setShow(false)}
                setShow={setShow}
                val={value}
                voteValue={voteVal}
            />
        </div>
        :
        <div className='VARR'>
            <div className='shop'>
                {val && val.slice(0, 3).map(x=>(
                    <div className="contestList rounded shadow" key={x.id_}>
                        <div>
                            <img className='center_imager rounded' src={IS_DEV ? x.cover_image : `${process.env.REACT_APP_BASE_URL}${x.cover_image}` } alt="Contestant" />
                        </div>
                        <div className='p-3 borderTops'>
                            <div className="bold6">
                                {x.name}
                            </div>
                            <div className="flex lil">
                                <div className='center3'>
                                    <span className='pr_1'>
                                        Votes : 
                                    </span>
                                    {x.number_of_votes}
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default ContestantList