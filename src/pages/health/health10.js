import { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./health10.css";
import arrowRight from "../../assets/images/arrow2.png";
import arrowLeft from "../../assets/images/arrow-left.png";

import selfIcon from "../../assets/images/slef.png"; 
import partnerIcon from "../../assets/images/partner.png";
import sonIcon from "../../assets/images/son.png";
import daughterIcon from "../../assets/images/daugter.png";
import fatherIcon from "../../assets/images/father.png";
import motherIcon from "../../assets/images/mother.png";

function HealthStep10() {
  const navigate = useNavigate();
  const location = useLocation();
  const allMembers = location.state?.memberDetails || [];

  const steps = [
    { id: 1, label: "Personal" },
    { id: 2, label: "02 Life Style" },
    { id: 3, label: "03 Medical & Health" },
    { id: 4, label: "04 Existing Policy" }
  ];

  const currentStep = 3; 
  const progressPercent = (currentStep / steps.length) * 100;

  const [affectedMembers, setAffectedMembers] = useState([]);
  const [error, setError] = useState("");
  
  // Track which dropdown is open (by index)
  const [openDropdownIndex, setOpenDropdownIndex] = useState(null);
  const dropdownRef = useRef(null);

  const testOptions = [
    "High Blood Sugar (Diabetes)",
    "High Blood Pressure (Hypertension)",
    "High Cholesterol / Lipids",
    "Thyroid Profile (T3/T4/TSH)",
    "Low Hemoglobin (Anemia)",
    "High Uric Acid",
    "Liver Function Test (LFT)",
    "Kidney Function Test (KFT)",
    "Vitamin D Deficiency",
    "Vitamin B12 Deficiency",
    "Urine Analysis Issues",
    "ECG Abnormalities",
    "Acidity / Gastric Issues",
    "Other"
  ];

  useEffect(() => {
    const abnormal = allMembers.filter(m => m.hasAbnormalTests);
    
    const processed = abnormal.map(m => {
      let icon = selfIcon;
      if (m.id.includes("partner")) icon = partnerIcon;
      else if (m.id.includes("son")) icon = sonIcon;
      else if (m.id.includes("daughter")) icon = daughterIcon;
      else if (m.id.includes("father")) icon = fatherIcon;
      else if (m.id.includes("mother")) icon = motherIcon;

      let displayLabel = m.fullName || m.label;
      if (m.dob) {
        const birthDate = new Date(m.dob);
        const ageDifMs = Date.now() - birthDate.getTime();
        const ageDate = new Date(ageDifMs);
        const age = Math.abs(ageDate.getUTCFullYear() - 1970);
        displayLabel = `${m.fullName || m.label} ${age}`;
      }

      return {
        ...m,
        icon,
        displayLabel,
        abnormalDetails: [] // Array for multiple selections
      };
    });

    setAffectedMembers(processed);

    // Click outside to close dropdown
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpenDropdownIndex(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);

  }, [allMembers]);

  const toggleDropdown = (index) => {
    setOpenDropdownIndex(openDropdownIndex === index ? null : index);
  };

  const toggleOption = (memberIndex, option) => {
    const updated = [...affectedMembers];
    const currentList = updated[memberIndex].abnormalDetails;

    if (currentList.includes(option)) {
      // Remove if already exists
      updated[memberIndex].abnormalDetails = currentList.filter(item => item !== option);
    } else {
      // Add if new
      updated[memberIndex].abnormalDetails = [...currentList, option];
    }
    setAffectedMembers(updated);
    setError("");
  };

  const handleClear = (index) => {
    const updated = [...affectedMembers];
    updated[index].abnormalDetails = [];
    setAffectedMembers(updated);
  };

  const handleNext = () => {
    const isAllFilled = affectedMembers.every(m => m.abnormalDetails.length > 0);
    if (!isAllFilled) {
      setError("Please select at least one detail for all selected members.");
      return;
    }

    const finalMembersList = allMembers.map(m => {
      const affected = affectedMembers.find(a => a.id === m.id);
      if (affected) {
        // Convert array to string for storage if backend expects string, or keep as array
        return { ...m, abnormalDetails: affected.abnormalDetails }; 
      }
      return m;
    });

    console.log("Step 10 Data:", finalMembersList);
    navigate("/health/step-11", { state: { memberDetails: finalMembersList } });
  };

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <section className="health10-step">
      <div className="health10-progress-wrapper">
        <div className="health10-progress-steps">
          {steps.map((s) => (
            <span key={s.id} className={s.id <= 3 ? "active" : ""}>
              {s.label}
            </span>
          ))}
        </div>
        <div className="health10-progress-bar">
          <div className="health10-progress-fill" style={{ width: `${progressPercent}%` }}></div>
        </div>
      </div>

      <div className="health10-step-box">
        <div className="health10-header">
          <h2 className="health10-title">Please share details of the abnormal test results.</h2>
        </div>

        <div className="health10-rows-container">
          {affectedMembers.map((member, index) => (
            <div key={member.id} className="health10-row">
              <div className="health10-info">
                <div className="health10-icon-circle">
                  <img src={member.icon} alt={member.label} />
                </div>
                <span className="health10-label">{member.displayLabel}</span>
              </div>

              {/* Custom Multi-Select Dropdown */}
              <div className="health10-multiselect-wrapper" ref={openDropdownIndex === index ? dropdownRef : null}>
                <div 
                  className={`health10-multiselect-box ${openDropdownIndex === index ? 'active' : ''}`}
                  onClick={() => toggleDropdown(index)}
                >
                  <div className="selected-tags-container">
                    {member.abnormalDetails.length === 0 && (
                      <span className="placeholder-text">Select abnormal result</span>
                    )}
                    {member.abnormalDetails.map((item) => (
                      <span key={item} className="selected-tag" onClick={(e) => {
                        e.stopPropagation();
                        toggleOption(index, item);
                      }}>
                        {item} <span className="tag-remove">×</span>
                      </span>
                    ))}
                  </div>
                  <span className="health10-arrow-icon">▼</span>
                </div>

                {openDropdownIndex === index && (
                  <div className="health10-dropdown-list">
                    {testOptions.map((option) => (
                      <div 
                        key={option} 
                        className={`dropdown-item ${member.abnormalDetails.includes(option) ? 'selected' : ''}`}
                        onClick={() => toggleOption(index, option)}
                      >
                        {option}
                        {member.abnormalDetails.includes(option) && <span className="check-mark">✓</span>}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <button 
                className="health10-clear-btn"
                onClick={() => handleClear(index)}
              >
                Clear All
              </button>
            </div>
          ))}
        </div>

        {error && <div className="health10-error">{error}</div>}

        <div className="health10-footer">
          <button className="health10-prev-btn" onClick={handleBack}>
            <img src={arrowLeft} alt="back" /> Previous
          </button>
          <button className="health10-next-btn" onClick={handleNext}>
            Next <img src={arrowRight} alt="next" />
          </button>
        </div>
      </div>
    </section>
  );
}

export default HealthStep10;