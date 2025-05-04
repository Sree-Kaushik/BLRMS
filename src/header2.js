import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './header2.css'; // Import your CSS file
import logo from './pictures/BLRMS.png';
const Header2 = () => {
    return (
        <div className="Header-div">
            <img src={logo} className="Logo" id="logo" alt="Logo" />
            <h1 className="heading-css">Blockchain based Land Registration and Management</h1>
            <input type="text" id="search-input" className="search-bar-css" placeholder="Search" />
            <Link to = "/login"><button className = "sign-out-css">Sign Out</button></Link>
        </div>
    );
}

export default Header2;