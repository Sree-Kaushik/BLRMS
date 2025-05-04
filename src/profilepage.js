import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Header2 from './header2'; // Ensure correct path
import './profilepage.css';

const ProfilePage = () => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    phone: "",
    uid: ""
  });
  const [error, setError] = useState("");

  useEffect(() => {
    // Assume user ID is stored in application state or context after login
    const userId = localStorage.getItem('userId'); // Fetch user ID from localStorage or context

    if (userId) {
      fetchUserData(userId);
    } else {
      setError("User ID not found. Please log in again.");
    }
  }, []);

  const fetchUserData = async (userId) => {
    try {
      const response = await axios.get(`http://localhost:5000/api/userById/${userId}`);
      const userData = response.data;

      if (userData) {
        setUser({
          name: `${userData.firstName} ${userData.lastName}`,
          email: userData.email,
          phone: userData.phoneNumber,
          uid: userData.uniqueIdentification
        });
      } else {
        setError('Empty user data received.');
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
      setError('Error fetching user data. Please try again.');
    }
  };

  return (
    <div>
      <Header2 />
      <div className="profile-container">
        <div className="profile-header">
          <h1 className="user-name">Your Account</h1>
        </div>
        <div className="profile-details">
          {error && <p className="error-message">{error}</p>}
          <div className="profile-section">
            <h2>Contact Information</h2>
            <p><strong>Name:</strong> {user.name}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Phone:</strong> {user.phone}</p>
            <p><strong>Unique Identification Number:</strong> {user.uid}</p>
          </div>
          <div className="profile-section">
            <Link to="/wishlist"><button className="btn">Wishlist</button></Link>
          </div>
          <div className="profile-section">
            <h2>Land Bought</h2>
            <ul>
              <li><img src="https://via.placeholder.com/150" alt="Land 1" className="land-1" /></li>
              <li><img src="https://via.placeholder.com/150" alt="Land 2" className="land-2" /></li>
              <li><img src="https://via.placeholder.com/150" alt="Land 3" className="land-3" /></li>
            </ul>
          </div>
          <div className="profile-section">
            <h2>Land Sold</h2>
            <ul>
              <li><img src="https://via.placeholder.com/150" alt="Land 1" className="land-1" /></li>
              <li><img src="https://via.placeholder.com/150" alt="Land 2" className="land-2" /></li>
              <li><img src="https://via.placeholder.com/150" alt="Land 3" className="land-3" /></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
