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
    const message = `Hi, I am ${userName}. I just generated my Life Insurance Report on PolicyXpert and would like to discuss the best life insurance plans suitable for me.`;
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/${phoneNumber}?text=${encodedMessage}`, "_blank");
  };

  return (
    <section className="ty-life-section">
      <div className="ty-life-container">
        <div className="ty-life-card">
          
          <div className="ty-life-icon-wrap">
             <img src={checkIcon} alt="Success" className="ty-life-success-img" />
          </div>

          <h2 className="ty-life-title">
            Thank you {userName}! Your request has been received
          </h2>

          <p className="ty-life-subtext">
            One of our insurance experts will reach out shortly to help you get the right insurance quote for you.
          </p>

          <div className="ty-life-actions">
            <button className="ty-life-btn ty-life-btn-call" onClick={handleCall}>
              <img src={phoneIcon} alt="Call" className="ty-life-btn-icon" />
              Free Call with Expert
            </button>
            
            <button className="ty-life-btn ty-life-btn-chat" onClick={handleChat}>
              <img src={chatIcon} alt="Chat" className="ty-life-btn-icon" />
              Chat with Expert
            </button>
          </div>

        </div>
      </div>
    </section>
  );
}

export default Thanks;