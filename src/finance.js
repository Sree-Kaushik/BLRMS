import React, { useState, useEffect } from 'react';
import Header from './header';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import './finance.css';

function Finance() {
  const navigate = useNavigate();
  const location = useLocation();
  const { land } = location.state || {};

  const [landData, setLandData] = useState({
    ownerName: '',
    address: '',
    areaLength: '',
    landPrice: '',
    propertyTax: 299,
    registrationTax: 1400,
    serviceTax: 500,
    imageUpload: ''
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchLandData = async () => {
      try {
        setLoading(true);
        let fetchedData = {};

        if (land) {
          fetchedData = {
            ownerName: land.ownerName || '',
            address: land.locality || '',
            areaLength: `${land.acres} acres` || '',
            landPrice: `₹ ${land.landPrice}` || '',
            propertyTax: land.propertyTax || 299,
            registrationTax: land.registrationTax || 1400,
            serviceTax: land.serviceTax || 500,
            imageUpload: `http://localhost:5000/${land.imageUpload}`
          };
        } else {
          const response = await axios.get('http://localhost:5000/api/nongovtlands');
          fetchedData = {
            ownerName: response.data[0].ownerName || '',
            address: response.data[0].locality || '',
            areaLength: `${response.data[0].acres} acres` || '',
            landPrice: `₹ ${response.data[0].landPrice}` || '',
            propertyTax: response.data[0].propertyTax || 0,
            registrationTax: response.data[0].registrationTax || 0,
            serviceTax: response.data[0].serviceTax || 0,
            imageUpload: `http://localhost:5000/${response.data[0].imageUpload}`
          };
        }

        setLandData(fetchedData);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('Failed to fetch land details. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchLandData();
  }, [land]);

  const TotalAmount = () => {
    const landPrice = parseFloat(landData.landPrice.replace('₹ ', '')) || 0;
    const propertyTax = landData.propertyTax || 299;
    const registrationTax = landData.registrationTax || 1400;
    const serviceTax = landData.serviceTax || 500;

    const totalAmount = landPrice + propertyTax + registrationTax + serviceTax;

    return (
      <div className="finance-total-amount">
        <p><strong>Total Amount:</strong> ₹{totalAmount.toFixed(2)}</p>
        <BuyButton totalAmount={totalAmount} />
      </div>
    );
  };

  const BuyButton = ({ totalAmount }) => (
    <div className="finance-buy-button">
      <button 
        className="buy-button" 
        type="button" 
        onClick={() => navigate('/transactionpage', { state: { amount: totalAmount } })}
      >
        Buy
      </button>
    </div>
  );

  const LandDetails = () => (
    <div className="finance-land-details">
      <img src={landData.imageUpload} alt="land" className="land-image" />
      <div className="finance-details">
        <p><strong>Owner:</strong> {landData.ownerName}</p>
        <p><strong>Address:</strong> {landData.address}</p>
        <p><strong>Area Length:</strong> {landData.areaLength}</p>
        <p><strong>Price:</strong> {landData.landPrice}</p>
      </div>
    </div>
  );

  const PriceSection = () => (
    <div className="finance-price-section">
      <p><strong>Price of the Land:</strong> {landData.landPrice}</p>
    </div>
  );

  const TaxesSection = () => (
    <div className="finance-taxes-section">
      <p className="finance-taxes-title"><strong>Taxes:</strong></p>
      <p className="finance-property-tax">Property Tax: ₹{landData.propertyTax}</p>
      <p className="finance-registration-tax">Registration Tax: ₹{landData.registrationTax}</p>
      <p className="finance-service-tax">Service Tax: ₹{landData.serviceTax}</p>
    </div>
  );

  if (loading) {
    return <div className="finance-loading">Loading...</div>;
  }

  if (error) {
    return <div className="finance-error">{error}</div>;
  }

  return (
    <div className="finance-app">
      <Header />
      <div className="finance-container">
        <LandDetails />
        <PriceSection />
        <TaxesSection />
        <TotalAmount /> {/* Ensure TotalAmount component is correctly referenced */}
      </div>
    </div>
  );
}

export default Finance;
