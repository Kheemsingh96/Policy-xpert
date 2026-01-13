import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./step7.css";
import "./stepslayout.css";
import arrowRight from "../../assets/images/arrow2.png";
import arrowLeft from "../../assets/images/arrow-left.png";

function LifeStep7() {
  const navigate = useNavigate();
  const location = useLocation();

  const steps = [
    { id: 1, label: "Basic" },
    { id: 2, label: "02 Income" },
    { id: 3, label: "03 Dependants" },
    { id: 4, label: "04 Assets & Liabilities" }
  ];

  const currentStep = 2;
  const progressPercent = 50;

  const [retirementAge, setRetirementAge] = useState(location.state?.retirementAge || "");
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (location.state?.retirementAge) {
      setRetirementAge(location.state.retirementAge);
    }
  }, [location.state]);

  const ageOptions = [];
  for (let i = 40; i <= 70; i += 5) {
    ageOptions.push(i);
  }

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
    if (!retirementAge) newErrors.retirementAge = "Please select an age to proceed.";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validate()) {
      navigate("/life/step-8", {
        state: { ...location.state, retirementAge }
      });
    }
  };

  const handlePrevious = () => {
    navigate("/life/step-6", { state: location.state });
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
        <h2 className="step-title" style={{ marginBottom: "40px" }}>
          At what age do you expect to retire from work?
        </h2>

        <div className="single-input-container">
          <select
            value={retirementAge}
            onChange={(e) => handleInputChange("retirementAge", e.target.value, setRetirementAge)}
            className={!retirementAge ? "placeholder-style" : ""}
          >
            <option value="" disabled>Select Age</option>
            {ageOptions.map((age) => (
              <option key={age} value={age}>{age} years</option>
            ))}
          </select>
        </div>

        {errors.retirementAge && (
          <span className="error-text" style={{ display: 'block', textAlign: 'center', marginTop: '10px' }}>
            {errors.retirementAge}
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

export default LifeStep7;