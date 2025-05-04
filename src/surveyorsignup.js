import React, { useState } from 'react';
import axios from 'axios';
import './surveyorsignup.css';
import { Link, useNavigate } from 'react-router-dom';
import logo from './pictures/BLRMS.png';

const SurveyorSignUp = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        confirmPassword: '',
        securityKey: '',
    });
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const validSecurityKey = "123456788";

    const handleSignUp = async (e) => {
        e.preventDefault();

        const { email, password, confirmPassword, securityKey } = formData;

        if (securityKey !== validSecurityKey) {
            setError('Invalid security key. Please try again.');
            return;
        }

        if (password !== confirmPassword) {
            setError('Passwords do not match.');
            return;
        }

        try {
            const response = await axios.post("http://localhost:5000/api/surveyor/signup", {
                email,
                password,
                securityKey
            });

            console.log('Response data:', response.data);

            navigate('/surveyorlogin');
        } catch (error) {
            console.error('Signup error:', error.response ? error.response.data : error.message);
            setError(error.response ? error.response.data.message : 'Failed to sign up. Please try again.');
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    return (
        <div>
            <header className="logo_header">
                <img src={logo} className="picture" id="pic" alt="Logo" />
                <h1 className="logo">Land Registration Management</h1>
                <nav className="navigation">
                    <a href="homepage">Home</a>
                    <a href="about">About Us</a>
                    <a href="#">Services</a>
                    <a href="contact">Contact</a>
                </nav>
            </header>

            <div className="wrapper">
                <span className="icon-close" id="closeButton">
                    <ion-icon name="close"></ion-icon>
                </span>
                <div className="form-box signup">
                    <h2>Surveyor Sign Up</h2>
                    <form onSubmit={handleSignUp}>
                        <div className="input-box">
                            <span className="icon"></span>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                            <label>Email</label>
                        </div>
                        <div className="input-box">
                            <span className="icon"></span>
                            <input
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                required
                            />
                            <label>Password</label>
                        </div>
                        <div className="input-box">
                            <span className="icon"></span>
                            <input
                                type="password"
                                name="confirmPassword"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                required
                            />
                            <label>Confirm Password</label>
                        </div>
                        <div className="input-box">
                            <span className="icon"></span>
                            <input
                                type="text"
                                name="securityKey"
                                value={formData.securityKey}
                                onChange={handleChange}
                                required
                            />
                            <label>Security Key</label>
                        </div>
                        {error && <div className="error">{error}</div>}
                        <button type="submit" className="btn">Sign Up</button>
                        <div className="login-register">
                            <p>Already a surveyor? <Link to="/surveyorlogin">Login here</Link></p>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default SurveyorSignUp;
