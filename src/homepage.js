import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './homepage.css';
import pic1 from './pictures/buyable-land-in-Sydney-NSW.jpg';
import pic2 from './pictures/land-as-investment-576x321.jpg';
import pic3 from './pictures/land-value-in-India (1).jpg';
import logo from './pictures/BLRMS.png';

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="homepage">
      <img src={logo} id="logo-id" className="logo-homepage" alt="Logo" onClick={() => navigate('/')} />
      <div className="main-title">
        <h1 className="title-text">Land Registration Management</h1>
      </div>
      <img src={pic1} className="picture1" alt="Land 1" />
      <img src={pic2} className="picture2" alt="Land 2" />
      <img src={pic3} className="picture3" alt="Land 3" />
      <Link to="/login"><button className="sign-up-button" id="signup-button">Sign In</button></Link>
    </div>
  );
};

export default HomePage;
