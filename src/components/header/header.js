import { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import "./header.css";

import logo from "../../assets/images/logo.png";
import callIcon from "../../assets/images/call.png";

function Header({ openForm }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = useCallback(() => {
    setIsMenuOpen((prev) => !prev);
  }, []);

  const closeMenu = useCallback(() => {
    setIsMenuOpen(false);
  }, []);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMenuOpen]);

  return (
    <header className="header">
      <div className="header-container">
        <div className="logo">
          <Link to="/" onClick={closeMenu}>
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
            <Link to="/" onClick={closeMenu}>Home</Link>
            <Link to="#" onClick={closeMenu}>About us</Link>
            <Link to="#" onClick={closeMenu}>Insurance & more</Link>
            <a href="#" onClick={closeMenu}>Claims</a>
            <a href="#" onClick={closeMenu}>Resource & Tools</a>
          </nav>

          {openForm && (
            <button
              className="header-btn"
              onClick={() => {
                openForm();
                closeMenu();
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