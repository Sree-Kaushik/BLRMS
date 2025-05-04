import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './confirmationpage.css';

function ConfirmationPage() {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const surveyFee = urlParams.get('surveyFee') || 'N/A';
    document.getElementById('survey-fee').textContent = `${surveyFee} ETH`;

    // Set timeout for navigation after 10 seconds
    const timeoutId = setTimeout(() => {
      navigate('/summary', { state: { surveyFee } }); // Pass surveyFee to Summary using state
    }, 10000); // 10 seconds delay

    return () => clearTimeout(timeoutId); // Cleanup timeout on component unmount
  }, [location, navigate]);

  return (
    <div className="confirmation-container">
      <div className="confirmation-content">
        <div className="tick-mark">
          <svg id="tick-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20 6L9 17l-5-5" />
          </svg>
        </div>
        <h1>Transaction Successful</h1>
        <p className="amount-paid">Amount Paid: <span id="survey-fee"></span></p>
      </div>
    </div>
  );
}

export default ConfirmationPage;
