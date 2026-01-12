import { useState, useEffect } from "react";
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


  const progressPercent = 14; 

  const [tobacco, setTobacco] = useState(location.state?.tobacco || "");
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (location.state?.tobacco) {
      setTobacco(location.state.tobacco);
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
    if (!tobacco) newErrors.tobacco = "Please select an option to proceed.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validate()) {
      navigate("/life/step-4", {
        state: { ...location.state, tobacco }
      });
    }
  };

  const handlePrevious = () => {
    navigate("/life/step-2", { state: location.state });
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
        <h2 className="step-title">Do you use tobacco in any form?</h2>
        <div className="tobacco-options">
          <button
            type="button"
            className={tobacco === "yes" ? "active" : ""}
            onClick={() => handleInputChange("tobacco", "yes", setTobacco)}
          >Yes</button>
          <button
            type="button"
            className={tobacco === "no" ? "active" : ""}
            onClick={() => handleInputChange("tobacco", "no", setTobacco)}
          >No</button>
        </div>
        {errors.tobacco && <span className="error-text" style={{ display: 'block', textAlign: 'center', marginTop: '10px' }}>{errors.tobacco}</span>}
        <div className="info-area">
          <p className="tobacco-hint">Select ‘Yes’ if you’ve used tobacco within the past year.</p>
        </div>
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

export default LifeStep3;