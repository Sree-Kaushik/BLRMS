import React, { useState, useEffect } from 'react';
import Header from './header';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './nongovtlands.css';

const NonGovtLands = () => {
  const navigate = useNavigate();
  const [lands, setLands] = useState([]);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get('http://localhost:5000/api/nongovtlands');
      setLands(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
      setError('Failed to fetch data. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleRedirect = (land) => () => {
    navigate('/landtemplate', { state: { land } }); // Pass the land data to LandTemplate
  };

  return (
    <div>
      <Header />
      <div className="wishlist">
        <h1 className="main-heading">Non-Government Lands</h1>
        {isLoading && <p>Loading non-government lands...</p>}
        {error && <p>{error}</p>}
        <div className="products">
          {!isLoading && (
            <>
              {lands.length === 0 && <p>No lands found.</p>}
              {lands.map((land, index) => (
                <div className="product" key={index} onClick={handleRedirect(land)}>
                  <img className="property-image-css" src={`http://localhost:5000/${land.imageUpload}`} alt="Land" />
                  <div className="owner-name">Owner: {land.ownerName}</div>
                  <div className="address">Address: {land.address}</div>
                  <div className="price">Price: {land.landPrice}</div>
                </div>
              ))}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default NonGovtLands;
