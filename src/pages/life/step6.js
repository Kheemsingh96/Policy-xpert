import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./step6.css";
import arrowRight from "../../assets/images/arrow2.png";
import arrowLeft from "../../assets/images/arrow-left.png";

function LifeStep6() {
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
  const progressPercent = 42;

  const [stability, setStability] = useState(data.stability || "");
  const [error, setError] = useState(false);

  const handleNext = () => {
    if (stability) {
      setError(false);
      const finalData = { ...data, stability };
      console.log("Step 6 Data:", finalData);
      navigate("/life/step-7", { state: finalData });
    } else {
      setError(true);
    }
  };

  const selectOption = (val) => {
    setStability(val);
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
          How stable do you expect this income to be over the next 10–15 years?
        </h2>

        <div className="stability-options">
          <button
            type="button"
            className={stability === "Stable & Promising" ? "active" : ""}
            onClick={() => selectOption("Stable & Promising")}
          >
            Stable & Promising
          </button>

          <button
            type="button"
            className={stability === "Unsure" ? "active" : ""}
            onClick={() => selectOption("Unsure")}
          >
            Unsure
          </button>

          <button
            type="button"
            className={stability === "Less stable" ? "active" : ""}
            onClick={() => selectOption("Less stable")}
          >
            Less stable
          </button>
        </div>

        {error && (
          <p className="error-message">
            Please select an option to proceed.
          </p>
        )}

        <p className="tobacco-hint">
          An approximate estimate is sufficient.
        </p>

        <div className="step-footer space-between">
          <button
            type="button"
            className="prev-btn"
            onClick={() => navigate("/life/step-5", { state: data })}
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

export default LifeStep6;