// LandingPage.js
import React from 'react';
import Header from './Header';
import Footer from './Footer';
import Navbar from './Navbar';
import { Link } from 'react-router-dom';
import './LandingPage.css';

const LandingPage = () => {
  return (
    <div>
      
      
      <div className="landing-content">
        <h1>EMS</h1>
        <Navbar />
        <p>Please sign in or sign up </p>
        
        <div className="landing-links">
          <Link to="/employee/signin">Sign In</Link>
          <Link to="/employee/signup">Sign Up</Link>
        </div>
      </div>
      
    </div>
  );
};

export default LandingPage;
