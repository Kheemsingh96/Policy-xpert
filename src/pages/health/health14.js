import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./health14.css";
import arrowRight from "../../assets/images/arrow2.png";
import arrowLeft from "../../assets/images/arrow-left.png";

function HealthStep14() {
  const navigate = useNavigate();
  const location = useLocation();
  
  const prevData = location.state || {};
  const memberDetails = prevData.memberDetails || [];
  const policyCount = prevData.existingPolicy?.count || 1;

  const steps = [
    { id: 1, label: "Personal" },
    { id: 2, label: "02 Life Style" },
    { id: 3, label: "03 Medical & Health" },
    { id: 4, label: "04 Existing Policy" }
  ];

  const currentStep = 4;
  const progressPercent = (currentStep / steps.length) * 100;

  const [policies, setPolicies] = useState([]);
  const [expandedPolicy, setExpandedPolicy] = useState(0); 
  const [error, setError] = useState("");

  const planOptions = ["HDFC Ergo", "Star Health", "Niva Bupa", "ICICI Lombard", "Care Health", "Other"];
  
  const memberOptions = memberDetails.map(m => m.fullName || m.label || m.id);

  useEffect(() => {
    const initialPolicies = Array.from({ length: policyCount }, (_, i) => ({
      id: i,
      planName: "",
      coverAmount: "",
      otherPlanName: "",
      renewalDate: "",
      policyType: "", 
      membersCovered: "" 
    }));
    setPolicies(initialPolicies);
  }, [policyCount]);

  const toggleAccordion = (index) => {
    setExpandedPolicy(expandedPolicy === index ? null : index);
  };

  const handleInputChange = (index, field, value) => {
    const updatedPolicies = [...policies];
    updatedPolicies[index][field] = value;
    setPolicies(updatedPolicies);
    setError("");
  };

  const handleNext = () => {
    const isValid = policies.every(p => p.planName && p.coverAmount && p.policyType);
    
    if (!isValid) {
      setError("Please fill in all mandatory details for all policies.");
      return;
    }

    const finalData = {
      ...prevData,
      policyDetails: policies
    };

    navigate("/health/report", { state: finalData });
  };

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <section className="health14-step">
      <div className="health14-progress-wrapper">
        <div className="health14-progress-steps">
          {steps.map((s) => (
            <span key={s.id} className={s.id <= 4 ? "active" : ""}>
              {s.label}
            </span>
          ))}
        </div>
        <div className="health14-progress-bar">
          <div className="health14-progress-fill" style={{ width: `${progressPercent}%` }}></div>
        </div>
      </div>

      <div className="health14-step-box">
        <div className="health14-header">
          <h2 className="health14-title">Please provide details of your existing health insurance policies.</h2>
        </div>

        <div className="health14-policies-container">
          {policies.map((policy, index) => (
            <div key={index} className={`health14-policy-card ${expandedPolicy === index ? "expanded" : ""}`}>
              
              <div 
                className="health14-policy-header" 
                onClick={() => toggleAccordion(index)}
              >
                <span className="policy-number">Policy {index + 1}</span>
                <span className={`accordion-arrow ${expandedPolicy === index ? "open" : ""}`}>▼</span>
              </div>

              {expandedPolicy === index && (
                <div className="health14-policy-body">
                  <div className="health14-form-grid">
                    
                    <div className="health14-input-group">
                      <label>Name of insurance plan</label>
                      <select 
                        value={policy.planName}
                        onChange={(e) => handleInputChange(index, "planName", e.target.value)}
                      >
                        <option value="" disabled>Select Plan</option>
                        {planOptions.map(opt => (
                          <option key={opt} value={opt}>{opt}</option>
                        ))}
                      </select>
                    </div>

                    <div className="health14-input-group">
                      <label>Cover amount</label>
                      <input 
                        type="text" 
                        placeholder="Cover Amount"
                        value={policy.coverAmount}
                        onChange={(e) => handleInputChange(index, "coverAmount", e.target.value)}
                      />
                    </div>

                    <div className="health14-input-group">
                      <label>Other Plan Name</label>
                      <input 
                        type="text" 
                        placeholder="Other Plan Name"
                        value={policy.otherPlanName}
                        onChange={(e) => handleInputChange(index, "otherPlanName", e.target.value)}
                        disabled={policy.planName !== "Other"}
                      />
                    </div>

                    <div className="health14-input-group">
                      <label>Policy Renewal Date</label>
                      <input 
                        type="text" 
                        placeholder="Policy Renewal Date"
                        onFocus={(e) => (e.target.type = "date")}
                        onBlur={(e) => (e.target.type = "text")}
                        value={policy.renewalDate}
                        onChange={(e) => handleInputChange(index, "renewalDate", e.target.value)}
                      />
                    </div>

                    <div className="health14-input-group">
                      <label>Type of Policy</label>
                      <div className="policy-type-buttons">
                        <button 
                          className={policy.policyType === "Individual" ? "active" : ""}
                          onClick={() => handleInputChange(index, "policyType", "Individual")}
                        >
                          Individual
                        </button>
                        <button 
                          className={policy.policyType === "Floater" ? "active" : ""}
                          onClick={() => handleInputChange(index, "policyType", "Floater")}
                        >
                          Floater
                        </button>
                      </div>
                    </div>

                    <div className="health14-input-group">
                      <label>Members covered</label>
                      <select 
                        value={policy.membersCovered}
                        onChange={(e) => handleInputChange(index, "membersCovered", e.target.value)}
                      >
                        <option value="" disabled>Member Covered</option>
                        {memberOptions.map(m => (
                          <option key={m} value={m}>{m}</option>
                        ))}
                      </select>
                    </div>

                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {error && <div className="health14-error">{error}</div>}

        <div className="health14-footer">
          <button className="health14-prev-btn" onClick={handleBack}>
            <img src={arrowLeft} alt="back" /> Previous
          </button>
          <button className="health14-next-btn" onClick={handleNext}>
            Next <img src={arrowRight} alt="next" />
          </button>
        </div>
      </div>
    </section>
  );
}

export default HealthStep14;