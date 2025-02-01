
import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <div className="home-page">
      <h1>Hey welcome to Hardware Order</h1>
      <p>Your go-to platform for ordering high-quality hardware products.</p>
      <div>
        <Link to="/login">Login</Link> | <Link to="/signup">Sign Up</Link>
      </div>
    </div>
  );
};

export default HomePage;
