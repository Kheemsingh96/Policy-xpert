import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./health11.css";
import arrowRight from "../../assets/images/arrow2.png";
import arrowLeft from "../../assets/images/arrow-left.png";

import selfIcon from "../../assets/images/slef.png"; 
import partnerIcon from "../../assets/images/partner.png";
import sonIcon from "../../assets/images/son.png";
import daughterIcon from "../../assets/images/daugter.png";
import fatherIcon from "../../assets/images/father.png";
import motherIcon from "../../assets/images/mother.png";

function HealthStep11() {
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
  const currentStep = 3; 
  const progressPercent = (currentStep / totalSteps) * 100;

  const [hasHospitalized, setHasHospitalized] = useState(null); 
  const [selectedMembers, setSelectedMembers] = useState({});
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
      setSelectedMembers(initialStatus);
    }
  }, [memberDetails]);

  const handleYesNo = (val) => {
    setHasHospitalized(val);
    setError("");
    if (val === false) {
      const resetMembers = {};
      displayMembers.forEach(m => resetMembers[m.id] = false);
      setSelectedMembers(resetMembers);
    }
  };

  const toggleMember = (id) => {
    if (hasHospitalized === false) {
      setHasHospitalized(true);
    }
    setSelectedMembers(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
    if (hasHospitalized === null) setHasHospitalized(true);
    setError("");
  };

  const handleNext = () => {
    if (hasHospitalized === null) {
      setError("Please select Yes or No.");
      return;
    }

    if (hasHospitalized === true) {
      const isAnySelected = Object.values(selectedMembers).some(val => val === true);
      if (!isAnySelected) {
        setError("Please select which members were hospitalized.");
        return;
      }
    }

    const updatedData = memberDetails.map(m => ({
      ...m,
      wasHospitalized: selectedMembers[m.id] || false
    }));

    if (hasHospitalized === true) {
      navigate("/health/step-12", { state: { memberDetails: updatedData } });
    } else {
      navigate("/health/step-13", { state: { memberDetails: updatedData } });
    }
  };

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <section className="health11-step">
      <div className="health11-progress-wrapper">
        <div className="health11-progress-steps">
          {steps.map((s) => (
            <span key={s.id} className={s.id <= 3 ? "active" : ""}>
              {s.label}
            </span>
          ))}
        </div>
        <div className="health11-progress-bar">
          <div className="health11-progress-fill" style={{ width: `${progressPercent}%` }}></div>
        </div>
      </div>

      <div className="health11-step-box">
        <div className="health11-header">
          <h2 className="health11-title">Has anyone in your family been hospitalized?</h2>
        </div>

        <div className="health11-yesno-container">
          <button 
            className={`yesno-btn ${hasHospitalized === true ? "active" : ""}`}
            onClick={() => handleYesNo(true)}
          >
            Yes
          </button>
          <button 
            className={`yesno-btn ${hasHospitalized === false ? "active" : ""}`}
            onClick={() => handleYesNo(false)}
          >
            No
          </button>
        </div>

        <div className={`health11-grid ${hasHospitalized === false ? "disabled-grid" : ""}`}>
          {displayMembers.map((member) => (
            <div 
              key={member.id} 
              className={`health11-card ${selectedMembers[member.id] ? "active" : ""}`} 
              onClick={() => toggleMember(member.id)}
            >
              <div className="health11-icon">
                <img src={member.icon} alt={member.label} />
              </div>
              <span>{member.label}</span>
            </div>
          ))}
        </div>

        {error && <div className="health11-error">{error}</div>}

        <div className="health11-footer">
          <button className="health11-prev-btn" onClick={handleBack}>
            <img src={arrowLeft} alt="back" /> Previous
          </button>
          <button className="health11-next-btn" onClick={handleNext}>
            Next <img src={arrowRight} alt="next" />
          </button>
        </div>
      </div>
    </section>
  );
}

export default HealthStep11;