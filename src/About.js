import React from 'react'
import Navbar from './Navbar';
import Footer from './Footer'

const About = () => (
    <div>
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
            <div className="mt_7">
                
                <div className="standardTwo">
                    
                    <div>
                        <div>
                            <span className="blue fonts2 font_34 bold4">
                                ABOUT
                            </span> 
                            <span className="red pl_05 fonts2 font_34 bold4">
                                US
                            </span> 
                        </div>
                        <p className="font_24 pt_3 bold7 justify_me">
                            The Kids Multicultural World is a cultural activism, Fashion , Modeling and Acting Academy focused on Uniting a diverse Nation of Kids ages 0 month - 17 years.
                        </p>
                        <p className="font_20 pt_3 justify_me">
                            We produce a bimonthly magazine, online Modeling & acting classes and host annual Kids
                            Multicultural Fashion Shows & Festivals Worldwide.
                        </p>
                    </div>
                    <div>
                        
                        <p className="font_20 pt_2 justify_me">
                            We educate Kids to take pride in
                            cultural heritage ,bring more awareness to multiculturalism to end discrimination, bullying and segregation- understanding the importance of self-growth, building skills, and capitalizing on their individual talents.
                        </p>
                        <p className="font_20 justify_me">
                            This organization was founded on May 1st, 2017 by CEO .Queen Amb. Dr. Krystal Okeke’Chanchangi. A global
                            cultural activist and voice for the next generation. The
                            Ceo is focused on eliminating discrimination, bullying, and segregation.
                        </p>
                        <p className="font_20">
                            <span className="red">Mission :</span> Uniting a Diverse Nation
                        </p>
                    </div>
                </div>
            </div>
        </div>
        
        <Footer />
    </div>
)

export default About