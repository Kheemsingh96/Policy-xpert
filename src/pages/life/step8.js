import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./step8.css"; 
import arrowRight from "../../assets/images/arrow2.png";
import arrowLeft from "../../assets/images/arrow-left.png";

function LifeStep8() {
  const navigate = useNavigate();
  const location = useLocation();
  const data = location.state || {};

  const steps = [
    { id: 1, label: "Basic" },
    { id: 2, label: "02 Income" },
    { id: 3, label: "03 Dependants" },
    { id: 4, label: "04 Assets & Liabilities" }
  ];

  const currentStep = 3;
  const progressPercent = 60; 

  const [hasDependants, setHasDependants] = useState(data.hasDependants || "");
  const [error, setError] = useState("");

  const handleNext = () => {
    if (!hasDependants) {
      setError("Please select an option");
      return;
    }

    const finalData = { ...data, hasDependants };
    console.log("Step 8 Data Saved:", finalData);
    
    // IMPORTANT: Ab yeh seedha Step 9 par jayega
    navigate("/life/step-9", { state: finalData });
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
          Do any family members rely on your income?
        </h2>

        <div className="dependant-options">
          <button
            className={hasDependants === "no" ? "active" : ""}
            onClick={() => { setHasDependants("no"); setError(""); }}
          >
            No
          </button>

          <button
            className={hasDependants === "yes" ? "active" : ""}
            onClick={() => { setHasDependants("yes"); setError(""); }}
          >
            Yes
          </button>
        </div>

        {error && <span className="field-error">{error}</span>}

        <div className="step-footer space-between">
          <button
            className="prev-btn"
            onClick={() => navigate("/life/step-7", { state: data })}
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

export default LifeStep8;