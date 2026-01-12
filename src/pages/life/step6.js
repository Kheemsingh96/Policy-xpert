import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./step6.css";
import arrowRight from "../../assets/images/arrow2.png";
import arrowLeft from "../../assets/images/arrow-left.png";

function LifeStep6() {
  const navigate = useNavigate();
  const location = useLocation();

  const steps = [
    { id: 1, label: "Basic" },
    { id: 2, label: "02 Income" },
    { id: 3, label: "03 Dependants" },
    { id: 4, label: "04 Assets & Liabilities" }
  ];

  const currentStep = 2;
  const progressPercent = 42;

  const [stability, setStability] = useState(location.state?.stability || "");
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (location.state?.stability) {
      setStability(location.state.stability);
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
    if (!stability) newErrors.stability = "Please select an option to proceed.";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validate()) {
      navigate("/life/step-7", {
        state: { ...location.state, stability }
      });
    }
  };

  const handlePrevious = () => {
    navigate("/life/step-5", { state: location.state });
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
          How stable do you expect this income to be over the next 10–15 years?
        </h2>

        <div className="stability-options">
          <button
            type="button"
            className={stability === "Stable & Promising" ? "active" : ""}
            onClick={() => handleInputChange("stability", "Stable & Promising", setStability)}
          >
            Stable & Promising
          </button>

          <button
            type="button"
            className={stability === "Unsure" ? "active" : ""}
            onClick={() => handleInputChange("stability", "Unsure", setStability)}
          >
            Unsure
          </button>

          <button
            type="button"
            className={stability === "Less stable" ? "active" : ""}
            onClick={() => handleInputChange("stability", "Less stable", setStability)}
          >
            Less stable
          </button>
        </div>

        {errors.stability && (
          <span className="error-text" style={{ display: 'block', textAlign: 'center', marginTop: '10px' }}>
            {errors.stability}
          </span>
        )}

        <p className="tobacco-hint">
          An approximate estimate is sufficient.
        </p>

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

export default LifeStep6;