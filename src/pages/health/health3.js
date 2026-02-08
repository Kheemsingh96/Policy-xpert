import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./health3.css";
import arrowRight from "../../assets/images/arrow2.png";
import arrowLeft from "../../assets/images/arrow-left.png";

import selfIcon from "../../assets/images/slef.png"; 
import partnerIcon from "../../assets/images/partner.png";
import sonIcon from "../../assets/images/son.png";
import daughterIcon from "../../assets/images/daugter.png";
import fatherIcon from "../../assets/images/father.png";
import motherIcon from "../../assets/images/mother.png";

function HealthStep3() {
  const navigate = useNavigate();
  const location = useLocation();
  const selectedMembers = location.state?.members || {};
  const globalPincode = location.state?.pincode || "";

  const steps = [
    { id: 1, label: "Personal" },
    { id: 2, label: "02 Life Style" },
    { id: 3, label: "03 Medical & Health" },
    { id: 4, label: "04 Existing Policy" }
  ];

  const totalSteps = steps.length;
  const progressPercent = 20;

  const [memberForms, setMemberForms] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const generatedForms = [];

    if (selectedMembers.self) generatedForms.push({ id: "self", label: "Self", icon: selfIcon, defaultGender: "Male" });
    if (selectedMembers.partner) generatedForms.push({ id: "partner", label: "Partner", icon: partnerIcon, defaultGender: "Female" });
    
    for (let i = 1; i <= selectedMembers.son; i++) {
      generatedForms.push({ id: `son${i}`, label: `Son ${i}`, icon: sonIcon, defaultGender: "Male" });
    }

    for (let i = 1; i <= selectedMembers.daughter; i++) {
      generatedForms.push({ id: `daughter${i}`, label: `Daughter ${i}`, icon: daughterIcon, defaultGender: "Female" });
    }

    if (selectedMembers.father) generatedForms.push({ id: "father", label: "Father", icon: fatherIcon, defaultGender: "Male" });
    if (selectedMembers.mother) generatedForms.push({ id: "mother", label: "Mother", icon: motherIcon, defaultGender: "Female" });

    const initializedData = generatedForms.map(m => ({
      ...m,
      fullName: "",
      dob: "",
      gender: m.defaultGender || "",
      pincode: globalPincode
    }));

    setMemberForms(initializedData);
  }, [selectedMembers, globalPincode]);

  const handleInputChange = (index, field, value) => {
    const updatedForms = memberForms.map((member, i) => {
      if (index === 0 && field === "pincode") {
         return { ...member, pincode: value };
      }
      
      if (i === index) {
        return { ...member, [field]: value };
      }
      
      return member;
    });

    setMemberForms(updatedForms);
    setError("");
  };

  const handleNext = () => {
    const isValid = memberForms.every(m => m.fullName && m.dob && m.gender && m.pincode);
    if (!isValid) {
      setError("Please fill all details for all members.");
      return;
    }
    navigate("/health/step-4", { 
        state: { 
            ...location.state, 
            memberDetails: memberForms 
        } 
    });
  };

  const handleBack = () => {
    navigate(-1);
  };

  const maxDate = new Date().toISOString().split("T")[0];

  return (
    <section className="health3-step">
      <div className="health3-progress-wrapper">
        <div className="health3-progress-steps">
          {steps.map((s) => (
            <span key={s.id} className={s.id === 1 ? "active" : ""}>
              {s.label}
            </span>
          ))}
        </div>
        <div className="health3-progress-bar">
          <div className="health3-progress-fill" style={{ width: `${progressPercent}%` }}></div>
        </div>
      </div>

      <div className="health3-step-box">
        <div className="health3-header">
          <h2 className="health3-title">Know your family details to personalize your coverage.</h2>
        </div>

        <div className="health3-rows-container">
          {memberForms.map((member, index) => (
            <div key={member.id} className="member-row">
              <div className="member-info">
                <div className="member-icon-circle">
                  <img src={member.icon} alt={member.label} />
                </div>
                <span className="member-label">{member.label}</span>
              </div>

              <div className="member-inputs">
                <div className="input-group">
                  <input 
                    type="text" 
                    placeholder="Full Name" 
                    value={member.fullName}
                    onChange={(e) => handleInputChange(index, "fullName", e.target.value)}
                  />
                </div>
                
                <div className="input-group date-input-group">
                  <input 
                    type="date" 
                    value={member.dob}
                    max={maxDate}
                    onChange={(e) => handleInputChange(index, "dob", e.target.value)}
                    className={`dob-input ${member.dob ? "has-value" : ""}`}
                    required
                  />
                </div>

                <div className="input-group">
                  <select 
                    value={member.gender}
                    onChange={(e) => handleInputChange(index, "gender", e.target.value)}
                    className={member.gender ? "has-value" : ""}
                  >
                    <option value="">Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                  </select>
                </div>
                <div className="input-group">
                  <input 
                    type="text" 
                    placeholder="Pin Code" 
                    value={member.pincode}
                    maxLength={6}
                    onChange={(e) => handleInputChange(index, "pincode", e.target.value.replace(/\D/g, ""))}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        {error && <div className="health3-error">{error}</div>}

        <div className="health3-footer">
          <button className="health3-prev-btn" onClick={handleBack}>
            <img src={arrowLeft} alt="back" /> Previous
          </button>
          <button className="health3-next-btn" onClick={handleNext}>
            Next <img src={arrowRight} alt="next" />
          </button>
        </div>
      </div>
    </section>
  );
}

export default HealthStep3;