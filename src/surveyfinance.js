import React, { useState, useEffect } from 'react';
import Header from './header';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './surveyfinance.css';

function SurveyFinance() {
  const [sellerDetails, setSellerDetails] = useState(null);
  const [surveyFee, setSurveyFee] = useState(0);

  useEffect(() => {
    const fetchSellerDetails = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/latestSellerDetails'); // Corrected endpoint
        if (response.data) {
          setSellerDetails(response.data);
          // Calculate survey fee based on acres
          if (response.data.acres >= 1 && response.data.acres < 5) {
            setSurveyFee(100);
          } else if (response.data.acres >= 5 && response.data.acres < 50) {
            setSurveyFee(1000);
          } else if (response.data.acres >= 50 && response.data.acres < 1000) {
            setSurveyFee(5000);
          } else if (response.data.acres >= 1000 && response.data.acres <= 10000) {
            setSurveyFee(10000);
          } else {
            setSurveyFee(100000);
          }
        }
      } catch (error) {
        console.error('Error fetching seller details:', error);
      }
    };

    fetchSellerDetails();
  }, []);

  const LandDetails = () => (
    <div className="land-details-css">
      <img className="image-upload" src={`http://localhost:5000/${sellerDetails.imageUpload}`} alt="Land Image" />
      <div className="details">
        <p><strong>Owner:</strong> {sellerDetails.ownerName}</p>
        <p><strong>Address:</strong> {sellerDetails.locality}</p>
        <p><strong>Area Length:</strong> {sellerDetails.acres} acres</p>
        <p><strong>Price:</strong> ₹{sellerDetails.landPrice}</p>
      </div>
    </div>
  );

  const PriceSection = () => (
    <div className="price-section">
      <p><strong>Land Survey Fee:</strong> ₹{surveyFee}</p>
    </div>
  );

  const BuyButton = () => (
    <div>
      <Link to={`/transactionpage?surveyFee=${surveyFee}`}> {/* Pass surveyFee as query parameter */}
        <button type="button" className="proceed-btn">Proceed</button>
      </Link>
    </div>
  );

  return (
    <div>
      <Header />
      <div className="container-css2">
        {sellerDetails ? (
          <>
            <LandDetails />
            <PriceSection />
            <BuyButton />
          </>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
}

export default SurveyFinance;
