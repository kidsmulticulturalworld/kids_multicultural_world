import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { cartAddAction, logoutAction } from './Action'
import IsEmpty from './IsEmpty'

const NavDropDown = ({opn,val}) => {
    const dispatch= useDispatch()
    const cartAdd = useSelector(state => state.cartAdd)
    const {cart} = cartAdd
    const calcItems = (cart && !IsEmpty(cart)) ? cart.reduce((x,item)=>x + Number(item.counter),0) : 0

    const userLogin = useSelector(state=> state.userLogin)
    const {userInfo} = userLogin

    useEffect(() => {
        dispatch(cartAddAction())
    }, []);
  return (
    <div className={`${val ? "MyNavDropDown" : "d_none"}`}>
        <div className={`${val ? "translatorcss" : "translatorcss_s"}`}>
            <div className="flex pad_width">
                <Link className='logoContentContaIner' to={"/home"}>
                    <img src="/Images/kids multicultural logo 2.png" alt="Kids Multicultural world logo" />
                </Link>
                <div className="left_auto">
                    <img 
                        onClick={opn} 
                        width="20" 
                        height="20" 
                        src="https://img.icons8.com/ios-filled/20/BD123D/delete-sign--v1.png" 
                        alt="delete-sign--v1"
                    />
                </div>
            </div>
            <div className="pt_1 text-white link_container">
                <Link to={"/"} className='text-dark'>Home</Link>
            </div>
            {userInfo &&
                <div className="pt_1 text-white link_container">
                    <Link to={"/dashboard"} className='text-dark'>Dashboard</Link>
                </div>
            }
            <div className="pt_1 text-white link_container">
                <Link to={"/kids"} className='text-dark'>Kids</Link>
            </div>
            <div className="pt_1 text-white link_container">
                <Link to={"/model-registration"} className='text-dark'>Model Registration</Link>
            </div>
            
            <div className="pt_1 text-white link_container">
                <Link to={"/contests"} className='text-dark'>Contest</Link>
            </div>
            <div className="pt_1 text-white link_container">
                <Link to={"/shop"} className='text-dark'>Shop</Link>
            </div>
            <div className="pt_1 text-white link_container">
                <Link to={"/magazines"} className='text-dark'>Magazine</Link>
            </div>
            
            <div className="pt_1 text-white link_container">
                <Link to={"/events"} className='text-dark'>Upcoming Events</Link>
            </div>
            <div className="pt_1 text-white link_container relative">
                
                <Link to={"/cart"} className='text-dark'>Cart</Link>
                <div className="cartValue2">
                    {calcItems}
                </div>
            </div>
            {userInfo && 
                <>
                    <div className="pt_1 text-white link_container">
                        <Link to={"/profile"} className='text-dark'>Profile</Link>
                    </div>

                    <div className="pt_1 text-white link_container">
                        <Link to={"/tickets"} className='text-dark'>Tickets</Link>
                    </div>
                    <div className="pt_1 text-white link_container">
                        <Link to={"/orders"} className='text-dark'>Orders</Link>
                    </div>
                    <div className="pt_1 text-white link_container">
                        <Link to={"/profile-edit"} className='text-dark'>Settings</Link>
                    </div>
                    <div className="pt_1 text-white link_container">
                        <span 
                            className='text-dark'
                            onClick={()=>{dispatch(logoutAction(userInfo))}}
                        >
                            Logout
                        </span>
                    </div>
                    
                </>
            }
            {!userInfo && 
                <>
                    <div className="pt_1 text-white link_container">
                        <Link to={"/sign-up"} className='text-dark'>Sign Up</Link>
                    </div>
                    <div className="pt_1 text-white link_container">
                        <Link to={"/login"} className='text-dark'>Login</Link>
                    </div>
                </>
            }
        </div>
    </div>
  )
}

export default NavDropDown