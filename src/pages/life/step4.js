import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./step4.css";
import arrowRight from "../../assets/images/arrow2.png";
import arrowLeft from "../../assets/images/arrow-left.png";

function LifeStep4() {
  const navigate = useNavigate();
  const location = useLocation();

  const steps = [
    { id: 1, label: "Basic" },
    { id: 2, label: "02 Income" },
    { id: 3, label: "03 Dependants" },
    { id: 4, label: "04 Assets & Liabilities" }
  ];

 
  const progressPercent = 20; 

  const [alcohol, setAlcohol] = useState(location.state?.alcohol || "");
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (location.state?.alcohol) {
      setAlcohol(location.state.alcohol);
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
    if (!alcohol) newErrors.alcohol = "Please select an option to proceed.";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validate()) {
      navigate("/life/step-5", {
        state: { ...location.state, alcohol }
      });
    }
  };

  const handlePrevious = () => {
    navigate("/life/step-3", { state: location.state });
  };

  return (
    <section className="life-step">
      <div className="progress-wrapper">
        <div className="progress-steps">
          {steps.map((s) => (
            <span key={s.id} className={s.id === 1 ? "active" : ""}>{s.label}</span>
          ))}
        </div>
        <div className="progress-bar">
          <div className="progress-fill" style={{ width: `${progressPercent}%` }}></div>
        </div>
      </div>

      <div className="life-step-box center-box">
        <h2 className="step-title">Do you drink alcohol?</h2>

        <div className="tobacco-options">
          <button
            type="button"
            className={alcohol === "yes" ? "active" : ""}
            onClick={() => handleInputChange("alcohol", "yes", setAlcohol)}
          >
            Yes
          </button>

          <button
            type="button"
            className={alcohol === "no" ? "active" : ""}
            onClick={() => handleInputChange("alcohol", "no", setAlcohol)}
          >
            No
          </button>
        </div>

        {errors.alcohol && <span className="error-text" style={{ display: 'block', textAlign: 'center', marginTop: '10px' }}>{errors.alcohol}</span>}

        <p className="tobacco-hint">
          Select ‘Yes’ if you’ve had alcohol within the past year.
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

export default LifeStep4;