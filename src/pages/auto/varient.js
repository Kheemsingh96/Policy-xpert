import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import "./varient.css";

import arrowRight from "../../assets/images/arrow2.png"; 
import arrowLeft from "../../assets/images/arrow-left.png"; 

const modelFuelData = {
  "XUV 3XO": ["Petrol", "Diesel"],
  "XUV 700": ["Petrol", "Diesel"],
  "Scorpio-N": ["Petrol", "Diesel"],
  "XEV 9e": ["Electric"],
  "Thar ROXX": ["Petrol", "Diesel"],
  "Bolero Neo": ["Diesel"],
  "XUV 400 EV": ["Electric"],
  "Thar": ["Petrol", "Diesel"],
  "Bolero": ["Diesel"],
  "Marazzo": ["Diesel"],
  "XUV 300": ["Petrol", "Diesel"],
  "Scorpio Classic": ["Diesel"],
  "KUV100": ["Petrol"],
  "Alturas G4": ["Diesel"],
  "TUV300": ["Diesel"]
};

function Varient() {
  const navigate = useNavigate();
  const location = useLocation();
  
  const prevData = location.state || {};
  const brandName = prevData.brandName || "Car";
  const modelName = prevData.modelName || "Model"; 
  
  const [selectedFuel, setSelectedFuel] = useState(null);
  const [fuelOptions, setFuelOptions] = useState([]);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const steps = [
    { id: 1, label: "Car Details" },
    { id: 2, label: "02 Personal details" },
    { id: 3, label: "03 Done" },
  ];

  const progressPercent = 24; 

  useEffect(() => {
    const name = modelName;
    const lowerName = name.toLowerCase();

    if (modelFuelData[name]) {
      setFuelOptions(modelFuelData[name]);
    } 
    else if (lowerName.includes("ev") || lowerName.includes("electric") || lowerName.includes("xev")) {
      setFuelOptions(["Electric"]);
    }
    else {
      setFuelOptions(["Petrol", "Diesel"]);
    }
  }, [modelName]);

  const handleFuelSelect = (fuel) => {
    setSelectedFuel(fuel);
    if (errors.fuel) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors.fuel;
        return newErrors;
      });
    }
  };

  const validate = () => {
    let newErrors = {};
    if (!selectedFuel) newErrors.fuel = "Please select an option to proceed.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = async () => {
    if (validate()) {
      setLoading(true);
      const currentYear = new Date().getFullYear();

      const nextState = { 
        ...prevData, 
        brandName, 
        modelName, 
        fuelType: selectedFuel,
        registrationYear: currentYear 
      };

      const payload = {
        regNo: prevData.regNumber || prevData.regNo || "NEW",
        mobile: prevData.mobile,
        carBrand: brandName,
        carModel: modelName,
        carVariant: selectedFuel + " (Fuel Selected)",
        fullName: "Unknown",
        email: "Unknown",
        pincode: "Unknown"
      };

      try {
        await axios.post("http://localhost:5000/api/save-auto", payload);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
        navigate("/auto/varients-list", { state: nextState });
      }
    }
  };

  const handlePrevious = () => {
    navigate(-1);
  };

  return (
    <section className="varient-step">
      <div className="varient-progress-wrapper">
        <div className="varient-progress-steps">
          {steps.map((s) => (
            <span key={s.id} className={s.id === 1 ? "active" : ""}>
              {s.label}
            </span>
          ))}
        </div>
        <div className="varient-progress-bar">
          <div
            className="varient-progress-fill"
            style={{ width: `${progressPercent}%` }}
          ></div>
        </div>
      </div>

      <div className="varient-step-box">
        <div className="varient-header">
          <h2 className="varient-title">
            Which <span className="highlight-model">{modelName}</span> variant do you drive?
          </h2>
        </div>

        <div className="varient-options-container">
          {fuelOptions.map((fuel) => (
            <div 
              key={fuel}
              className={`varient-option-card ${selectedFuel === fuel ? "selected" : ""}`}
              onClick={() => handleFuelSelect(fuel)}
            >
              <span className="fuel-text">{fuel}</span>
            </div>
          ))}
        </div>

        {errors.fuel && (
          <span className="varient-error-text">
            {errors.fuel}
          </span>
        )}

        <div className="varient-footer">
          <button className="varient-prev-btn" onClick={handlePrevious} disabled={loading}>
            <img src={arrowLeft} alt="prev" className="prev-icon" /> Previous
          </button>
          
          <button 
            className="varient-next-btn" 
            onClick={handleNext}
            disabled={loading}
          >
            {loading ? "Saving..." : "Next"} <img src={arrowRight} alt="next" style={{display: loading ? "none" : "inline"}} />
          </button>
        </div>
      </div>
    </section>
  );
}

export default Varient;