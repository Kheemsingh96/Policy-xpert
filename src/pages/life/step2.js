import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./step2.css";
import "./stepslayout.css";
import arrowRight from "../../assets/images/arrow2.png";

function LifeStep2() {
  const navigate = useNavigate();
  const location = useLocation();
  const stateData = location.state || {};

  const steps = [
    { id: 1, label: "Basic" },
    { id: 2, label: "02 Income" },
    { id: 3, label: "03 Dependants" },
    { id: 4, label: "04 Assets & Liabilities" }
  ];

  const totalBasicPages = 3;
  const currentBasicPage = 2;
  
  const sectionWeight = 100 / steps.length;
  const progressPercent = ((currentBasicPage - 1) / totalBasicPages) * sectionWeight;

  const [firstName, setFirstName] = useState(stateData.firstName || "");
  const [lastName, setLastName] = useState(stateData.lastName || "");
  const [mobile, setMobile] = useState(stateData.mobile || "");
  const [email, setEmail] = useState(stateData.email || "");
  const [dob, setDob] = useState(stateData.dob || "");
  const [education, setEducation] = useState(stateData.education || "");
  const [gender] = useState(stateData.gender || ""); 
  const [pincode] = useState(stateData.pincode || "");
  
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (location.state) {
      if (location.state.firstName) setFirstName(location.state.firstName);
      if (location.state.lastName) setLastName(location.state.lastName);
      if (location.state.mobile) setMobile(location.state.mobile);
      if (location.state.email) setEmail(location.state.email);
      if (location.state.dob) setDob(location.state.dob);
      if (location.state.education) setEducation(location.state.education);
    }
  }, [location.state]);

  const maxDobValue = new Date(new Date().setFullYear(new Date().getFullYear() - 18)).toISOString().split("T")[0];

  const handleInputChange = (field, value, setter) => {
    setter(value);
    if (errors[field]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  const validate = () => {
    let newErrors = {};
    const mobileRegex = /^[6-9]\d{9}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!firstName.trim()) newErrors.firstName = "First name is required";
    if (!lastName.trim()) newErrors.lastName = "Last name is required";
    
    if (!mobile) {
      newErrors.mobile = "Mobile number is required";
    } else if (!mobileRegex.test(mobile)) {
      newErrors.mobile = "Enter a valid 10-digit mobile number";
    }

    if (!email) {
      newErrors.email = "Email address is required";
    } else if (!emailRegex.test(email)) {
      newErrors.email = "Enter a valid email address";
    }

    if (!dob) newErrors.dob = "Date of birth is required";
    if (!education) newErrors.education = "Please select education";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validate()) {
      navigate("/life/step-3", {
        state: { ...stateData, firstName, lastName, mobile, email, dob, education }
      });
    }
  };

  return (
    <section className="life-step" style={{ width: "100%", maxWidth: "100vw", overflowX: "hidden", boxSizing: "border-box" }}>
      <div className="progress-wrapper">
        <div className="progress-steps">
          {steps.map((s) => (
            <span key={s.id} className={s.id === 1 ? "active" : ""}>{s.label}</span>
          ))}
        </div>
        <div className="progress-bar">
          <div className="progress-fill" style={{ width: `${progressPercent}%` }}></div>
        </div>
      </div>

      <div className="life-step-box">
        <h2 className="step-title">Let’s get to know you to build the right report for you.</h2>
        <div className="step-form">
          
          <div className="field">
            <input 
              type="text" 
              placeholder="First Name" 
              value={firstName} 
              onChange={(e) => handleInputChange("firstName", e.target.value, setFirstName)} 
            />
            {errors.firstName && <span className="life-error-text">{errors.firstName}</span>}
          </div>

          <div className="field">
            <input 
              type="text" 
              placeholder="Last Name" 
              value={lastName} 
              onChange={(e) => handleInputChange("lastName", e.target.value, setLastName)} 
            />
            {errors.lastName && <span className="life-error-text">{errors.lastName}</span>}
          </div>

          <div className="field">
            <input 
              type="tel" 
              placeholder="Mobile Number" 
              maxLength="10"
              value={mobile} 
              onChange={(e) => {
                const re = /^[0-9\b]+$/;
                if (e.target.value === '' || re.test(e.target.value)) {
                   handleInputChange("mobile", e.target.value, setMobile);
                }
              }} 
            />
            {errors.mobile && <span className="life-error-text">{errors.mobile}</span>}
          </div>

          <div className="field">
            <input 
              type="email" 
              placeholder="Email Address" 
              value={email} 
              onChange={(e) => handleInputChange("email", e.target.value, setEmail)} 
            />
            {errors.email && <span className="life-error-text">{errors.email}</span>}
          </div>

        
          <div className="field date-wrapper">
            <input 
              type="date"
              className="styled-date-input"
              max={maxDobValue} 
              value={dob} 
              required  
              onChange={(e) => handleInputChange("dob", e.target.value, setDob)} 
            />
            {errors.dob && <span className="life-error-text">{errors.dob}</span>}
          </div>

          <div className="field">
            <input type="text" value={pincode} disabled placeholder="Pincode" />
          </div>

          <div className="full-width">
            <div className="gender-wrap">
              <button type="button" className={gender === "male" ? "active" : ""}>♂ Male</button>
              <button type="button" className={gender === "female" ? "active" : ""}>♀ Female</button>
            </div>
          </div>

          <div className="full-width field">
            <select value={education} onChange={(e) => handleInputChange("education", e.target.value, setEducation)}>
              <option value="">Your Highest Education</option>
              <option>Graduate</option>
              <option>Post Graduate</option>
              <option>Doctorate</option>
              <option>12th Pass</option>
              <option>10th Pass</option>
              <option>10th Below</option>
            </select>
            {errors.education && <span className="life-error-text">{errors.education}</span>}
          </div>
        </div>

        <div className="step-footer" style={{ display: "flex", justifyContent: "flex-end" }}>
          <button className="next-btn" onClick={handleNext}>
            Next <img src={arrowRight} alt="next" />
          </button>
        </div>
      </div>
    </section>
  );
}

export default LifeStep2;