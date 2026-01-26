import React from "react";
import { useLocation } from "react-router-dom";
import "./thankyou.css";

import checkIcon from "../../assets/images/check-2.png"; 
import phoneIcon from "../../assets/images/call.png"; 
import chatIcon from "../../assets/images/whatsapp.png"; 

function ThankYou() {
  const location = useLocation();
  const userName = location.state?.fullName || "Kheem Singh";

  const handleCall = () => {
    window.location.href = "tel:+918080854433"; 
  };

  const handleChat = () => {
    const phoneNumber = "918080854433";
    const message = `Hi, this is ${userName}. I recently submitted a car insurance request on PolicyXpert and was hoping you could help me with a quote and the best coverage options.`;
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/${phoneNumber}?text=${encodedMessage}`, "_blank");
  };

  return (
    <section className="thankyou-section">
      <div className="thankyou-container">
        <div className="thankyou-card">
          
          <div className="success-icon-wrapper">
             <img src={checkIcon} alt="Success" className="success-icon" />
          </div>

          <h2 className="thankyou-title">
            Thank you {userName}! Your request has been received
          </h2>

          <p className="thankyou-subtitle">
            Our car insurance expert will contact you shortly to provide the best available quote for your car.
          </p>

          <div className="thankyou-actions">
            <button className="action-btn call-btn" onClick={handleCall}>
              <img src={phoneIcon} alt="Call" className="btn-icon" />
              Free Call with Expert
            </button>
            
            <button className="action-btn chat-btn" onClick={handleChat}>
              <img src={chatIcon} alt="Chat" className="btn-icon" />
              Chat with Expert
            </button>
          </div>

        </div>
      </div>
    </section>
  );
}

export default ThankYou;