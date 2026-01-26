import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./auto2.css";

import carHeroImg from "../../assets/images/auto-image.png";

function Auto2() {
  const navigate = useNavigate();
  const [mobile, setMobile] = useState("");
  const [error, setError] = useState("");

  const validate = () => {
    const mobilePattern = /^[6-9]\d{9}$/;
    if (!mobile) {
      setError("Mobile number is required");
      return false;
    } else if (!mobilePattern.test(mobile)) {
      setError("Enter valid 10-digit mobile number");
      return false;
    }
    setError("");
    return true;
  };

  const handleContinue = () => {
    if (validate()) {
      navigate("/carbrand");
    }
  };

  return (
    <>
      <section className="auto-hero">
        <div className="auto-container">
          <div className="auto-left">
            <h1>
              Buy or Renew Car Insurance Policy with
              <br />
              Instant Coverage
            </h1>
            <div className="auto-image-box">
              <img src={carHeroImg} alt="Car Insurance" className="car-hero-img" />
            </div>
          </div>

          <div className="auto-right">
            <div className="auto-form-card">
              
              <div className="offer-box">
                <div className="offer-header">
                  <div className="gift-icon-wrapper">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M20 12V22H4V12" stroke="#4685C4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M22 7H2V12H22V7Z" stroke="#4685C4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M12 22V7" stroke="#4685C4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M12 7H7.5C6.83696 7 6.20268 6.73661 5.73388 6.26777C5.26509 5.79893 5.00174 5.16304 5.00174 4.5C5.00174 3.83696 5.26509 3.20107 5.73388 2.73223C6.20268 2.26339 6.83696 2 7.5 2C11 2 12 7 12 7Z" stroke="#4685C4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M12 7H16.5C17.163 7 17.7973 6.73661 18.2661 6.26777C18.7349 5.79893 18.9983 5.16304 18.9983 4.5C18.9983 3.83696 18.7349 3.20107 18.2661 2.73223C17.7973 2.26339 17.163 2 16.5 2C13 2 12 7 12 7Z" stroke="#4685C4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <div className="offer-titles">
                    <h3>Claim your Offer</h3>
                    <span>Up to 40% Discount</span>
                  </div>
                </div>
                <div className="offer-divider"></div>
                <p className="offer-desc">
                  Save big with Policy Xpert – Claim up to 40% discount on new car insurance premium.
                </p>
              </div>

              <div className="auto-field">
                <label>Mobile Number</label>
                <input
                  type="text"
                  placeholder="+91 5888445544"
                  value={mobile}
                  maxLength={10}
                  className={error ? "input-error" : ""}
                  onChange={(e) => {
                    setMobile(e.target.value.replace(/\D/g, ""));
                    setError("");
                  }}
                />
                {error && <span className="auto-error-text">{error}</span>}
              </div>

              <button className="view-prices-btn" onClick={handleContinue}>
                Continue
              </button>
              
              <button 
                type="button"
                className="brand-new-btn" 
                onClick={() => navigate("/auto")}
              >
                I know Registration Number
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="auto-info-section">
        <div className="auto-info-container">
          <h2>What is Car Insurance?</h2>
          <p>
            Car insurance is a financial security solution for your vehicle that protects you from losses resulting from accidents, theft, fire, natural disasters, and third party liabilities, and it helps manage repair expenses, replacement costs, and legal responsibilities so that you are not exposed to sudden financial burdens, and in India having at least a third party car insurance policy is legally mandatory, as this policy safeguards you from financial liability related to injury, death, or property damage caused to another party while operating your car, and there are mainly three types of car insurance policies offered which include third party coverage, own damage coverage that applies only to your vehicle, and comprehensive insurance that provides complete protection by covering both third party risks and damages to your own vehicle.
          </p>
        </div>
      </section>
    </>
  );
}

export default Auto2;