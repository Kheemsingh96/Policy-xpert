import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./auto.css";

import carHeroImg from "../../assets/images/auto-image.png";

function Auto() {
  const navigate = useNavigate();
  const [regNumber, setRegNumber] = useState("");
  const [mobile, setMobile] = useState("");
  const [errors, setErrors] = useState({});

  const validate = () => {
    let tempErrors = {};
    let isValid = true;

    const cleanReg = regNumber.replace(/\s/g, "").toUpperCase();
    const regPattern = /^[A-Z]{2}[0-9]{1,2}[A-Z]{1,3}[0-9]{4}$/;

    if (!regNumber) {
      tempErrors.reg = "Registration number is required";
      isValid = false;
    } else if (!regPattern.test(cleanReg)) {
      tempErrors.reg = "Enter valid registration number (e.g., KA04DK8337)";
      isValid = false;
    }

    const mobilePattern = /^[6-9]\d{9}$/;
    if (!mobile) {
      tempErrors.mobile = "Mobile number is required";
      isValid = false;
    } else if (!mobilePattern.test(mobile)) {
      tempErrors.mobile = "Enter valid 10-digit mobile number";
      isValid = false;
    }

    setErrors(tempErrors);
    return isValid;
  };

  const handleViewPrices = () => {
    if (validate()) {
      // Validation pass hone par hi navigate hoga
      navigate("/carbrand", { state: { regNumber, mobile } });
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
              <div className="auto-badge">
                Save Up to 40% with Pay-As-You-Drive Insurance
              </div>

              <div className="auto-field">
                <label>Registration Number</label>
                <input
                  type="text"
                  placeholder="MH02AR2085"
                  value={regNumber}
                  className={errors.reg ? "input-error" : ""}
                  onChange={(e) => {
                    setRegNumber(e.target.value.toUpperCase());
                    setErrors({ ...errors, reg: "" });
                  }}
                />
                {errors.reg && <span className="auto-error-text">{errors.reg}</span>}
              </div>

              <div className="auto-field">
                <label>Mobile Number</label>
                <input
                  type="text"
                  placeholder="+91 9563100008"
                  value={mobile}
                  maxLength={10}
                  className={errors.mobile ? "input-error" : ""}
                  onChange={(e) => {
                    setMobile(e.target.value.replace(/\D/g, ""));
                    setErrors({ ...errors, mobile: "" });
                  }}
                />
                {errors.mobile && <span className="auto-error-text">{errors.mobile}</span>}
              </div>

              {/* Fix: Direct navigate hatakar function call lagaya */}
              <button className="view-prices-btn" onClick={handleViewPrices}>
                Get Started
              </button>
              
              <button 
                type="button" 
                className="brand-new-btn" 
                onClick={() => navigate("/auto2")}
              >
                it's Brand New Car
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

export default Auto;