import React, { useState } from 'react'
import Footer from './Footer'
import Navbar from './Navbar'
import IsEmpty from './IsEmpty'
import { DELIVERYFEE } from './Constant'
import { useSelector } from 'react-redux'
import Loader2 from './Loader2'
import checkOutUserInfo from './checkOutUserInfo'
import { useNavigate } from 'react-router-dom'
import Message from './Message'

const CheckoutSummary = () => {

    const cart = JSON.parse(localStorage.getItem(`cartUserItems`))
    const [name,setName] = useState(null)
    const [address,setAddress] = useState(null)
    const [email,setEmail] = useState(null)
    const [phone,setPhone] = useState(null)
    const [country,setCountry] = useState(null)
    const state = "USA"
    const [apartment,setApartment] = useState(null)
    const [city,setCity] = useState(null)
    const [zipcode,setZipcode] = useState(null)

    const [zipcodef,setZipcodef] = useState(null)
    const [cityf,setCityf] = useState(null)
    const [statef,setStatef] = useState(null)
    const [countryf,setCountryf] = useState(null)
    const [namef,setNamef] = useState(null)
    const [addressf,setAddressf] = useState(null)
    const [emailf,setEmailf] = useState(null)
    const [phonef,setPhonef] = useState(null)
    
    const checkout = useSelector(state => state.checkout)
    const {loading,error} = checkout
    const history = useNavigate()
    const addCheck =(x)=>{
        let cart = JSON.parse(localStorage.getItem(`cartUserItems`));
        let cartfilt = cart ? cart.filter(m =>m.id === x.id) : ""
        
        if(cartfilt && !IsEmpty(cartfilt)){
            return cartfilt[0].counter
        }
    }

    const calcPrices = !IsEmpty(cart) ? cart.reduce((x,item)=>x + (Number(item.price) * Number(item.counter)),0).toFixed(2) : null
    const deliveryFee = Number((DELIVERYFEE).toFixed(2))

    const total = Number(calcPrices) + deliveryFee
    
    
    const payHandler = ()=> {
        checkOutUserInfo({phone,email,address,name,country,state,city,zipcode,apartment})
        
        history(`/checkout/cart-summary/shop`)
    }
    const submitHandler = ()=>{
        if (!name){
            setNamef(true)
        }else{
            setNamef(null)
        }

        if (!address){
            setAddressf(true)
        }else{
            setAddressf(null)
        }

        if (!email){
            setEmailf(true)
        }else{
            setEmailf(null)
        }

        if (!phone){
            setPhonef(true)
        }else{
            setPhonef(null)
        }


        if (!country){
            setCountryf(true)
        }else{
            setCountryf(null)
        }
        if (!state){
            setStatef(true)
        }else{
            setStatef(null)
        }
        
        if (!city){
            setCityf(true)
        }else{
            setCityf(null)
        }
        if (!zipcode){
            setZipcodef(true)
        }else{
            setZipcodef(null)
        }
        

        if (phone && email && address && name && 
            country && state && city && zipcode
        ){
            payHandler()
        }
        
    }
    return (
        <div style={{backgroundColor: "#eceefc"}}>
            <Navbar />
            <div className="p-2"></div>
            {error && <div><Message variant={"danger"}>Something went wrong. Please try again.</Message></div>}
            {(cart && !IsEmpty(cart)) ? 
                <div className="cart_container">
                    <div>
                        <div className="cart_body shadow">
                            <div className='cart_headerTit'>
                                Delivery Information
                            </div>
                            <div className='cart_divider'>
                                <div>
                                    <div className="pb_1 bold6 font_14">
                                        Name
                                    </div>
                                    <input type="text" className={namef===true ? "error" : ""} placeholder='Input name' 
                                        onChange={(e)=>setName(e.target.value)}
                                    />
                                </div>
                                
                                <div>
                                    <div className="py_1 bold6 font_14">
                                        Phone number
                                    </div>
                                    <input type="text" className={phonef ? "error" : ""} placeholder='Input phone number' 
                                        onChange={(e)=>setPhone(e.target.value)}
                                    />
                                </div>
                                <div>
                                    <div className="py_1 bold6 font_14">
                                        Email
                                    </div>
                                    <input type="text" className={emailf ? "error" : ""} placeholder='Input email' 
                                        onChange={(e)=>setEmail(e.target.value)}
                                    />
                                </div>
                                <div>
                                    <div className="py_1 bold6 font_14">
                                        Delivery Address
                                    </div>
                                    <input type="text" className={addressf ? "error" : ""} placeholder='Input delivery address' 
                                        onChange={(e)=>setAddress(e.target.value)}
                                    />
                                    <div>
                                        <input type="text" placeholder='Apt, Suite, Unit, Building(optional)' 
                                            onChange={(e)=>setApartment(e.target.value)}
                                        />
                                    </div>
                                </div>
                                <div>
                                    <div className="py_1 bold6 font_14">
                                        City
                                    </div>
                                    <input type="text" className={cityf ? "error" : ""} placeholder='City' 
                                        onChange={(e)=>setCity(e.target.value)}
                                    />
                                </div>
                                <div>
                                    <div className="py_1 bold6 font_14">
                                        State
                                    </div>
                                    <input type="text" className={statef ? "error" : ""} placeholder='State' 
                                        value={state}
                                    />
                                </div>
                                <div>
                                    <div className="py_1 bold6 font_14">
                                        Country
                                    </div>
                                    <input type="text" className={countryf ? "error" : ""} placeholder='Country' 
                                        onChange={(e)=>setCountry(e.target.value)}
                                    />
                                </div>
                                <div>
                                    <div className="py_1 bold6 font_14">
                                        Zip Code
                                    </div>
                                    <input type="text" className={zipcodef ? "error" : ""} placeholder='Zip Code' 
                                        onChange={(e)=>setZipcode(e.target.value)}
                                    />
                                </div>
                            </div>
                            <div className="cart_divider">
                                <div className="bold7 font_16">
                                    ADDRESS DETAILS
                                </div>
                                <div className="bold6 font_14 pt_1">
                                    {name}
                                </div>
                                <div className="text-muted font_14">
                                    {email}
                                </div>
                                <div className="text-muted font_14">
                                    {address}
                                </div>
                                <div className="text-muted font_14">
                                    {apartment}
                                </div>
                                <div className="text-muted font_14">
                                    {city}, {state}, {country}
                                </div>
                                <div className="text-muted font_14">
                                    {zipcode}
                                </div>
                                <div className="text-muted font_14">
                                    {phone}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div className="cart_body2 shadow">
                            <div className="cart_headerTit">
                                Your Order
                            </div>
                            {cart && cart.map(x=>(
                                <div className='cart_divider'>
                                    <div className="cart_dividersheck">
                                        <div>
                                            <img src={`${x.cover_image}`} alt=" Order" />
                                        </div>
                                        <div>
                                            <div className='pl_1'>
                                                <div className="bold7 font_14">
                                                    {x.name}
                                                </div>
                                                <div className="font_12 bold5">
                                                    Size: {x.size}  
                                                </div>
                                                <div className="font_14 text-success">
                                                    ${x.price}
                                                </div>
                                                <div className="text-muted font_15">
                                                    Qut: {addCheck(x)}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    
                                </div>
                            ))}
                            

                            <div className="flex px-3 my_1">
                                <div className='font_16'>
                                    Subtotal
                                </div>
                                <div className="left_auto font_14 bold7 text-success">
                                    ${calcPrices}
                                </div>
                                
                            </div>
                            <div className="flex px-3 my_1">
                                <div className='font_16'>
                                    Delivery fee
                                </div>
                                <div className="left_auto font_14 bold7 text-success">
                                    ${deliveryFee}
                                </div>
                                
                            </div>
                            <div className="flex px-3 my_1">
                                <div className='bold5 font_16'>
                                    Total
                                </div>
                                <div className="left_auto font_14 bold7 text-success">
                                    ${total}
                                </div>
                                
                            </div>
                            <div className="px-3">
                                <div className="pb-3">
                                    {loading ?
                                        <button className="upcoming_Eevent_btn">
                                            <Loader2 variant={"light"} />
                                        </button>
                                    :
                                        <button onClick={submitHandler} className="upcoming_Eevent_btn">
                                            Checkout (${total})
                                        </button>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            :
                <div className="cart_container">
                    <div className="center cart_body shadow">
                        <img src="Images/empty_cart.gif" alt="Empty Cart" />
                    </div>
                </div>
            }
            <Footer />
        </div>
    )
}

export default CheckoutSummary