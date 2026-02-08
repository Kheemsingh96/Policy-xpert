import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./health9.css";
import arrowRight from "../../assets/images/arrow2.png";
import arrowLeft from "../../assets/images/arrow-left.png";

import selfIcon from "../../assets/images/slef.png"; 
import partnerIcon from "../../assets/images/partner.png";
import sonIcon from "../../assets/images/son.png";
import daughterIcon from "../../assets/images/daugter.png";
import fatherIcon from "../../assets/images/father.png";
import motherIcon from "../../assets/images/mother.png";

function HealthStep9() {
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
  const currentStep = 3; 
  const progressPercent = (currentStep / totalSteps) * 100;

  const [hasAbnormalTests, setHasAbnormalTests] = useState(null); 
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
    setHasAbnormalTests(val);
    setError("");
    if (val === false) {
      const resetMembers = {};
      displayMembers.forEach(m => resetMembers[m.id] = false);
      setSelectedMembers(resetMembers);
    }
  };

  const toggleMember = (id) => {
    if (hasAbnormalTests === false) {
      setHasAbnormalTests(true);
    }
    setSelectedMembers(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
    if (hasAbnormalTests === null) setHasAbnormalTests(true);
    setError("");
  };

  const handleNext = () => {
    if (hasAbnormalTests === null) {
      setError("Please select Yes or No.");
      return;
    }

    if (hasAbnormalTests === true) {
      const isAnySelected = Object.values(selectedMembers).some(val => val === true);
      if (!isAnySelected) {
        setError("Please select which members had abnormal results.");
        return;
      }
    }

    const updatedData = memberDetails.map(m => ({
      ...m,
      hasAbnormalTests: selectedMembers[m.id] || false
    }));

    if (hasAbnormalTests === true) {
      navigate("/health/step-10", { 
          state: { 
              ...prevData, 
              memberDetails: updatedData 
          } 
      });
    } else {
      navigate("/health/step-11", { 
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
    <section className="health9-step">
      <div className="health9-progress-wrapper">
        <div className="health9-progress-steps">
          {steps.map((s) => (
            <span key={s.id} className={s.id <= 3 ? "active" : ""}>
              {s.label}
            </span>
          ))}
        </div>
        <div className="health9-progress-bar">
          <div className="health9-progress-fill" style={{ width: `${progressPercent}%` }}></div>
        </div>
      </div>

      <div className="health9-step-box">
        <div className="health9-header">
          <h2 className="health9-title">Did any medical tests in the past year show abnormal results?</h2>
        </div>

        <div className="health9-yesno-container">
          <button 
            className={`yesno-btn ${hasAbnormalTests === true ? "active" : ""}`}
            onClick={() => handleYesNo(true)}
          >
            Yes
          </button>
          <button 
            className={`yesno-btn ${hasAbnormalTests === false ? "active" : ""}`}
            onClick={() => handleYesNo(false)}
          >
            No
          </button>
        </div>

        <div className={`health9-grid ${hasAbnormalTests === false ? "disabled-grid" : ""}`}>
          {displayMembers.map((member) => (
            <div 
              key={member.id} 
              className={`health9-card ${selectedMembers[member.id] ? "active" : ""}`} 
              onClick={() => toggleMember(member.id)}
            >
              <div className="health9-icon">
                <img src={member.icon} alt={member.label} />
              </div>
              <span>{member.label}</span>
            </div>
          ))}
        </div>

        {error && <div className="health9-error">{error}</div>}

        <div className="health9-footer">
          <button className="health9-prev-btn" onClick={handleBack}>
            <img src={arrowLeft} alt="back" /> Previous
          </button>
          <button className="health9-next-btn" onClick={handleNext}>
            Next <img src={arrowRight} alt="next" />
          </button>
        </div>
      </div>
    </section>
  );
}

export default HealthStep9;