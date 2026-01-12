import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./step10.css"; 
import arrowRight from "../../assets/images/arrow2.png";
import arrowLeft from "../../assets/images/arrow-left.png";

function LifeStep10() {
  const navigate = useNavigate();
  const location = useLocation();
  const data = location.state || {};

  const steps = [
    { id: 1, label: "Basic" },
    { id: 2, label: "02 Income" },
    { id: 3, label: "03 Dependants" },
    { id: 4, label: "04 Assets & Liabilities" }
  ];

  const currentStep = 4; // Moved to 4th Section
  const progressPercent = 85; 

  const [hasLoans, setHasLoans] = useState(data.hasLoans || "");
  const [error, setError] = useState("");

  const handleNext = () => {
    if (!hasLoans) {
      setError("Please select an option");
      return;
    }

    const finalData = { ...data, hasLoans };
    console.log("Step 10 Data:", finalData);
    
    // UPDATED: Ab yeh seedha Step 11 par jayega
    navigate("/life/step-11", { state: finalData });
  };

  return (
    <section className="life-step">
      <div className="progress-wrapper">
        <div className="progress-steps">
          {steps.map((step) => (
            <span key={step.id} className={step.id <= currentStep ? "active" : ""}>
              {step.label}
            </span>
          ))}
        </div>
        <div className="progress-bar">
          <div className="progress-fill" style={{ width: `${progressPercent}%` }}></div>
        </div>
      </div>

      <div className="life-step-box center-box">
        <h2 className="step-title">
          Do you currently have any major loans or advances?
        </h2>

        <div className="loan-options">
          <button
            className={hasLoans === "no" ? "active" : ""}
            onClick={() => { setHasLoans("no"); setError(""); }}
          >
            No
          </button>

          <button
            className={hasLoans === "yes" ? "active" : ""}
            onClick={() => { setHasLoans("yes"); setError(""); }}
          >
            Yes
          </button>
        </div>

        {error && <span className="field-error">{error}</span>}

        <div className="step-footer space-between">
          <button
            className="prev-btn"
            onClick={() => navigate("/life/step-9", { state: data })}
          >
            <img src={arrowLeft} alt="previous" />
            Previous
          </button>

          <button className="next-btn" onClick={handleNext}>
            Next
            <img src={arrowRight} alt="next" />
          </button>
        </div>
      </div>
    </section>
  );
}

export default LifeStep10;