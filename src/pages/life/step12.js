import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./step12.css"; 
import "./stepslayout.css";
import arrowRight from "../../assets/images/arrow2.png";
import arrowLeft from "../../assets/images/arrow-left.png";

function LifeStep12() {
  const navigate = useNavigate();
  const location = useLocation();

  const steps = [
    { id: 1, label: "Basic" },
    { id: 2, label: "02 Income" },
    { id: 3, label: "03 Dependants" },
    { id: 4, label: "04 Assets & Liabilities" }
  ];

  const currentStep = 4; 
  const progressPercent = 100;

  const [hasLifeCover, setHasLifeCover] = useState(location.state?.hasLifeCover || "");
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (location.state?.hasLifeCover) {
      setHasLifeCover(location.state.hasLifeCover);
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
    if (!hasLifeCover) newErrors.hasLifeCover = "Please select an option to proceed.";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validate()) {
      navigate("/life/report", {
        state: { ...location.state, hasLifeCover }
      });
    }
  };

  const handlePrevious = () => {
    navigate("/life/step-11", { state: location.state });
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
          Do you have an existing life cover?
        </h2>

        <div className="cover-options">
          <button
            type="button"
            className={hasLifeCover === "yes" ? "active" : ""}
            onClick={() => handleInputChange("hasLifeCover", "yes", setHasLifeCover)}
          >
            Yes
          </button>

          <button
            type="button"
            className={hasLifeCover === "no" ? "active" : ""}
            onClick={() => handleInputChange("hasLifeCover", "no", setHasLifeCover)}
          >
            No
          </button>
        </div>

        {errors.hasLifeCover && (
          <span className="error-text" style={{ display: 'block', textAlign: 'center', marginTop: '10px' }}>
            {errors.hasLifeCover}
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

export default LifeStep12;