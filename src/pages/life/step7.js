import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./step7.css";
import arrowRight from "../../assets/images/arrow2.png";
import arrowLeft from "../../assets/images/arrow-left.png";

function LifeStep7() {
  const navigate = useNavigate();
  const location = useLocation();
  const data = location.state || {};

  const steps = [
    { id: 1, label: "Basic" },
    { id: 2, label: "02 Income" },
    { id: 3, label: "03 Dependants" },
    { id: 4, label: "04 Assets & Liabilities" }
  ];

  const currentStep = 2;
  const progressPercent = 50;

  const [retirementAge, setRetirementAge] = useState(data.retirementAge || "");
  const [error, setError] = useState(false);

  const ageOptions = [];
  for (let i = 40; i <= 70; i += 5) {
    ageOptions.push(i);
  }

  const handleNext = () => {
    if (retirementAge) {
      setError(false);
      const finalData = { ...data, retirementAge };
      console.log("Step 7 Data:", finalData);
      navigate("/life/step-8", { state: finalData });
    } else {
      setError(true);
    }
  };

  return (
    <section className="life-step">
      <div className="progress-wrapper">
        <div className="progress-steps">
          {steps.map((step) => (
            <span
              key={step.id}
              className={step.id <= currentStep ? "active" : ""}
            >
              {step.label}
            </span>
          ))}
        </div>
        <div className="progress-bar">
          <div
            className="progress-fill"
            style={{ width: `${progressPercent}%` }}
          ></div>
        </div>
      </div>

      <div className="life-step-box center-box">
        <h2 className="step-title" style={{ marginBottom: "40px" }}>
          At what age do you expect to retire from work?
        </h2>

        <div className="single-input-container">
          <select
            value={retirementAge}
            onChange={(e) => {
              setRetirementAge(e.target.value);
              setError(false);
            }}
            className={!retirementAge ? "placeholder-style" : ""}
          >
            <option value="" disabled>Select Age</option>
            {ageOptions.map((age) => (
              <option key={age} value={age}>{age} years</option>
            ))}
          </select>
        </div>

        {error && (
          <p className="error-message">
            Please select an age to proceed.
          </p>
        )}

        <div className="step-footer space-between">
          <button
            type="button"
            className="prev-btn"
            onClick={() => navigate("/life/step-6", { state: data })}
          >
            <img src={arrowLeft} alt="previous" />
            Previous
          </button>

          <button type="button" className="next-btn" onClick={handleNext}>
            Next
            <img src={arrowRight} alt="next" />
          </button>
        </div>
      </div>
    </section>
  );
}

export default LifeStep7;