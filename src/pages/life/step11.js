import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./step11.css"; 
import "./stepslayout.css";
import arrowRight from "../../assets/images/arrow2.png";
import arrowLeft from "../../assets/images/arrow-left.png";

function LifeStep11() {
  const navigate = useNavigate();
  const location = useLocation();

  const steps = [
    { id: 1, label: "Basic" },
    { id: 2, label: "02 Income" },
    { id: 3, label: "03 Dependants" },
    { id: 4, label: "04 Assets & Liabilities" }
  ];

  const currentStep = 4; 
  const progressPercent = 90;

  const [hasExpenses, setHasExpenses] = useState(location.state?.hasExpenses || "");
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (location.state?.hasExpenses) {
      setHasExpenses(location.state.hasExpenses);
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
    if (!hasExpenses) newErrors.hasExpenses = "Please select an option to proceed.";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validate()) {
      navigate("/life/step-12", {
        state: { ...location.state, hasExpenses }
      });
    }
  };

  const handlePrevious = () => {
    navigate("/life/step-10", { state: location.state });
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
        <h2 className="step-title" style={{ marginBottom: "15px" }}>
          Do you expect any Significant expenses in the near future?
        </h2>
        
        <p className="step-subtitle">
          Examples include higher education for a spouse or sibling, wedding costs, or clearing major family-related financial obligations.
        </p>

        <div className="expense-options">
          <button
            type="button"
            className={hasExpenses === "yes" ? "active" : ""}
            onClick={() => handleInputChange("hasExpenses", "yes", setHasExpenses)}
          >
            Yes
          </button>

          <button
            type="button"
            className={hasExpenses === "no" ? "active" : ""}
            onClick={() => handleInputChange("hasExpenses", "no", setHasExpenses)}
          >
            No
          </button>
        </div>

        {errors.hasExpenses && (
          <span className="error-text" style={{ display: 'block', textAlign: 'center', marginTop: '10px' }}>
            {errors.hasExpenses}
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

export default LifeStep11;