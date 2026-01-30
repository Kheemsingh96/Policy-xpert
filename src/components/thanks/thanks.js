import React from "react";
import { useLocation } from "react-router-dom";
import "./thanks.css"; 

import checkIcon from "../../assets/images/check-2.png"; 
import phoneIcon from "../../assets/images/call.png"; 
import chatIcon from "../../assets/images/whatsapp.png"; 

function Thanks() {
  const location = useLocation();
  const userName = location.state?.fullName || "Guest";

  const handleCall = () => {
    window.location.href = "tel:+918080854433"; 
  };

  const handleChat = () => {
    const phoneNumber = "918080854433";
    const message = `Hi, I am ${userName}. I just submitted a consultation request on PolicyXpert and would like to discuss the best insurance plans suitable for me.`;
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/${phoneNumber}?text=${encodedMessage}`, "_blank");
  };

  return (
    <section className="thanks-page-section">
      <div className="thanks-page-container">
        <div className="thanks-page-card">
          
          <div className="thanks-icon-wrapper">
             <img src={checkIcon} alt="Success" className="thanks-success-icon" />
          </div>

          <h2 className="thanks-page-title">
            Thank you {userName}! Your request has been received
          </h2>

          <p className="thanks-page-subtitle">
            One of our insurance experts will reach out shortly to help you get the right insurance quote for you.
          </p>

          <div className="thanks-page-actions">
            <button className="thanks-action-btn thanks-call-btn" onClick={handleCall}>
              <img src={phoneIcon} alt="Call" className="thanks-btn-icon" />
              Free Call with Expert
            </button>
            
            <button className="thanks-action-btn thanks-chat-btn" onClick={handleChat}>
              <img src={chatIcon} alt="Chat" className="thanks-btn-icon" />
              Chat with Expert
            </button>
          </div>

        </div>
      </div>
    </section>
  );
}

export default Thanks;