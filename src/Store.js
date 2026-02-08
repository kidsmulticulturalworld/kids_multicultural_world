import {createStore, combineReducers, applyMiddleware} from "redux"
import thunk from "redux-thunk"
import { composeWithDevTools } from "@redux-devtools/extension"
import { allContestReducer, cartAddReducer, checkoutReducer, contestReducer, contestantReducer, dashboardReducer, delReducer, eventDetsilReducer, eventReducer, eventTicketReducer, kidsDetailsReducer, kidsViewReducer, logoutReducer, magazineReducer, newsLetterReducer, orderReducer, passwordResetReducer, passwordSetReducer, receiptReducer, shopDetsilReducer, shopReducer, signUpReducer, ticketVerifyReducer, updateReducer, userLoginReducer } from "./Reducer"


const reducer = combineReducers({
    userLogin: userLoginReducer,
    singUp: signUpReducer,
    kidsDetails: kidsDetailsReducer,
    newsLetter:newsLetterReducer,
    kidsView:kidsViewReducer,
    delImg:delReducer,
    updateUser:updateReducer,
    shop:shopReducer,
    shopDetail : shopDetsilReducer,
    eventt : eventReducer,
    eventDetail : eventDetsilReducer,
    cartAdd : cartAddReducer,
    magazine : magazineReducer,
    logout : logoutReducer,
    checkout : checkoutReducer,
    tickets : ticketVerifyReducer,
    dashboard:dashboardReducer,
    orders:orderReducer,
    ticket_list:eventTicketReducer,
    contest:contestReducer,
    contestant:contestantReducer,
    all_contest:allContestReducer,
    receipts:receiptReducer,
    passwordReset : passwordResetReducer,
    passwordSet : passwordSetReducer
})

const userInfoFromStorage = localStorage.getItem("userInfo") ? JSON.parse(localStorage.getItem("userInfo")) : null

const initialState = {
    userLogin: {userInfo: userInfoFromStorage},
}
const middleware = [thunk]

const store = createStore(reducer, initialState,composeWithDevTools(applyMiddleware(...middleware)))


export default store




