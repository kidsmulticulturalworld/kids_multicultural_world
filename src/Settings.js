import React, { useState } from 'react'
import SideBar from './SideBar'
import DashboardNav from './DashboardNav'
import { Link } from 'react-router-dom'

const Settings = () => {
    const [parent,setParent] = useState(false)
    const [passwords,setPasswords] = useState(true)
    const [social,setSocial] = useState(false)
    const [subscription,setSubscription] = useState(false)
    return (
        <div>
            <div>
                <SideBar />
            </div>
            <div className='pt_1'></div>
            <div className='mainContent shadow'>
                <DashboardNav />
                <div className='mainContentDashboardsubs'>
                    <div className="settingsContainer">
                        <div>
                            <div className="font_28 bold6">
                                Settings
                            </div>
                            <div className="flex pb_3 xdv">
                                <div className={parent ? " pointer bold6 pr_1 active" : " pointer bold6 pr_1"}
                                    onClick={()=>{
                                        setParent(true)
                                        setPasswords(false)
                                        setSocial(false)
                                        setSubscription(false)
                                    }}
                                >
                                    Parent Information
                                </div>
                                <div className={passwords ? " pointer bold6 pr_1 active" : " pointer bold6 pr_1"}
                                    onClick={()=>{
                                        setParent(false)
                                        setPasswords(true)
                                        setSocial(false)
                                        setSubscription(false)
                                    }}
                                >
                                    Password
                                </div>
                                <div className={social ? " pointer bold6 pr_1 active" : " pointer bold6 pr_1"}
                                    onClick={()=>{
                                        setParent(false)
                                        setPasswords(false)
                                        setSocial(true)
                                        setSubscription(false)
                                    }}
                                >
                                    Social media
                                </div>
                                <div className={subscription ? " pointer bold6 pr_1 active" : " pointer bold6 pr_1"}
                                    onClick={()=>{
                                        setParent(false)
                                        setPasswords(false)
                                        setSocial(false)
                                        setSubscription(true)
                                    }}
                                >
                                    Subscriptions
                                </div>
                            </div>
                        </div>
                        <div className='settignsContent'>
                            <div className={passwords ? 'shadow setPcont' : "d_none"}>
                                <div className='font_20 bold6'>
                                    Password
                                </div>
                                <div className='pt_2'>
                                    <input type="text" placeholder='Previous password' />
                                </div>
                                <div className="pt_3 grided">
                                    <div>
                                        <input type="text" placeholder='New password'/>
                                    </div>
                                    <div>
                                        <input type="text" placeholder='Confirm password'/>
                                    </div>
                                </div>
                                <div className="pt_2">
                                    <button className="upcoming_mag_Btn_iii">
                                        Submit
                                    </button>
                                </div>
                            </div>
                            <div className={social ? 'shadow setPcont' : "d_none"}>
                                <div className='font_20 bold6'>
                                    Contact Information
                                </div>
                                <span className="font_12 bold7 text-danger">
                                    * Leave empty if not needed
                                </span>
                                <div className='pt_2 grided3'>
                                    <div>
                                        <div className="padSociaDisplay font_11 bold5">
                                            Facebook
                                        </div>
                                        <input style={{fontSize: "10px"}} type="text" placeholder='Facebook profile link' />
                                    </div>
                                    <div>
                                        <div className="padSociaDisplay font_11 bold5">
                                            Instagram
                                        </div>
                                        <input style={{fontSize: "10px"}} type="text" placeholder='Instagram link'/>
                                    </div>
                                    <div>
                                        <div className="padSociaDisplay font_11 bold5">
                                            IMDb
                                        </div>
                                        <input style={{fontSize: "10px"}} type="text" placeholder='IMDb link'/>
                                    </div>
                                </div>
                                <div className="pt_2 grided3">
                                    <div>
                                        <div className="padSociaDisplay font_11 bold5">
                                            Youtube
                                        </div>
                                        <input style={{fontSize: "10px"}} type="text" placeholder='Youtube profile link'/>
                                    </div>
                                    <div>
                                        <div className="padSociaDisplay font_11 bold5">
                                            Portfolio
                                        </div>
                                        <input style={{fontSize: "10px"}} type="text" placeholder='Portfolio link'/>
                                    </div>
                                    <div>
                                        <div className="padSociaDisplay font_11 bold5">
                                            LinkedIn
                                        </div>
                                        <input style={{fontSize: "10px"}} type="text" placeholder='LinkedIn link'/>
                                    </div>
                                </div>
                                <div className="pt_2">
                                    <button className="upcoming_mag_Btn_iii">
                                        Submit
                                    </button>
                                </div>
                            </div>
                            <div className={parent ? 'shadow setPcont' : "d_none"}>
                                <div className='font_20 bold6'>
                                    Parents/Guidian Information
                                </div>
                                <div className='pt_2'>
                                    <input type="text" placeholder='Full name' />
                                </div>
                                <div className='pt_2'>
                                    <input type="text" placeholder='Email address' />
                                </div>
                                <div className="pt_2">
                                    <button className="upcoming_mag_Btn_iii">
                                        Submit
                                    </button>
                                </div>
                            </div>
                            <div className={subscription ? 'shadow setPcont' : "d_none"}>
                                <div className='font_20 bold6'>
                                    Subscriptions
                                </div>
                                <div className="pt_4">
                                    <div className='bootContent'>
                                        <div className="plansContainerInfo shadow-sm">
                                            <div className="spand shadow-sm">
                                                <div></div>
                                            </div>
                                            <div className="pt_1 ml_2">
                                                <div className="bold6 font20">
                                                    Product Plan tier one
                                                </div>
                                                <div>
                                                    <Link to={"/home"} className="subscribe_btn">
                                                        <span className="font_12 bold6 text-muted">
                                                            Read more
                                                        </span>
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="plansContainerInfo shadow-sm">
                                            <div className="spand shadow-sm">
                                                <div></div>
                                            </div>
                                            <div className="pt_1 ml_2">
                                                <div className="bold6 font20">
                                                    Product Plan tier one
                                                </div>
                                                <div>
                                                    <Link to={"/home"} className="subscribe_btn">
                                                        <span className="font_12 bold6 text-muted">
                                                            Read more
                                                        </span>
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="active">
                                            <div className="plansContainerInfo shadow-sm">
                                                <div className="spand shadow-sm">
                                                    <div></div>
                                                </div>
                                                <div className="pt_1 ml_2">
                                                    <div className="bold6 font20">
                                                        Product Plan tier one
                                                    </div>
                                                    <div>
                                                        <Link to={"/home"} className="subscribe_btn">
                                                            <span className="font_12 bold6 text-muted">
                                                                Unsubscribe
                                                            </span>
                                                        </Link>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <img src="/Images/passwords.png" alt="..." />
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default Settings