import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./step9.css"; 
import arrowRight from "../../assets/images/arrow2.png";
import arrowLeft from "../../assets/images/arrow-left.png";

function LifeStep9() {
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
  const progressPercent = 75; 

  const [nomineeResponse, setNomineeResponse] = useState(data.nomineeResponse || "");
  const [error, setError] = useState("");

  const options = [
    "Can handle the money confidently without feeling overwhelmed",
    "Would rely on trusted people for guidance in managing the funds",
    "May feel anxious or unsure without proper support",
    "Could be misled into purchasing unnecessary financial products"
  ];

  const handleNext = () => {
    if (!nomineeResponse) {
      setError("Please select an option");
      return;
    }

    const finalData = { ...data, nomineeResponse };
    console.log("Step 9 Data:", finalData);
    
    // CORRECTION: Alert hata diya aur navigate chalu kar diya
    navigate("/life/step-10", { state: finalData });
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
          How do you think your nominee would respond to receiving INR 2 Crores unexpectedly?
        </h2>

        <div className="options-vertical">
          {options.map((option, index) => (
            <button
              key={index}
              className={`option-btn ${nomineeResponse === option ? "active" : ""}`}
              onClick={() => {
                setNomineeResponse(option);
                setError("");
              }}
            >
              {option}
            </button>
          ))}
        </div>

        {error && <span className="field-error">{error}</span>}

        <div className="step-footer space-between">
          <button
            className="prev-btn"
            onClick={() => navigate("/life/step-8", { state: data })}
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

export default LifeStep9;