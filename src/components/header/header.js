import "./header.css";
import logo from "../../assets/images/logo.png";
import callIcon from "../../assets/images/call.png";

function Header() {
  return (
    <header className="header">
      <div className="header-container">

        {/* LOGO */}
        <div className="logo">
          <img src={logo} alt="Policy Xpert Logo" />
        </div>

        {/* RIGHT SIDE */}
        <div className="header-right">
          <nav className="nav">
            <a href="#">Life</a>
            <a href="#">Health</a>
            <a href="#">Auto</a>
            <a href="#">Travel</a>
            <a href="#">About Us</a>
          </nav>

          <button className="header-btn">
            <img src={callIcon} alt="Call" />
            Free Call with Expert
          </button>
        </div>

      </div>
    </header>
  );
}

export default Header;
