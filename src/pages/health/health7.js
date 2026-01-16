import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./health7.css";
import arrowRight from "../../assets/images/arrow2.png";
import arrowLeft from "../../assets/images/arrow-left.png";

import selfIcon from "../../assets/images/slef.png"; 
import partnerIcon from "../../assets/images/partner.png";
import sonIcon from "../../assets/images/son.png";
import daughterIcon from "../../assets/images/daugter.png";
import fatherIcon from "../../assets/images/father.png";
import motherIcon from "../../assets/images/mother.png";

function HealthStep7() {
  const navigate = useNavigate();
  const location = useLocation();
  const memberDetails = location.state?.memberDetails || [];

  const steps = [
    { id: 1, label: "Personal" },
    { id: 2, label: "02 Life Style" },
    { id: 3, label: "03 Medical & Health" },
    { id: 4, label: "04 Existing Policy" }
  ];

  const totalSteps = steps.length;
  const currentStep = 2; 
  const progressPercent = (currentStep / totalSteps) * 100;

  const [hasTobacco, setHasTobacco] = useState(null); 
  const [tobaccoMembers, setTobaccoMembers] = useState({});
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
      setTobaccoMembers(initialStatus);
    }
  }, [memberDetails]);

  const handleYesNo = (val) => {
    setHasTobacco(val);
    setError("");
    if (val === false) {
      const resetMembers = {};
      displayMembers.forEach(m => resetMembers[m.id] = false);
      setTobaccoMembers(resetMembers);
    }
  };

  const toggleMember = (id) => {
    if (hasTobacco === false) {
      setHasTobacco(true);
    }
    setTobaccoMembers(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
    if (hasTobacco === null) setHasTobacco(true);
    setError("");
  };

  const handleNext = () => {
    if (hasTobacco === null) {
      setError("Please select Yes or No.");
      return;
    }

    if (hasTobacco === true) {
      const isAnySelected = Object.values(tobaccoMembers).some(val => val === true);
      if (!isAnySelected) {
        setError("Please select which members use tobacco.");
        return;
      }
    }

    const updatedData = memberDetails.map(m => ({
      ...m,
      usesTobacco: tobaccoMembers[m.id] || false
    }));

    if (hasTobacco === true) {
      navigate("/health/step-8", { state: { memberDetails: updatedData } });
    } else {
      navigate("/health/step-9", { state: { memberDetails: updatedData } });
    }
  };

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <section className="health7-step">
      <div className="health7-progress-wrapper">
        <div className="health7-progress-steps">
          {steps.map((s) => (
            <span key={s.id} className={s.id <= 2 ? "active" : ""}>
              {s.label}
            </span>
          ))}
        </div>
        <div className="health7-progress-bar">
          <div className="health7-progress-fill" style={{ width: `${progressPercent}%` }}></div>
        </div>
      </div>

      <div className="health7-step-box">
        <div className="health7-header">
          <h2 className="health7-title">Does anyone in your family use tobacco?</h2>
        </div>

        <div className="health7-yesno-container">
          <button 
            className={`yesno-btn ${hasTobacco === true ? "active" : ""}`}
            onClick={() => handleYesNo(true)}
          >
            Yes
          </button>
          <button 
            className={`yesno-btn ${hasTobacco === false ? "active" : ""}`}
            onClick={() => handleYesNo(false)}
          >
            No
          </button>
        </div>

        <div className={`health7-grid ${hasTobacco === false ? "disabled-grid" : ""}`}>
          {displayMembers.map((member) => (
            <div 
              key={member.id} 
              className={`health7-card ${tobaccoMembers[member.id] ? "active" : ""}`} 
              onClick={() => toggleMember(member.id)}
            >
              <div className="health7-icon">
                <img src={member.icon} alt={member.label} />
              </div>
              <span>{member.label}</span>
            </div>
          ))}
        </div>

        {error && <div className="health7-error">{error}</div>}

        <div className="health7-footer">
          <button className="health7-prev-btn" onClick={handleBack}>
            <img src={arrowLeft} alt="back" /> Previous
          </button>
          <button className="health7-next-btn" onClick={handleNext}>
            Next <img src={arrowRight} alt="next" />
          </button>
        </div>
      </div>
    </section>
  );
}

export default HealthStep7;