import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./health13.css";
import arrowRight from "../../assets/images/arrow2.png";
import arrowLeft from "../../assets/images/arrow-left.png";

function HealthStep13() {
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
  const currentStep = 4;
  const progressPercent = (currentStep / totalSteps) * 100;

  const [hasPolicy, setHasPolicy] = useState(null);
  const [policyCount, setPolicyCount] = useState(null);
  const [error, setError] = useState("");

  const countOptions = [1, 2, 3, 4, "4+"];

  const handleYesNo = (val) => {
    setHasPolicy(val);
    setError("");
    if (val === false) {
      setPolicyCount(null);
    }
  };

  const handleCountSelect = (count) => {
    setPolicyCount(count);
    setError("");
  };

  const handleNext = () => {
    if (hasPolicy === null) {
      setError("Please select Yes or No.");
      return;
    }

    if (hasPolicy === true && !policyCount) {
      setError("Please select the number of policies.");
      return;
    }

    const updatedData = {
      ...location.state,
      memberDetails: memberDetails,
      existingPolicy: {
        hasPolicy: hasPolicy,
        count: policyCount
      }
    };

    if (hasPolicy === true) {
      navigate("/health/step-14", { state: updatedData });
    } else {
      navigate("/health/report", { state: updatedData });
    }
  };

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <section className="health13-step">
      <div className="health13-progress-wrapper">
        <div className="health13-progress-steps">
          {steps.map((s) => (
            <span key={s.id} className={s.id <= 4 ? "active" : ""}>
              {s.label}
            </span>
          ))}
        </div>
        <div className="health13-progress-bar">
          <div className="health13-progress-fill" style={{ width: `${progressPercent}%` }}></div>
        </div>
      </div>

      <div className="health13-step-box">
        <div className="health13-header">
          <h2 className="health13-title">Do you currently have any health insurance policies?</h2>
        </div>

        <div className="health13-yesno-container">
          <button 
            className={`yesno-btn ${hasPolicy === true ? "active" : ""}`}
            onClick={() => handleYesNo(true)}
          >
            Yes
          </button>
          <button 
            className={`yesno-btn ${hasPolicy === false ? "active" : ""}`}
            onClick={() => handleYesNo(false)}
          >
            No
          </button>
        </div>

        {hasPolicy === true && (
          <div className="health13-policy-count-section">
            <h3 className="health13-subtitle">How many retail health insurance plans do you have?*</h3>
            <div className="health13-count-options">
              {countOptions.map((num) => (
                <button
                  key={num}
                  className={`count-btn ${policyCount === num ? "active" : ""}`}
                  onClick={() => handleCountSelect(num)}
                >
                  {num}
                </button>
              ))}
            </div>
          </div>
        )}

        {error && <div className="health13-error">{error}</div>}

        <div className="health13-footer">
          <button className="health13-prev-btn" onClick={handleBack}>
            <img src={arrowLeft} alt="back" /> Previous
          </button>
          <button className="health13-next-btn" onClick={handleNext}>
            Next <img src={arrowRight} alt="next" />
          </button>
        </div>
      </div>
    </section>
  );
}

export default HealthStep13;