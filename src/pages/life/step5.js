import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./step5.css";
// Images imports
import arrowRight from "../../assets/images/arrow2.png";
import arrowLeft from "../../assets/images/arrow-left.png";
import lockIcon from "../../assets/images/lock.png";

function LifeStep5() {
  const navigate = useNavigate();
  const location = useLocation();
  const prevData = location.state || {};

  const steps = [
    { id: 1, label: "Basic" },
    { id: 2, label: "02 Income" },
    { id: 3, label: "03 Dependants" },
    { id: 4, label: "04 Assets & Liabilities" }
  ];

  const currentStep = 2;
  const progressPercent = 35; 

  // CHANGE HERE: Default values hata di hain. Ab ye empty rahega.
  const [incomes, setIncomes] = useState(
    prevData.incomes || [{ id: Date.now(), source: "", amount: "" }]
  );

  const [error, setError] = useState("");

  const sourceOptions = [
    "Salary",
    "Business",
    "Rental Income",
    "Interest / Dividends",
    "Pension",
    "Other"
  ];

  const handleAddMore = () => {
    setIncomes([...incomes, { id: Date.now(), source: "", amount: "" }]);
  };

  const handleRemove = (id) => {
    const updatedIncomes = incomes.filter((item) => item.id !== id);
    setIncomes(updatedIncomes);
  };

  const handleChange = (id, field, value) => {
    const updatedIncomes = incomes.map((item) =>
      item.id === id ? { ...item, [field]: value } : item
    );
    setIncomes(updatedIncomes);
    setError("");
  };

  const handleNext = () => {
    // 1. Validation: Ab kyunki form khali hai, user ko fill karna zaroori hoga
    const isValid = incomes.every(
      (item) => item.source && item.source.trim() !== "" && item.amount && item.amount.toString().trim() !== ""
    );

    if (!isValid) {
      setError("Please fill all income details.");
      return;
    }

    // 2. DATA FIX (Universal Data Passing)
    const formattedIncomes = incomes.map((item) => ({
        id: item.id,
        
        // --- TEXT VALUES ---
        source: item.source,   
        name: item.source,     
        title: item.source,    
        label: item.source,    
        type: item.source,     
        category: item.source, 

        // --- NUMBER VALUES ---
        amount: Number(item.amount), 
        value: Number(item.amount),  
        price: Number(item.amount)
    }));

    // Total Calculation
    const totalVal = formattedIncomes.reduce((acc, curr) => acc + curr.amount, 0);

    // 3. Data Packing
    const finalData = { 
        ...prevData, 
        incomes: formattedIncomes,      
        
        // Backup Logic
        income: formattedIncomes[0],
        source: formattedIncomes[0].source, // Backup for single source reports

        // Totals
        totalAnnualIncome: totalVal,
        grandTotal: totalVal,
        amount: totalVal
    };
    
    console.log("FIXED DATA SENT:", finalData);

    // 4. Navigate
    navigate("/life/step-6", { state: finalData });
  };

  return (
    <section className="life-step">
      <div className="progress-wrapper">
        <div className="progress-steps">
          {steps.map((step) => (
            <span
              key={step.id}
              className={step.id <= currentStep ? "active" : ""}
            >
              {step.label}
            </span>
          ))}
        </div>
        <div className="progress-bar">
          <div
            className="progress-fill"
            style={{ width: `${progressPercent}%` }}
          ></div>
        </div>
      </div>

      <div className="life-step-box center-box">
        <h2 className="step-title" style={{ marginBottom: "15px" }}>
          What are your income sources?
        </h2>
        
        <p className="step-desc">
          Select all applicable income sources and enter the amount earned from
          each. Include passive income such as rent received, investment
          interest, and similar sources.
        </p>

        <div className="income-form-container">
          {incomes.map((item) => (
            <div className="income-row" key={item.id}>
              <div className="input-group">
                <select
                  value={item.source}
                  onChange={(e) => handleChange(item.id, "source", e.target.value)}
                  className={!item.source ? "placeholder-style" : ""}
                >
                  {/* Ye placeholder ab dikhega jab tak user select na kare */}
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
                  onChange={(e) => handleChange(item.id, "amount", e.target.value)}
                />
                <span className="per-annum">Per Annum</span>
              </div>

              {incomes.length > 1 && (
                <button 
                  className="remove-btn" 
                  onClick={() => handleRemove(item.id)}
                  title="Remove"
                >
                  ×
                </button>
              )}
            </div>
          ))}

          <button className="add-more-btn" onClick={handleAddMore}>
            + Add More
          </button>
        </div>

        {error && <span className="field-error" style={{color: 'red', display:'block', marginTop:'10px'}}>{error}</span>}

        <div className="secure-note">
           <img src={lockIcon} alt="secure" className="lock-icon" /> 
           All sensitive information is stored securely and remains anonymous.
        </div>

        <div className="step-footer space-between">
          <button
            className="prev-btn"
            onClick={() => navigate("/life/step-4", { state: prevData })}
          >
            <img src={arrowLeft} alt="previous" />
            Previous
          </button>

          <button className="next-btn" onClick={handleNext}>
            Next
            <img src={arrowRight} alt="next" />
          </button>
        </div>
      </div>
    </section>
  );
}

export default LifeStep5;