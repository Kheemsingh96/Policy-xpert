import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./review.css";

import arrowLeft from "../../assets/images/arrow-left.png"; 
import arrowRight from "../../assets/images/arrow2.png"; 
import carIcon from "../../assets/images/car.png"; 
import editIcon from "../../assets/images/edit.png"; 

function Review() {
  const navigate = useNavigate();
  const location = useLocation();

  const brandName = location.state?.brandName || "Mahindra";
  const modelName = location.state?.modelName || "XUV 700";
  const fuelType = location.state?.fuelType || "Petrol";
  const variantName = location.state?.variantName || "2.0 AX7 At Luxury Pack";
  
  const regYear = location.state?.registrationYear || new Date().getFullYear();

  const [formData, setFormData] = useState({
    pincode: "",
    mobile: location.state?.mobile || ""
  });

  const [errors, setErrors] = useState({});

  const steps = [
    { id: 1, label: "Car Details" },
    { id: 2, label: "02 Personal details" },
    { id: 3, label: "03 Done" },
  ];

  const progressPercent = 40;

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (value === "" || /^[0-9\b]+$/.test(value)) {
      setFormData({ ...formData, [name]: value });
      if (errors[name]) {
        setErrors({ ...errors, [name]: "" });
      }
    }
  };

  const validate = () => {
    let newErrors = {};
    if (formData.pincode.length !== 6) newErrors.pincode = "Please enter a valid 6-digit PIN code";
    if (formData.mobile.length !== 10) newErrors.mobile = "Please enter a valid 10-digit mobile number";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validate()) {
      navigate("/auto/step-5", {
        state: {
          brandName,
          modelName,
          fuelType,
          variantName,
          regYear,
          pincode: formData.pincode,
          mobile: formData.mobile
        }
      });
    }
  };

  const handlePrevious = () => {
    navigate(-1);
  };

  const handleEdit = () => {
    navigate("/auto"); 
  };

  return (
    <section className="review-section">
      <div className="review-container">
        
        <div className="review-progress-wrapper">
          <div className="review-progress-steps">
            {steps.map((s) => (
              <span key={s.id} className={s.id === 1 ? "active" : ""}>
                {s.label}
              </span>
            ))}
          </div>
          <div className="review-progress-bar">
            <div className="review-progress-fill" style={{ width: `${progressPercent}%` }}></div>
          </div>
        </div>

        <div className="review-step-box">
          
          <h2 className="review-title">
            Review your car info and help us with some more details
          </h2>

          <div className="summary-card">
            <div className="summary-header">
              <div className="car-info-group">
                 <div className="car-icon-wrapper">
                   <img src={carIcon} alt="Car" className="summary-car-icon" /> 
                 </div>
                 <div className="car-text-details">
                   <h3 className="brand-model-text">{brandName} {modelName}</h3>
                   <span className="fuel-text-sm">{fuelType}</span>
                 </div>
              </div>
              <button className="edit-btn" onClick={handleEdit}>
                <img src={editIcon} alt="Edit" /> Edit
              </button>
            </div>

            <div className="summary-divider"></div>

            <div className="summary-row">
              <span className="summary-label">Variant</span>
              <span className="summary-value">{variantName}</span>
            </div>
            
            <div className="summary-row">
              <span className="summary-label">Registration year</span>
              <span className="summary-value">{regYear}</span>
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Enter the PIN code of your current residence</label>
            <input 
              type="text" 
              name="pincode"
              className={`form-input ${errors.pincode ? "input-error" : ""}`}
              placeholder="Pin Code"
              maxLength="6"
              value={formData.pincode}
              onChange={handleChange}
            />
            {errors.pincode && <span className="error-msg">{errors.pincode}</span>}
          </div>

          <div className="form-group">
            <label className="form-label">Enter mobile number</label>
            <input 
              type="tel" 
              name="mobile"
              className={`form-input ${errors.mobile ? "input-error" : ""}`}
              placeholder="Mobile number"
              maxLength="10"
              value={formData.mobile}
              onChange={handleChange}
            />
            {errors.mobile && <span className="error-msg">{errors.mobile}</span>}
          </div>

          <div className="review-footer">
            <button className="review-prev-btn" onClick={handlePrevious}>
              <img src={arrowLeft} alt="prev" className="prev-icon" /> Previous
            </button>
            
            <button className="review-next-btn" onClick={handleNext}>
              Next <img src={arrowRight} alt="next" />
            </button>
          </div>

        </div> 
      </div>
    </section>
  );
}

export default Review;