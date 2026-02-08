import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import IsEmpty from './IsEmpty'
import { cartAddAction, kidsDetailsAction } from './Action'
import NavDropDown from './NavDropDown'

const DashboardNav = () => {
    const dispatch= useDispatch()
    const history = useNavigate()
    const userLogin = useSelector(state=> state.userLogin)
    const {userInfo} = userLogin
    const cartAdd = useSelector(state => state.cartAdd)
    const {cart} = cartAdd
    const calcItems = (cart && !IsEmpty(cart)) ? cart.reduce((x,item)=>x + Number(item.counter),0) : 0
    const kidsDetails = useSelector(state => state.kidsDetails)
    const {kid} = kidsDetails
    const [open, setOpen] = useState(false)

    const opener = () =>{
        setOpen(!open)
        return open
    }

    useEffect(() => {
        dispatch(cartAddAction())
    }, []);
    useEffect(()=>{
        if(userInfo){
            dispatch(kidsDetailsAction(userInfo.p_id))
        }
    },[userInfo])
  return (
    <div className='navbarStickyTop sticky-top bg-white'>
        <div className='dashNavs'>
            <div>
                <Link className='logoContentContaIner' to={"/home"}>
                    <img src="/Images/kids multicultural logo 2.png" alt="logo" />
                </Link>
            </div>
            <div className="left_auto flex">
                <div className="dashNavLinks">
                    <Link to={"/classes"} className="bold6 blue">
                        Classes
                    </Link>
                </div>
                <div className="dashNavLinks">
                    <Link to={"/events"} className="bold6 blue">
                        Events
                    </Link>
                </div>
                <div className="dashNavLinks">
                    <Link to={"/magazines"} className="bold6 blue">
                        Magazines
                    </Link>
                </div>
                <div className="px_2">
                    <div className="iconser shadow-sm possitionIconizer">
                        <Link to={"/cart"} className="relative">
                            <img src="https://img.icons8.com/pastel-glyph/30/null/shopping-cart--v2.png" alt='Icon'/>
                            <div className="cartValue">
                                {calcItems}
                            </div>
                        </Link>
                    </div>
                </div>
                <div className='px_1'>
                    {kid && 
                        <img 
                            src={kid.profile_photo ? `${kid.profile_photo}` : (kid.gender === "male" ? "/Images/male_avatar.png" : "/Images/female_avatar.png")} 
                            alt={kid.name} 
                            onClick={()=>history("/profile")}
                            className='iconser shadow-sm pointer center_imager'
                        />
                    }
                </div>
                <Link to={"/cart"} className="px_1 relative cativ">
                    <img src="https://img.icons8.com/pastel-glyph/20/null/shopping-cart--v2.png" alt='Icon'/>
                    <div className="cartValue">
                        {calcItems}
                    </div>
                </Link>
                <samp className='pl_1'>
                    <img 
                        onClick={opener}
                        src="https://img.icons8.com/material-sharp/24/3491E8/multiline-text.png" 
                        className='pointer'
                        alt='...'
                    />
                </samp>
            </div>
        </div>
        <NavDropDown opn={opener} val={open} />
    </div>
  )
}

export default DashboardNav