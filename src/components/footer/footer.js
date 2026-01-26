import "./footer.css";

import Logo from "../../assets/images/logo.png";
import Facebook from "../../assets/images/Facebook.png";
import Twitter from "../../assets/images/Twitter.png";
import Instagram from "../../assets/images/Instagram.png";
import Linkedin from "../../assets/images/LinkedIn.png";

import Mail from "../../assets/images/Email.png";
import Phone from "../../assets/images/Phone.png";
import Location from "../../assets/images/Location.png";


const FOOTER_SECTION_TITLES = [
  "Quick Links",
  "Services for Policy xpert",
  "Contacts us",
];

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        
        <div className="footer-col brand">
          <img src={Logo} alt="Policy Xpert" className="footer-logo" />
          <p>
            Lorem ipsum dolor sit amet consectetur adipiscing elit aliquam
          </p>

          <div className="socials">
            <img src={Facebook} alt="Facebook" />
            <img src={Twitter} alt="Twitter" />
            <img src={Instagram} alt="Instagram" />
            <img src={Linkedin} alt="LinkedIn" />
          </div>
        </div>

      
        <div className="footer-col">
          <h4>{FOOTER_SECTION_TITLES[0]}</h4>
          <ul>
            <li>About Us</li>
            <li>Blogs</li>
            <li>Renew your policy</li>
            <li>IRDAI Complaint Portal Link</li>
            <li>Claims Helpline</li>
            <li>Companies claim settlement ratio</li>
          </ul>
        </div>

    
        <div className="footer-col">
          <h4>{FOOTER_SECTION_TITLES[1]}</h4>
          <ul>
            <li>Life Insurance</li>
            <li>Health Insurance</li>
            <li>Car Insurance</li>
            <li>Travel Insurance</li>
          </ul>
        </div>


        <div className="footer-col">
          <h4>{FOOTER_SECTION_TITLES[2]}</h4>

          <div className="contact-item">
            <img src={Mail} alt="Email" />
            <span>contact@company.com</span>
          </div>

          <div className="contact-item">
            <img src={Phone} alt="Phone" />
            <span>(414) 687 - 5892</span>
          </div>

          <div className="contact-item">
            <img src={Location} alt="Location" />
            <span>794 Mccallister St San Francisco, 94102</span>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>Copyright © 2026 Policyxpert</p>
      </div>
    </footer>
  );
};

export default Footer;
