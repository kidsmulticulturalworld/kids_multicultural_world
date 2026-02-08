import React, { useEffect, useState } from 'react'
import Masonry, {ResponsiveMasonry} from "react-responsive-masonry"
import Navbar from './Navbar'
import Footer from './Footer'
import { useDispatch, useSelector } from 'react-redux'
import Loader from './Loader'
import { kidsViewAction } from './Action'
import ProfileDisplayModal from './ProfileDisplayModal'
import Message from './Message'
import Paginator from './Paginator'
import { useParams } from 'react-router-dom'
import Empty from './Empty'

const Kids = () => {
    const {pager} = useParams();

    const dispatch= useDispatch()
    const kidsView = useSelector(state => state.kidsView)
    const {loading,error,page,pages,kids} = kidsView
    const [modalShow, setModalShow] = useState(false);
    const [availId, setAvailId] = useState(-1);

    useEffect(()=>{
        dispatch(kidsViewAction())
    },[])
    useEffect(()=>{
        if(pager){
            dispatch(kidsViewAction({page:pager}))
        }
    },[pager])
    
    return (
        <div className='myMensory'>
            <Navbar />
            {loading && <Loader />}
            {error && <Message variant={"danger"}>Error: Something went wrong.</Message>}
            <ResponsiveMasonry
                columnsCountBreakPoints={{350: 1, 750: 3, 900: 6}}
            >
                <Masonry>
                    {kids && kids.map(x=>(
                        <div className='kidsProfile pointer' 
                            key={x.id} 
                            onClick={() => {
                                setAvailId(x.id)
                                setModalShow(true)
                            }}
                        >
                            <img className='shadow-sm center_imager' src={x.profile_photo ? `${x.profile_photo}` : (x.gender === "male" ? "/Images/male_avatar.png" : "/Images/female_avatar.png") } alt={x.name} />
                        </div>
                    ))}
                </Masonry>
            </ResponsiveMasonry>
            {(kids && kids.length ===0) && <Empty data={"No Kid Found"} />}
            {pages && <Paginator page={page} pages={pages} route={"kids"} />}

            <Footer />
            <ProfileDisplayModal
                ids= {availId}
                show={modalShow}
                onHide={() => setModalShow(false)}
            />
        </div>
    )
}

export default Kids
        
