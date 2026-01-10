import React, { useState } from "react";
import "./faq.css";

import ArrowIcon from "../../assets/images/arrow.png";
import WhatsappIcon from "../../assets/images/whatsapp.png";

const faqs = [
  {
    question: "What is Policy Xpert?",
    answer:
      "Policy Xpert is an online insurance comparison platform that helps users understand, compare, and choose the right insurance policies based on their needs. It allows you to compare health, life, auto, and travel insurance plans in one place to make informed decisions.",
  },
  {
    question: "What types of insurance policies are available on Policy Xpert?",
    answer:
      "Policy Xpert offers a wide range of insurance options, including Health Insurance, Life Insurance, Auto Insurance, and Travel Insurance. Each category includes multiple plans from trusted insurers with detailed coverage information.",
  },
  {
    question: "How does Policy Xpert help me choose the right policy?",
    answer:
      "Policy Xpert simplifies decision-making by allowing you to compare policies based on coverage, benefits, premiums, and exclusions. Expert guidance is also available to help you select a policy that best fits your budget and needs.",
  },
  {
    question: "Is my personal information safe on Policy Xpert?",
    answer:
      "Yes. Policy Xpert follows strict security practices to protect your personal and financial information. Your data is used only for policy comparison and recommendation purposes and is never shared without consent.",
  },
  {
    question: "Do I need to purchase a policy immediately after comparing plans?",
    answer:
      "No. You are free to explore and compare plans at your own pace. Policy Xpert is designed to help you make a confident decision without any pressure to purchase immediately.",
  },
];

const Faq = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFaq = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
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
                <img src={ArrowIcon} alt="Toggle" />
              </div>

              {activeIndex === index && (
                <p className="faq-answer">{item.answer}</p>
              )}
            </div>
          ))}
        </div>

        <div className="faq-cta">
          <p>Have Questions or Need Help Making the Right Choice?</p>
          <button className="faq-whatsapp">
            <img src={WhatsappIcon} alt="WhatsApp" />
            Chat with us
          </button>
        </div>
      </div>
    </section>
  );
};

export default Faq;
