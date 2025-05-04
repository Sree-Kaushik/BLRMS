import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./signup.css";
import Logo from "./pictures/BLRMS.png";

const SignUp = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    email: "",
    gender: "",
    dob: "",
    uniqueIdentification: "",
    password: "",
    repeatPassword: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const {
      firstName,
      lastName,
      phoneNumber,
      email,
      gender,
      dob,
      uniqueIdentification,
      password,
      repeatPassword,
    } = formData;
  
    if (
      !firstName ||
      !lastName ||
      !phoneNumber ||
      !email ||
      !gender ||
      !dob ||
      !password ||
      !repeatPassword ||
      !uniqueIdentification
    ) {
      alert("All fields are mandatory.");
      return;
    }
  
    const phonePattern = /^\d{10}$/;
    if (!phonePattern.test(phoneNumber)) {
      alert("Phone number must be exactly 10 digits.");
      return;
    }
  
    if (password !== repeatPassword) {
      alert("Passwords do not match.");
      return;
    }
  
    try {
      const response = await axios.post("http://localhost:5000/api/register", {
        firstName,
        lastName,
        phoneNumber,
        email,
        gender,
        dob,
        uniqueIdentification,
        password,
      });
      if (response.status === 201) {
        navigate("/login");
      } else {
        alert(response.data.message || "Registration failed. Please try again.");
      }
    } catch (error) {
      console.error("Error during registration:", error);
      alert(error.response?.data?.message || "Registration failed. Please try again.");
    }
  };  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div>
      <img
        src={Logo}
        className="logo-signup"
        alt="Logo"
        onClick={() => navigate("/homepage")}
      />
      <div className="sign-up-container">
        <h2 className="signup-text">Sign Up</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            id="firstname"
            name="firstName"
            placeholder="First Name"
            className="firstname-input"
            onChange={handleChange}
            value={formData.firstName}
          />
          <input
            type="text"
            id="lastname"
            name="lastName"
            placeholder="Last Name"
            className="lastname-input"
            onChange={handleChange}
            value={formData.lastName}
          />
          <input
            type="text"
            id="phonenumber"
            name="phoneNumber"
            placeholder="Phone Number"
            className="phone-input"
            onChange={handleChange}
            value={formData.phoneNumber}
          />
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Email"
            className="email-input"
            onChange={handleChange}
            value={formData.email}
          />
          <input
            type="text"
            id="gender"
            name="gender"
            placeholder="Gender"
            className="gender-input"
            onChange={handleChange}
            value={formData.gender}
          />
          <input
            type="date"
            id="dob"
            name="dob"
            className="dateofbirth-input"
            placeholder="Select your date of birth"
            onChange={handleChange}
            value={formData.dob}
          />
          <input
            type="text"
            id="uniqueidentification"
            name="uniqueIdentification"
            placeholder="Unique Identification Number"
            className="ua-input"
            onChange={handleChange}
            value={formData.uniqueIdentification}
          />
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Password"
            className="password-input"
            onChange={handleChange}
            value={formData.password}
          />
          <input
            type="password"
            id="repeatpassword"
            name="repeatPassword"
            placeholder="Repeat Password"
            className="repeatpassword-input"
            onChange={handleChange}
            value={formData.repeatPassword}
          />
          <button type="submit" className="btn">
            Submit
          </button>
        </form>
        <p className="already-account">If you already have an account?</p>
        <div className="sign-link">
          <Link to="/login">
            <u>Sign In</u>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
