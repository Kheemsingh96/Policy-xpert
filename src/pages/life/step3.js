import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./step3.css";
import "./stepslayout.css"; 
import arrowRight from "../../assets/images/arrow2.png";
import arrowLeft from "../../assets/images/arrow-left.png";

function LifeStep3() {
  const navigate = useNavigate();
  const location = useLocation();

  const steps = [
    { id: 1, label: "Basic" },
    { id: 2, label: "02 Income" },
    { id: 3, label: "03 Dependants" },
    { id: 4, label: "04 Assets & Liabilities" }
  ];

  const currentStep = 1;
  const totalBasicPages = 3;
  const currentBasicPage = 3; 
  const progressPercent = (100 / steps.length) / totalBasicPages * currentBasicPage;

  const data = location.state || {};

  const [tobacco, setTobacco] = useState(data.tobacco || "");
  const [error, setError] = useState(false);

  const handleNext = () => {
    if (tobacco) {
      setError(false);
      const finalData = { ...data, tobacco };
      navigate("/life/step-4", { state: finalData });
    } else {
      setError(true);
    }
  };

  const handlePrevious = () => {
    navigate("/life/step-2", { state: data });
  };

  const selectOption = (val) => {
    setTobacco(val);
    setError(false);
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
        <h2 className="step-title">Do you use tobacco in any form?</h2>

        <div className="tobacco-options">
          <button
            type="button"
            className={tobacco === "yes" ? "active" : ""}
            onClick={() => selectOption("yes")}
          >
            Yes
          </button>

          <button
            type="button"
            className={tobacco === "no" ? "active" : ""}
            onClick={() => selectOption("no")}
          >
            No
          </button>
        </div>

        {error && (
          <p style={{ color: "red", fontSize: "14px", marginTop: "10px", textAlign: "center" }}>
            Please select an option to proceed.
          </p>
        )}

        <div className="info-area">
          <p className="tobacco-hint">
            Select ‘Yes’ if you’ve used tobacco within the past year.
          </p>
        </div>

        <div className="step-footer space-between">
          <button type="button" className="prev-btn" onClick={handlePrevious}>
            <img src={arrowLeft} alt="previous" /> Previous
          </button>

          <button 
            type="button" 
            className="next-btn" 
            onClick={handleNext}
          >
            Next <img src={arrowRight} alt="next" />
          </button>
        </div>
      </div>
    </section>
  );
}

export default LifeStep3;