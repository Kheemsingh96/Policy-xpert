import { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./health12.css";
import arrowRight from "../../assets/images/arrow2.png";
import arrowLeft from "../../assets/images/arrow-left.png";

import selfIcon from "../../assets/images/slef.png"; 
import partnerIcon from "../../assets/images/partner.png";
import sonIcon from "../../assets/images/son.png";
import daughterIcon from "../../assets/images/daugter.png";
import fatherIcon from "../../assets/images/father.png";
import motherIcon from "../../assets/images/mother.png";

function HealthStep12() {
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

  const [hospitalizedMembers, setHospitalizedMembers] = useState([]);
  const [error, setError] = useState("");

  const [openDropdownIndex, setOpenDropdownIndex] = useState(null);
  const dropdownRef = useRef(null);

  const hospitalizationOptions = [
    "COVID-19",
    "Dengue / Malaria / Typhoid",
    "Accident / Fracture",
    "Appendicitis",
    "Kidney Stone",
    "Gallbladder Stone",
    "Hernia",
    "Heart Surgery / Angioplasty",
    "Cataract / Eye Surgery",
    "Maternity / C-Section",
    "Piles / Fissure / Fistula",
    "Viral Fever / Infection",
    "Other"
  ];

  useEffect(() => {
    const hospitalized = allMembers.filter(m => m.wasHospitalized);
    
    const processed = hospitalized.map(m => {
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
        hospitalizationDetails: [],
        hospitalizationYear: ""
      };
    });

    setHospitalizedMembers(processed);

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
    const updated = [...hospitalizedMembers];
    const currentList = updated[memberIndex].hospitalizationDetails;

    if (currentList.includes(option)) {
      updated[memberIndex].hospitalizationDetails = currentList.filter(item => item !== option);
    } else {
      updated[memberIndex].hospitalizationDetails = [...currentList, option];
    }
    setHospitalizedMembers(updated);
    setError("");
  };

  const handleYearChange = (index, value) => {
    const updated = [...hospitalizedMembers];
    updated[index].hospitalizationYear = value;
    setHospitalizedMembers(updated);
    setError("");
  };

  const handleClear = (index) => {
    const updated = [...hospitalizedMembers];
    updated[index].hospitalizationDetails = [];
    updated[index].hospitalizationYear = "";
    setHospitalizedMembers(updated);
  };

  const handleNext = () => {
    const isAllFilled = hospitalizedMembers.every(m => 
      m.hospitalizationDetails.length > 0 && m.hospitalizationYear.trim() !== ""
    );
    
    if (!isAllFilled) {
      setError("Please select details and enter year for all selected members.");
      return;
    }

    const finalMembersList = allMembers.map(m => {
      const affected = hospitalizedMembers.find(h => h.id === m.id);
      if (affected) {
        return { 
          ...m, 
          hospitalizationDetails: affected.hospitalizationDetails,
          hospitalizationYear: affected.hospitalizationYear
        };
      }
      return m;
    });

    navigate("/health/step-13", { state: { memberDetails: finalMembersList } });
  };

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <section className="health12-step">
      <div className="health12-progress-wrapper">
        <div className="health12-progress-steps">
          {steps.map((s) => (
            <span key={s.id} className={s.id <= 3 ? "active" : ""}>
              {s.label}
            </span>
          ))}
        </div>
        <div className="health12-progress-bar">
          <div className="health12-progress-fill" style={{ width: `${progressPercent}%` }}></div>
        </div>
      </div>

      <div className="health12-step-box">
        <div className="health12-header">
          <h2 className="health12-title">Please provide details of the hospitalization.</h2>
        </div>

        <div className="health12-rows-container">
          {hospitalizedMembers.map((member, index) => (
            <div key={member.id} className="health12-row">
              <div className="health12-info">
                <div className="health12-icon-circle">
                  <img src={member.icon} alt={member.label} />
                </div>
                <span className="health12-label">{member.displayLabel}</span>
              </div>

              <div className="health12-inputs-group">
                <div className="health12-multiselect-wrapper" ref={openDropdownIndex === index ? dropdownRef : null}>
                  <div 
                    className={`health12-multiselect-box ${openDropdownIndex === index ? 'active' : ''}`}
                    onClick={() => toggleDropdown(index)}
                  >
                    <div className="selected-tags-container">
                      {member.hospitalizationDetails.length === 0 && (
                        <span className="placeholder-text">e.g., COVID-19, Fracture</span>
                      )}
                      {member.hospitalizationDetails.map((item) => (
                        <span key={item} className="selected-tag" onClick={(e) => {
                          e.stopPropagation();
                          toggleOption(index, item);
                        }}>
                          {item} <span className="tag-remove">×</span>
                        </span>
                      ))}
                    </div>
                    <span className="health12-arrow-icon">▼</span>
                  </div>

                  {openDropdownIndex === index && (
                    <div className="health12-dropdown-list">
                      {hospitalizationOptions.map((option) => (
                        <div 
                          key={option} 
                          className={`dropdown-item ${member.hospitalizationDetails.includes(option) ? 'selected' : ''}`}
                          onClick={() => toggleOption(index, option)}
                        >
                          {option}
                          {member.hospitalizationDetails.includes(option) && <span className="check-mark">✓</span>}
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <input 
                  type="text" 
                  className="health12-year-input"
                  placeholder="Year of hospitalization"
                  value={member.hospitalizationYear}
                  onChange={(e) => handleYearChange(index, e.target.value)}
                  maxLength={4}
                />
              </div>

              <button 
                className="health12-clear-btn"
                onClick={() => handleClear(index)}
              >
                Clear All
              </button>
            </div>
          ))}
        </div>

        {error && <div className="health12-error">{error}</div>}

        <div className="health12-footer">
          <button className="health12-prev-btn" onClick={handleBack}>
            <img src={arrowLeft} alt="back" /> Previous
          </button>
          <button className="health12-next-btn" onClick={handleNext}>
            Next <img src={arrowRight} alt="next" />
          </button>
        </div>
      </div>
    </section>
  );
}

export default HealthStep12;