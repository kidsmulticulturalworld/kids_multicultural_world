import React, { useState } from 'react'
import Footer from './Footer'
import ListHoodies from './ListHoodies'
import Navbar from './Navbar'
import Toast from 'react-bootstrap/Toast';


const Hoodies = () => {
    const [show, setShow] = useState(false);
  return (
    <div>
        <Navbar />
        <div className='sticky-top maxWidth'>
            <Toast onClose={() => setShow(false)} show={show} delay={1000} autohide>
                <div className="pt_5">
                    <div className="Toaster">
                        <div className='font_11 bold7 text-white center'>
                            Added to cart
                        </div>
                    </div>
                </div>
            </Toast>
        </div>
        <div className="standard_width">
            <div className="mageHeader">
                <div className="pt_05 font_20 bold6 text-white">
                    Kids Multicultural World Designers Hoodies and T-shirts
                </div>
            </div>
            <div className="pt_5">
                <ListHoodies setMe={setShow} />
            </div>
        </div>
        <Footer />
    </div>
  )
}

export default Hoodies