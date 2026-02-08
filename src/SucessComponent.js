import React, { useEffect, useState } from 'react'
import {
    useStripe
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import Message from './Message';
import { useDispatch, useSelector } from 'react-redux';
import { cartAddAction, checkoutAction } from './Action';
import Loader2 from './Loader2';
import AllTickets from './AllTickets';
import EmailCasting from './components/emailCasting';
import EmailForm from './components/emailer';
import moment from 'moment';

// eslint-disable-next-line no-unused-vars
const stripePromise = loadStripe(process.env.REACT_APP_STRIP_PUBLIC_KEY);

const SucessComponent = ({clientSecret}) => {
    const stripe = useStripe();
    const [message, setMessage] = useState(null);
    const [succes, setSuccess] = useState(false);
    const [loader, setLoader] = useState(false);
    
    const dispatch = useDispatch()
    const checkout = useSelector(state => state.checkout)
    const {loading,error,result} = checkout

    const receipt = JSON.parse(localStorage.getItem(`receiptInfo`)) 

    const persomInfo = JSON.parse(localStorage.getItem(`checkOutUserInfo`))
    // eslint-disable-next-line no-unused-vars
    const [emailData, setEmailDatas] = useState(persomInfo.email);
    useEffect(() => {
        setMessage(null)
        setSuccess(false)
        if (!stripe) {
          return;
        }
    
        if (!clientSecret) {
          return;
        }
    
        stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
            switch (paymentIntent.status) {
                case "succeeded":
                    setSuccess(true)
                    setMessage("Payment Successful");
                    dispatch(checkoutAction({
                        link : "keep-track",
                        type: "track",
                        secrete : clientSecret,
                        receipt: receipt ? receipt : null,
                        transaction_id:paymentIntent.id,
                        created: paymentIntent.created,
                    }));
                    EmailForm({
                        ...receipt, 
                        order_id: receipt.id + 1000,
                        date_created: moment.unix(paymentIntent.created).format("MMM Do, YYYY. h:mmA")
                    });
                    break;
                case "processing":
                    setMessage("Your payment is processing.");
                    break;
                case "requires_payment_method":
                    setMessage("Your payment was not successful, please try again.");
                    break;
                default:
                    setMessage("Something went wrong.");
                    break;
            }
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [stripe, clientSecret]);
    useEffect(()=>{
        setLoader(true)
        if (result){
            if(persomInfo && persomInfo.id){
                EmailCasting(persomInfo.id)
            }
            localStorage.setItem(`cartUserItems`, JSON.stringify([]))
            dispatch(cartAddAction())
            setLoader(false)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[result, dispatch, persomInfo])
    return (
        <>
            {error && <Message variant={"danger"}>Something went wrong. Please try again later</Message>}
            {(loading || loader) && <Loader2 variant={"primary"} />}
            {(!loader && result) && 
                <>
                    {succes ?
                        <div>
                            {result.email ? 
                                <div>
                                    <div className="bold7 font_20 text-success">
                                        Success!
                                    </div>
                                    <AllTickets id={result.reference} link={"all_tickets"} userEmail={emailData ? emailData : ""} />
                                </div>
                            :
                                <div className='strip'>
                                    <div className='relative'>
                                        <span className='text-success bold7 payMentSuccess font_24'>
                                            Payment Successful
                                        </span>
                                        {persomInfo && persomInfo.contestant_name &&
                                            <div className='mt-5'>
                                                Thank you for casting {persomInfo.value} vote(s) for {persomInfo.contestant_name}. Your vote has been received.

                                                <div className='bold6 pt-2 red'>
                                                    Follow us:
                                                </div> 
                                                <div className='pt-2'>
                                                    <span className='bold6 pr-2'>Instagram</span> - <a target='_blank' className='text-primary' href={"https://www.instagram.com/invites/contact/?i=vs6agnwigftp&utm_content=9adyr3e"} rel="noopener noreferrer" >
                                                                    Kids Multicultural World
                                                                </a>
                                                    
                                                </div>
                                                <span className='bold6 pr-2'>Facebook</span> - <a target='_blank' className='text-primary' href={"https://www.facebook.com/chicagokidsmulticulturalfashionshow?mibextid=LQQJ4d"} rel="noopener noreferrer" >
                                                                   America kids Multicultural World
                                                                </a>
                                            </div>
                                        }
                                        <div className='mt-5 max_width_successImg'>
                                            <img className='max_width_successImg' src="Images/success.gif" alt="success" />
                                        </div>
                                    </div>
                                </div>
                            }
                        </div>
                    :
                        <div className='strip'>
                            <div className='relative'>
                                <span>
                                    {message && <Message variant={"warning"}>{message}</Message>}
                                </span>
                            </div>
                        </div>
                    }
                </>
            }
            
        </>
    )
}

export default SucessComponent