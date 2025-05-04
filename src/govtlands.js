import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from './header';
import './govtlands.css';

const GovtLands = () => {
  const navigate = useNavigate();

  const handleRedirect = () => {
    navigate('/landtemplate'); // Update with the correct route path for LandTemplate
  };

  return (
    <div>
      <Header />
      <div className="wishlist">
        <h1 className="main-heading">Government Lands</h1>
        <div className="products">
          {Array.from({ length: 9 }).map((_, index) => (
            <div className="product nav-button" key={index} onClick={handleRedirect}>
              <img src={`https://via.placeholder.com/100?text=Land+Image+${index + 1}`} alt={`Land Image ${index + 1}`} />
              <div className="address">Address</div>
              <div className="price">Price</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GovtLands;
