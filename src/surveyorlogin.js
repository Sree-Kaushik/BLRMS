import React, { useState } from 'react';
import './surveyorlogin.css'; // Import your external CSS file
import { Link, useNavigate } from 'react-router-dom'; // Import Link and useNavigate from react-router-dom
import axios from 'axios';
import logo from './pictures/BLRMS.png';

const SurveyorLogin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate(); // useNavigate hook for navigation

    const handleLogin = async (e) => {
        e.preventDefault();
        
        try {
            const response = await axios.post('http://localhost:5000/api/surveyor/login', { email, password });
            console.log('Login response:', response.data); // Log response data for debugging
            
            // Assuming backend sends a token upon successful login
            localStorage.setItem('token', response.data.token); // Store token in localStorage
            navigate('/survey'); // Redirect upon successful login
        } catch (error) {
            console.error('Login error:', error.response); // Log the error response for debugging
            setError('Invalid credentials. Please try again.');
        }
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
                <div className="form-box login">
                    <h2>Surveyor Login</h2>
                    <form onSubmit={handleLogin}>
                        <div className="input-box">
                            <span className="icon"></span>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                            <label>Email</label>
                        </div>
                        <div className="input-box">
                            <span className="icon"></span>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                            <label>Password</label>
                        </div>
                        <div className="remember-forgot">
                            <label>
                                <input type="checkbox" /> Remember me
                            </label>
                            <a href="signup">Forgot Password ?</a>
                        </div>
                        {error && <div className="error">{error}</div>}
                        <button type="submit" className="btn">Login</button>
                        <div className="login-register">
                            <p>If you are not a surveyor, login via <Link to="/login">Login</Link></p>
                            <p>Don't have an account? <Link to="/surveyorsignup">Register</Link></p>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default SurveyorLogin;
