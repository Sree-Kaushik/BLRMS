import React from 'react';
import './about.css';

const AboutUs = () => {
  return (
    <div>
      <header>
        <h1>About Us</h1>
      </header>
      <div className="container-about">
        <main>
          <div className="section">
            <h2>Our Mission</h2>
            <p>
              Our mission is to facilitate easier way for buying and selling of land through our app,
              aligning with the government's vision to make this process more secure and deliver unparalleled value.
            </p>
          </div>
          <div className="section">
            <h2>Our Story</h2>
            <p>
              Founded in 2023 August, our company has grown from a small startup to a leading player in the industry.
              Our journey has been driven by passion, innovation, and a commitment to excellence.
            </p>
          </div>
          <div className="section">
            <h2>Meet the Team</h2>
            <p>
              Our team is composed of talented and dedicated professionals who are passionate about what they do.
              We believe in collaboration, creativity, and continuous improvement.
            </p>
            <ul>
              <li>Maheswara Rao Valluri, Ph.D, MIMA(UK) - CEO</li>
            </ul>
          </div>
        </main>
      </div>
      <footer>
        <p>&copy; 2024 Your Company. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default AboutUs;
