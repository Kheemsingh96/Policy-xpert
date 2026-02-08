import React, { useEffect, useRef, useCallback } from "react";
import { Link } from "react-router-dom";
import "./header.css";

import logo from "../../assets/images/logo.png";
import callIcon from "../../assets/images/call.png";

function Header({ openForm, setIsMenuOpen, isMenuOpen }) {
  const scrollYRef = useRef(0);

  const toggleMenu = useCallback(() => {
    setIsMenuOpen((prev) => !prev);
  }, [setIsMenuOpen]);

  const closeMenu = useCallback(() => {
    setIsMenuOpen(false);
  }, [setIsMenuOpen]);

  useEffect(() => {
    if (isMenuOpen) {
      scrollYRef.current = window.scrollY || window.pageYOffset || 0;
      document.body.style.position = "fixed";
      document.body.style.top = `-${scrollYRef.current}px`;
      document.body.style.left = "0";
      document.body.style.right = "0";
      document.body.style.width = "100%";
      document.body.style.overflow = "hidden";
    } else {
      const stored = scrollYRef.current || 0;
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.left = "";
      document.body.style.right = "";
      document.body.style.width = "";
      document.body.style.overflow = "";
      window.scrollTo(0, stored);
    }

    return () => {
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.left = "";
      document.body.style.right = "";
      document.body.style.width = "";
      document.body.style.overflow = "";
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
          role="button"
          aria-label="Toggle menu"
          aria-expanded={isMenuOpen}
        >
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </div>

        <div
          className={`menu-overlay ${isMenuOpen ? "show" : ""}`}
          onClick={closeMenu}
          aria-hidden={!isMenuOpen}
        />

        <div className={`header-right ${isMenuOpen ? "open" : ""}`}>
          <nav className="nav">
            <Link to="/" onClick={closeMenu}>Home</Link>
            <Link to="/about-us" onClick={closeMenu}>About us</Link>
            <Link to="#" onClick={closeMenu}>Insurance & more</Link>
            <a href="#" onClick={closeMenu}>Claims</a>
            <Link to="/blog" onClick={closeMenu}>Blog</Link>
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