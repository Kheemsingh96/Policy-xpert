import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./step10.css"; 
import "./stepslayout.css";
import arrowRight from "../../assets/images/arrow2.png";
import arrowLeft from "../../assets/images/arrow-left.png";

function LifeStep10() {
  const navigate = useNavigate();
  const location = useLocation();

  const steps = [
    { id: 1, label: "Basic" },
    { id: 2, label: "02 Income" },
    { id: 3, label: "03 Dependants" },
    { id: 4, label: "04 Assets & Liabilities" }
  ];

  const currentStep = 4;
  const progressPercent = 85; 

  const [hasLoans, setHasLoans] = useState(location.state?.hasLoans || "");
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (location.state?.hasLoans) {
      setHasLoans(location.state.hasLoans);
    }
  }, [location.state]);

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
    if (!hasLoans) newErrors.hasLoans = "Please select an option to proceed.";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validate()) {
      navigate("/life/step-11", {
        state: { ...location.state, hasLoans }
      });
    }
  };

  const handlePrevious = () => {
    navigate("/life/step-9", { state: location.state });
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
          Do you currently have any major loans or advances?
        </h2>

        <div className="loan-options">
          <button
            type="button"
            className={hasLoans === "no" ? "active" : ""}
            onClick={() => handleInputChange("hasLoans", "no", setHasLoans)}
          >
            No
          </button>

          <button
            type="button"
            className={hasLoans === "yes" ? "active" : ""}
            onClick={() => handleInputChange("hasLoans", "yes", setHasLoans)}
          >
            Yes
          </button>
        </div>

        {errors.hasLoans && (
          <span className="error-text" style={{ display: 'block', textAlign: 'center', marginTop: '10px' }}>
            {errors.hasLoans}
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

export default LifeStep10;