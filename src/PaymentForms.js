import './Css/Stripe.css';
import prices from "./PricesOfSubscription";
import React, { useRef, useState } from "react";
import {
    PaymentElement,
    LinkAuthenticationElement,
    useStripe,
    useElements
} from "@stripe/react-stripe-js";
import Message from './Message';
import { ROOT_URL, SET_RECEPT_FAIL } from './Constant';
import { dataURLtoFile } from './components/dataURLtoFile';
import { Link } from 'react-router-dom';
import SignatureCanvas from 'react-signature-canvas';
import axios from 'axios';
import { useDispatch } from 'react-redux';
// import EmailForm from './components/emailer';


const isFormDataValid = (formData) => {
    const areStringsValid = Object.keys(formData).every((key) => {
        if (typeof formData[key] === "string") {
            return formData[key].trim() !== ""; 
        }
        return true;
    });
    const isTermsAgreed = formData.termsAgreed === true;
    return areStringsValid && isTermsAgreed;
};

const PaymentForms = ({type = null}) => {
    const dispatch= useDispatch()
    const stripe = useStripe();
    const elements = useElements();
    const [isDone, setIsDone] = useState(true);

    const [email, setEmail] = useState('');
    const [message, setMessage] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const persomInfo = JSON.parse(localStorage.getItem(`checkOutUserInfo`));
    const [formData, setFormData] = useState({
        full_name: "",
        address: "",
        apartment: "",
        city: "",
        state: "",
        zip: "",
        termsAgreed: false,
    });
    const sigCanvas = useRef({});

    const clearSignature = () => {
        sigCanvas.current.clear();
    };

    const saveSignature = async () => {

        if (sigCanvas.current.isEmpty() || !email) {
            setIsDone(false);
            return;
        }
        if(!isFormDataValid(formData)){
            setIsDone(false);
            return;
        }

        const dataURL = sigCanvas.current.getTrimmedCanvas().toDataURL('image/png');
        let signatureFromUser = dataURLtoFile(dataURL, "consent-signature.png");

        setIsDone(true);
        const form = new FormData();
        form.append("full_name", formData.full_name);
        form.append("termsAgreed", formData.termsAgreed);
        form.append("address", formData.address);
        form.append("apartment", formData.apartment);
        form.append("city", formData.city);
        form.append("state", formData.state);
        form.append("zip", formData.zip);
        form.append("email", email.email);
        form.append("signature", signatureFromUser);
        form.append("candidate", persomInfo.contestant_name);
        form.append("price", persomInfo.value);

        const headers = {
            "Content-Type": "multipart/form-data"
        };

        setIsLoading(true);
        try {
            const { data } = await axios.post(
                `${process.env.REACT_APP_BASE_URL}/api/saveConsentData`,
                form,
                { headers }
            );
            localStorage.setItem('receiptInfo', JSON.stringify(data))
            // Deleted this from here
            // if(data){
            //     EmailForm({
            //         ...data, 
            //         order_id: data.id + 1000
            //     });
            // }
            await handleSubmit()
        } catch (error) {
            dispatch({
                type: SET_RECEPT_FAIL,
                payload: error
            })
            console.error("Error while creating receipt")
        }
    };

    const handleSubmit = async () => {
        if (!stripe || !elements) {
            return;
        }
        if(!isLoading){
            setIsLoading(true);
        }
        
        const { error } = await stripe.confirmPayment({
            elements,
            confirmParams: {
                return_url: `${ROOT_URL}/success`,
            },
            receipt_email: email,
        });
        if (error) {
            setMessage(error.message);
        } else {
            setMessage("An unexpected error occurred.");
        }
        setIsLoading(false);
    };

    const paymentElementOptions = {
        layout: "tabs"
    };

    const handleEmailChange = (event) => {
      setEmail(event.value);
    };

    const mainSubmit = async(e) => {
        e.preventDefault();
        if(type === "vote"){
            await saveSignature();
        }else{
            await handleSubmit();
        }
    }

    return (
        <div className='strip'>
            <form encType="multipart/form-data" id="payment-form" onSubmit={mainSubmit}>
                <div className="py_1">
                    {message && <Message variant={"warning"}>{message}</Message>}
                </div>
                {
                    (persomInfo && persomInfo.action_performed === "featured") 
                    ? 
                    <div className='pb_2'>
                        <div className='text-success pt_2 bold6'>
                            Entry fee {process.env.REACT_APP_CURRENCY_SYMBOL}{prices["featured"]}
                        </div> 
                    </div>
                    : 
                    ""
                }
                {
                    (persomInfo && persomInfo.action_performed === "casting") 
                    ? 
                    <div className='pb_2'>
                        <div className='text-success pt_2 bold6'>
                            Fee {process.env.REACT_APP_CURRENCY_SYMBOL}{prices["casting"]}
                        </div> 
                    </div>
                    : 
                    ""
                }
                <LinkAuthenticationElement
                  id="link-authentication-element"
                  onChange={handleEmailChange}
                />
                {type === "vote" && 
                    <div style={{fontSize:"0.93rem"}} className='mb-3 votingCheckOutForm'>
                        <div className="form-group mt-3">
                            <label htmlFor="exampleFormControlInput2">Full name</label>
                            <input 
                                type="text" 
                                className="form-control" 
                                id="exampleFormControlInput2" 
                                placeholder="Enter your full name" 
                                value={formData.full_name}
                                onChange={(e)=>setFormData({...formData, full_name:e.target.value})}
                                required
                            />
                        </div>
                        <div className="form-group mt-3">
                            <label htmlFor="exampleFormControlInput4">Address</label>
                            <input 
                                type="text" 
                                className="form-control" 
                                id="exampleFormControlInput4" 
                                placeholder="Enter your address" 
                                value={formData.address}
                                onChange={(e)=>setFormData({...formData, address:e.target.value})}
                                required
                            />
                        </div>
                        <div className="form-group mt-3">
                            <label htmlFor="exampleFormControlInput5">Apt/Unit</label>
                            <input 
                                type="text" 
                                className="form-control" 
                                id="exampleFormControlInput5" 
                                placeholder="Apartment" 
                                value={formData.apartment}
                                onChange={(e)=>setFormData({...formData, apartment:e.target.value})}
                                required
                            />
                        </div>
                        <div className="form-group mt-3">
                            <label htmlFor="exampleFormControlInput5">City</label>
                            <input 
                                type="text" 
                                className="form-control" 
                                id="exampleFormControlInput5" 
                                placeholder="City" 
                                value={formData.city}
                                onChange={(e)=>setFormData({...formData, city:e.target.value})}
                                required
                            />
                        </div>
                        <div className="form-group mt-3">
                            <label htmlFor="exampleFormControlInput5">State</label>
                            <input 
                                type="text" 
                                className="form-control" 
                                id="exampleFormControlInput5" 
                                placeholder="State" 
                                value={formData.state}
                                onChange={(e)=>setFormData({...formData, state:e.target.value})}
                                required
                            />
                        </div>
                        <div className="form-group mt-3">
                            <label htmlFor="exampleFormControlInput5">Zip</label>
                            <input 
                                type="text" 
                                className="form-control" 
                                id="exampleFormControlInput5" 
                                placeholder="Zip" 
                                value={formData.zip}
                                onChange={(e)=>setFormData({...formData, zip:e.target.value})}
                                required
                            />
                        </div>
                        
                    </div>
                }
                <PaymentElement id="payment-element" options={paymentElementOptions} />
                {type === "vote" && 
                    <div style={{fontSize:"0.93rem"}} className='mb-3'>
                        <div className="form-check mt-3">
                            <input 
                                type="checkbox" 
                                className="form-check-input" 
                                id="exampleCheck1" 
                                checked={formData.termsAgreed}
                                onChange={(e)=>setFormData({...formData, termsAgreed:e.target.checked})}
                                required
                            />
                            <label className="form-check-label" htmlFor="exampleCheck1">By ticking this box you accept our <Link to={"/terms-of-service"} className='pl-1 text-primary'>terms of service</Link></label>
                        </div>
                        
                        <div className={formData.termsAgreed ? "" : "d_none"}>
                            <div className='mt-3'>
                                <label>Please provide consent signature:</label>
                            </div>
                            <SignatureCanvas
                                ref={sigCanvas}
                                canvasProps={{ width: 500, height: 150, className: 'rounded-lg shadow-sm border mt-1' }}
                            />
                            <span className='pointer text-primary' onClick={clearSignature}>Clear</span>
                        </div>
                    </div>
                }
                {!isDone &&
                  <div className="py-3 text-danger">
                    All fields are required, including signature.
                  </div>
                }
                <button disabled={isLoading || !stripe || !elements} id="submit">
                    <span id="button-text">
                        {isLoading ? <div className="spinner" id="spinner"></div> : "Pay now"}
                    </span>
                </button>
                {message && <div id="payment-message">{message}</div>}
            </form>
        </div>
    )
}

export default PaymentForms;
