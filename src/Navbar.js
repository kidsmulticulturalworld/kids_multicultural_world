import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import IsEmpty from './IsEmpty'
import { useDispatch, useSelector } from 'react-redux'
import { cartAddAction, logoutAction } from './Action'
import { Spinner } from 'react-bootstrap'
import NavDropDown from './NavDropDown'

const Navbar = () => {
    const dispatch= useDispatch()
    let {pathname} = useLocation()
    const cartAdd = useSelector(state => state.cartAdd)
    const {cart} = cartAdd
    const calcItems = (cart && !IsEmpty(cart)) ? cart.reduce((x,item)=>x + Number(item.counter),0) : 0
    const userLogin = useSelector(state=> state.userLogin)
    const {userInfo} = userLogin

    const [open, setOpen] = useState(false)
    const opener = () =>{
        setOpen(!open)
        return open
    }
    const logout = useSelector(state=> state.logout)
    const {loading:load} = logout
    useEffect(() => {
        dispatch(cartAddAction())
    }, []);
    useEffect(() => {
        setOpen(false)
    }, [pathname]);
    return (
        <div className='sticky-top bg-white navbaR'>
            <div className="flex standard_width">
                <Link className='logoContentContaIner' to={"/home"}>
                    <img src="/Images/kids multicultural logo 2.png" alt="Kids Multicultural world logo" />
                </Link>
                <div className="left_auto flex right_nav">
                    <span>
                        <Link to={"/about"}>
                            About
                        </Link>
                    </span>
                    <span>
                        <Link to={"/kids"}>
                            Kids
                        </Link>
                    </span>
                    {/* <span>
                        <Link to={"/model-registration"}>
                            Model Registration
                        </Link>
                    </span> */}
                    {/* <span>
                        <div className="hover_Effect">
                            <Link to={"/shop"}>
                                Shop
                            </Link>
                            <samp>
                                <img src="https://img.icons8.com/material-outlined/20/null/expand-arrow--v1.png" alt='Icon'/>
                            </samp>
                            <div className='hover_Effect2'>
                                <div className="drop_Down_container text-dark shadow_sm">
                                    <p>
                                        <Link to={"/hoodies-n-shirts"}>
                                            Hoodie
                                        </Link>
                                    </p>
                                    <p>
                                        <Link to={"/hair-bonnets"}>
                                            Hair Burnet
                                        </Link>
                                    </p>
                                </div>
                            </div>
                        </div>
                        
                    </span> */}
                    <span>
                        <Link to={"/magazines"}>
                            Magazines
                        </Link>
                    </span>
                    <span>
                        <div className="hover_Effect">
                            <Link to={"/classes"}>
                                Registrations
                            </Link>
                            <samp className='saxm'>
                                <img width="20" height="20" src="https://img.icons8.com/ios/20/000000/expand-arrow--v1.png" alt="expand-arrow--v1"/>
                            </samp>
                            <div className='hover_Effect3'>
                                <div className="drop_Down_container text-dark shadow_sm">
                                    {/* <p>
                                        <Link to={"/modelling-classes"}>
                                            Modelling
                                        </Link>
                                    </p> */}
                                    <p>
                                        <Link to={"/model-registration"}>
                                            Model Registration
                                        </Link>
                                    </p>
                                    <p>
                                        <Link to={"/acting-classes"}>
                                            Acting
                                        </Link>
                                    </p>
                                    <p>
                                        <Link to={"/life-skills"}>
                                            Life Skills
                                        </Link>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </span>
                    <span>
                        <div className="hover_Effect">
                            <label className='pointer'>
                                Events
                            </label>
                            <samp className='saxm'>
                                <img src="https://img.icons8.com/material-outlined/20/null/expand-arrow--v1.png" alt='Icon'/>
                            </samp>
                            <div className='hover_Effect3'>
                                <div className="drop_Down_container text-dark shadow_sm">
                                    <p>
                                        <Link to={"/events"}>
                                            Upcoming Events
                                        </Link>
                                    </p>
                                    <p>
                                        <Link to={"/contests"}>
                                            Ongoing Contest
                                        </Link>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </span>
                    <div className='left_auto'>
                        <Link to={"/cart"} className="px_1 relative">
                            <img src="https://img.icons8.com/pastel-glyph/20/null/shopping-cart--v2.png" alt='Icon'/>
                            <div className="cartValue">
                                {calcItems}
                            </div>
                        </Link>
                        {userInfo ? 
                            <>
                                {load ?
                                    <Spinner animation="border" variant={"danger"} />
                                :
                                    <a 
                                        className='pointer px_2 login_btn'
                                        onClick={()=>{dispatch(logoutAction(userInfo))}}
                                    >
                                        Logout
                                    </a>
                                }
                                
                                <Link to={"/dashboard"} className="ml_1 sign_up_btn">
                                    Dashboard
                                </Link>
                            </>
                        :
                            <>
                                <Link to={"/login"} className="px_2 login_btn">
                                    Login
                                </Link>
                                <Link to={"/sign-up"} className="ml_1 sign_up_btn">
                                    Sign Up
                                </Link>
                            </>
                        }
                        
                        <samp>
                            <img 
                                alt='Icon'
                                onClick={opener}
                                src="https://img.icons8.com/material-sharp/24/3491E8/multiline-text.png"
                            />
                        </samp>
                    </div>

                </div>
            </div>
            <NavDropDown opn={opener} val={open} />
        </div>
    )
}

export default Navbar