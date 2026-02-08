import React from 'react'
import './App.css';
import Home from './Home';
import {BrowserRouter as Router, Route, Routes} from "react-router-dom"
import ScrollToTop from './ScrollToTop';
import About from './About';
import Shop from './Shop';
import Magazines from './Magazines';
import Classes from './Classes';
import Events from './Events';
import Faqs from './Faqs';
import EventsDetails from './EventsDetails';
import Hoodies from './Hoodies';
import Bonnets from './Bonnets';
import Modelling from './Modelling';
import Acting from './Acting';
import Cart from './Cart';
import CheckoutSummary from './CheckoutSummary';
import Login from './Login';
import SignUp from './SignUp';
import ItemsDetails from './ItemsDetails';
// import Tiers from './Tiers';
import Dashboard from './Dashboard';
import Profile from './Profile';
import Tickests from './Tickests';
import Order from './Order';
// import Settings from './Settings';
import Kids from './Kids';
import ProfileEdit from './ProfileEdit';
import {Checkout} from './Checkout';
import Success from './Success';
import VerifyTickets from './VerifyTickets';
import LifeSkills from './LifeSkills';
import GetFeatured from './GetFeatured';
import ResetPassword from './ResetPassword';
import SetPassword from './SetPassword';
import NewPassword from './NewPassword';
import ProfileDetail from './ProfileDetail';
import PageNotFound from './PageNotFound';
import ContestPage from './ContestPage';
import Contestant from './Contestant';
import AllContest from './AllContest';
import Terms from './Terms';
import Casting from './Casting';
import GetReceipt from './GetReceipt';

function App() {
    return (
		<div className="App">
			<Router>
				<ScrollToTop />
				{/* <Navbar /> */}
				<Routes>
					
					{/* Home */}
					<Route path="/" element ={<Home/>} />
					<Route path="/home" element ={<Home/>} />

					{/* Login and sign up */}
					<Route path="/login" element ={<Login/>} />
					<Route path="/sign-up" element ={<SignUp/>} />
					<Route path="/sign_up" element ={<SignUp/>} />

					{/* Password reset */}
					<Route path="/reset-password" element ={<ResetPassword/>} />
					<Route path="/reset-password/request-sent" element ={<SetPassword/>} />
					<Route path="/reset-password/reset/:token" element ={<NewPassword/>} />

					{/* <Route path="/tiers" element ={<Tiers/>} /> */}

					{/* about */}
					<Route path="/about" element ={<About/>} />
					
					{/* kids */}
					<Route path="/kids" element ={<Kids/>} />
					<Route path="/kids/:pager" element ={<Kids />} />
										
					{/* Profile */}
					<Route path="/profile/:id" element ={<ProfileDetail/>} />
					<Route path="/profile" element ={<Profile/>} />
					<Route path="/profile-edit" element ={<ProfileEdit/>} />

					{/* Tickets */}
					<Route path="/tickets" element ={<Tickests />} />
					<Route path="/tickets/:pager" element ={<Tickests />} />

					{/* FAQs */}
					<Route path="/faqs" element ={<Faqs/>} />

					{/* Dashboard */}
					<Route path="/dashboard" element ={<Dashboard/>} />

					{/* Settings */}
					{/* <Route path="/settings" element ={<Settings/>} /> */}

					{/* Shop */}
					<Route path="/cart" element ={<Cart/>} />
					<Route path="/shop" element ={<Shop/>} />
					<Route path="/hoodies-n-shirts" element ={<Hoodies/>} />
					<Route path="/hair-bonnets" element ={<Bonnets/>} />
					<Route path="/cart-summary" element ={<CheckoutSummary/>} />
					<Route path="/item-detail" element ={<ItemsDetails/>} />
					<Route path="/item-detail/:id" element ={<ItemsDetails/>} />
					<Route path="/orders" element ={<Order />} />
					<Route path="/orders/:pager" element ={<Order />} />

					{/* Payment routes */}
					<Route path="/success" element ={<Success />} />
					<Route path="/checkout/:link/:type" element ={<Checkout />} />

					{/* verify tickets */}
					<Route path="/confirm-tickets/:id" element ={<VerifyTickets link={"single_tickets"} />} />
					<Route path="/confirm-tickets/:id/:name" element ={<VerifyTickets link={"single_tickets"} />} />
					<Route path="/verify-tickes/:id/tickets" element ={<VerifyTickets link={"all_tickets"} />} />
					<Route path="/verify-tickes/:id/ticket" element ={<VerifyTickets link={"single_tickets"}/>} />
					
					{/* Get receipt */}
					<Route path="/get-recept/:id" element ={<GetReceipt />} />

					{/* Magazines */}
					<Route path="/magazines" element ={<Magazines/>} />
					<Route path="/get-featured" element ={<GetFeatured/>} />

					{/* Classes */}
					<Route path="/classes" element ={<Classes/>} />
					<Route path="/modelling-classes" element ={<Modelling />} />
					<Route path="/life-skills" element ={<LifeSkills />} />
					<Route path="/acting-classes" element ={<Acting />} />

					{/* Events */}
					<Route path="/events" element ={<Events/>} />
					<Route path="/events-details" element ={<EventsDetails/>} />
					<Route path="/events-details/:id" element ={<EventsDetails/>} />

					{/* Contest */}
					<Route path="/contests" element ={<AllContest/>} />
					<Route path="/contest/:id" element ={<ContestPage/>} />
					<Route path="/contestant/:id" element ={<Contestant/>} />

					{/* Terms of use */}
					<Route path="/terms-of-service" element ={<Terms />} />

					{/* Run way registration */}
					<Route path="/model-registration" element ={<Casting />} />

					{/* 404 page */}
					<Route path="*" element={<PageNotFound />} />
					{/* <Route path="/materials/:id" element ={<Materials/>} /> */}
				</Routes>
			</Router>
			
		</div>
    );
}

export default App;
