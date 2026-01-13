import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./step8.css"; 
import "./stepslayout.css";
import arrowRight from "../../assets/images/arrow2.png";
import arrowLeft from "../../assets/images/arrow-left.png";

function LifeStep8() {
  const navigate = useNavigate();
  const location = useLocation();

  const steps = [
    { id: 1, label: "Basic" },
    { id: 2, label: "02 Income" },
    { id: 3, label: "03 Dependants" },
    { id: 4, label: "04 Assets & Liabilities" }
  ];

  const currentStep = 3;
  const progressPercent = 60; 

  const [hasDependants, setHasDependants] = useState(location.state?.hasDependants || "");
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (location.state?.hasDependants) {
      setHasDependants(location.state.hasDependants);
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
    if (!hasDependants) newErrors.hasDependants = "Please select an option to proceed.";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validate()) {
      navigate("/life/step-9", {
        state: { ...location.state, hasDependants }
      });
    }
  };

  const handlePrevious = () => {
    navigate("/life/step-7", { state: location.state });
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
          Do any family members rely on your income?
        </h2>

        <div className="dependant-options">
          <button
            type="button"
            className={hasDependants === "no" ? "active" : ""}
            onClick={() => handleInputChange("hasDependants", "no", setHasDependants)}
          >
            No
          </button>

          <button
            type="button"
            className={hasDependants === "yes" ? "active" : ""}
            onClick={() => handleInputChange("hasDependants", "yes", setHasDependants)}
          >
            Yes
          </button>
        </div>

        {errors.hasDependants && (
          <span className="error-text" style={{ display: 'block', textAlign: 'center', marginTop: '10px' }}>
            {errors.hasDependants}
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

export default LifeStep8;