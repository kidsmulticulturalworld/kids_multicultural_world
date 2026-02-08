import React, { useEffect } from 'react'
import Modal from 'react-bootstrap/Modal';
import { kidsDetailsAction } from './Action';
import { useDispatch, useSelector } from 'react-redux';
import Loader from './Loader';
import { Link } from 'react-router-dom';
import Message from './Message';


const ProfileDisplayModal = (props) => {
    const dispatch= useDispatch()
    const kidsDetails = useSelector(state => state.kidsDetails)
    const {loading,error,kid} = kidsDetails

    useEffect(()=>{
        if(props && props.ids && props.ids !==-1 ){
            dispatch(kidsDetailsAction(props.ids))
        }
    },[props])
  return (
    <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        backdrop="static"
        keyboard={false}
    >
        <div className='mdalcontent'>
            <div className='modalImgContainer'>
                {error && <Message variant={"danger"}>Error: Something went wrong.</Message>}
                {loading && 
                    <div className="Center pl_2">
                        <Loader /> 
                    </div>
                }
                {kid && 
                    <img className='center_imager' src={kid.profile_photo ? `${kid.profile_photo}` : (kid.gender === "male" ? "/Images/male_avatar.png" : "/Images/female_avatar.png")} alt={kid.name} />
                }
            </div>
            {kid && 
                <div className='modalProfileInfo'>
                    <div className="profContentt">
                        <div className="border-bottom padPf">
                            <span className="bold8">
                                Age : 
                            </span>
                            {kid.age}
                        </div>
                        <div className="mx-3 pb_2">
                            <div className='font_20 p-1 bold8'>
                                {kid.name}
                            </div>
                            <div className="font_14 bold7 text-muted">
                                {kid.ethnicity}
                            </div>
                            <div className="pt_2 flex">
                                <Link to={`/profile/${kid.id}`} className='aboutSign_upBtn font_14'>
                                    View full profile  
                                </Link>
                            </div>
                        </div>
                    </div>
                    <div className="appearanceContainer">
                        <div className="font_20 bold7">
                            Appearance
                        </div>
                        <div className="div2 font_14 pt_1">
                            <span className='bold7'>
                                Gender
                            </span>
                            <span>
                                {kid.gender}
                            </span>
                            <span className='bold7'>
                                Height
                            </span>
                            <span>
                                {kid.height}'
                            </span>
                            <span className='bold7'>
                                Weight
                            </span>
                            <span>
                                {kid.weight} lbs
                            </span>
                            <span className='bold7'>
                                Eye Color
                            </span>
                            <span>
                                {kid.eye_color}
                            </span>
                            <span className='bold7'>
                                Hair
                            </span>
                            <span>
                                {kid.hair_color}
                            </span>
                            <span className='bold7'>
                                Dress Size
                            </span>
                            <span>
                                {kid.dress_size}
                            </span>
                            
                        </div>
                    </div>
                </div>
            }
        </div>
        <img className='cancelImg' onClick={props.onHide} src="https://img.icons8.com/material-outlined/22/null/delete-sign.png" alt='Icon'/>
    </Modal>
  )
}

export default ProfileDisplayModal