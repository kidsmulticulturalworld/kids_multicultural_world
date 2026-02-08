import React, { useEffect, useState } from 'react'
import Footer from './Footer'
import Navbar from './Navbar'
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { cartAddAction, shopDetailAction } from './Action';
import Loader from './Loader';
import IsEmpty from './IsEmpty';
import Message from './Message';
import Spliter from './Spliter';

const ItemsDetails = () => {
    const ids = useParams();
    const dispatch= useDispatch()
    const history = useNavigate()
    const [sizeDetail, setSizeDetail] = useState("")
    const [sizeColor, setSizeColor] = useState("")

    const shopDetail = useSelector(state => state.shopDetail)
    const {loading,error,shop} = shopDetail

    useEffect(()=>{
        if(ids.id){
            dispatch(shopDetailAction(ids.id))
        }
    },[ids])
    const [countVal,setCountVal] = useState(0)
    const [imG,setImG] = useState(null)

    const getInitialSize = (chek=false)=>{
        let cart = JSON.parse(localStorage.getItem(`cartUserItems`))
        const item = shop ? shop : {}
        let cartfilt = cart ? cart.filter(m =>m.id === item.id) : ""
        if (cartfilt && !IsEmpty(cartfilt)){
            return chek ? (cartfilt[0] ? cartfilt[0].sizeColor : "") : (cartfilt[0] ? cartfilt[0].sizeSelected : "")
        }
        return null
    }
    const getTheVall = shop && getInitialSize() 
    const getTheVall2 = shop && getInitialSize(true) 
    const addSizeNdColor = (size=false)=>{
        const item = shop ? shop : {}
        let cart = JSON.parse(localStorage.getItem(`cartUserItems`))
        let cartfilt = cart ? cart.filter(m =>m.id === item.id) : ""
        if (cartfilt && !IsEmpty(cartfilt)){
            cart.map((k,i)=>{
                if (k.id === item.id){
                    if (size){
                        k.sizeSelected = sizeDetail
                    }else{
                        k.sizeColor = sizeColor
                    }
                    
                }
                return null;
            })
            localStorage.setItem(`cartUserItems`, JSON.stringify(cart))
        }
    }
    
    useEffect(()=>{
        if (sizeDetail){
            addSizeNdColor(true)
        }
        if (sizeColor){
            addSizeNdColor()
        }
    },[sizeDetail,sizeColor])
    
    const addTocartHandler = (x)=>{
        let cart = JSON.parse(localStorage.getItem(`cartUserItems`))
        let cartfilt = cart ? cart.filter(m =>m.id === x.id) : ""
        if(cartfilt && !IsEmpty(cartfilt)){
            let cartin = 0
            cart.map((k,nn)=>{
                if (k.id === x.id){
                    cartin = nn
                }
                return null;
            })
            if ((x.amount_available >= cart[cartin].counter + 1) || !(x.amount_available)){
                cart[cartin].counter = cart[cartin].counter + 1
                if (sizeDetail){
                    cart[cartin].sizeSelected = sizeDetail ? sizeDetail : Spliter(x.size,",")[0]
                }
                if (sizeColor){
                    cart[cartin].sizeColor = sizeColor ? sizeColor : Spliter(x.color,",")[0]
                }
            }
            localStorage.setItem(`cartUserItems`, JSON.stringify(cart))
            addCheck(x)
            dispatch(cartAddAction())
        }else{
            if (!cart){
                x.counter = 1
                x.sizeSelected = sizeDetail ? sizeDetail : Spliter(x.size,",")[0]
                x.sizeColor = sizeColor ? sizeColor : Spliter(x.color,",")[0]
                
                localStorage.setItem(`cartUserItems`, JSON.stringify([x]))
                addCheck(x)
                dispatch(cartAddAction())
            }else{
                x.counter = 1
                x.sizeSelected = sizeDetail ? sizeDetail : Spliter(x.size,",")[0]
                x.sizeColor = sizeColor ? sizeColor : Spliter(x.color,",")[0]

                cart.unshift(x)
                localStorage.setItem(`cartUserItems`, JSON.stringify(cart))
                addCheck(x)
                dispatch(cartAddAction())
            }
        }

    }
    
    const removeTocartHandler = (x)=>{
        let cart = JSON.parse(localStorage.getItem(`cartUserItems`))
        if(cart){
            let cartin = 0
            cart.map((k,nn)=>{
                if (k.id === x.id){
                    cartin = nn
                }
                return null;
            })
            if ((cart[cartin].counter - 1 > 0)){
                cart[cartin].counter = cart[cartin].counter - 1
            }
            localStorage.setItem(`cartUserItems`, JSON.stringify(cart))
            addCheck(x)
            dispatch(cartAddAction())
        }

    }

    const addCheck =(x)=>{
        let cart = JSON.parse(localStorage.getItem(`cartUserItems`));
        let cartfilt = cart ? cart.filter(m =>m.id === x.id) : ""
        
        if(cartfilt && !IsEmpty(cartfilt)){
            setCountVal(cartfilt[0].counter)
        }
    }
    
    useEffect(()=>{
        if(shop){
            addCheck(shop)
        }
    },[shop])
  return (
    <div>
        <Navbar />
        <div className='standard_width'>
            {loading && <Loader />}
            {error && <Message variant={"danger"}>Error: Something went wrong.</Message>}
            {shop && 
                <div className="ItemsDetail">
                    <div className='shadow-sm'>
                        {imG ?
                            <div>
                                <img src={`${imG}`} alt="Shop Icon" />
                            </div>
                        :
                            <div>
                                <img src={`${shop.cover_image}`} alt="Shop Icon" />
                            </div>
                        }
                        
                        <div className='divItemsOption'>
                            {shop.other_images && shop.other_images.map(x=>(
                                <div key={x.id}>
                                    <img src={`${x.image}`} alt="Shop Icon"
                                        onClick={()=>setImG(x.image)}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                    <div>
                        <div className="detailRightN">
                            <div className="bold7 font_24 text-dark">
                                {shop.name}
                            </div>
                            <div className="pt_2 text-muted">
                                {shop.description}
                            </div>
                            <div className="pt_1 bold7 font_20">
                                ${shop.price}
                            </div>
                            <div className="mt_2 py_2 border-top flex">
                                <div className='detailCartAdd'>
                                    {countVal > 1 ? 
                                        <span className='pointer' onClick={()=>removeTocartHandler(shop)}>
                                            -
                                        </span>
                                    :
                                        <span className='pointer text-muted'>
                                            -
                                        </span>
                                    }
                                    <samp className='bold7'>
                                        {countVal}
                                    </samp>
                                    <span className='pointer' onClick={()=>addTocartHandler(shop)}>
                                        +
                                    </span>
                                </div>
                                {(shop.amount_available < 13) && (shop.amount_available !== 0) && 
                                    <div className="pl_2 msw">
                                        <div className='font_16 bold5'>
                                            Only <span className="red">{shop.amount_available} items</span> left!
                                        </div>
                                        <div className='font_16 bold5'>
                                            Don't miss it.
                                        </div>
                                    </div>
                                }
                            </div>
                            <div className="border-top pt_2">
                                { shop.size && 
                                    <div>
                                        <span className="bold7 text-dark">
                                            Sizes:
                                        </span>
                                        <span className='pl_1'>
                                            <select 
                                                className='selectedForm'
                                                value={sizeDetail} 
                                                onChange={(e)=>setSizeDetail(e.target.value)}
                                            >
                                                {getTheVall && <option value={getTheVall}>{getTheVall}</option>}
                                                {Spliter(shop.size,",").map((x,m)=>(
                                                    <option key={m} value={x}>{x}</option>
                                                ))}
                                            </select>
                                        </span>
                                    </div>
                                }
                                { shop.color && 
                                    <div className='pt_2'>
                                        <div>
                                            {Spliter(shop.color,",").map((x,m)=>(
                                                <span 
                                                    key={m}
                                                    className="colorDisplayer"
                                                    style={{
                                                        backgroundColor : `${x}`
                                                    }}
                                                ></span> 
                                            ))}
                                        </div>
                                        <span className="bold7 text-dark">
                                            Color:
                                        </span>
                                        <span className='pl_1'>
                                            <select 
                                                className='selectedForm'
                                                value={sizeColor} 
                                                onChange={(e)=>setSizeColor(e.target.value)}
                                            >
                                                
                                                {getTheVall2 && <option value={getTheVall2}>{getTheVall2}</option>}
                                                {Spliter(shop.color,",").map((x,m)=>(
                                                    <option key={m} value={x}>{x}</option>
                                                ))}
                                            </select>
                                        </span>
                                    </div>
                                }
                            </div>
                            <div className="pt_2">
                                {countVal ?
                                    <button className='AddToCartDetailsBtn' onClick={()=>history("/cart")}>
                                        View in cart
                                    </button>
                                :
                                    <button className='AddToCartDetailsBtn' onClick={()=>addTocartHandler(shop)}>
                                        Add To Cart
                                    </button>
                                }
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

export default ItemsDetails