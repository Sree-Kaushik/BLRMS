import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./login.css";
import logo from "./pictures/BLRMS.png";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(email)) {
      alert("Please enter a valid email address.");
      return;
    }

    if (password.length < 8) {
      alert("Password must be at least 8 characters long.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:5000/api/login", {
        email,
        password,
      });
      
      if (response.status === 200) {
        localStorage.setItem("token", response.data.token); // Store token in localStorage
        navigate("/home");
      } else {
        alert("Invalid credentials");
      }
    } catch (error) {
      if (error.response) {
        console.error("Error response data:", error.response.data);
        alert(error.response.data.message || "Login failed. Please try again.");
      } else if (error.request) {
        console.error("Error request:", error.request);
        alert("No response from server. Please try again later.");
      } else {
        console.error("Error message:", error.message);
        alert("Login failed. Please try again.");
      }
    }
  };

  return (
    <div className="App">
      <header className="logo_header">
        <img src={logo} className="picture" id="pic" alt="Logo" />
        <h1 className="logo">Land Registration Management</h1>
        <nav className="navigation">
          <Link to="/">Home</Link>
          <Link to="/about">About Us</Link>
          <Link to="#">Services</Link>
          <Link to="/contact">Contact</Link>
        </nav>
      </header>

      <div className="wrapper">
        <span className="icon-close" id="closeButton">
          <ion-icon name="close"></ion-icon>
        </span>
        <div className="form-box login">
          <h2>Login</h2>
          <form onSubmit={handleSubmit}>
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
              <Link to="/forgot-password">Forgot Password?</Link>
            </div>
            <button type="submit" className="btn">
              Login
            </button>
            <div className="login-register">
              <p>
                Don't have an account?{" "}
                <Link to="/signup" className="register-link">
                  Sign up
                </Link>
              </p>
              <p>
                If you are a suveyor?{" "}
                <Link to="/surveyorlogin" className="register-link">
                  Survey Login
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
