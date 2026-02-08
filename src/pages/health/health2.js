import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./health2.css";
import arrowRight from "../../assets/images/arrow2.png";

import selfIcon from "../../assets/images/slef.png"; 
import partnerIcon from "../../assets/images/partner.png";
import sonIcon from "../../assets/images/son.png";
import daughterIcon from "../../assets/images/daugter.png";
import fatherIcon from "../../assets/images/father.png";
import motherIcon from "../../assets/images/mother.png";

function HealthStep2() {
  const navigate = useNavigate();
  const location = useLocation();
  
  const incomingPincode = location.state?.pincode || "";

  const steps = [
    { id: 1, label: "Personal" },
    { id: 2, label: "02 Life Style" },
    { id: 3, label: "03 Medical & Health" },
    { id: 4, label: "04 Existing Policy" }
  ];

  const totalSteps = steps.length;
  const progressPercent = 10;

  const [members, setMembers] = useState({
    self: true,
    partner: false,
    father: false,
    mother: false,
    son: 0,
    daughter: 0
  });

  const [error, setError] = useState("");

  const toggleMember = (member) => {
    setMembers((prev) => ({
      ...prev,
      [member]: !prev[member]
    }));
    setError("");
  };

  const updateCount = (member, operation) => {
    setMembers((prev) => {
      const currentVal = prev[member];
      let newVal = currentVal;
      
      if (operation === "inc" && currentVal < 4) newVal = currentVal + 1;
      if (operation === "dec" && currentVal > 0) newVal = currentVal - 1;

      return { ...prev, [member]: newVal };
    });
    setError("");
  };

  const handleNext = () => {
    const isAnySelected = 
      members.self || 
      members.partner || 
      members.father || 
      members.mother || 
      members.son > 0 || 
      members.daughter > 0;

    if (!isAnySelected) {
      setError("Please select at least one member to insure.");
      return;
    }

    navigate("/health/step-3", { 
      state: { 
        ...location.state,
        members: members
      } 
    });
  };

  return (
    <section className="health2-step">
      <div className="health2-progress-wrapper">
        <div className="health2-progress-steps">
          {steps.map((s) => (
            <span key={s.id} className={s.id === 1 ? "active" : ""}>
              {s.label}
            </span>
          ))}
        </div>
        <div className="health2-progress-bar">
          <div className="health2-progress-fill" style={{ width: `${progressPercent}%` }}></div>
        </div>
      </div>

      <div className="health2-step-box">
        <div className="health2-header">
          <h2 className="health2-title">Let’s begin. Tell us who you want to insure!</h2>
          <p className="health2-subtitle">Please provide us with the following details.</p>
        </div>

        <div className="health2-grid">
          
          <div 
            className={`health2-card ${members.self ? "active" : ""}`} 
            onClick={() => toggleMember("self")}
          >
            <div className="health2-icon"><img src={selfIcon} alt="Self" /></div>
            <span>Self</span>
          </div>

          <div 
            className={`health2-card ${members.partner ? "active" : ""}`} 
            onClick={() => toggleMember("partner")}
          >
            <div className="health2-icon"><img src={partnerIcon} alt="Partner" /></div>
            <span>Partner</span>
          </div>

          <div 
            className={`health2-card ${members.son > 0 ? "active-count" : ""}`}
            onClick={() => { if(members.son === 0) updateCount("son", "inc"); }}
          >
            <div className="health2-icon"><img src={sonIcon} alt="Son" /></div>
            <span>Son</span>
            <div className="health2-controls">
              <button onClick={(e) => { e.stopPropagation(); updateCount("son", "inc"); }}>+</button>
              <span className="health2-count-val">{members.son}</span>
              <button onClick={(e) => { e.stopPropagation(); updateCount("son", "dec"); }}>-</button>
            </div>
          </div>

          <div 
            className={`health2-card ${members.daughter > 0 ? "active-count" : ""}`}
            onClick={() => { if(members.daughter === 0) updateCount("daughter", "inc"); }}
          >
            <div className="health2-icon"><img src={daughterIcon} alt="Daughter" /></div>
            <span>Daughter</span>
            <div className="health2-controls">
              <button onClick={(e) => { e.stopPropagation(); updateCount("daughter", "inc"); }}>+</button>
              <span className="health2-count-val">{members.daughter}</span>
              <button onClick={(e) => { e.stopPropagation(); updateCount("daughter", "dec"); }}>-</button>
            </div>
          </div>

          <div 
            className={`health2-card ${members.father ? "active" : ""}`} 
            onClick={() => toggleMember("father")}
          >
            <div className="health2-icon"><img src={fatherIcon} alt="Father" /></div>
            <span>Father</span>
          </div>

          <div 
            className={`health2-card ${members.mother ? "active" : ""}`} 
            onClick={() => toggleMember("mother")}
          >
            <div className="health2-icon"><img src={motherIcon} alt="Mother" /></div>
            <span>Mother</span>
          </div>

        </div>

        {error && <div className="health2-error">{error}</div>}

        <div className="health2-footer">
          <button className="health2-next-btn" onClick={handleNext}>
            Next <img src={arrowRight} alt="next" />
          </button>
        </div>
      </div>
    </section>
  );
}

export default HealthStep2;