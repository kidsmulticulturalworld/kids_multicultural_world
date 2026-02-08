import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { logoutAction } from './Action'

const SideBar = () => {
    const dispatch = useDispatch()
    const userLogin = useSelector(state=> state.userLogin)
    const {userInfo} = userLogin
  return (
    <div className="navSideBar ">
        <div className='sideBarIconcontainer '>
            <div className="iconsConts">
                <div>
                    <Link to={"/home"}>
                        <img src="https://img.icons8.com/sf-black-filled/44/ffffff/home-page.png" alt='Icon'/>
                    </Link>
                </div>
                <div>
                    <Link to={"/dashboard"}>
                        <img src="https://img.icons8.com/ios-filled/38/ffffff/squared-menu.png" alt='Icon'/>
                    </Link>
                </div>
                <div>
                    <Link to={"/profile"}>
                        <img src="https://img.icons8.com/ios-filled/38/ffffff/name.png" alt='Icon'/>
                    </Link>
                </div>
                <div>
                    <Link to={"/tickets"}>
                        <img src="https://img.icons8.com/ios-filled/38/ffffff/ticket.png" alt='Icon'/>
                    </Link>
                </div>
                <div>
                    <Link to={"/orders"}>
                        <img src="https://img.icons8.com/ios-filled/38/ffffff/package-delivery-logistics.png" alt='Icon'/>
                    </Link>
                </div>
                <div>
                    <Link to={"/profile-edit"}>
                        <img src="https://img.icons8.com/ios-filled/38/ffffff/settings.png" alt='Icon'/>
                    </Link>
                    {/* <Link to={"/settings"}>
                        <img src="https://img.icons8.com/ios-filled/38/ffffff/settings.png"/>
                    </Link> */}
                </div>
                <div>
                    {userInfo ? 
                        <span 
                            className='pointer'
                            onClick={()=>{dispatch(logoutAction(userInfo))}}
                        >
                            <img src="https://img.icons8.com/ios-filled/38/ffffff/logout-rounded.png" alt='Icon'/>
                        </span>
                    :
                        <Link to={"/login"}>
                            <img src="https://img.icons8.com/ios-filled/38/ffffff/logout-rounded.png" alt='Icon'/>
                        </Link>
                    }
                </div>
            </div>
            
        </div>
    </div>
  )
}

export default SideBar