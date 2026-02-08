import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Footer from './Footer'
import Navbar from './Navbar'
import IsEmpty from './IsEmpty'
import { cartAddAction } from './Action'
import { useDispatch, useSelector } from 'react-redux'
import Loader from './Loader'
import Message from './Message'
import Spliter from './Spliter'

const Cart = () => {
    const dispatch= useDispatch()

    const cartAdd = useSelector(state => state.cartAdd)
    const {loading,error,cart} = cartAdd
    const calcItems = (cart && !IsEmpty(cart)) ? cart.reduce((x,item)=>x + Number(item.counter),0) : 0

    useEffect(() => {
        dispatch(cartAddAction())
    }, []);
    const [cartti,setCart] = useState(cart ? cart : [])
    
    useEffect(() => {
        setCart(cart)
    }, [cart]);

    const addTocartHandler = (x)=>{
        let cartfilt = cart ? cart.filter(m =>m.id === x.id) : ""
        if(cartfilt && !IsEmpty(cartfilt)){
            let cartin = 0
            cart.map((k,nn)=>{
                if (k.id === x.id){
                    cartin = nn
                }
                return null
            })
            if ((x.amount_available >= cart[cartin].counter + 1) || !(x.amount_available)){
                cart[cartin].counter = cart[cartin].counter + 1
            }
            localStorage.setItem(`cartUserItems`, JSON.stringify(cart))
            addCheck(x)
            dispatch(cartAddAction())
        }else{
            if (!cart){
                x.counter = 1
                localStorage.setItem(`cartUserItems`, JSON.stringify([x]))
                addCheck(x)
                dispatch(cartAddAction())
            }else{
                x.counter = 1
                cart.unshift(x)
                localStorage.setItem(`cartUserItems`, JSON.stringify(cart))
                addCheck(x)
                dispatch(cartAddAction())
            }
        }
        setCart(JSON.parse(localStorage.getItem(`cartUserItems`)))

    }
    const removeTocartHandler = (x)=>{
        if(cart){
            let cartin = 0
            cart.map((k,nn)=>{
                if (k.id === x.id){
                    cartin = nn
                }
                return null
            })
            if ((cart[cartin].counter - 1 > 0)){
                cart[cartin].counter = cart[cartin].counter - 1
            }
            
            localStorage.setItem(`cartUserItems`, JSON.stringify(cart))
            addCheck(x)
            setCart(JSON.parse(localStorage.getItem(`cartUserItems`)))
            dispatch(cartAddAction())
        }

    }
    const removeItem = (x) =>{
        if(cart){
            let cartin = 0
            cart.map((k,nn)=>{
                if (k.id === x.id){
                    cartin = nn
                }
                return null
            })

            cart.splice(cartin,1)

            localStorage.setItem(`cartUserItems`, JSON.stringify(cart))
            addCheck(x)
            setCart(JSON.parse(localStorage.getItem(`cartUserItems`)))
            dispatch(cartAddAction())
        }
    }
    

    const addCheck =(x)=>{
        // let cart = JSON.parse(localStorage.getItem(`cartUserItems`));
        let cartfilt = cart ? cart.filter(m =>m.id === x.id) : ""
        
        if(cartfilt && !IsEmpty(cartfilt)){
            return cartfilt[0].counter
        }
    }

    const calcPrices = (cart && !IsEmpty(cart))? cart.reduce((x,item)=>x + (Number(item.price) * Number(item.counter)),0).toFixed(2) : null
    
  return (
    <div style={{backgroundColor: "#eceefc"}}>
        <Navbar />
        <div className="p-2"></div>
        {error && <Message variant={"danger"}>Error! Please try again.</Message>}
        <div className="cart_container xs">
            <div className="cart_body shadow">
                <div className='cart_headerTit'>
                    Cart({cart ? cart.length : 0})
                </div>
                {loading && <Loader />}
                {cart && cart.map(x=>(
                    <div className='cart_divider' key={x.id}>
                        <div className="cart_dividers">
                            <Link to={`/item-detail/${x.id}`}>
                                <div>
                                    <img src={`${x.cover_image}`} alt="Cart Item" />
                                </div>
                            </Link>
                            <div>
                                <div className='pl_1'>
                                    <Link to={`/item-detail/${x.id}`}>
                                        <div className="bold7 font_18">
                                            {x.name}
                                        </div>
                                    </Link>
                                    <div className="font_14 bold5">
                                        Size: {x.sizeSelected ? x.sizeSelected : Spliter(x.size,",")[0]} 
                                    </div>
                                    <div className="font_14 bold5">
                                        Color: {x.sizeColor ? x.sizeColor : Spliter(x.color,",")[0]} 
                                    </div>
                                    <div className="mt_1 font_20 text-success">
                                        ${x.price}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="pt_2 flex">
                            <div className='flex'>
                                {addCheck(x) > 1 ? 
                                    <button className='pointer' onClick={()=>removeTocartHandler(x)}>
                                        -
                                    </button>
                                :
                                    <button className='pointer text-muted'>
                                        -
                                    </button>
                                }
                                <samp className='px_1'>
                                    {addCheck(x)}
                                </samp>
                                <button className='pointer' onClick={()=>addTocartHandler(x)}>
                                    +
                                </button>
                            </div>
                            <div className='left_auto text-danger bold7 pointer'
                                onClick={()=>removeItem(x)}
                            >
                                Remove
                            </div>
                        </div>
                    </div>
                ))}
                {(cart && IsEmpty(cart)) && 
                    <div className="center">
                        <img src="Images/empty_cart.gif" alt="Empty Cart" />
                    </div>
                }
            </div>
            {(cart && !IsEmpty(cart)) && 
                <div>
                    <div className="cart_body2 shadow">
                        <div className="cart_headerTit">
                            Cart Summary
                        </div>
                        <div className="flex px-3 my_1">
                            <div className='bold5 font_16'>
                                Subtotal
                            </div>
                            <div className="left_auto font_14 bold7 text-success">
                                ${calcPrices}
                            </div>
                            
                        </div>
                        <div className="px-3">
                            <div className="pb-3">
                                <div className="font_14 text-muted">
                                    Delivery fees not included yet.
                                </div>
                                <Link to={"/cart-summary"} className="upcoming_Eevent_btn">
                                    Checkout (${calcPrices})
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            }
        </div>
        <Footer />
    </div>
  )
}

export default Cart