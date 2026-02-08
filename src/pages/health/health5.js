import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./health5.css";
import arrowRight from "../../assets/images/arrow2.png";
import arrowLeft from "../../assets/images/arrow-left.png";

import selfIcon from "../../assets/images/slef.png"; 
import partnerIcon from "../../assets/images/partner.png";
import sonIcon from "../../assets/images/son.png";
import daughterIcon from "../../assets/images/daugter.png";
import fatherIcon from "../../assets/images/father.png";
import motherIcon from "../../assets/images/mother.png";

function HealthStep5() {
  const navigate = useNavigate();
  const location = useLocation();

  const prevData = location.state || {};
  const memberDetails = prevData.memberDetails || [];

  const steps = [
    { id: 1, label: "Personal" },
    { id: 2, label: "02 Life Style" },
    { id: 3, label: "03 Medical & Health" },
    { id: 4, label: "04 Existing Policy" }
  ];

  const totalSteps = steps.length;
  const currentStep = 2; 
  const progressPercent = (currentStep / totalSteps) * 100;

  const [hasAlcohol, setHasAlcohol] = useState(null); 
  const [alcoholMembers, setAlcoholMembers] = useState({});
  const [error, setError] = useState("");

  const [displayMembers, setDisplayMembers] = useState([]);

  useEffect(() => {
    if (memberDetails.length > 0) {
      const mappedMembers = memberDetails.map(m => {
        let icon = selfIcon;
        if (m.id.includes("partner")) icon = partnerIcon;
        else if (m.id.includes("son")) icon = sonIcon;
        else if (m.id.includes("daughter")) icon = daughterIcon;
        else if (m.id.includes("father")) icon = fatherIcon;
        else if (m.id.includes("mother")) icon = motherIcon;

        return { ...m, icon };
      });
      setDisplayMembers(mappedMembers);

      const initialStatus = {};
      mappedMembers.forEach(m => {
        initialStatus[m.id] = false;
      });
      setAlcoholMembers(initialStatus);
    }
  }, [memberDetails]);

  const handleYesNo = (val) => {
    setHasAlcohol(val);
    setError("");
    if (val === false) {
      const resetMembers = {};
      displayMembers.forEach(m => resetMembers[m.id] = false);
      setAlcoholMembers(resetMembers);
    }
  };

  const toggleMember = (id) => {
    if (hasAlcohol === false) {
      setHasAlcohol(true);
    }
    setAlcoholMembers(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
    if (hasAlcohol === null) setHasAlcohol(true);
    setError("");
  };

  const handleNext = () => {
    if (hasAlcohol === null) {
      setError("Please select Yes or No.");
      return;
    }

    const updatedData = memberDetails.map(m => ({
      ...m,
      consumesAlcohol: alcoholMembers[m.id] || false
    }));

    if (hasAlcohol === true) {
      const isAnySelected = Object.values(alcoholMembers).some(val => val === true);
      if (!isAnySelected) {
        setError("Please select which members consume alcohol.");
        return;
      }
      
      navigate("/health/step-6", { 
          state: { 
              ...prevData, 
              memberDetails: updatedData 
          } 
      });
    } else {
      
      navigate("/health/step-7", { 
          state: { 
              ...prevData, 
              memberDetails: updatedData 
          } 
      });
    }
  };

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <section className="health5-step">
      <div className="health5-progress-wrapper">
        <div className="health5-progress-steps">
          {steps.map((s) => (
            <span key={s.id} className={s.id <= 2 ? "active" : ""}>
              {s.label}
            </span>
          ))}
        </div>
        <div className="health5-progress-bar">
          <div className="health5-progress-fill" style={{ width: `${progressPercent}%` }}></div>
        </div>
      </div>

      <div className="health5-step-box">
        <div className="health5-header">
          <h2 className="health5-title">Do any members of your family consume alcohol?</h2>
        </div>

        <div className="health5-yesno-container">
          <button 
            className={`yesno-btn ${hasAlcohol === true ? "active" : ""}`}
            onClick={() => handleYesNo(true)}
          >
            Yes
          </button>
          <button 
            className={`yesno-btn ${hasAlcohol === false ? "active" : ""}`}
            onClick={() => handleYesNo(false)}
          >
            No
          </button>
        </div>

        <div className={`health5-grid ${hasAlcohol === false ? "disabled-grid" : ""}`}>
          {displayMembers.map((member) => (
            <div 
              key={member.id} 
              className={`health5-card ${alcoholMembers[member.id] ? "active" : ""}`} 
              onClick={() => toggleMember(member.id)}
            >
              <div className="health5-icon">
                <img src={member.icon} alt={member.label} />
              </div>
              <span>{member.label}</span>
            </div>
          ))}
        </div>

        {error && <div className="health5-error">{error}</div>}

        <div className="health5-footer">
          <button className="health5-prev-btn" onClick={handleBack}>
            <img src={arrowLeft} alt="back" /> Previous
          </button>
          <button className="health5-next-btn" onClick={handleNext}>
            Next <img src={arrowRight} alt="next" />
          </button>
        </div>
      </div>
    </section>
  );
}

export default HealthStep5;