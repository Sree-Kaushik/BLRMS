import React from 'react';
import { Link } from 'react-router-dom';
import Header from './header';
import Buyer from './pictures/Buyer.jpg';
import seller from './pictures/Seller.jpg';
import './home.css';

const Home = () => {
    return (
        <div>
            <Header />
            <div className="middle-buttons">
                <div className="button-group">
                    <img src={Buyer} alt="Buyer" />
                    <Link to="/landclass">
                        <button type="button" className="btn">Buyer</button>
                    </Link>
                </div>
                <div className="button-group">
                    <img src={seller} alt="Seller" />
                    <Link to="/sellerdetails">
                        <button type="button" className="btn">Seller</button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Home;
