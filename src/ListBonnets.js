import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { cartAddAction, shopAction } from './Action'
import Loader from './Loader'
import IsEmpty from './IsEmpty'
import Message from './Message'
import { IS_DEV } from './Constant'

const ListBonnets = ({setMe}) => {

    const dispatch= useDispatch()
    const shop = useSelector(state => state.shop)
    const {loading,error,shop:shopp} = shop

    useEffect(()=>{
        dispatch(shopAction())
    },[])

    const addTocartHandler = (x)=>{
        let cart = JSON.parse(localStorage.getItem(`cartUserItems`))
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
            dispatch(cartAddAction())
        }else{
            if (!cart){
                x.counter = 1
                localStorage.setItem(`cartUserItems`, JSON.stringify([x]))
                dispatch(cartAddAction())
            }else{
                x.counter = 1
                cart.unshift(x)
                localStorage.setItem(`cartUserItems`, JSON.stringify(cart))
                dispatch(cartAddAction())
            }
        }

    }
    
    const addCheck =(x)=>{
        let cart = JSON.parse(localStorage.getItem(`cartUserItems`));
        let cartfilt = cart ? cart.filter(m =>m.id === x.id) : ""
        
        if(cartfilt && !IsEmpty(cartfilt)){
            return cartfilt[0].counter
        }
    }
    
    return (
        <div>
            {loading && <Loader />}
            {error && <Message variant={"danger"}>Error: Something went wrong.</Message>}
            <div className="shop">
                {shopp && shopp.map(x=>{
                    if(x.is_bonnet){
                        return(
                            <div className='shadow_sm shop_item disp-Grid' key={x.id}>
                                <Link to={`/item-detail/${x.id}`}>
                                    <img src={IS_DEV ? x.cover_image : `${process.env.REACT_APP_BASE_URL}${x.cover_image}`} alt="Cover" />
                                </Link>
                                <div className="shop_description">
                                    <Link to={`/item-detail/${x.id}`}>
                                        <div className="font_16 bold7">
                                            {x.name}
                                        </div>
                                    </Link>
                                    <div className="font_12 bold5">
                                        {x.size}
                                    </div>
                                    
                                    <div className="flex pt_1">
                                        <div className=" red bold6">
                                            ${x.price}
                                        </div>
                                        {addCheck(x) ?  
                                            <div className="left_auto pointer" onClick={()=>{
                                                addTocartHandler(x)
                                                setMe(true)
                                            }}>
                                                <div className='red pt relative'>
                                                    <span className='font_12 bold7 pr_25'>{addCheck(x)}</span>
                                                    <span className='absoluteAdd red'>+</span>
                                                </div>
                                            </div>
                                        :
                                            <div className="left_auto add_to_cart pointer" onClick={()=>{
                                                addTocartHandler(x)
                                                setMe(true)
                                            }}>
                                                <div className='white'>
                                                    +
                                                </div>
                                            </div>
                                        }
                                    </div>
                                </div>
                            </div>
                        )
                    }
                    return null
                })}
                {(shopp && shopp.length ===0) && <h6 className='text-info bold6'>Sold out</h6>}
            </div>
        </div>
    )
}

export default ListBonnets