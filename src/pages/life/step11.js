import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./step11.css"; 
import arrowRight from "../../assets/images/arrow2.png";
import arrowLeft from "../../assets/images/arrow-left.png";

function LifeStep11() {
  const navigate = useNavigate();
  const location = useLocation();
  const data = location.state || {};

  const steps = [
    { id: 1, label: "Basic" },
    { id: 2, label: "02 Income" },
    { id: 3, label: "03 Dependants" },
    { id: 4, label: "04 Assets & Liabilities" }
  ];

  const currentStep = 4; 
  const progressPercent = 90; // Almost done

  const [hasExpenses, setHasExpenses] = useState(data.hasExpenses || "");
  const [error, setError] = useState("");

  const handleNext = () => {
    if (!hasExpenses) {
      setError("Please select an option");
      return;
    }

    const finalData = { ...data, hasExpenses };
    console.log("Step 11 Data:", finalData);
    
    // UPDATED: Ab yeh seedha Step 12 par jayega
    navigate("/life/step-12", { state: finalData });
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
        <h2 className="step-title" style={{ marginBottom: "15px" }}>
          Do you expect any Significant expenses in the near future?
        </h2>
        
        <p className="step-subtitle">
          Examples include higher education for a spouse or sibling, wedding costs, or clearing major family-related financial obligations.
        </p>

        {/* Buttons: Yes on Left, No on Right */}
        <div className="expense-options">
          <button
            className={hasExpenses === "yes" ? "active" : ""}
            onClick={() => { setHasExpenses("yes"); setError(""); }}
          >
            Yes
          </button>

          <button
            className={hasExpenses === "no" ? "active" : ""}
            onClick={() => { setHasExpenses("no"); setError(""); }}
          >
            No
          </button>
        </div>

        {error && <span className="field-error">{error}</span>}

        <div className="step-footer space-between">
          <button
            className="prev-btn"
            onClick={() => navigate("/life/step-10", { state: data })}
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

export default LifeStep11;