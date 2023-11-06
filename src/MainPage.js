import React, { useState, useEffect } from 'react';
import './MainPage.css';

function MainPage() {
  const [showAboutOverlay, setShowAboutOverlay] = useState(false);
  const [showContactOverlay, setShowContactOverlay] = useState(false);

  const handleAboutClick = () => {
    setShowAboutOverlay(true);
  };

  const handleContactClick = () => {
    setShowContactOverlay(true);
  };

  const handleBackClick = () => {
    setShowAboutOverlay(false);
    setShowContactOverlay(false);
  };

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        (showAboutOverlay || showContactOverlay) &&
        event.target.classList.contains('overlay')
      ) {
        setShowAboutOverlay(false);
        setShowContactOverlay(false);
      }
    }

    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [showAboutOverlay, showContactOverlay]);

  return (
    <div className={`main-container ${showAboutOverlay || showContactOverlay ? 'blur' : ''}`}>
      <div className="header">
        <div className="website-name">Your Website Name</div>
        <div className="navigation-bar">
          <a className="nav-link" href="/about" onClick={handleAboutClick}>
            About
          </a>
          <a className="nav-link" href="/contact" onClick={handleContactClick}>
            Contact
          </a>
          
          <a className="nav-link" href="/login">
            Login
          </a>
        </div>
      </div>
      {showAboutOverlay && (
        <div className="overlay">
          <div className="overlay-content">
            <div className="overlay-header">
              <span className="back-button" onClick={handleBackClick}>
                &lt; Back
              </span>
              <h2>About Section</h2>
            </div>
            {/* Add your About section content here */}
          </div>
        </div>
      )}
      {showContactOverlay && (
        <div className="overlay">
          <div className="overlay-content">
            <div className="overlay-header">
              
              <h2>Contact Section</h2>
            </div>
            {<p>We are here for you!</p>}
            {<p>Our team of experts is on hand to answer your questions.</p>}
          </div>
        </div>
      )}
    </div>
  );
}

export default MainPage;
