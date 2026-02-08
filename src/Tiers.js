import React from 'react'
import { Link } from 'react-router-dom'
import Navbar from './Navbar'

const Tiers = () => {
    // const submitHandler = ()=>{

    // }
    return (
        <div>
            <Navbar />
        
            <div className='loginFormBg'>
                
                <div className="paddForm">
                    <div className="loginContainerBox3">
                        <div className="center red bold4 font_18">
                            Welcome to Kids Multicultural World
                        </div>
                        <div className="text-dark py_1">
                            You are almost ready start.
                        </div>
                        <div className="bold6 font_14">
                            Here are subscription packages you can choose from:
                        </div>
                        <p className='bold6 font_14 pt_1'>
                            - Tier One Gold <span className="font_12 bold6 text-primary"> Read more</span>
                        </p>
                        <p className='bold6 font_14'>
                            - Tier Two Gold <span className="font_12 bold6 text-primary"> Read more</span>
                        </p>
                        <p className='bold6 font_14'>
                            - Tier Three Gold <span className="font_12 bold6 text-primary"> Read more</span>
                        </p>
                        <p className='bold6 font_14'>
                            - Tier Four Gold <span className="font_12 bold6 text-primary"> Read more</span>
                        </p>
                        <div className='pt_1'>
                            <Link className='text-danger bold7' to={"/dashboard"}>
                                Skip
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Tiers