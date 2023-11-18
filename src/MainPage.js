// MainPage.js
import React, { useState, useRef, useEffect } from 'react';
import './MainPage.css';

const MainPage = () => {
  const [showAboutPopup, setShowAboutPopup] = useState(false);
  const [showContactPopup, setShowContactPopup] = useState(false);
  const popupRef = useRef(null);

  const handleAboutClick = () => {
    setShowAboutPopup(true);
    setShowContactPopup(false); // Close contact popup if open
  };

  const handleContactClick = () => {
    setShowContactPopup(true);
    setShowAboutPopup(false); // Close about popup if open
  };

  const handleClosePopup = () => {
    setShowAboutPopup(false);
    setShowContactPopup(false);
  };

  const handleOutsideClick = (event) => {
    if (popupRef.current && !popupRef.current.contains(event.target)) {
      handleClosePopup();
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleOutsideClick);
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, []);

  return (
    <div className="main-container">
      <div className="header">
        <div className="logo">Website Name</div>
        <div className="buttons">
          <button className="button">Login</button>
          <button className="button" onClick={handleContactClick}>
            Contact
          </button>
          <button className="button" onClick={handleAboutClick}>
            About
          </button>
        </div>
      </div>

      {showContactPopup && (
        <div className="popup" ref={popupRef}>
          <div className="popup-content">
            <span className="close" onClick={handleClosePopup}>
              &times;
            </span>
            <p>Contact form or information goes here...</p>
            <button className="close-button" onClick={handleClosePopup}>
              Close
            </button>
          </div>
        </div>
      )}

      {showAboutPopup && (
        <div className="popup" ref={popupRef}>
          <div className="popup-content">
            <span className="close" onClick={handleClosePopup}>
              &times;
            </span>
            <p>About content goes here...</p>
            <button className="close-button" onClick={handleClosePopup}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MainPage;
