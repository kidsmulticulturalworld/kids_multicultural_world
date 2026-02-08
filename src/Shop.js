import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Footer from './Footer'
import Carousel from 'react-bootstrap/Carousel';
import ListHoodies from './ListHoodies';
import ListBonnets from './ListBonnets';
import Navbar from './Navbar';
import Toast from 'react-bootstrap/Toast';


const Shop = () => {
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
            <div className="standard_width haefa">
                <div className='shadow_sm border_radius'>
                    <Carousel>
                        <Carousel.Item interval={3000}>
                            <div className="aboutLander2 shadow_sm">
                                <div>
                                    <div className="font_40 bold8">
                                        Kids Multicultural World T-Shirts And Hoodies
                                    </div>
                                    <div className='pt_2'>
                                        <div className="font_20 bold7 pb-1">
                                            - Designers T-Shirts
                                        </div>
                                        <div className="font_20 bold7">
                                            - Kids Multicultural World Designers Hoodies
                                        </div>
                                        
                                    </div>
                                </div>
                                <img src="/Images/c20a4a_e89814ef8a0e4f37b814a5f37fb4d8cf_mv2.webp" alt="Hoodie" />
                            </div>
                        </Carousel.Item>
                        <Carousel.Item interval={3000}>
                            <div className="aboutLander2 shadow_sm xdf">
                                <div>
                                    <div className="font_40 bold8">
                                        Kids Multicultural World Designers Wears
                                    </div>
                                    <div className='pt_2'>
                                        <div className="font_20 bold7 pb-1">
                                            - Designers T-Shirts
                                        </div>
                                        <div className="font_20 bold7">
                                            - Designers Hoodies
                                        </div>
                                        
                                    </div>
                                </div>
                                <img src="/Images/WhatsApp Image 2023-03-05 at 03.12.48.jpeg" alt="Hoodie" />
                            </div>
                        </Carousel.Item>
                    </Carousel>
                </div>
                {/* <div className="pt_7">
                    <div className="font_24 bold7">
                        Filter
                    </div>

                    <div className="border_filter">
                        <div className="borderRight center py_2 bold7">
                            Hair Bonnet
                        </div>
                        <div className="borderRight center py_2 bold7">
                            Hoodies
                        </div>
                        <div className="borderRight center py_2 bold7">
                            Shirts
                        </div>
                        <div className="borderRight center py_2 bold7">
                            Popular
                        </div>
                    </div>
                </div> */}
                <div className="pt_7">
                    <div className="flex">
                        <div className="font_20 bold7 red">
                            Hair Bonnet
                        </div>
                        <div className="left_auto pt_05">
                            <Link to={"/hair-bonnets"} className="font_14 bold5 balaBlue">
                                View all 
                                <img className='ml_1' src="https://img.icons8.com/material-two-tone/24/null/long-arrow-right.png" alt='Icon'/>
                            </Link>
                        </div>
                    </div>
                    <ListBonnets setMe={setShow} />
                </div>
                <div className="pt_7">
                    <div className="flex">
                        <div className="font_20 bold7 blue">
                            Shirts & Hoodies
                        </div>
                        <div className="left_auto pt_05">
                            <Link to={"/hoodies-n-shirts"} className="font_14 bold5 balaBlue">
                                View all 
                                <img className='ml_1' src="https://img.icons8.com/material-two-tone/24/null/long-arrow-right.png" alt='Icon'/>
                            </Link>
                        </div>
                    </div>
                    <ListHoodies setMe={setShow} />
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default Shop