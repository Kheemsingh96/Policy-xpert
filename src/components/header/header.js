import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./header.css";

import logo from "../../assets/images/logo.png";
import callIcon from "../../assets/images/call.png";

function Header({ openForm }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(prev => !prev);
  };

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  return (
    <header className="header">
      <div className="header-container">
        <div className="logo">
          <Link to="/" onClick={() => setIsMenuOpen(false)}>
            <img src={logo} alt="Policy Xpert Logo" />
          </Link>
        </div>

        <div
          className={`hamburger ${isMenuOpen ? "active" : ""}`}
          onClick={toggleMenu}
        >
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </div>

        <div className={`header-right ${isMenuOpen ? "open" : ""}`}>
          <nav className="nav">
            <Link to="/" onClick={() => setIsMenuOpen(false)}>Home</Link>
            <Link to="/life" onClick={() => setIsMenuOpen(false)}>Life</Link>
            <a href="#" onClick={() => setIsMenuOpen(false)}>Health</a>
            <a href="#" onClick={() => setIsMenuOpen(false)}>Auto</a>
            <a href="#" onClick={() => setIsMenuOpen(false)}>Travel</a>
            <a href="#" onClick={() => setIsMenuOpen(false)}>About Us</a>
          </nav>

          {openForm && (
            <button
              className="header-btn"
              onClick={() => {
                openForm();
                setIsMenuOpen(false);
              }}
            >
              <img src={callIcon} alt="Call" />
              Free Call with Expert
            </button>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;