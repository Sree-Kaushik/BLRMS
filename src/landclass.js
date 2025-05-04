import React, { useState, useEffect } from 'react';
import Header from './header';
import './landclass.css';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function LandClass() {
  const navigate = useNavigate();
  const [nonGovtLands, setNonGovtLands] = useState([]);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get('http://localhost:5000/api/nongovtlands');
      setNonGovtLands(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
      setError('Failed to fetch data. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const addToWishlist = (event) => {
    event.preventDefault();
    alert('Added to Wishlist!');
    event.stopPropagation();
  };

  const handleRedirect = (land) => () => {
    navigate('/landtemplate', { state: { land } }); // Pass the land data to LandTemplate
  };

  return (
    <div>
      <Header />
      <div className="container-css">
        <h1>Land Classification</h1>
        <h2 className="left-aligned">Welcome!</h2>

        <h2 className="left-aligned subheading">Government Lands:</h2>
        <div className="image-row">
          {Array.from({ length: 5 }).map((_, index) => (
            <div className="image-wrapper nav-button" key={index} onClick={handleRedirect({})}>
              <img src={`https://via.placeholder.com/100?text=Land+Image+${index + 1}`} alt={`Land Image ${index + 1}`} />
              <p>Number of Acres: </p>
              <p>Locality: </p>
              <p>Total Price: </p>
              <button className="wishlist-button-css" onClick={addToWishlist}>Add to Wishlist</button>
            </div>
          ))}
        </div>
        <Link to="/govtlands">
          <button className="show-more-button" id="government">Show more</button>
        </Link>

        <h2 className="left-aligned subheading">Non-Government Lands:</h2>
        <div className="image-row">
          {isLoading && <p>Loading non-government lands...</p>}
          {error && <p>{error}</p>}
          {!isLoading && nonGovtLands.slice(0, 5).map((land, index) => (
            <div className="image-wrapper nav-button" key={index} onClick={handleRedirect(land)}>
              <img className="property-image" src={`http://localhost:5000/${land.imageUpload}`} alt="Land" />
              <p>Current Owner: {land.ownerName}</p>
              <p>Number of Acres: {land.acres}</p>
              <p>Locality: {land.locality}</p>
              <p>Total Price: {land.landPrice}</p>
              <button className="wishlist-button-css" onClick={addToWishlist}>Add to Wishlist</button>
            </div>
          ))}
        </div>
        <Link to="/nongovtlands">
          <button className="show-more-button" id="non-government">Show more</button>
        </Link>
      </div>
    </div>
  );
}

export default LandClass;
