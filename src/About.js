import React from 'react'
import Navbar from './Navbar';
import Footer from './Footer'
import { Helmet } from 'react-helmet-async';

const About = () => (
    <div>
        <Helmet>
            <title>About Us - Kids Multicultural World</title>
            <meta 
                name="description" 
                content="Kids Multicultural World Academy is a global youth leadership and talent-development academy coaching children to become confident leaders and global citizens. We unite kids from diverse cultures through education, creativity, and cultural activism, empowering the next generation to lead with purpose, pride, and compassion. Serving children ages 0–17, we offer leadership training, fashion, modeling, acting, media education, mentorship, bi-weekly magazines, and international fashion shows and festivals." 
            />
        </Helmet>
        <Navbar />
        <div className='standard_width'>
            {/* <div className="aboutLander">
                <div>
                    <div className="font_40 bold8 text-white">
                        KIDS MULTICULTURAL WORLD
                    </div>
                    <div className='font_22 bold6 py_2 text-white'>
                        Enhancing and bringing out kids talents.
                    </div>
                    <div>
                        <Link to={"/sign_up"} className="aboutSign_upBtn">
                            Enroll Now
                        </Link>
                    </div>
                </div>
                <div className='flex'>
                    <div className='enrol_mag_container'>
                        <div className="font_12 bold7 text-white">
                            Magazine + Fashion
                        </div>
                        <div className="mt_2 font_24 bold7 text-white">
                            Get featured in upcoming magazine
                        </div>
                        <div className='mt_2'>
                            <Link to={"/home"} className="upcoming_mag_Btn">
                                Get Started
                            </Link>
                        </div>
                        <div className='mt_1'>
                            <Link to={"/magazines"}>
                                <ul className='ulMag'>
                                    <li className="text-white">
                                        View magazines
                                    </li>
                                </ul>
                            </Link>
                        </div>
                    </div>
                </div>
            </div> */}
            <div className='aboutLandpg'>
                <img src="/Images/About.jpg" alt="Kids at kids multicultural world event" />
            </div>
            <div className="py_3">
                <div className="standard_in">
                    <div className='font_36 bold6'>
                        About
                    </div>
                    <div className="pt_5 standardTwo justify_me">
                        <div>
                            <div className="font_20 bold6">
                                Kids Multicultural World Academy is a global youth leadership and talent-development academy coaching children to become confident leaders and global citizens. We unite kids from diverse cultures through education, creativity, and cultural activism, empowering the next generation to lead with purpose, pride, and compassion.
                            </div>
                            <div className="pt_3">
                                Serving children ages 0–17, we offer leadership training, fashion, modeling, acting, media education, mentorship, bi-weekly magazines, and international fashion shows and festivals.
                            </div>
                        </div>
                        <div>
                            <div className="pt_4">
                                Founded in 2017 by Queen Ambassador Dr. Krystal Chanchangi, Global Cultural Activist and youth advocate, Kids Multicultural World has empowered 38,000+ children worldwide, shaping future leaders, creatives, and changemakers.
                            </div>
                        </div>
                    </div>
                    {/* <div className="padAbtpix">
                        <div className="about_pix_container">
                            <div>
                                <div className='aboutPix1 flex'>
                                    <img src="/Images/replaced_img1.PNG" alt="Kids at Kids multicultural world" />
                                </div>
                                <div className='aboutPix2 flex'>
                                    <img src="/Images/replaced_img3.jpeg" alt="Kids at Kids multicultural world" />
                                </div>
                            </div>
                            <div>
                                <div className='pt_6 aboutPix3'>
                                    <img src="/Images/replaced_img2.PNG" alt="Kids at Kids multicultural world" />
                                </div>
                                <div className="mt_1 aboutPix4">
                                    <img src="/Images/kidsWorldGroup.jpeg" alt="Kids world Group" />
                                </div>
                            </div>
                        </div>
                    </div> */}
                </div>
            </div>
        </div>
        
        <Footer />
    </div>
)

export default About