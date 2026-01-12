import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./step4.css";
import arrowRight from "../../assets/images/arrow2.png";
import arrowLeft from "../../assets/images/arrow-left.png";

function LifeStep4() {
  const navigate = useNavigate();
  const location = useLocation();

  const steps = [
    { id: 1, label: "Basic" },
    { id: 2, label: "02 Income" },
    { id: 3, label: "03 Dependants" },
    { id: 4, label: "04 Assets & Liabilities" }
  ];

  const currentStep = 1;
  const progressPercent = 22; 

  const data = location.state || {};

  const [alcohol, setAlcohol] = useState(data.alcohol || "");
  const [error, setError] = useState(false);

  const handleNext = () => {
    if (alcohol) {
      setError(false);
      const finalData = { ...data, alcohol };
      navigate("/life/step-5", { state: finalData });
    } else {
      setError(true);
    }
  };

  const selectOption = (val) => {
    setAlcohol(val);
    setError(false);
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
        <h2 className="step-title">
          Do you drink alcohol?
        </h2>

        <div className="tobacco-options">
          <button
            type="button"
            className={alcohol === "yes" ? "active" : ""}
            onClick={() => selectOption("yes")}
          >
            Yes
          </button>

          <button
            type="button"
            className={alcohol === "no" ? "active" : ""}
            onClick={() => selectOption("no")}
          >
            No
          </button>
        </div>

        {error && (
          <p className="error-message">
            Please select an option to proceed.
          </p>
        )}

        <p className="tobacco-hint">
          Select ‘Yes’ if you’ve had alcohol within the past year.
        </p>

        <div className="step-footer space-between">
          <button
            type="button"
            className="prev-btn"
            onClick={() => navigate("/life/step-3", { state: data })}
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

export default LifeStep4;