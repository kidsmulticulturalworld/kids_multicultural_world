import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import Footer from './Footer';
import Navbar from './Navbar';
import Loader2 from './Loader2';
import Message from './Message';
import moment from 'moment';
import { IS_DEV } from './Constant';
import { useReactToPrint } from 'react-to-print';


const PrintableContent = React.forwardRef((props, ref) => (
    <div className='receipt_content' ref={ref}>
        <div className='receipt_header relative'>
            <div className='z-10'>
                <div>
                    <small>
                        Kids Multicultural World LLC
                    </small>
                </div>
                <div style={{maxWidth:"250px"}}>
                    <small>
                        404 S. BOULDER HWY
                        PO BOX 90011
                        , Henderson, NV, United States, 89009
                    </small>
                </div>
            </div>
            <div className='flex'>
                <div className='logoContentContaIner left_auto'>
                    <img src="/Images/kids multicultural logo 2.png" alt="Kids Multicultural world logo" />
                </div>
            </div>
        </div>
        <div className='flex pt-3'>
            <div className='left_auto receipt_services_header'>
                SERVICES
                RECEIPT
            </div>
        </div>
        <div className='pt-4 receipt_header'>
            <div>
                <small 
                    className='pb-3 d-block fonted_600 receipt_color'
                >
                    Billed To
                </small>
                <div>
                    <small
                        style={{
                            textTransform: 'uppercase',
                        }}
                    >
                        {props.data.name}
                    </small>
                </div>
                <div>
                    <small>
                        {props.data.address}
                    </small>
                </div>
                <div>
                    <small>
                        {props.data.street}
                    </small>
                </div>
                <div>
                    <small>
                        {props.data.apartment}
                    </small>
                </div>
                <div>
                    <small>
                        {props.data.city}
                    </small>
                </div>
                <div>
                    <small>
                        {props.data.state}
                    </small>
                </div>
                <div>
                    <small>
                        {props.data.zip_code}
                    </small>
                </div>
            </div>
            <div className='pt-5'>
                <div className='receipt_date_container pt-3'>
                    <div className='fonted_600 receipt_color'>
                        Receipt #
                    </div>
                    <div>
                        {props.data.id + 1000}
                    </div>
                </div>
                <div className='receipt_date_container pt-2'>
                    <div className='fonted_600 receipt_color'>
                        Receipt date
                    </div>
                    <div>
                        {moment(props.data.transaction_datetime).format("MMM Do, YYYY. h:mmA")}
                    </div>
                </div>
            </div>
        </div>
        <div className="mt-4 receipt_banner receipt_banner_gridded">
            <div className='fonted_600 text-white'>
                Description
            </div>
            <div className='fonted_600 text-white text_align_right'>
                Unit
            </div>
            <div className='fonted_600 text-white text_align_right'>
                Amount
            </div>
        </div>
        <div style={{
            padding: "7px 10px",
            borderBottom: "1px solid #004188"
        }}>
            <div className="receipt_banner_gridded mt-2">
                <div>
                    Voted for {props.data.candidate}
                </div>
                <div className='text_align_right'>
                    {props.data.price}
                </div>
                <div className='text_align_right'>
                    ${props.data.price}
                </div>
            </div>
        </div>
        <div style={{
            padding: "7px 10px",
        }}>
            <div className="receipt_banner_gridded">
                <div></div>
                <div className='text_align_right'>
                    Subtotal
                </div>
                <div className='text_align_right'>
                    ${props.data.price}
                </div>
            </div>
            <div className="receipt_banner_gridded mt-2">
                <div></div>
                <div className='text_align_right'>
                    Sales tax 
                </div>
                <div className='text_align_right'>
                    $0.00
                </div>
            </div>
            <div className="receipt_banner_gridded mt-2">
                <div></div>
                <div className='text_align_right'
                    style={{
                        fontSize: "18px",
                        fontWeight: '800'
                    }}
                >
                    Total
                </div>
                <div className='text_align_right'
                    style={{
                        fontSize: "18px",
                        fontWeight: '800'
                    }}
                >
                    ${props.data.price}
                </div>
            </div>
        </div>
        <div className='mt-4 receipt_footer'>
            <small className='receipt_smallHeader'>
                Customer name:
            </small>
            <div className='fonted_600'>
                {props.data.name}
            </div>
            <small className='receipt_smallHeader'>
                Customer email:
            </small>
            <div>
                <small>
                    {props.data.email}
                </small>
            </div>
            <small className='receipt_smallHeader'>
                Customer signature:
            </small>
            <div className="mt-3">
                <img src={IS_DEV ? props.data.signature : `${process.env.REACT_APP_BASE_URL}${props.data.signature}` } alt="User signature" />
            </div>
        </div>
    </div>
));

const GetReceipt = () => {
    const {id} = useParams();
    const [data, setData] = useState({})
    const [error, setError] = useState(false)
    const [loading, setLoading] = useState(false)
    const [queryID, setQueryID] = useState("");
    const [searchQuery, setSearchQuery] = useState("");
    const navigate = useNavigate();

    const componentRef = useRef(null);

    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    });

    const handleSearch = () => {
        if (searchQuery === "") return;
        if(searchQuery.length >= 4){
            navigate(`/get-recept/${searchQuery}`, { replace: true });
        }
    };

    const checkoutAction = async() =>{
        try{
            setLoading(true)
            const headers= {
                "Content-type":"application/json"
            }
            const {data} = await axios.post(
                `${process.env.REACT_APP_BASE_URL}/api/get-receipt/${queryID}`,
                headers
            )
            setData(data)
        } catch(error){
            setData({})
            console.error("Error while making request")
        } finally{
            setLoading(false)
        }
    }
    useEffect(()=>{
        setQueryID(id)
    },[id]);
    useEffect(()=>{
        const getData = async()=>{
            await checkoutAction()
        }
        if (queryID && queryID >= 4){
            getData()
        }
    },[queryID]);
    console.log(componentRef.current);

    return (
        <div>
            <Navbar />
            {/* {loading && <div className='standard_width'><Loader2 /></div>} */}
            {error && <Message variant={"danger"}>Error: Something went wrong.</Message>}
            <div className='standard_width receipts'>
                <div className='vote_receipt_container rounded'>
                    <input 
                        type="text" 
                        value={searchQuery} 
                        onChange={(e) => setSearchQuery(e.target.value)} 
                        placeholder="Enter Order ID" 
                    />
                    <button 
                        onClick={handleSearch} 
                        disabled={searchQuery.length <4}
                        style={{
                            backgroundColor: "#004188"
                        }}
                    >
                        Search
                    </button>
                </div>
                {!loading ? (
                    <>
                        {(data && JSON.stringify(data) !== "{}") ? (
                            <div className='p-4 mt-4 mainsRecpt printedCopy' style={{
                                backgroundColor:"#f1f1f1",
                            }}>
                                <PrintableContent data={data} ref={componentRef} />
                            </div>
                        ) : (
                            <div className='p-4 mt-4 mainsRecpt' style={{
                                backgroundColor:"#f1f1f1",
                            }}>
                                <div className='receipt_content'>
                                    <div className='fonted_600 receipt_color'>
                                        Can't find any receipt...
                                    </div>
                                </div>
                            </div>
                        )}
                    </>
                ):(
                    <div className='p-4 mt-4 mainsRecpt' style={{
                        backgroundColor:"#f1f1f1",
                    }}>
                        <div className='receipt_content'>
                            <div className='fonted_600 receipt_color'>
                                Looking for receipt...
                            </div>
                        </div>
                    </div>
                )}
                {/* <div className="mt-4" style={{maxWidth:"200px"}}>
                    {(data && JSON.stringify(data) !== "{}") && (
                        <button onClick={handlePrint} disabled={!data}>
                            Print Receipt
                        </button>
                    )}
                </div> */}
            </div>
            <Footer />
        </div>
    )
}

export default GetReceipt