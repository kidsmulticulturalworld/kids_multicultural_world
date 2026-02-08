import React from 'react'
import { useParams } from 'react-router-dom';
import Navbar from './Navbar';
import AllTickets from './AllTickets';
import Footer from './Footer';
import Loader from './Loader';

const VerifyTickets = ({link}) => {
    const id = useParams();
    return (
        <div>
            <Navbar />
            <div className="container">
                {id ? <AllTickets id={id.id} link={link} /> : <Loader />}
            </div>
            
            
            <Footer />
        </div>
    )
}

export default VerifyTickets