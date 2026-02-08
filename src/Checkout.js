import React, { useEffect, useState } from 'react'
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { checkoutAction } from './Action';
import PaymentForms from './PaymentForms';
import { DELIVERYFEE } from './Constant';
import IsEmpty from './IsEmpty';
import Loader2 from './Loader2';
import Navbar from './Navbar';
import Message from './Message';

const stripePromise = loadStripe(process.env.REACT_APP_STRIP_PUBLIC_KEY);

export const Checkout = () => {
    const [clientSecret, setClientSecret] = useState("");
    const {link,type} = useParams();
    const dispatch = useDispatch()
    const checkout = useSelector(state => state.checkout)
    const {loading,error,result} = checkout

    const cart = JSON.parse(localStorage.getItem(`cartUserItems`))
    const persomInfo = JSON.parse(localStorage.getItem(`checkOutUserInfo`))

    const calcPrices = !IsEmpty(cart) ? cart.reduce((x,item)=>x + (Number(item.price) * Number(item.counter)),0).toFixed(2) : null
    const deliveryFee = Number((DELIVERYFEE).toFixed(2))

    const total = Number(calcPrices) + deliveryFee

    const history = useNavigate()
    
    useEffect(()=>{
        if(persomInfo && IsEmpty(persomInfo)){
            history("/cart")
        }else{
            if(cart && persomInfo && type === "shop"){
                dispatch(checkoutAction({
                    price : total,
                    link : link,
                    number_of_items : cart.length,
                    items : cart,
                    type: type,
                    ...persomInfo
                }))
            }
            if (type === "ticket"){
                dispatch(checkoutAction({
                    numTickets : link,
                    id: persomInfo.id,
                    type: type,
                    email :persomInfo.email
                }))
            }
            if (type === "vote"){
                dispatch(checkoutAction({
                    value: persomInfo.value,
                    id_: persomInfo.id_,
                    type: type,
                    contestant_name: persomInfo.contestant_name,
                }))
            }
            if (type === "subscription"){
                dispatch(checkoutAction({
                    phone : persomInfo.phone,
                    address : persomInfo.address,
                    name: link,
                    action_performed: persomInfo.action_performed ? persomInfo.action_performed : "",
                    type: type,
                    age :persomInfo.email
                }))
            }
            if (type === "magazine"){
                dispatch(checkoutAction({
                    ...persomInfo,
                    link,
                    type
                }))
            }
            
        }
    },[])

    useEffect(()=>{
        setClientSecret(result ? result.clientSecret : "")
    },[result])
    const options={
        clientSecret:clientSecret
    }
    return (
        <div>
            <Navbar />
            <div className='container strip'>
                {loading && <Loader2 variant={"primary"} />}
                {error && <div><Message variant={"danger"}>Something went wrong. Please try again later.</Message></div>}
                {clientSecret && stripePromise &&
                    (<Elements stripe={stripePromise} options={options}>
                        <PaymentForms type={type} />
                    </Elements>)
                }
            </div>
        </div>
    )
}

















