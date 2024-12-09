import React from 'react';
import '../styles/Home.css';

function Home() {
  return (
    <div className="home">
      <header className="home-header">
        <img
          src="/img1.jpg" 
          alt="Welcome Banner"
          className="home-banner"
        />
        <h1>Welcome! You have successfully Logged In as an Admin.</h1>
      </header>
    </div>
  );
}
export default Home;

