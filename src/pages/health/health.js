import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./health.css";

import plusIcon from "../../assets/images/plus.png";
import chatIcon from "../../assets/images/health4.png";
import arrowIcon from "../../assets/images/arrow.png"; 
function Health() {
  const navigate = useNavigate();

  const [selectedMember, setSelectedMember] = useState("");
  const [pincode, setPincode] = useState("");
  const [error, setError] = useState("");
  const [activeIndex, setActiveIndex] = useState(null); 

  const handleSubmit = () => {
    if (!selectedMember) {
      setError("Please select who you want to cover");
      return;
    }

    if (!/^\d{6}$/.test(pincode)) {
      setError("Enter valid pincode");
      return;
    }

    setError("");
    navigate("/health/step-2", {
      state: {
        member: selectedMember,
        pincode: pincode,
      },
    });
  };

  const toggleFaq = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const faqs = [
    {
      question: "What is health insurance?",
      answer: "Health insurance is a financial protection plan that helps cover medical expenses such as hospitalization, surgeries, treatments, and related healthcare costs. By paying a regular premium, you reduce the risk of bearing large out-of-pocket medical expenses during illness or emergencies."
    },
    {
      question: "How does health insurance work?",
      answer: "You pay a fixed premium to the insurer. In return, the insurer covers eligible medical expenses as per the policy terms. Expenses can be settled through cashless treatment at network hospitals or reimbursement where you pay first and claim later. Coverage is subject to policy limits, waiting periods, exclusions, and deductibles."
    },
    {
      question: "How do I get health insurance?",
      answer: "You can get health insurance by purchasing directly from an insurance company, buying through licensed advisors or digital platforms like PolicyXpert, or enrolling in employer-provided group health plans."
    },
    {
      question: "What are the different types of health insurance?",
      answer: "Common types of health insurance include Individual Health Insurance (covers a single person), Family Floater Plans (one sum insured shared among family members), Senior Citizen Plans (designed for people aged 60 and above), and Critical Illness Plans (pays a lump sum on diagnosis of specific illnesses)."
    },
    {
      question: "How much does health insurance cost?",
      answer: "The cost of health insurance depends on factors such as the age of the insured, sum insured and policy coverage, medical history, and the type of plan and add-ons selected."
    },
    {
      question: "What does health insurance cover?",
      answer: "Health insurance typically covers hospitalization expenses, pre- and post-hospitalization costs, day-care procedures, surgeries and ICU charges, and ambulance expenses."
    }
  ];

  return (
    <>
      <section className="health-hero">
        <img src={plusIcon} alt="" className="health-plus" />
        <img src={chatIcon} alt="" className="health-chat" />
        <span className="health-bg-circle"></span>

        <h1 className="health-title">
          Comparisons are <span>Outdated</span> Get a Clear
          <br />
          Personalized Report
        </h1>

        <div className="health-form">
          <div className="health-field">
            <label>Who would you like to cover?</label>
            <div className="member-group">
              {["Myself", "Family", "Parents"].map((option) => (
                <button
                  key={option}
                  type="button"
                  className={`member-btn ${selectedMember === option ? "active" : ""}`}
                  onClick={() => {
                    setSelectedMember(option);
                    setError("");
                  }}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>

          <div className="health-field">
            <label>What's your Pincode?</label>
            <input
              type="text"
              placeholder="Enter your pincode"
              value={pincode}
              maxLength={6}
              onChange={(e) => {
                setPincode(e.target.value.replace(/\D/g, ""));
                setError("");
              }}
            />
          </div>

          <div className="health-field">
            <label>&nbsp;</label> 
            <button className="health-btn" onClick={handleSubmit}>
              Get Started
            </button>
          </div>

          {error && <span className="health-error">{error}</span>}
        </div>
      </section>

      <section className="faq">
        <div className="faq-container">
          <h2 className="faq-title">Frequently Asked Questions</h2>

          <div className="faq-list">
            {faqs.map((item, index) => (
              <div
                key={index}
                className={`faq-item ${activeIndex === index ? "active" : ""}`}
                onClick={() => toggleFaq(index)}
              >
                <div className="faq-question">
                  <h4>{item.question}</h4>
                  <img src={arrowIcon} alt="Toggle" />
                </div>

                {activeIndex === index && (
                  <p className="faq-answer">{item.answer}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

export default Health;