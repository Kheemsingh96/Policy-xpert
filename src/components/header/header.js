import "./header.css";
import { Link } from "react-router-dom";

import logo from "../../assets/images/logo.png";
import callIcon from "../../assets/images/call.png";

function Header({ openForm }) {
  return (
    <header className="header">
      <div className="header-container">
        <div className="logo">
          <img src={logo} alt="Policy Xpert Logo" />
        </div>

        <div className="header-right">
          <nav className="nav">
            <Link to="/">Home</Link>
            <Link to="/life">Life</Link>
            <a href="#">Health</a>
            <a href="#">Auto</a>
            <a href="#">Travel</a>
            <a href="#">About Us</a>
          </nav>

          {openForm && (
            <button className="header-btn" onClick={openForm}>
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
