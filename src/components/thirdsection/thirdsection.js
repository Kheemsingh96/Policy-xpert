import React from "react";
import "./thirdsection.css";

import CallIcon from "../../assets/images/call.png";
import ChatIcon from "../../assets/images/whatsapp.png";

const cards = [
  {
    title: "Schedule Call With Expert",
    desc: "Insurance policies and complex clauses can be confusing. That’s why we recommend scheduling a free call with a qualified expert at a time that suits your schedule.",
  },
  {
    title: "Choose the Right Insurance Plan",
    desc: "With support from an expert, answer a few simple questions about you and your family. Based on your requirements and objectives, the expert suggests the most suitable plans along with their key terms and conditions.",
  },
  {
    title: "Review and Discuss Before Deciding",
    desc: "Take time to review the plan with your family and share your questions, concerns, and limitations with the expert during the follow-up call. Your advisor will clearly explain the details, remove complexity",
  },
  {
    title: "Purchase with Ongoing Support",
    desc: "After you purchase your plan, our assistance continues well beyond that point. Your dedicated advisor will support you for life—offering one-on-one guidance whenever you need help with a claim.",
  },
];

const ThirdSection = ({ openForm }) => {
  return (
    <section className="third-section">
      <div className="third-container">
        <h2 className="section-title">
          The Most Satisfying Way To Buy Insurance
        </h2>

        <div className="cards-grid">
          {cards.map((item, index) => (
            <div className="info-card card-blue" key={index}>
              <h3>{item.title}</h3>
              <p>{item.desc}</p>

              <div className="card-actions">
                {/* ONLY CHANGE HERE */}
                <button className="btn" onClick={openForm}>
                  <img src={CallIcon} alt="Call" />
                  Free call with Expert
                </button>

                {/* THIS REMAINS UNTOUCHED */}
                <button className="secondary-btn">
                  <img src={ChatIcon} alt="Chat" />
                  Chat with us
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ThirdSection;
