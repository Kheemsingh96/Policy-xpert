import React, { useState, useEffect } from "react";
import "./faq.css";

import ArrowIcon from "../../assets/images/arrow.png";
import WhatsappIcon from "../../assets/images/whatsapp.png";

const Faq = () => {
  const [faqs, setFaqs] = useState([]);
  const [activeIndex, setActiveIndex] = useState(null);

  useEffect(() => {
    fetch("http://localhost:5000/api/faqs")
      .then((res) => res.json())
      .then((data) => {
        // Filter active FAQs only (status === 1)
        const activeFaqs = data.filter((item) => item.status === 1);
        setFaqs(activeFaqs);
      })
      .catch((err) => console.error("Error fetching FAQs:", err));
  }, []);

  const toggleFaq = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const handleWhatsAppClick = () => {
    const phoneNumber = "918080854433";
    const message = "Hello Policy Xpert, I need help choosing a policy.";
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
      message
    )}`;

    window.open(whatsappUrl, "_blank");
  };

  return (
    <section className="faq">
      <div className="faq-container">
        <h2 className="faq-title">Frequently Asked Questions</h2>

        <div className="faq-list">
          {faqs.length > 0 ? (
            faqs.map((item, index) => (
              <div
                key={item.id}
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
            ))
          ) : (
            <p style={{ textAlign: "center", color: "#666", padding: "20px" }}>
              Loading FAQs...
            </p>
          )}
        </div>

        <div className="faq-cta">
          <p>Have Questions or Need Help Making the Right Choice?</p>
          <button className="faq-whatsapp" onClick={handleWhatsAppClick}>
            <img src={WhatsappIcon} alt="WhatsApp" />
            Chat with us
          </button>
        </div>
      </div>
    </section>
  );
};

export default Faq;