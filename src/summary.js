import React, { useState, useEffect } from 'react';
import Header from './header'; // Assuming Header component is correctly imported and named
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import './summary.css';

const Summary = () => {
  const location = useLocation();
  const [surveyFee, setSurveyFee] = useState('N/A');
  const [landDetails, setLandDetails] = useState({
    acres: 'TBD',
    location: 'TBD'
  });
  const [currentDate, setCurrentDate] = useState('');
  const [transactionId, setTransactionId] = useState('');

  useEffect(() => {
    if (location.state && location.state.surveyFee) {
      setSurveyFee(location.state.surveyFee);
    }

    fetchLandDetails();
    generateTransactionId(); // Ensure transaction ID is generated when component mounts
    setCurrentDate(getFormattedDate());
  }, [location]);

  useEffect(() => {
    // Retrieve transactionId from localStorage on component mount
    const storedTransactionId = localStorage.getItem('transactionId');
    if (storedTransactionId) {
      setTransactionId(storedTransactionId);
    }
  }, []);

  const fetchLandDetails = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/latestSellerDetails');
      const latestSellerDetails = response.data;

      if (latestSellerDetails) {
        setLandDetails({
          acres: latestSellerDetails.acres || 'N/A',
          location: latestSellerDetails.locality || 'N/A'
        });
      } else {
        console.log('No seller details found.');
      }
    } catch (error) {
      console.error('Error fetching land details:', error);
    }
  };

  const generateTransactionId = () => {
    const storedTransactionId = localStorage.getItem('transactionId');
    if (storedTransactionId) {
      setTransactionId(storedTransactionId);
    } else {
      const randomId = Math.random().toString(36).substr(2, 9).toUpperCase();
      const newTransactionId = `TRANS-${randomId}`;
      setTransactionId(newTransactionId);
      localStorage.setItem('transactionId', newTransactionId);
    }
  };

  const getFormattedDate = () => {
    const today = new Date();
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return today.toLocaleDateString('en-IN', options);
  };

  const continueHandler = async () => {
    try {
      const formData = {
        transactionId: transactionId,
        surveyFee: surveyFee,
        acres: landDetails.acres,
        location: landDetails.location
        // Add other form data as needed
      };

      const response = await axios.post('http://localhost:5000/api/saveTransaction', formData);
      console.log(response.data); // Log success message or handle response
    } catch (error) {
      console.error('Error saving transaction details:', error);
    }

    // Redirect to home page or next step
    window.location.href = '/home';
  };

  const printSummary = () => {
    window.print();
  };

  return (
    <div>
      <Header />
      <div className="summary-container">
        <h1>Transaction Summary</h1>
        <div className="summary-card">
          <div className="summary-section">
            <h2>Transaction Details</h2>
            <ul>
              <li><strong>Transaction ID:</strong> {transactionId}</li>
              <li><strong>Date:</strong> {currentDate}</li>
              <li><strong>Amount Paid:</strong> {surveyFee} ETH</li>
            </ul>
          </div>
          <div className="summary-section">
            <h2>Land Details</h2>
            <ul>
              <li><strong>Number of Acres:</strong> {landDetails.acres}</li>
              <li><strong>Location:</strong> {landDetails.location}</li>
            </ul>
            <button className="continue-btn" onClick={continueHandler}>Continue</button>
            <button className="print" onClick={printSummary}>Print Summary</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Summary;
