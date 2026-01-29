import React from "react";
import ReactDOM from "react-dom";
import "./stickyfooter.css";

import callIcon from "../../assets/images/call.png";
import chatIcon from "../../assets/images/whatsapp.png";

const StickyFooter = ({ 
  callNumber = "+918080854433", 
  whatsappNumber = "+918080854433",
  message = "Hi, I need help with insurance.",
  isMenuOpen = false,
  isFormOpen = false
}) => {
  if (isMenuOpen || isFormOpen) return null;

  const whatsappLink = `https://wa.me/${whatsappNumber.replace(/\+/g, "")}?text=${encodeURIComponent(message)}`;

  return ReactDOM.createPortal(
    <div className="sticky-footer-container">
      <div className="sticky-btn-wrapper">
        <a href={`tel:${callNumber}`} className="sticky-btn call-btn">
          <img src={callIcon} alt="Call" width="20" height="20" />
          <span>Free Call with Expert</span>
        </a>

        <a
          href={whatsappLink}
          className="sticky-btn chat-btn"
          target="_blank"
          rel="noreferrer"
        >
          <img src={chatIcon} alt="Chat" width="20" height="20" />
          <span>Chat with Expert</span>
        </a>
      </div>
    </div>,
    document.body
  );
};

export default StickyFooter;