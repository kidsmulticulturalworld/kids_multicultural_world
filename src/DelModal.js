import React, { useEffect } from 'react'
import { Modal } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { delAction } from './Action'
import Loader2 from './Loader2'
import Message from './Message'
import { useNavigate } from 'react-router-dom'

const DelModal = (props) => {
    const dispatch= useDispatch()
    const history = useNavigate()

    const delImg = useSelector(state => state.delImg)
    const {loading,error,success} = delImg
    
    const userLogin = useSelector(state=> state.userLogin)
    const {userInfo} = userLogin

    const submitDelImg = ()=>{
        dispatch(delAction({
            id : props.ids,
            link : props.linkk
        }))
    }
    useEffect(()=>{
        if (!userInfo){
            history(`/login?redirect=/profile-edit`)
        }
    },[userInfo])
    return (
        <Modal
            {...props}
            size="sm"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <div>
                <div className='del_img_mod'>
                    <div className='bgWhitee'>
                        <p className="center font_12 bold7 pt_1">
                            Delete {(props && props.Kind) ? props.Kind : "image"}?
                        </p>
                        {loading ? 
                            <button>
                                <Loader2 />
                            </button> 
                        : success ? 
                            <div className='center text-success bold6 font_12'>
                                Success!
                            </div>
                        : error ? 
                            <div>
                                {error && <Message variant={"danger"}>Something went wrong. Please try again.</Message>}
                            </div>
                        :
                            <button onClick={submitDelImg}>
                                Delete
                            </button>
                        }
                    </div>
                </div>
            </div>
        </Modal>
    )
}

export default DelModal