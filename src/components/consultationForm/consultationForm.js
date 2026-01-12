import React, { useState, useEffect } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import "./consultationForm.css";

import checkRed from "../../assets/images/tick2.png";
import star from "../../assets/images/star-group.png";
import users from "../../assets/images/expert2.png";
import reviewAvatar from "../../assets/images/review.png";
import phoneWhite from "../../assets/images/call.png";
import lightning from "../../assets/images/light.png";
import shield from "../../assets/images/shild.png";

import expertImg1 from "../../assets/images/1.png";
import expertImg2 from "../../assets/images/2.png";
import expertImg3 from "../../assets/images/24px.png";
import expertImg4 from "../../assets/images/review.png";

const TEMP_EMAIL_DOMAINS = [
  "tempmail",
  "10minutemail",
  "mailinator",
  "guerrillamail",
  "yopmail"
];

function ConsultationForm({ onClose }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");

  const [currentReviewIndex, setCurrentReviewIndex] = useState(0);

  const reviews = [
    {
      name: "Jordan Smith",
      image: expertImg1,
      text: "Our expert movers delivered excellent service. Their experience and professionalism stood out."
    },
    {
      name: "Amit Sharma",
      image: expertImg2,
      text: "Policy Xpert helped me choose the best plan. Clear, unbiased guidance."
    },
    {
      name: "Priya Kapoor",
      image: expertImg3,
      text: "The expert explained everything patiently. No pressure at all."
    },
    {
      name: "Rahul Verma",
      image: expertImg4,
      text: "30-minute consultation was a game changer. Genuine advice."
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentReviewIndex((prev) =>
        prev === reviews.length - 1 ? 0 : prev + 1
      );
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  const isTempEmail = (email) =>
    TEMP_EMAIL_DOMAINS.some((domain) => email.includes(domain));

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name.trim()) {
      setError("Enter your full name");
      return;
    }

    if (
      !email ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ||
      isTempEmail(email)
    ) {
      setError("Enter a valid email address");
      return;
    }

    if (!phone || phone.length < 10) {
      setError("Enter a valid mobile number");
      return;
    }

    setError("");
    alert("Form Submitted Successfully");
    onClose();
  };

  return (
    <div className="consult-overlay">
      <div className="consult-box">
        <button className="close-btn" onClick={onClose}>×</button>

        <div className="consult-left">
          <h3 className="left-heading">
            Verified Insurance Specialists support you with…
          </h3>

          <ul className="feature-list">
            {[
              "30-minute expert consultation session.",
              "Plan shortlisting using neutral comparison tools",
              "One-on-one guidance from buying to claim support, always."
            ].map((text, i) => (
              <li key={i}>
                <img src={checkRed} alt="" className="check-icon" />
                <span>{text}</span>
              </li>
            ))}
          </ul>

          <div className="social-proof-container">
            <div className="review-box">
              <div className="review-top-row">
                <img src={reviewAvatar} alt="" className="single-avatar" />
                <img src={star} alt="" className="stars-image" />
              </div>
              <p className="review-text">25k+ Customer Review</p>
            </div>

            <div className="expert-group-box">
              <img src={users} alt="" className="group-image" />
              <span className="expert-text">20+ Expert Support</span>
            </div>
          </div>

          <div className="expert-card">
            <div key={currentReviewIndex} className="review-content-animate">
              <img
                src={reviews[currentReviewIndex].image}
                alt=""
                className="card-avatar"
              />
              <h4>{reviews[currentReviewIndex].name}</h4>
              <img src={star} alt="" className="stars-image-small" />
              <p className="card-review">
                {reviews[currentReviewIndex].text}
              </p>
            </div>
          </div>
        </div>

        <div className="consult-right">
          <h2>Get 1:1 Advice from Leading Insurance Experts.</h2>
          <p className="sub-heading">
            Clear, unbiased guidance—no spam, no sales pressure.
          </p>

          <form className="main-form" onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Full Name"
              className="form-input"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                setError("");
              }}
            />

            <input
              type="email"
              placeholder="Email Address"
              className="form-input"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setError("");
              }}
            />

            <div className="phone-input-wrapper">
              <PhoneInput
                country={"in"}
                value={phone}
                onChange={(val) => {
                  setPhone(val);
                  setError("");
                }}
                enableSearch
                placeholder="Mobile Number"
                inputClass="custom-phone-input"
                buttonClass="custom-flag-dropdown"
              />
            </div>

            <button type="submit" className="submit-btn">
              <img src={phoneWhite} alt="" className="btn-icon" />
              Free Call with Expert
            </button>

            {error && <span className="form-error">{error}</span>}
          </form>

          <div className="form-meta">
            <div className="meta-item">
              <img src={lightning} alt="" className="meta-icon" />
              <span>Completed in under 30 seconds</span>
            </div>
            <div className="meta-item">
              <img src={shield} alt="" className="meta-icon" />
              <span>No spam. No sales pressure.</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ConsultationForm;
