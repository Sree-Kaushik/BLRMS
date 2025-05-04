import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './header.css'; // Import your CSS file
import logo from './pictures/BLRMS.png';
import profile from './pictures/icons8-male-user-50.png'
const Header = () => {
    return (
        <div className="Header-div">
            <img src={logo} className="Logo" id="logo" alt="Logo" />
            <h1 className="heading-css">Blockchain based Land Registration and Management</h1>
            <input type="text" id="search-input" className="search-bar-css" placeholder="Search" />
            <Link to="/profilepage">
                <img src={profile} className="profile-css" id="profile-image" alt="Profile" />
            </Link>
        </div>
    );
}

export default Header;