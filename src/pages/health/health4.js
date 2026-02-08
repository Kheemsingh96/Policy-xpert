import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./health4.css";
import arrowRight from "../../assets/images/arrow2.png";
import arrowLeft from "../../assets/images/arrow-left.png";

function HealthStep4() {
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

  const [members, setMembers] = useState([]);
  const [error, setError] = useState("");

  const healthOptions = ["Fit", "Underweight", "Overweight", "Obese"];

  useEffect(() => {
    if (memberDetails.length > 0) {
      const initializedMembers = memberDetails.map(m => ({
        ...m,
        healthStatus: m.healthStatus || "" 
      }));
      setMembers(initializedMembers);
    }
  }, [memberDetails]);

  const handleOptionSelect = (index, option) => {
    const updatedMembers = [...members];
    updatedMembers[index].healthStatus = option;
    setMembers(updatedMembers);
    setError("");
  };

  const handleNext = () => {
    const isAllSelected = members.every(m => m.healthStatus);
    if (!isAllSelected) {
      setError("Please select a health status for all members.");
      return;
    }
    
    navigate("/health/step-5", { 
        state: { 
            ...prevData, 
            memberDetails: members 
        } 
    });
  };

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <section className="health4-step">
      <div className="health4-progress-wrapper">
        <div className="health4-progress-steps">
          {steps.map((s) => (
            <span key={s.id} className={s.id <= 2 ? "active" : ""}>
              {s.label}
            </span>
          ))}
        </div>
        <div className="health4-progress-bar">
          <div className="health4-progress-fill" style={{ width: `${progressPercent}%` }}></div>
        </div>
      </div>

      <div className="health4-step-box">
        <div className="health4-header">
          <h2 className="health4-title">How healthy is your family?</h2>
          <p className="health4-subtitle">Your plan suggestions will be based on your family's health profile and daily lifestyle.</p>
        </div>

        <div className="health4-rows-container">
          {members.map((member, index) => (
            <div key={member.id} className="health4-row">
              <div className="health4-info">
                <div className="health4-icon-circle">
                  <img src={member.icon} alt={member.label} />
                </div>
                <span className="health4-label">{member.label}</span>
              </div>

              <div className="health4-options">
                {healthOptions.map((option) => (
                  <button
                    key={option}
                    className={`health-option-btn ${member.healthStatus === option ? "selected" : ""}`}
                    onClick={() => handleOptionSelect(index, option)}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>

        {error && <div className="health4-error">{error}</div>}

        <div className="health4-footer">
          <button className="health4-prev-btn" onClick={handleBack}>
            <img src={arrowLeft} alt="back" /> Previous
          </button>
          <button className="health4-next-btn" onClick={handleNext}>
            Next <img src={arrowRight} alt="next" />
          </button>
        </div>
      </div>
    </section>
  );
}

export default HealthStep4;