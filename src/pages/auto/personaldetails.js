import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import "./personaldetails.css";

import arrowLeft from "../../assets/images/arrow-left.png"; 
import arrowRight from "../../assets/images/arrow2.png"; 

function PersonalDetails() {
  const navigate = useNavigate();
  const location = useLocation();
  
  const prevData = location.state || {};

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    mobile: "",
    gst: ""
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (prevData.mobile) {
      setFormData(prev => ({ ...prev, mobile: prevData.mobile }));
    }
  }, [prevData]);

  const steps = [
    { id: 1, label: "Car Details" },
    { id: 2, label: "02 Personal details" },
    { id: 3, label: "03 Done" },
  ];

  const progressPercent = 90;

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    if (name === "mobile") {
      if (value === "" || /^[0-9\b]+$/.test(value)) {
        setFormData({ ...formData, [name]: value });
        if (errors[name]) setErrors({ ...errors, [name]: "" });
      }
    } else {
      setFormData({ ...formData, [name]: value });
      if (errors[name]) setErrors({ ...errors, [name]: "" });
    }
  };

  const validate = () => {
    let newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!formData.fullName.trim()) newErrors.fullName = "Please enter your full name";
    if (!formData.email) {
      newErrors.email = "Please enter your email";
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }
    if (formData.mobile.length !== 10) newErrors.mobile = "Please enter a valid 10-digit mobile number";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = async () => {
    if (validate()) {
      setLoading(true);

      const payload = {
        regNo: prevData.regNumber || prevData.regNo || "NEW",
        mobile: formData.mobile,
        carBrand: prevData.brandName || prevData.carBrand || "Unknown",
        carModel: prevData.modelName || prevData.carModel || "Unknown",
        carVariant: prevData.variantName || prevData.carVariant || "Unknown",
        fullName: formData.fullName,
        email: formData.email,
        pincode: prevData.pincode || "N/A",
        gstNo: formData.gst
      };

      try {
        const response = await axios.post("http://localhost:5000/api/save-auto", payload);

        if (response.status === 200) {
          navigate("/auto/thank-you", { 
            state: { 
              ...prevData, 
              ...formData 
            } 
          }); 
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
  };

  const handlePrevious = () => {
    navigate(-1);
  };

  return (
    <section className="personaldetails-section">
      <div className="personaldetails-container">
        
        <div className="personaldetails-progress-wrapper">
          <div className="personaldetails-progress-steps">
            {steps.map((s) => (
              <span key={s.id} className={s.id === 2 ? "active" : ""}>
                {s.label}
              </span>
            ))}
          </div>
          <div className="personaldetails-progress-bar">
            <div className="personaldetails-progress-fill" style={{ width: `${progressPercent}%` }}></div>
          </div>
        </div>

        <div className="personaldetails-step-box">
          
          <h2 className="personaldetails-title">
            Share your details and connect with an insurance expert
          </h2>

          <div className="form-group">
            <label className="form-label">Enter vehicle owner's name</label>
            <input 
              type="text" 
              name="fullName"
              className={`form-input ${errors.fullName ? "input-error" : ""}`}
              placeholder="Full Name"
              value={formData.fullName}
              onChange={handleChange}
            />
            {errors.fullName && <span className="error-msg">{errors.fullName}</span>}
          </div>

          <div className="form-group">
            <label className="form-label">Use your active email for important updates</label>
            <input 
              type="email" 
              name="email"
              className={`form-input ${errors.email ? "input-error" : ""}`}
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
            />
            {errors.email && <span className="error-msg">{errors.email}</span>}
          </div>

          <div className="form-group">
            <label className="form-label">Mobile Number</label>
            <input 
              type="tel" 
              name="mobile"
              className={`form-input ${errors.mobile ? "input-error" : ""}`}
              placeholder="Enter your Mobile no"
              maxLength="10"
              value={formData.mobile}
              onChange={handleChange}
            />
            {errors.mobile && <span className="error-msg">{errors.mobile}</span>}
          </div>

          <div className="form-group">
            <label className="form-label">GST Number <span style={{fontWeight: 400}}>(Optional)</span></label>
            <input 
              type="text" 
              name="gst"
              className="form-input"
              placeholder="Enter your GST no"
              value={formData.gst}
              onChange={handleChange}
            />
          </div>

          <div className="personaldetails-footer">
            <button className="personaldetails-prev-btn" onClick={handlePrevious} disabled={loading}>
              <img src={arrowLeft} alt="prev" className="prev-icon" /> Previous
            </button>
            
            <button className="personaldetails-next-btn" onClick={handleNext} disabled={loading}>
              {loading ? "Submitting..." : "Next"} <img src={arrowRight} alt="next" style={{display: loading ? "none" : "inline"}} />
            </button>
          </div>

        </div> 
      </div>
    </section>
  );
}

export default PersonalDetails;