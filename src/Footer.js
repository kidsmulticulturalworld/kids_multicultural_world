import React from 'react'
import { Link } from 'react-router-dom'
import { logoutAction } from './Action'
import { useDispatch, useSelector } from 'react-redux'

const Footer = () => {
    const dispatch = useDispatch()
    const userLogin = useSelector(state=> state.userLogin)
    const {userInfo} = userLogin
    const date = new  Date().getFullYear()
  return (
    <div className='bg_footer'>
        <footer className='standard_width'>
            <div className=" standard_in">
                <div className="footer_container">
                    <div>
                        <div>
                            <img src="/Images/kids multicultural logo 2.webp" alt="Logo" />
                        </div>
                        <div className='social_media_logo'>
                            <a className='shadow center' target='_blank' rel="noopener noreferrer" href="https://www.instagram.com/invites/contact/?i=r9f4juooz429&utm_content=9adyr3e">
                                <img src="https://img.icons8.com/ios/24/CF0C36/instagram-new--v1.png" alt='Instagram Icon'/>
                            </a>
                            <a className='shadow center' target='_blank' rel="noopener noreferrer" href="https://www.facebook.com/chicagokidsmulticulturalfashionshow?mibextid=LQQJ4d ">
                                <img src="https://img.icons8.com/ios/24/CF0C36/facebook-new.png" alt='facebook Icon'/>
                            </a>
                            <a className='shadow center' target='_blank' rel="noopener noreferrer" href="https://youtu.be/J0yQiT65bO4">
                                <img src="https://img.icons8.com/ios/24/CF0C36/youtube-play--v1.png" alt='Youtube Icon'/>
                            </a>
                        </div>
                        <div className="footer">
                            {/* <div className="pt_5">
                                <img src="https://img.icons8.com/ios-filled/24/CF0C36/place-marker--v1.png" alt='Icon'/>
                                <span className="pl_2 bold7">
                                    PO BOX : 90042 Henderson NV, 89009
                                </span>
                            </div> */}
                            <div className="pt_1">
                                <img src="https://img.icons8.com/fluency-systems-filled/24/CF0C36/filled-message.png" alt='icon'/>
                                <a href="mailto:global@Kidsmulticulturalworld.org" className="pl_2 bold7">
                                    global@Kidsmulticulturalworld.org
                                </a>
                            </div>
                            <div className="pt_1">
                                <img src="https://img.icons8.com/external-tanah-basah-glyph-tanah-basah/24/CF0C36/external-phone-networking-tanah-basah-glyph-tanah-basah.png" alt='Icon'/>
                                <a href="tel:7086633189" className="pl_2 bold7">
                                    7086633189
                                </a>
                            </div>
                        </div>
                    </div>
                    <div className='otherRoutes footer'>
                        
                        <div>
                            <div className="text-dark bold7 font_20">
                                Routes
                            </div>
                            <div className="pt_3">
                                <p>
                                    <span>
                                        <Link to={"/home"}>
                                            Home
                                        </Link>
                                    </span>
                                </p>
                                <p>
                                    <span>
                                        <Link to={"/about"}>
                                            About
                                        </Link>
                                    </span>
                                </p>
                                <p>
                                    <span>
                                        <Link to={"/shop"}>
                                            Shop
                                        </Link>
                                    </span>
                                </p>
                                <p>
                                    <span>
                                        <Link to={"/magazines"}>
                                            Magazines
                                        </Link>
                                    </span>
                                </p>
                                {/* <p>
                                    <span>
                                        <Link to={"/faqs"}>
                                            FAQs
                                        </Link>
                                    </span>
                                </p> */}
                                <p>
                                    <span>
                                        {userInfo ? 
                                            <Link to={"/dashboard"}>
                                                Dashboard
                                            </Link> 
                                        :
                                            <Link to={"/sign_up"}>
                                                Sign Up
                                            </Link>
                                        }
                                    </span>
                                </p>

                            </div>
                        </div>
                        <div>
                            <div className="text-dark bold7 font_20">
                                Activities
                            </div>
                            <div className="pt_3">
                                <p>
                                    <span>
                                        <Link to={"/model-registration"}>
                                            Model Registration
                                        </Link>
                                    </span>
                                </p>
                                <p>
                                    <span>
                                        <Link to={"/classes"}>
                                            Classes
                                        </Link>
                                    </span>
                                </p>
                                <p>
                                    <span>
                                        <Link to={"/events"}>
                                            Events
                                        </Link>
                                    </span>
                                </p>

                            </div>
                        </div>
                        <div>
                            <div className="text-dark bold7 font_20">
                                Others
                            </div>
                            <div className="pt_3">
                                <p>
                                    <span>
                                        {userInfo ? 
                                            <span className='pointer' onClick={()=>{dispatch(logoutAction(userInfo))}}>
                                                Log out
                                            </span>   
                                        :
                                            <Link to={"/login"}>
                                                Login
                                            </Link>
                                        }
                                    </span>
                                </p>
                                <p>
                                    <span>
                                        <Link to={"/cart"}>
                                            My Cart
                                        </Link>
                                    </span>
                                </p>
                                <p>
                                    {userInfo &&
                                        <span>
                                            <Link to={"/tickets"}>
                                                My Tickets
                                            </Link>
                                        </span>
                                    }
                                </p>
                                <p>
                                    <span>
                                        <Link to={"/terms-of-service"}>
                                            Terms Of Use
                                        </Link>
                                    </span>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="borderTop py_1 bold5 text-muted">
                    © {date} Kidsmulticulturalworld.org
                </div>
            </div>
        </footer>
        {/* <img src="/DelImages/IMG_8392.PNG" alt="" /> */}
    </div>
  )
}

export default Footer