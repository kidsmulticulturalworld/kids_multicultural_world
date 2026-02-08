import axios from "axios"
import { ADD_CART_FAIL, ADD_CART_REQUEST, ADD_CART_SUCCESS, ALL_CONTEST_FAIL, ALL_CONTEST_REQUEST, ALL_CONTEST_SUCCESS, CHECKOUT_FAIL, CHECKOUT_REQUEST, CHECKOUT_SUCCESS, CONTESTANT_FAIL, CONTESTANT_REQUEST, CONTESTANT_SUCCESS, CONTEST_FAIL, CONTEST_REQUEST, CONTEST_SUCCESS, DASHBOARD_FAIL, DASHBOARD_REQUEST, DASHBOARD_SUCCESS, DEL_IMG_FAIL, DEL_IMG_REQUEST, DEL_IMG_SUCCESS, DISPLAY_MAGAZINE_FAIL, DISPLAY_MAGAZINE_REQUEST, DISPLAY_MAGAZINE_SUCCESS, EVENT_DETAIL_FAIL, EVENT_DETAIL_REQUEST, EVENT_DETAIL_SUCCESS, EVENT_FAIL, EVENT_REQUEST, EVENT_SUCCESS, HANDLE_EDIT_FAIL, HANDLE_EDIT_REQUEST, HANDLE_EDIT_SUCCESS, KIDS_DETAILS_FAIL, KIDS_DETAILS_REQUEST, KIDS_DETAILS_SUCCESS, KIDS_VIEW_FAIL, KIDS_VIEW_REQUEST, KIDS_VIEW_SUCCESS, NEWS_LETTER_FAIL, NEWS_LETTER_REQUEST, NEWS_LETTER_SUCCESS, ORDERS_FAIL, ORDERS_REQUEST, ORDERS_SUCCESS, PASSWORD_RESET_FAIL, PASSWORD_RESET_REQUEST, PASSWORD_RESET_SUCCESS, PASSWORD_SET_FAIL, PASSWORD_SET_REQUEST, PASSWORD_SET_SUCCESS, SET_RECEPT_FAIL, SET_RECEPT_REQUEST, SET_RECEPT_SUCCESS, SHOP_DETAIL_FAIL, SHOP_DETAIL_REQUEST, SHOP_DETAIL_SUCCESS, SHOP_FAIL, SHOP_REQUEST, SHOP_SUCCESS, TICKETS_LIST_FAIL, TICKETS_LIST_REQUEST, TICKETS_LIST_SUCCESS, USER_LOGIN_FAIL, USER_LOGIN_REQUEST, USER_LOGIN_SUCCESS, USER_LOGOUT, USER_LOGOUT_FAIL, USER_LOGOUT_SUCCESS, USER_REGISTER_FAIL, USER_REGISTER_REQUEST, USER_REGISTER_SUCCESS, VIEW_TICKETS_FAIL, VIEW_TICKETS_REQUEST, VIEW_TICKETS_SUCCESS } from "./Constant"


export const passwordSetAction =(x) => async(dispatch) =>{
    
    try{
        dispatch({type: PASSWORD_SET_REQUEST})
        const headers= {
            "Content-type":"application/json"
        }
        const {data} = await axios.post(
            `${process.env.REACT_APP_BASE_URL}/api/reset_token`,
            x,
            headers
        )
        dispatch({
            type: PASSWORD_SET_SUCCESS,
            payload: data
        })
        
    } catch(error){
        if(error && error.response && error.response.status === 401){
            dispatch({type: USER_LOGOUT})
            localStorage.removeItem('userInfo')
        }else{
            dispatch({
                type : PASSWORD_SET_FAIL,
                payload : error.response && error.response.data.detail ? error.response.data.detail : error.message
            })
        }
    }
}

export const passwordResetAction =(email) => async(dispatch) =>{
    
    try{
        dispatch({type: PASSWORD_RESET_REQUEST})
        const headers= {
            "Content-type":"application/json"
        }
        const {data} = await axios.post(
            `${process.env.REACT_APP_BASE_URL}/api/reset_request`,
            {"email":email},
            headers
        )
        dispatch({
            type: PASSWORD_RESET_SUCCESS,
            payload: data
        })
        
    } catch(error){
        if(error && error.response && error.response.status === 401){
            dispatch({type: USER_LOGOUT})
            localStorage.removeItem('userInfo')
        }else{
            dispatch({
                type : PASSWORD_RESET_FAIL,
                payload : error.response && error.response.data.detail ? error.response.data.detail : error.message
            })
        }
    }
}

export const eventTicketAction =(x={}) => async(dispatch,getState) =>{
    
    try{
        dispatch({type: TICKETS_LIST_REQUEST})
        const {userLogin:{userInfo},} =getState()
        const config = {
            headers: { Authorization: `Bearer ${userInfo ? userInfo.token : ''}` }
        };
        const {data} = await axios.post(
            `${process.env.REACT_APP_BASE_URL}/api/event_tickets`,
            x,
            config
        )
        dispatch({
            type: TICKETS_LIST_SUCCESS,
            payload: data
        })
    } catch(error){
        if(error && error.response && error.response.status === 401){
            dispatch({type: USER_LOGOUT})
            localStorage.removeItem('userInfo')
        }else{
            dispatch({
                type : TICKETS_LIST_FAIL,
                payload : error.response && error.response.data.detail ? error.response.data.detail : error.message
            })
        }
    }
}



export const orderAction =(x={}) => async(dispatch,getState) =>{
    
    try{
        dispatch({type: ORDERS_REQUEST})
        const {userLogin:{userInfo},} =getState()
        const config = {
            headers: { Authorization: `Bearer ${userInfo ? userInfo.token : ''}` }
        };
        const {data} = await axios.post(
            `${process.env.REACT_APP_BASE_URL}/api/my_orders`,
            x,
            config
        )
        dispatch({
            type: ORDERS_SUCCESS,
            payload: data
        })
    } catch(error){
        if(error && error.response && error.response.status === 401){
            dispatch({type: USER_LOGOUT})
            localStorage.removeItem('userInfo')
        }else{
            dispatch({
                type : ORDERS_FAIL,
                payload : error.response && error.response.data.detail ? error.response.data.detail : error.message
            })
        }
    }
}

export const contestAction =(id_) => async(dispatch) =>{
    
    try{
        dispatch({type: CONTEST_REQUEST})
        
        const {data} = await axios.get(
            `${process.env.REACT_APP_BASE_URL}/api/get_contest/${id_}`,
        )
        
        dispatch({
            type: CONTEST_SUCCESS,
            payload: data
        })
    } catch(error){
        if(error && error.response && error.response.status === 401){
            dispatch({type: USER_LOGOUT})
            localStorage.removeItem('userInfo')
        }else{
            dispatch({
                type : CONTEST_FAIL,
                payload : error.response && error.response.data.detail ? error.response.data.detail : error.message
            })
        }
    }
}


export const contestantAction =(x) => async(dispatch) =>{
    
    try{
        dispatch({type: CONTESTANT_REQUEST})
        const headers= {
            "Content-type":"application/json"
        }
        const {data} = await axios.get(
            `${process.env.REACT_APP_BASE_URL}/api/get_contestant/${x}`,
            headers
        )
        dispatch({
            type: CONTESTANT_SUCCESS,
            payload: data
        })

    } catch(error){
        dispatch({
            type : CONTESTANT_FAIL,
            payload : error.response && error.response.data.detail ? error.response.data.detail : error.message
        })
    }
}


export const dashboardAction =() => async(dispatch,getState) =>{
    
    try{
        dispatch({type: DASHBOARD_REQUEST})
        const {userLogin:{userInfo},} =getState()
        const config = {
            headers: { Authorization: `Bearer ${userInfo ? userInfo.token : ''}` }
        };
        const {data} = await axios.get(
            `${process.env.REACT_APP_BASE_URL}/api/dashboard`,
            config
        )
        
        dispatch({
            type: DASHBOARD_SUCCESS,
            payload: data
        })
    } catch(error){
        if(error && error.response && error.response.status === 401){
            dispatch({type: USER_LOGOUT})
            localStorage.removeItem('userInfo')
        }else{
            dispatch({
                type : DASHBOARD_FAIL,
                payload : error.response && error.response.data.detail ? error.response.data.detail : error.message
            })
        }
    }
}


export const ticketVerifyAction =(x) => async(dispatch,getState) =>{
    
    try{
        dispatch({type: VIEW_TICKETS_REQUEST})
        
        const headers= {
            "Content-type":"application/json"
        }
        const {data} = await axios.post(
            `${process.env.REACT_APP_BASE_URL}/api/${x["link"]}`,
            x,
            headers
        )
        dispatch({
            type: VIEW_TICKETS_SUCCESS,
            payload: data
        })

    } catch(error){
        dispatch({
            type : VIEW_TICKETS_FAIL,
            payload : error.response && error.response.data.detail ? error.response.data.detail : error.message
        })
    }
}

export const logoutAction =(x) => async(dispatch,getState) =>{

    try{
        const {userLogin:{userInfo},} =getState()
        const config = {
            headers: { Authorization: `Bearer ${userInfo ? userInfo.token : ''}` }
        };
        dispatch({type: USER_LOGOUT})
        localStorage.removeItem('userInfo')
        const {data} = await axios.get(
            `${process.env.REACT_APP_BASE_URL}/api/logout/${x}`,
            x,
            config
        )
        dispatch({
            type: USER_LOGOUT_SUCCESS,
            payload: data
        })
    } catch(error){
        dispatch({
            type : USER_LOGOUT_FAIL,
            payload : error.response && error.response.data.detail ? error.response.data.detail : error.message
        })
    }
}


export const checkoutAction =(x) => async(dispatch,getState) =>{
    
    try{
        dispatch({type: CHECKOUT_REQUEST})
        const {userLogin:{userInfo},} =getState()
        const config = {
            headers: { Authorization: `Bearer ${userInfo ? userInfo.token : ''}` }
        };
        const headers= {
            "Content-type":"application/json"
        }
        const {data} = await axios.post(
            `${process.env.REACT_APP_BASE_URL}/api/checkout`,
            x,
            userInfo ? config : headers
        )
        dispatch({
            type: CHECKOUT_SUCCESS,
            payload: data
        })

    } catch(error){
        dispatch({
            type : CHECKOUT_FAIL,
            payload : error.response && error.response.data.detail ? error.response.data.detail : error.message
        })
    }
}



export const receiptAction =(form) => async(dispatch,getState) =>{
    
    try{
        dispatch({type: SET_RECEPT_REQUEST})
        const headers = {
            "Content-Type": "multipart/form-data"
        };
        const { data } = await axios.post(
            `${process.env.REACT_APP_BASE_URL}/api/saveConsentData`,
            form,
            { headers }
        );
        dispatch({
            type: SET_RECEPT_SUCCESS,
            payload: data
        })

    } catch(error){
        dispatch({
            type : SET_RECEPT_FAIL,
            payload : error.response && error.response.data.detail ? error.response.data.detail : error.message
        })
    }
}



export const magazineAction =() => async(dispatch,getState) =>{
    
    try{
        dispatch({type: DISPLAY_MAGAZINE_REQUEST})
        
        const headers= {
            "Content-type":"application/json"
        }
        const {data} = await axios.post(
            `${process.env.REACT_APP_BASE_URL}/api/magazine_view`,
            headers
        )
        dispatch({
            type: DISPLAY_MAGAZINE_SUCCESS,
            payload: data
        })
    } catch(error){
        dispatch({
            type : DISPLAY_MAGAZINE_FAIL,
            payload : error.response && error.response.data.detail ? error.response.data.detail : error.message
        })
    }
}


export const cartAddAction =() => async(dispatch) =>{
    
    try{
        dispatch({type: ADD_CART_REQUEST})
        dispatch({
            type: ADD_CART_SUCCESS,
            payload: JSON.parse(localStorage.getItem(`cartUserItems`))
        })
    } catch(error){
        dispatch({
            type : ADD_CART_FAIL,
            payload : []
        })
    }
}


export const eventDetailAction =(x) => async(dispatch,getState) =>{

    try{
        dispatch({type: EVENT_DETAIL_REQUEST})
        const {userLogin:{userInfo},} =getState()
        const config = {
            headers: { Authorization: `Bearer ${userInfo ? userInfo.token : ''}` }
        };
        const {data} = await axios.get(
            `${process.env.REACT_APP_BASE_URL}/api/event_detail/${x}`,
            x,
            config
        )
        dispatch({
            type: EVENT_DETAIL_SUCCESS,
            payload: data
        })
    } catch(error){
        if(error && error.response && error.response.status === 401){
            dispatch({type: USER_LOGOUT})
            localStorage.removeItem('userInfo')
        }else{
            dispatch({
                type : EVENT_DETAIL_FAIL,
                payload : error.response && error.response.data.detail ? error.response.data.detail : error.message
            })
        }
    }
}


export const eventAction =() => async(dispatch,getState) =>{
    
    try{
        dispatch({type: EVENT_REQUEST})
        
        const headers= {
            "Content-type":"application/json"
        }
        const {data} = await axios.post(
            `${process.env.REACT_APP_BASE_URL}/api/event_view`,
            headers
        )
        dispatch({
            type: EVENT_SUCCESS,
            payload: data
        })
    } catch(error){
        if(error && error.response && error.response.status === 401){
            dispatch({type: USER_LOGOUT})
            localStorage.removeItem('userInfo')
        }else{
            dispatch({
                type : EVENT_FAIL,
                payload : error.response && error.response.data.detail ? error.response.data.detail : error.message
            })
        }
    }
}


export const allContestAction =() => async(dispatch,getState) =>{
    
    try{
        dispatch({type:ALL_CONTEST_REQUEST})
        
        const headers= {
            "Content-type":"application/json"
        }
        const {data} = await axios.get(
            `${process.env.REACT_APP_BASE_URL}/api/all-contest`,
            headers
        )
        dispatch({
            type:ALL_CONTEST_SUCCESS,
            payload: data
        })
    } catch(error){
        if(error && error.response && error.response.status === 401){
            dispatch({type: USER_LOGOUT})
            localStorage.removeItem('userInfo')
        }else{
            dispatch({
                type :ALL_CONTEST_FAIL,
                payload : error.response && error.response.data.detail ? error.response.data.detail : error.message
            })
        }
    }
}


export const shopDetailAction =(x) => async(dispatch,getState) =>{
    
    try{
        dispatch({type: SHOP_DETAIL_REQUEST})
        const {userLogin:{userInfo},} =getState()
        const config = {
            headers: { Authorization: `Bearer ${userInfo ? userInfo.token : ''}` }
        };
        const {data} = await axios.get(
            `${process.env.REACT_APP_BASE_URL}/api/shop_detail/${x}`,
            x,
            config
        )
        dispatch({
            type: SHOP_DETAIL_SUCCESS,
            payload: data
        })
    } catch(error){
        if(error && error.response && error.response.status === 401){
            dispatch({type: USER_LOGOUT})
            localStorage.removeItem('userInfo')
        }else{
            dispatch({
                type : SHOP_DETAIL_FAIL,
                payload : error.response && error.response.data.detail ? error.response.data.detail : error.message
            })
        }
    }
}



export const shopAction =() => async(dispatch,getState) =>{
    
    try{
        dispatch({type: SHOP_REQUEST})
        
        const headers= {
            "Content-type":"application/json"
        }
        const {data} = await axios.post(
            `${process.env.REACT_APP_BASE_URL}/api/shop_view`,
            headers
        )
        dispatch({
            type: SHOP_SUCCESS,
            payload: data
        })
    } catch(error){
        if(error && error.response && error.response.status === 401){
            dispatch({type: USER_LOGOUT})
            localStorage.removeItem('userInfo')
        }else{
            dispatch({
                type : SHOP_FAIL,
                payload : error.response && error.response.data.detail ? error.response.data.detail : error.message
            })
        }
    }
}


export const updateAction =(x) => async(dispatch,getState) =>{
    
    try{
        dispatch({type: HANDLE_EDIT_REQUEST})
        const {userLogin:{userInfo},} =getState()
        const config = {
            headers: { Authorization: `Bearer ${userInfo ? userInfo.token : ''}` }
        };
        const {data} = await axios.post(
            `${process.env.REACT_APP_BASE_URL}/api/edit_profile`,
            x,
            config
        )
        dispatch({
            type: HANDLE_EDIT_SUCCESS,
            payload: data
        })
    } catch(error){
        if(error && error.response && error.response.status === 401){
            dispatch({type: USER_LOGOUT})
            localStorage.removeItem('userInfo')
        }else{
            dispatch({
                type : HANDLE_EDIT_FAIL,
                payload : error.response && error.response.data.detail ? error.response.data.detail : error.message
            })
        }
    }
}


export const delAction =(x) => async(dispatch,getState) =>{
    
    try{
        dispatch({type: DEL_IMG_REQUEST})
        const {userLogin:{userInfo},} =getState()
        const config = {
            headers: { Authorization: `Bearer ${userInfo ? userInfo.token : ''}` }
        };
        const {data} = await axios.post(
            `${process.env.REACT_APP_BASE_URL}/api/${x['link']}`,
            x,
            config
        )
        dispatch({
            type: DEL_IMG_SUCCESS,
            payload: data
        })
    } catch(error){
        if(error && error.response && error.response.status === 401){
            dispatch({type: USER_LOGOUT})
            localStorage.removeItem('userInfo')
        }else{
            dispatch({
                type : DEL_IMG_FAIL,
                payload : error.response && error.response.data.detail ? error.response.data.detail : error.message
            })
        }
    }
}


export const kidsDetailsAction =(x) => async(dispatch,getState) =>{
    
    try{
        dispatch({type: KIDS_DETAILS_REQUEST})
        
        const headers= {
            "Content-type":"application/json"
        }
        const {data} = await axios.post(
            `${process.env.REACT_APP_BASE_URL}/api/kids_details/${x}`,
            headers
        )
        dispatch({
            type: KIDS_DETAILS_SUCCESS,
            payload: data
        })
    } catch(error){
        if(error && error.response && error.response.status === 401){
            dispatch({type: USER_LOGOUT})
            localStorage.removeItem('userInfo')
        }else{
            dispatch({
                type : KIDS_DETAILS_FAIL,
                payload : error.response && error.response.data.detail ? error.response.data.detail : error.message
            })
        }
    }
}


export const kidsViewAction =(x={}) => async(dispatch,getState) =>{
    
    try{
        dispatch({type: KIDS_VIEW_REQUEST})
        
        const headers= {
            "Content-type":"application/json"
        }
        const {data} = await axios.post(
            `${process.env.REACT_APP_BASE_URL}/api/kids_view`,
            x,
            headers
        )
        dispatch({
            type: KIDS_VIEW_SUCCESS,
            payload: data
        })
    } catch(error){
        if(error && error.response && error.response.status === 401){
            dispatch({type: USER_LOGOUT})
            localStorage.removeItem('userInfo')
        }else{
            dispatch({
                type : KIDS_VIEW_FAIL,
                payload : error.response && error.response.data.detail ? error.response.data.detail : error.message
            })
        }
    }
}


export const loginAction =(email,password) => async(dispatch) =>{
    
    try{
        dispatch({type: USER_LOGIN_REQUEST})
        
        const headers= {
            "Content-type":"application/json"
        }
        const {data} = await axios.post(
            `${process.env.REACT_APP_BASE_URL}/api/login`,
            {username:email,password:password},
            headers
        )
        dispatch({
            type: USER_LOGIN_SUCCESS,
            payload: data
        })
        localStorage.setItem("userInfo",JSON.stringify(data))
    } catch(error){
        dispatch({
            type : USER_LOGIN_FAIL,
            payload : error.response && error.response.data.detail ? error.response.data.detail : error.message
        })
    }
}


export const signUpAction =(x) => async(dispatch) =>{
    
    try{
        dispatch({type: USER_REGISTER_REQUEST})
        const headers= {
            "Content-type":"application/json"
        }
        const {data} = await axios.post(
            `${process.env.REACT_APP_BASE_URL}/api/register`,
            x,
            headers
        )
        dispatch({
            type: USER_REGISTER_SUCCESS,
            payload: data
        })
        
        dispatch({
            type: USER_LOGIN_SUCCESS,
            payload: data
        })

        localStorage.setItem('userInfo', JSON.stringify(data))
    } catch(error){
        dispatch({
            type : USER_REGISTER_FAIL,
            payload : error.response && error.response.data.detail ? error.response.data.detail : error.message
        })
    }
}


export const newsLetterAction =(x) => async(dispatch,getState) =>{
    
    try{
        dispatch({type: NEWS_LETTER_REQUEST})
        
        const headers= {
            "Content-type":"application/json"
        }
        const {data} = await axios.post(
            `${process.env.REACT_APP_BASE_URL}/api/newsletter`,
            x,
            headers
        )
        dispatch({
            type: NEWS_LETTER_SUCCESS,
            payload: data
        })
    } catch(error){
        if(error && error.response && error.response.status === 401){
            dispatch({type: USER_LOGOUT})
            localStorage.removeItem('userInfo')
        }else{
            dispatch({
                type : NEWS_LETTER_FAIL,
                payload : error.response && error.response.data.detail ? error.response.data.detail : error.message
            })
        }
    }
}


