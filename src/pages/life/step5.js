import { useState, useMemo, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./step5.css";
import "./stepslayout.css";
import arrowRight from "../../assets/images/arrow2.png";
import arrowLeft from "../../assets/images/arrow-left.png";
import lockIcon from "../../assets/images/lock.png";

function LifeStep5() {
  const navigate = useNavigate();
  const location = useLocation();

  const steps = [
    { id: 1, label: "Basic" },
    { id: 2, label: "02 Income" },
    { id: 3, label: "03 Dependants" },
    { id: 4, label: "04 Assets & Liabilities" }
  ];

  const currentStep = 2;
  const progressPercent = 35; 

  const [incomes, setIncomes] = useState(
    location.state?.incomes || [{ id: Date.now(), source: "", amount: "" }]
  );
  const [errors, setErrors] = useState({});

  const sourceOptions = ["Salary", "Business", "Rental Income", "Interest / Dividends", "Pension", "Other"];

  const totalIncomeValue = useMemo(() => {
    return incomes.reduce((acc, curr) => acc + (Number(curr.amount) || 0), 0);
  }, [incomes]);

  const handleInputChange = (id, field, value) => {
    const updatedIncomes = incomes.map((item) =>
      item.id === id ? { ...item, [field]: value } : item
    );
    setIncomes(updatedIncomes);
    
    // Step 2 ke logic ki tarah error remove karna
    if (errors.form) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors.form;
        return newErrors;
      });
    }
  };

  const handleAddMore = () => {
    setIncomes([...incomes, { id: Date.now(), source: "", amount: "" }]);
  };

  const handleRemove = (id) => {
    if (incomes.length > 1) {
      setIncomes(incomes.filter((item) => item.id !== id));
    }
  };

  const validate = () => {
    let newErrors = {};
    const isValid = incomes.every(
      (item) => item.source && item.amount && item.amount.toString().trim() !== ""
    );

    if (!isValid) {
      newErrors.form = "Please fill all income details to proceed.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validate()) {
      navigate("/life/step-6", {
        state: { 
          ...location.state, 
          incomes, 
          totalIncome: `₹${totalIncomeValue.toLocaleString('en-IN')}` 
        }
      });
    }
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
        <h2 className="step-title">What are your income sources?</h2>
        <p className="step-desc">Select all applicable income sources and enter the amount.</p>

        <div className="income-form-container">
          {incomes.map((item) => (
            <div className="income-row" key={item.id}>
              <div className="input-group">
                <select
                  value={item.source}
                  onChange={(e) => handleInputChange(item.id, "source", e.target.value)}
                >
                  <option value="" disabled>Select Source</option>
                  {sourceOptions.map((opt) => (
                    <option key={opt} value={opt}>{opt}</option>
                  ))}
                </select>
              </div>

              <div className="input-group amount-group">
                <span className="currency-symbol">₹</span>
                <input
                  type="number"
                  placeholder="0"
                  value={item.amount}
                  onChange={(e) => handleInputChange(item.id, "amount", e.target.value)}
                />
                <span className="per-annum">Per Annum</span>
              </div>

              {incomes.length > 1 && (
                <button type="button" className="remove-btn" onClick={() => handleRemove(item.id)}>×</button>
              )}
            </div>
          ))}
          <button type="button" className="add-more-btn" onClick={handleAddMore}>
            + Add More Source
          </button>
        </div>

        {totalIncomeValue > 0 && (
          <div className="total-income-summary-box">
            <div className="summary-content">
              <span>Total Annual Income:</span>
              <strong>₹ {totalIncomeValue.toLocaleString('en-IN')}</strong>
            </div>
          </div>
        )}

        {errors.form && <span className="error-text" style={{ display: 'block', textAlign: 'center', marginTop: '10px' }}>{errors.form}</span>}

        <div className="secure-note">
           <img src={lockIcon} alt="secure" className="lock-icon" /> 
           All sensitive information is stored securely.
        </div>

        <div className="step-footer space-between">
          <button type="button" className="prev-btn" onClick={() => navigate("/life/step-4", { state: location.state })}>
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

export default LifeStep5;