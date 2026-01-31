import "./footer.css";
import { 
  FaFacebook, 
  FaLinkedin, 
  FaEnvelope, 
  FaPhoneAlt, 
  FaMapMarkerAlt 
} from "react-icons/fa";
import { FaSquareXTwitter, FaSquareInstagram } from "react-icons/fa6";

import Logo from "../../assets/images/logo.png";

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
            <a href="https://www.facebook.com/share/1DRcEMiwoQ/" target="_blank" rel="noopener noreferrer" style={{ color: 'inherit', display: 'flex' }}>
              <FaFacebook size={24} />
            </a>
            <a href="https://x.com/PolicyXpert" target="_blank" rel="noopener noreferrer" style={{ color: 'inherit', display: 'flex' }}>
              <FaSquareXTwitter size={24} />
            </a>
            <a href="https://www.instagram.com/policyxpert?utm_source=qr&igsh=ZjhxanpxbTFoMGR4" target="_blank" rel="noopener noreferrer" style={{ color: 'inherit', display: 'flex' }}>
              <FaSquareInstagram size={24} />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" style={{ color: 'inherit', display: 'flex' }}>
              <FaLinkedin size={24} />
            </a>
          </div>
        </div>

      
        <div className="footer-col">
          <h4>{FOOTER_SECTION_TITLES[0]}</h4>
          <ul>
            <li><a href="/about-us" style={{ color: 'inherit', textDecoration: 'none' }}>About Us</a></li>
            <li><a href="/blogs" style={{ color: 'inherit', textDecoration: 'none' }}>Blogs</a></li>
            <li><a href="/renew-policy" style={{ color: 'inherit', textDecoration: 'none' }}>Renew your policy</a></li>
            <li><a href="https://bimabharosa.irdai.gov.in/" target="_blank" rel="noopener noreferrer" style={{ color: 'inherit', textDecoration: 'none' }}>IRDAI Complaint Portal Link</a></li>
            <li><a href="/claims-helpline" style={{ color: 'inherit', textDecoration: 'none' }}>Claims Helpline</a></li>
            <li><a href="/claim-settlement-ratio" style={{ color: 'inherit', textDecoration: 'none' }}>Companies claim settlement ratio</a></li>
          </ul>
        </div>

    
        <div className="footer-col">
          <h4>{FOOTER_SECTION_TITLES[1]}</h4>
          <ul>
            <li><a href="/life-insurance" style={{ color: 'inherit', textDecoration: 'none' }}>Life Insurance</a></li>
            <li><a href="/health-insurance" style={{ color: 'inherit', textDecoration: 'none' }}>Health Insurance</a></li>
            <li><a href="/car-insurance" style={{ color: 'inherit', textDecoration: 'none' }}>Car Insurance</a></li>
            <li><a href="/travel-insurance" style={{ color: 'inherit', textDecoration: 'none' }}>Travel Insurance</a></li>
          </ul>
        </div>


        <div className="footer-col">
          <h4>{FOOTER_SECTION_TITLES[2]}</h4>

          <div className="contact-item">
            <FaEnvelope size={20} color="#4685C4" />
            <a href="mailto:policyxpert@inivesh.com" style={{ color: 'inherit', textDecoration: 'none' }}>policyxpert@inivesh.com</a>
          </div>

          <div className="contact-item">
            <FaPhoneAlt size={20} color="#4685C4" />
            <a href="tel:+918080854433" style={{ color: 'inherit', textDecoration: 'none' }}>+91 8080854433</a>
          </div>

          <div className="contact-item">
            <FaMapMarkerAlt size={20} color="#4685C4" style={{ marginTop: "4px", minWidth: "20px" }} />
            <span style={{ lineHeight: "1.6", display: "inline-block" }}>
              B 318, Eastern Business District, LBS Road, Kanjurmarg West, Mumbai, Maharashtra - 400078
            </span>
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