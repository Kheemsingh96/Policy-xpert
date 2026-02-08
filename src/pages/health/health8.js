import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./health8.css";
import arrowRight from "../../assets/images/arrow2.png";
import arrowLeft from "../../assets/images/arrow-left.png";

import selfIcon from "../../assets/images/slef.png"; 
import partnerIcon from "../../assets/images/partner.png";
import sonIcon from "../../assets/images/son.png";
import daughterIcon from "../../assets/images/daugter.png";
import fatherIcon from "../../assets/images/father.png";
import motherIcon from "../../assets/images/mother.png";

function HealthStep8() {
  const navigate = useNavigate();
  const location = useLocation();
  
  const prevData = location.state || {};
  const allMembers = prevData.memberDetails || [];

  const steps = [
    { id: 1, label: "Personal" },
    { id: 2, label: "02 Life Style" },
    { id: 3, label: "03 Medical & Health" },
    { id: 4, label: "04 Existing Policy" }
  ];

  const totalSteps = steps.length;
  const currentStep = 2; 
  const progressPercent = (currentStep / totalSteps) * 100;

  const [tobaccoUsers, setTobaccoUsers] = useState([]);
  const [error, setError] = useState("");

  const frequencyOptions = ["Under 5 uses per day", "6-10 uses per day", "More than 10 uses/day"];

  useEffect(() => {
    const users = allMembers.filter(m => m.usesTobacco);
    
    const processed = users.map(m => {
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
        tobaccoFrequency: "" 
      };
    });

    setTobaccoUsers(processed);
  }, [allMembers]);

  const handleOptionSelect = (index, option) => {
    const updated = [...tobaccoUsers];
    updated[index].tobaccoFrequency = option;
    setTobaccoUsers(updated);
    setError("");
  };

  const handleNext = () => {
    const isAllSelected = tobaccoUsers.every(m => m.tobaccoFrequency);
    if (!isAllSelected) {
      setError("Please select frequency for all members.");
      return;
    }

    const finalMembersList = allMembers.map(m => {
      const userInfo = tobaccoUsers.find(u => u.id === m.id);
      if (userInfo) {
        return { ...m, tobaccoFrequency: userInfo.tobaccoFrequency };
      }
      return m;
    });

    navigate("/health/step-9", { 
        state: { 
            ...prevData, 
            memberDetails: finalMembersList 
        } 
    });
  };

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <section className="health8-step">
      <div className="health8-progress-wrapper">
        <div className="health8-progress-steps">
          {steps.map((s) => (
            <span key={s.id} className={s.id <= 2 ? "active" : ""}>
              {s.label}
            </span>
          ))}
        </div>
        <div className="health8-progress-bar">
          <div className="health8-progress-fill" style={{ width: `${progressPercent}%` }}></div>
        </div>
      </div>

      <div className="health8-step-box">
        <div className="health8-header">
          <h2 className="health8-title">Please indicate how frequently tobacco products are used.</h2>
          <p className="health8-subtitle">(Including cigarettes, vaping, gutkha, khaini, or other tobacco products)</p>
        </div>

        <div className="health8-rows-container">
          {tobaccoUsers.map((member, index) => (
            <div key={member.id} className="health8-row">
              <div className="health8-info">
                <div className="health8-icon-circle">
                  <img src={member.icon} alt={member.label} />
                </div>
                <span className="health8-label">{member.displayLabel}</span>
              </div>

              <div className="health8-options">
                {frequencyOptions.map((option) => (
                  <button
                    key={option}
                    className={`health8-option-btn ${member.tobaccoFrequency === option ? "selected" : ""}`}
                    onClick={() => handleOptionSelect(index, option)}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>

        {error && <div className="health8-error">{error}</div>}

        <div className="health8-footer">
          <button className="health8-prev-btn" onClick={handleBack}>
            <img src={arrowLeft} alt="back" /> Previous
          </button>
          <button className="health8-next-btn" onClick={handleNext}>
            Next <img src={arrowRight} alt="next" />
          </button>
        </div>
      </div>
    </section>
  );
}

export default HealthStep8;