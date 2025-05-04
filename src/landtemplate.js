import React, { useState, useEffect } from 'react';
import Header from './header';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import './landtemplate.css';

function LandTemplate() {
  const navigate = useNavigate();
  const location = useLocation();
  const { land } = location.state || {};

  const [landData, setLandData] = useState({
    ownerName: '',
    location: '',
    landPrice: '',
    acres: '',
    registrationNumber: '',
    surveyNumber: '',
    latitude: '',
    longitude: '',
    history: '',
    imageUpload: ''
  });

  useEffect(() => {
    if (land) {
      setLandData({
        ownerName: land.ownerName,
        location: land.locality,
        landPrice: `₹ ${land.landPrice}`,
        acres: `${land.acres} acres`,
        registrationNumber: land.registrationNumber,
        surveyNumber: land.surveyNumber,
        latitude: land.latitude,
        longitude: land.longitude,
        history: land.history,
        imageUpload: `http://localhost:5000/${land.imageUpload}`
      });
    }
  }, [land]);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/nongovtlands'); // Update with your actual endpoint
      const data = response.data[0]; // Assuming you want details of the first land item, adjust as needed
      setLandData({
        ownerName: data.ownerName,
        location: data.locality,
        landPrice: data.landPrice,
        acres: data.acres,
        registrationNumber: data.registrationNumber,
        surveyNumber: data.surveyNumber,
        latitude: data.latitude,
        longitude: data.longitude,
        history: data.history,
        imageUpload: `http://localhost:5000/${data.imageUpload}`
      });
    } catch (error) {
      console.error('Error fetching data:', error);
      // Handle error as needed
    }
  };

  // Function to open location in Google Maps
  const openInGoogleMaps = () => {
    const location = landData.location;
    const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(location)}`;
    window.open(googleMapsUrl, '_blank');
  };

  const handleBuyClick = () => {
    navigate('/finance', { state: { land }});
  };

  return (
    <div>
      <Header />
      <div className="land-template">
        <img src={landData.imageUpload} alt="Land" className="land-image-top-left" />
        <div className="land-container">
          <h1 className="land-title">Land Registration Details</h1>
          <div className="land-input-div">
            <input type="text" id="owner-name-input" className="land-wide-input" placeholder="Owner Name" value={landData.ownerName} readOnly />
          </div>
          <div className="land-input-div">
            <input type="text" id="location" className="land-wide-input" placeholder="Location" value={landData.location} readOnly />
          </div>
          <div className="land-input-div">
            <input type="text" id="price" name="price" className="land-wide-input" placeholder="Price" value={landData.landPrice} readOnly />
          </div>
          <div className="land-input-div">
            <input type="text" id="acres" name="acres" className="land-wide-input" placeholder="Acres" value={landData.acres} readOnly />
          </div>
          <div className="land-input-div">
            <input type="text" id="registration-number" name="registration-number" className="land-wide-input" placeholder="Registration Number" value={landData.registrationNumber} readOnly />
          </div>
          <div className="land-input-div">
            <input type="text" id="survey-number-input" name="survey-number" className="land-wide-input" placeholder="Survey Number" value={landData.surveyNumber} readOnly />
          </div>
          <div className="land-input-div">
            <input type="text" id="latitude-input" name="latitude" className="land-wide-input" placeholder="Latitude" value={landData.latitude} readOnly />
          </div>
          <div className="land-input-div">
            <input type="text" id="longitude-input" name="longitude" className="land-wide-input" placeholder="Longitude" value={landData.longitude} readOnly />
          </div>

          <button type="button" onClick={openInGoogleMaps} className="land-button-wide-input">
            Open in Google Maps
          </button>

          <button type="button" onClick={handleBuyClick} className="land-button-wide-input">
            <Link to="/finance" className="link-no-style">Buy</Link>
          </button>
        </div>
      </div>
    </div>
  );
}

export default LandTemplate;
