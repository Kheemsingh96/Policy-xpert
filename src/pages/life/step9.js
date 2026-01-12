import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./step9.css"; 
import arrowRight from "../../assets/images/arrow2.png";
import arrowLeft from "../../assets/images/arrow-left.png";

function LifeStep9() {
  const navigate = useNavigate();
  const location = useLocation();

  const steps = [
    { id: 1, label: "Basic" },
    { id: 2, label: "02 Income" },
    { id: 3, label: "03 Dependants" },
    { id: 4, label: "04 Assets & Liabilities" }
  ];

  const currentStep = 3;
  const progressPercent = 75; 

  const [nomineeResponse, setNomineeResponse] = useState(location.state?.nomineeResponse || "");
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (location.state?.nomineeResponse) {
      setNomineeResponse(location.state.nomineeResponse);
    }
  }, [location.state]);

  const options = [
    "Can handle the money confidently without feeling overwhelmed",
    "Would rely on trusted people for guidance in managing the funds",
    "May feel anxious or unsure without proper support",
    "Could be misled into purchasing unnecessary financial products"
  ];

  const handleInputChange = (field, value, setter) => {
    setter(value);
    if (errors[field]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  const validate = () => {
    let newErrors = {};
    if (!nomineeResponse) newErrors.nomineeResponse = "Please select an option to proceed.";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validate()) {
      navigate("/life/step-10", {
        state: { ...location.state, nomineeResponse }
      });
    }
  };

  const handlePrevious = () => {
    navigate("/life/step-8", { state: location.state });
  };

  return (
    <section className="life-step">
      <div className="progress-wrapper">
        <div className="progress-steps">
          {steps.map((s) => (
            <span key={s.id} className={s.id <= currentStep ? "active" : ""}>{s.label}</span>
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
              type="button"
              className={`option-btn ${nomineeResponse === option ? "active" : ""}`}
              onClick={() => handleInputChange("nomineeResponse", option, setNomineeResponse)}
            >
              {option}
            </button>
          ))}
        </div>

        {errors.nomineeResponse && (
          <span className="error-text" style={{ display: 'block', textAlign: 'center', marginTop: '10px' }}>
            {errors.nomineeResponse}
          </span>
        )}

        <div className="step-footer space-between">
          <button type="button" className="prev-btn" onClick={handlePrevious}>
            <img src={arrowLeft} alt="previous" /> Previous
          </button>

          <button type="button" className="next-btn" onClick={handleNext}>
            Next <img src={arrowRight} alt="next" />
          </button>
        </div>
      </div>
    </section>
  );
}

export default LifeStep9;