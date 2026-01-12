import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./life.css";

import plusIcon from "../../assets/images/plus.png";
import chatIcon from "../../assets/images/life4.png";

function Life() {
  const navigate = useNavigate();

  const [gender, setGender] = useState("");
  const [age, setAge] = useState("");
  const [pincode, setPincode] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = () => {
    if (!gender) {
      setError("Select gender");
      return;
    }

    if (!age) {
      setError("Select age");
      return;
    }

    if (!/^\d{6}$/.test(pincode)) {
      setError("Enter valid pincode");
      return;
    }

    setError("");
    navigate("/life/step-2", {
      state: {
        gender: gender,
        pincode: pincode,
      },
    });
  };

  return (
    <section className="life-hero">
      <img src={plusIcon} alt="" className="life-plus" />
      <img src={chatIcon} alt="" className="life-chat" />
      <span className="life-bg-circle"></span>

      <h1 className="life-title">
        Comparisons are <span>Outdated</span> Get a Clear
        <br />
        Personalized Report
      </h1>

      <div className="life-form">
        <div className="life-field">
          <label>Select your Gender</label>
          <div className="gender-group">
            <button
              type="button"
              className={`gender-btn ${gender === "male" ? "active" : ""}`}
              onClick={() => {
                setGender("male");
                setError("");
              }}
            >
              ♂ Male
            </button>

            <button
              type="button"
              className={`gender-btn ${gender === "female" ? "active" : ""}`}
              onClick={() => {
                setGender("female");
                setError("");
              }}
            >
              ♀ Female
            </button>
          </div>
        </div>

        <div className="life-field">
          <label>What's your Age?</label>
          <select
            value={age}
            onChange={(e) => {
              setAge(e.target.value);
              setError("");
            }}
          >
            <option value="">Select age</option>
            {Array.from({ length: 53 }, (_, i) => (
              <option key={i} value={i + 18}>
                {i + 18}
              </option>
            ))}
          </select>
        </div>

        <div className="life-field">
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

        <div className="life-field">
          <label>&nbsp;</label>
          <button className="life-btn" onClick={handleSubmit}>
            Get Started
          </button>
        </div>

        {error && <span className="life-error">{error}</span>}
      </div>
    </section>
  );
}

export default Life;
