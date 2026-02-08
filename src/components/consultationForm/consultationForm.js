import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import PhoneInput from "react-phone-input-2";
import axios from "axios";
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
  const [countryData, setCountryData] = useState({ countryCode: "in", dialCode: "91" });
  const [errors, setErrors] = useState({});
  const [currentReviewIndex, setCurrentReviewIndex] = useState(0);
  const scrollYRef = useRef(0);
  const navigate = useNavigate();

  const reviews = [
    {
      name: "Jordan Smith",
      image: expertImg1,
      text: "PolicyExpert helped me choose the right insurance clearly. No pressure, honest advice, and quick support throughout the entire process."
    },
    {
      name: "Amit Sharma",
      image: expertImg2,
      text: "Very professional experience with PolicyExpert. Experts explained plans simply and helped me avoid unnecessary coverage and extra costs."
    },
    {
      name: "Priya Kapoor",
      image: expertImg3,
      text: "Trusted guidance from PolicyExpert made insurance decisions easy. Clear explanations, fast responses, and genuinely helpful experts who focused on my needs."
    },
    {
      name: "Rahul Verma",
      image: expertImg4,
      text: "PolicyExpert provided unbiased advice and compared plans properly. I felt confident choosing a policy that fits my family’s needs."
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentReviewIndex((prev) =>
        prev === reviews.length - 1 ? 0 : prev + 1
      );
    }, 4000);

    return () => clearInterval(interval);
  }, [reviews.length]);

  useEffect(() => {
    scrollYRef.current = window.scrollY || 0;
    document.body.style.position = "fixed";
    document.body.style.top = `-${scrollYRef.current}px`;
    document.body.style.left = "0";
    document.body.style.right = "0";
    document.body.style.width = "100%";
    document.body.style.overflow = "hidden";

    return () => {
      const stored = scrollYRef.current || 0;
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.left = "";
      document.body.style.right = "";
      document.body.style.width = "";
      document.body.style.overflow = "";
      window.scrollTo(0, stored);
    };
  }, []);

  const isTempEmail = (email) =>
    TEMP_EMAIL_DOMAINS.some((domain) => email.includes(domain));

  const validateForm = () => {
    let tempErrors = {};
    let isValid = true;

    const nameRegex = /^[a-zA-Z\s]+$/;
    if (!name.trim()) {
      tempErrors.name = "Full Name is required";
      isValid = false;
    } else if (name.trim().length < 3) {
      tempErrors.name = "Name must be at least 3 characters";
      isValid = false;
    } else if (!nameRegex.test(name)) {
      tempErrors.name = "Name should contain letters only";
      isValid = false;
    }

    if (!email) {
      tempErrors.email = "Email Address is required";
      isValid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      tempErrors.email = "Invalid email format";
      isValid = false;
    } else if (isTempEmail(email)) {
      tempErrors.email = "Temporary emails are not allowed";
      isValid = false;
    }

    const dialCodeLength = countryData.dialCode ? countryData.dialCode.length : 0;
    const actualPhoneNumberLength = phone.length - dialCodeLength;
    const actualPhoneNumber = phone.substring(dialCodeLength);

    if (!phone || actualPhoneNumberLength < 4) {
      tempErrors.phone = "Mobile Number is required";
      isValid = false;
    } else if (/^0+$/.test(actualPhoneNumber)) {
      tempErrors.phone = "Invalid mobile number";
      isValid = false;
    } else if (countryData.countryCode === 'in') {
      if (actualPhoneNumberLength !== 10 || ["0", "1", "2", "3", "4", "5"].includes(actualPhoneNumber[0])) {
        tempErrors.phone = "Enter a valid 10-digit Indian mobile number";
        isValid = false;
      }
    } else {
      if (actualPhoneNumberLength < 7 || actualPhoneNumberLength > 15) {
        tempErrors.phone = "Enter a valid mobile number for your country";
        isValid = false;
      }
    }

    setErrors(tempErrors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      try {
        const response = await axios.post("http://localhost:5000/api/save-consultation", {
          name: name,
          email: email,
          phone: phone
        });

        if (response.status === 200) {
          navigate("/thanks", { state: { fullName: name } });
          if (onClose) onClose();
        }
      } catch (error) {
        alert("Server error: data not Save");
      }
    }
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
          <h2>Dedicated Insurance Experts Helping You Make Smarter Decisions</h2>
          <p className="sub-heading">
            Certified experts help you compare the right plans with clear,
            honest guidance — no sales pressure, just protection that fits your needs.
          </p>

          <form className="main-form" onSubmit={handleSubmit}>
            
            <div className="input-block">
              <input
                type="text"
                placeholder="Full Name"
                className={`form-input ${errors.name ? "input-error" : ""}`}
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  if (errors.name) setErrors({ ...errors, name: "" });
                }}
              />
              {errors.name && <div className="error-message">{errors.name}</div>}
            </div>

            <div className="input-block">
              <input
                type="email"
                placeholder="Email Address"
                className={`form-input ${errors.email ? "input-error" : ""}`}
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (errors.email) setErrors({ ...errors, email: "" });
                }}
              />
              {errors.email && <div className="error-message">{errors.email}</div>}
            </div>

            <div className="input-block">
              <PhoneInput
                country={"in"}
                value={phone}
                onChange={(val, country) => {
                  setPhone(val);
                  setCountryData(country);
                  if (errors.phone) setErrors({ ...errors, phone: "" });
                }}
                enableSearch
                placeholder="Mobile Number"
                inputClass={`custom-phone-input ${errors.phone ? "input-error" : ""}`}
                buttonClass="custom-flag-dropdown"
                dropdownStyle={{ zIndex: 1001 }}
              />
              {errors.phone && <div className="error-message">{errors.phone}</div>}
            </div>

            <button type="submit" className="submit-btn">
              <img src={phoneWhite} alt="" className="btn-icon" />
              Free Call with Expert
            </button>
            
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