import { ALL_CONTEST_FAIL, ALL_CONTEST_REQUEST, ALL_CONTEST_SUCCESS, CONTESTANT_FAIL, CONTESTANT_REQUEST, CONTESTANT_SUCCESS, CONTEST_FAIL, CONTEST_REQUEST, CONTEST_SUCCESS, PASSWORD_RESET_FAIL, PASSWORD_RESET_REQUEST, PASSWORD_RESET_SUCCESS, PASSWORD_SET_FAIL, PASSWORD_SET_REQUEST, PASSWORD_SET_SUCCESS, SET_RECEPT_FAIL, SET_RECEPT_REQUEST, SET_RECEPT_SUCCESS, TICKETS_LIST_SUCCESS } from "./Constant"
import { TICKETS_LIST_FAIL } from "./Constant"
import { TICKETS_LIST_REQUEST } from "./Constant"
import { ADD_CART_FAIL, ADD_CART_REQUEST, ADD_CART_SUCCESS, CHECKOUT_FAIL, CHECKOUT_REQUEST, CHECKOUT_SUCCESS, DASHBOARD_FAIL, DASHBOARD_REQUEST, DASHBOARD_RESET, DASHBOARD_SUCCESS, DEL_IMG_FAIL, DEL_IMG_REQUEST, DEL_IMG_RESET, DEL_IMG_SUCCESS, DISPLAY_MAGAZINE_FAIL, DISPLAY_MAGAZINE_REQUEST, DISPLAY_MAGAZINE_SUCCESS, EVENT_DETAIL_FAIL, EVENT_DETAIL_REQUEST, EVENT_DETAIL_SUCCESS, EVENT_FAIL, EVENT_REQUEST, EVENT_SUCCESS, HANDLE_EDIT_FAIL, HANDLE_EDIT_REQUEST, HANDLE_EDIT_RESET, HANDLE_EDIT_SUCCESS, KIDS_DETAILS_FAIL, KIDS_DETAILS_REQUEST, KIDS_DETAILS_SUCCESS, KIDS_VIEW_FAIL, KIDS_VIEW_REQUEST, KIDS_VIEW_SUCCESS, NEWS_LETTER_FAIL, NEWS_LETTER_REQUEST, NEWS_LETTER_SUCCESS, ORDERS_FAIL, ORDERS_REQUEST, ORDERS_SUCCESS, SHOP_DETAIL_FAIL, SHOP_DETAIL_REQUEST, SHOP_DETAIL_SUCCESS, SHOP_FAIL, SHOP_REQUEST, SHOP_SUCCESS, USER_LOGIN_FAIL, USER_LOGIN_REQUEST, USER_LOGIN_SUCCESS, USER_LOGOUT, USER_LOGOUT_FAIL, USER_LOGOUT_SUCCESS, USER_PROFILE_RESET, USER_REGISTER_FAIL, USER_REGISTER_REQUEST, USER_REGISTER_SUCCESS, VIEW_TICKETS_FAIL, VIEW_TICKETS_REQUEST, VIEW_TICKETS_SUCCESS } from "./Constant"


export const passwordSetReducer =(state={},action)=>{
    switch(action.type){
        case PASSWORD_SET_REQUEST:
            return {loading:true,...state}
        case PASSWORD_SET_SUCCESS:
            return {loading:false, success:action.payload}
        case PASSWORD_SET_FAIL:
            return {loading: false,error:action.payload}
        case USER_LOGOUT:
            return {}
        default:
            return state
    }
}


export const eventTicketReducer =(state={},action)=>{
    switch(action.type){
        case TICKETS_LIST_REQUEST:
            return {loading:true}
        case TICKETS_LIST_SUCCESS:
            return {loading:false, ...action.payload}
        case TICKETS_LIST_FAIL:
            return {loading: false,error:action.payload}
        default:
            return state
    }
}

export const passwordResetReducer =(state={},action)=>{
    switch(action.type){
        case PASSWORD_RESET_REQUEST:
            return {loading:true,...state}
        case PASSWORD_RESET_SUCCESS:
            return {loading:false, success:action.payload}
        case PASSWORD_RESET_FAIL:
            return {loading: false,error:action.payload}
        case USER_LOGOUT:
            return {}
        default:
            return state
    }
}

export const orderReducer =(state={},action)=>{
    switch(action.type){
        case ORDERS_REQUEST:
            return {loading:true}
        case ORDERS_SUCCESS:
            return {loading:false, ...action.payload}
        case ORDERS_FAIL:
            return {loading: false,error:action.payload}
        default:
            return state
    }
}


export const dashboardReducer =(state={},action)=>{
    switch(action.type){
        case DASHBOARD_REQUEST:
            return {loading:true}
        case DASHBOARD_SUCCESS:
            return {loading:false, ...action.payload}
        case DASHBOARD_RESET:
            return {}
        case USER_LOGOUT:
            return {}
        case DASHBOARD_FAIL:
            return {loading: false,error:action.payload}
        default:
            return state
    }
}
export const contestReducer =(state={},action)=>{
    switch(action.type){
        case CONTEST_REQUEST:
            return {loading:true}
        case CONTEST_SUCCESS:
            return {loading:false, value:action.payload}
        case CONTEST_FAIL:
            return {loading: false,error:action.payload}
        default:
            return state
    }
}

export const contestantReducer =(state={},action)=>{
    switch(action.type){
        case CONTESTANT_REQUEST:
            return {loading:true}
        case CONTESTANT_SUCCESS:
            return {loading:false, value:action.payload}
        case CONTESTANT_FAIL:
            return {loading: false,error:action.payload}
        default:
            return state
    }
}

export const allContestReducer =(state={},action)=>{
    switch(action.type){
        case ALL_CONTEST_REQUEST:
            return {loading:true}
        case ALL_CONTEST_SUCCESS:
            return {loading:false, value:action.payload}
        case ALL_CONTEST_FAIL:
            return {loading: false,error:action.payload}
        default:
            return state
    }
}

export const receiptReducer =(state={},action)=>{
    switch(action.type){
        case SET_RECEPT_REQUEST:
            return {loading:true}
        case SET_RECEPT_SUCCESS:
            console.log("Was here")
            console.log({result:action.payload})
            return {loading:false, result:action.payload}
        case SET_RECEPT_FAIL:
            return {loading: false,error:action.payload}
        default:
            return state
    }
}



export const checkoutReducer =(state={},action)=>{
    switch(action.type){
        case CHECKOUT_REQUEST:
            return {loading:true}
        case CHECKOUT_SUCCESS:
            return {loading:false, result:action.payload}
        case CHECKOUT_FAIL:
            return {loading: false,error:action.payload}
        default:
            return state
    }
}

export const ticketVerifyReducer =(state={},action)=>{
    switch(action.type){
        case VIEW_TICKETS_REQUEST:
            return {loading:true}
        case VIEW_TICKETS_SUCCESS:
            return {loading:false, ...action.payload}
        case VIEW_TICKETS_FAIL:
            return {loading: false,error:action.payload}
        default:
            return state
    }
}


export const magazineReducer =(state={},action)=>{
    switch(action.type){
        case DISPLAY_MAGAZINE_REQUEST:
            return {loading:true}
        case DISPLAY_MAGAZINE_SUCCESS:
            return {loading:false, magazines:action.payload}
        case DISPLAY_MAGAZINE_FAIL:
            return {loading: false,error:action.payload}
        default:
            return state
    }
}


export const cartAddReducer =(state={},action)=>{
    switch(action.type){
        case ADD_CART_REQUEST:
            return {loading:true}
        case ADD_CART_SUCCESS:
            return {loading:false, cart:action.payload}
        case ADD_CART_FAIL:
            return {loading: false,error:action.payload}
        case USER_LOGOUT:
            return {}
        default:
            return state
    }
}

export const eventDetsilReducer =(state={},action)=>{
    switch(action.type){
        case EVENT_DETAIL_REQUEST:
            return {loading:true,...state}
        case EVENT_DETAIL_SUCCESS:
            return {loading:false, eventh:action.payload}
        case EVENT_DETAIL_FAIL:
            return {loading: false,error:action.payload}
        default:
            return state
    }
}

export const eventReducer =(state={},action)=>{
    switch(action.type){
        case EVENT_REQUEST:
            return {loading:true,...state}
        case EVENT_SUCCESS:
            return {loading:false, eventt:action.payload}
        case EVENT_FAIL:
            return {loading: false,error:action.payload}
        default:
            return state
    }
}


export const shopDetsilReducer =(state={},action)=>{
    switch(action.type){
        case SHOP_DETAIL_REQUEST:
            return {loading:true,...state}
        case SHOP_DETAIL_SUCCESS:
            return {loading:false, shop:action.payload}
        case SHOP_DETAIL_FAIL:
            return {loading: false,error:action.payload}
        default:
            return state
    }
}


export const shopReducer =(state={},action)=>{
    switch(action.type){
        case SHOP_REQUEST:
            return {loading:true,...state}
        case SHOP_SUCCESS:
            return {loading:false, shop:action.payload}
        case SHOP_FAIL:
            return {loading: false,error:action.payload}
        default:
            return state
    }
}


export const updateReducer =(state={},action)=>{
    switch(action.type){
        case HANDLE_EDIT_REQUEST:
            return {loading:true,...state}
        case HANDLE_EDIT_SUCCESS:
            return {loading:false, success:action.payload}
        case HANDLE_EDIT_FAIL:
            return {loading: false,error:action.payload}
        case HANDLE_EDIT_RESET:
            return {}
        case USER_LOGOUT:
            return {}
        default:
            return state
    }
}


export const delReducer =(state={},action)=>{
    switch(action.type){
        case DEL_IMG_REQUEST:
            return {loading:true,...state}
        case DEL_IMG_SUCCESS:
            return {loading:false, success:action.payload}
        case DEL_IMG_FAIL:
            return {loading: false,error:action.payload}
        case DEL_IMG_RESET:
            return {}
        default:
            return state
    }
}


export const kidsDetailsReducer =(state={},action)=>{
    switch(action.type){
        case KIDS_DETAILS_REQUEST:
            return {loading:true,...state}
        case KIDS_DETAILS_SUCCESS:
            return {loading:false, kid:action.payload}
        case KIDS_DETAILS_FAIL:
            return {loading: false,error:action.payload}
        case USER_LOGOUT:
            return {}
        default:
            return state
    }
}

export const kidsViewReducer =(state={},action)=>{
    switch(action.type){
        case KIDS_VIEW_REQUEST:
            return {loading:true,...state}
        case KIDS_VIEW_SUCCESS:
            return {loading:false, ...action.payload}
        case KIDS_VIEW_FAIL:
            return {loading: false,error:action.payload}
        default:
            return state
    }
}

export const userLoginReducer =(state={},action)=>{
    switch(action.type){
        case USER_LOGIN_REQUEST:
            return {loading:true}
        case USER_LOGIN_SUCCESS:
            return {loading:false, userInfo:action.payload}
        case USER_LOGIN_FAIL:
            return {loading: false,error:action.payload}
        case USER_LOGOUT:
            return {}
        case USER_PROFILE_RESET:
            return {}
        default:
            return state
    }
}

export const logoutReducer =(state={},action)=>{
    switch(action.type){
        case USER_LOGOUT:
            return {}
        case USER_LOGOUT_SUCCESS:
            return {loading:false,success:true}
        case USER_LOGOUT_FAIL:
            return {loading: false,error:action.payload}
        default:
            return state
    }
}


export const signUpReducer =(state={},action)=>{
    switch(action.type){
        case USER_REGISTER_REQUEST:
            return {loading:true}
        case USER_REGISTER_SUCCESS:
            return {loading:false,success:true, userInfo:action.payload}
        case USER_REGISTER_FAIL:
            return {loading: false,error:action.payload}
        case USER_LOGOUT:
            return {}
        case USER_PROFILE_RESET:
            return {}
        default:
            return state
    }
}


export const newsLetterReducer =(state={},action)=>{
    switch(action.type){
        case NEWS_LETTER_REQUEST:
            return {loading:true,...state}
        case NEWS_LETTER_SUCCESS:
            return {loading:false, ...action.payload}
        case NEWS_LETTER_FAIL:
            return {loading: false,error:action.payload}
        default:
            return state
    }
}
