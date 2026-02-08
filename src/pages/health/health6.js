import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./health6.css";
import arrowRight from "../../assets/images/arrow2.png";
import arrowLeft from "../../assets/images/arrow-left.png";

import selfIcon from "../../assets/images/slef.png"; 
import partnerIcon from "../../assets/images/partner.png";
import sonIcon from "../../assets/images/son.png";
import daughterIcon from "../../assets/images/daugter.png";
import fatherIcon from "../../assets/images/father.png";
import motherIcon from "../../assets/images/mother.png";

function HealthStep6() {
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

  const [drinkingMembers, setDrinkingMembers] = useState([]);
  const [error, setError] = useState("");

  const frequencyOptions = ["Daily", "Weekend", "Occasionally", "Rarely"];

  useEffect(() => {
    const drinkers = allMembers.filter(m => m.consumesAlcohol);
    
    const processed = drinkers.map(m => {
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
        alcoholFrequency: "" 
      };
    });

    setDrinkingMembers(processed);
  }, [allMembers]);

  const handleOptionSelect = (index, option) => {
    const updated = [...drinkingMembers];
    updated[index].alcoholFrequency = option;
    setDrinkingMembers(updated);
    setError("");
  };

  const handleNext = () => {
    const isAllSelected = drinkingMembers.every(m => m.alcoholFrequency);
    if (!isAllSelected) {
      setError("Please select frequency for all members.");
      return;
    }

    const finalMembersList = allMembers.map(m => {
      const drinkerInfo = drinkingMembers.find(d => d.id === m.id);
      if (drinkerInfo) {
        return { ...m, alcoholFrequency: drinkerInfo.alcoholFrequency };
      }
      return m;
    });

    navigate("/health/step-7", { 
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
    <section className="health6-step">
      <div className="health6-progress-wrapper">
        <div className="health6-progress-steps">
          {steps.map((s) => (
            <span key={s.id} className={s.id <= 2 ? "active" : ""}>
              {s.label}
            </span>
          ))}
        </div>
        <div className="health6-progress-bar">
          <div className="health6-progress-fill" style={{ width: `${progressPercent}%` }}></div>
        </div>
      </div>

      <div className="health6-step-box">
        <div className="health6-header">
          <h2 className="health6-title">Please specify how often alcohol is consumed.</h2>
        </div>

        <div className="health6-rows-container">
          {drinkingMembers.map((member, index) => (
            <div key={member.id} className="health6-row">
              <div className="health6-info">
                <div className="health6-icon-circle">
                  <img src={member.icon} alt={member.label} />
                </div>
                <span className="health6-label">{member.displayLabel}</span>
              </div>

              <div className="health6-options">
                {frequencyOptions.map((option) => (
                  <button
                    key={option}
                    className={`health6-option-btn ${member.alcoholFrequency === option ? "selected" : ""}`}
                    onClick={() => handleOptionSelect(index, option)}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>

        {error && <div className="health6-error">{error}</div>}

        <div className="health6-footer">
          <button className="health6-prev-btn" onClick={handleBack}>
            <img src={arrowLeft} alt="back" /> Previous
          </button>
          <button className="health6-next-btn" onClick={handleNext}>
            Next <img src={arrowRight} alt="next" />
          </button>
        </div>
      </div>
    </section>
  );
}

export default HealthStep6;