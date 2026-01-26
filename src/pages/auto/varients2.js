import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./varients2.css";

import arrowLeft from "../../assets/images/arrow-left.png"; 
import chevronRight from "../../assets/images/arrow2.png"; 

const carVariantsData = {
  "Mahindra": {
    "XUV 700": {
      "Petrol": ["MX Petrol MT", "AX3 Petrol MT", "AX5 Petrol MT", "AX5 Petrol AT", "AX7 Petrol MT", "AX7 Petrol AT", "AX7 Luxury Petrol MT", "AX7 Luxury Petrol AT"],
      "Diesel": ["MX Diesel MT", "AX3 Diesel MT", "AX5 Diesel MT", "AX5 Diesel AT", "AX7 Diesel MT", "AX7 Diesel AT", "AX7 AWD Diesel AT", "AX7 Luxury Diesel MT", "AX7 Luxury Diesel AT"]
    },
    "XEV 9e": {
      "Electric": ["Pack One", "Pack Two", "Pack Three"]
    },
    "XUV 400 EV": {
        "Electric": ["EC", "EL", "EL Pro"]
    },
    "Scorpio-N": {
      "Petrol": ["Z2 Petrol MT", "Z4 Petrol MT", "Z6 Petrol MT", "Z8 Petrol MT", "Z8 Petrol AT", "Z8 Luxury Petrol MT", "Z8 Luxury Petrol AT"],
      "Diesel": ["Z2 Diesel MT", "Z4 Diesel MT", "Z6 Diesel MT", "Z8 Diesel MT", "Z8 Diesel AT", "Z8 Luxury Diesel MT", "Z8 Luxury Diesel AT"]
    },
    "Thar": {
      "Petrol": ["AX Optional Petrol MT Hard Top", "LX Petrol MT Hard Top", "LX Petrol AT Hard Top", "LX Petrol MT Convertible Top"],
      "Diesel": ["AX Optional Diesel MT Hard Top", "LX Diesel MT Hard Top", "LX Diesel AT Hard Top", "LX Diesel MT Convertible Top"]
    },
    "XUV 3XO": {
      "Petrol": ["MX1", "MX2", "MX3", "AX5", "AX7", "AX7 L"],
      "Diesel": ["MX2 Diesel", "MX3 Diesel", "AX5 Diesel", "AX7 Diesel"]
    },
    "Bolero": {
      "Diesel": ["B4", "B6", "B6(O)"]
    },
    "Bolero Neo": {
      "Diesel": ["N4", "N8", "N10", "N10(O)"]
    },
    "Marazzo": {
      "Diesel": ["M2", "M4+", "M6+"]
    },
    "XUV 300": {
      "Petrol": ["W2", "W4", "W6", "W8", "W8(O)"],
      "Diesel": ["W4", "W6", "W8", "W8(O)"]
    },
    "Scorpio Classic": {
      "Diesel": ["S", "S11"]
    },
    "Thar ROXX": {
      "Petrol": ["MX1", "MX3", "AX3L", "AX5L", "AX7L"],
      "Diesel": ["MX1", "MX3", "AX3L", "AX5L", "AX7L"]
    }
  },

  "Maruti Suzuki": {
    "Swift": {
      "Petrol": ["LXi", "VXi", "VXi AMT", "ZXi", "ZXi AMT", "ZXi Plus"],
      "CNG": ["VXi CNG", "ZXi CNG"]
    },
    "Baleno": {
      "Petrol": ["Sigma", "Delta", "Delta AMT", "Zeta", "Zeta AMT", "Alpha", "Alpha AMT"],
      "CNG": ["Delta CNG", "Zeta CNG"]
    },
    "Brezza": {
      "Petrol": ["LXi", "VXi", "VXi AT", "ZXi", "ZXi AT", "ZXi Plus"],
      "CNG": ["LXi CNG", "VXi CNG", "ZXi CNG"]
    },
    "Dzire": {
      "Petrol": ["LXi", "VXi", "ZXi", "ZXi+"],
      "CNG": ["VXi CNG", "ZXi CNG"]
    },
    "Ertiga": {
      "Petrol": ["LXi", "VXi", "ZXi", "ZXi+"],
      "CNG": ["VXi CNG", "ZXi CNG"]
    },
    "Fronx": {
      "Petrol": ["Sigma", "Delta", "Delta+", "Zeta", "Alpha"],
      "CNG": ["Sigma CNG", "Delta CNG"]
    },
    "Grand Vitara": {
      "Petrol": ["Sigma", "Delta", "Zeta", "Alpha"],
      "CNG": ["Delta CNG", "Zeta CNG"]
    },
    "Jimny": {
      "Petrol": ["Zeta", "Alpha"]
    },
    "WagonR": {
      "Petrol": ["LXi", "VXi", "ZXi", "ZXi+"],
      "CNG": ["LXi CNG", "VXi CNG"]
    },
    "Alto K10": {
      "Petrol": ["Std", "LXi", "VXi", "VXi+"],
      "CNG": ["VXi CNG"]
    }
  },

  "Tata Motors": {
    "Nexon": {
      "Petrol": ["Smart Petrol MT", "Smart Plus Petrol MT", "Pure Petrol MT", "Pure S Petrol MT", "Creative Petrol MT", "Creative Plus Petrol MT", "Fearless Petrol MT", "Fearless Plus Petrol MT"],
      "Diesel": ["Pure Diesel MT", "Pure S Diesel MT", "Creative Diesel MT", "Creative Plus Diesel MT", "Fearless Diesel MT", "Fearless Plus Diesel MT"],
      "CNG": ["Pure CNG", "Creative CNG", "Fearless CNG"]
    },
    "Punch": {
      "Petrol": ["Pure Petrol MT", "Adventure Petrol MT", "Adventure Rhythm Petrol MT", "Accomplished Petrol MT", "Accomplished Dazzle Petrol MT", "Creative Petrol MT"],
      "CNG": ["Pure CNG", "Adventure CNG", "Accomplished CNG"]
    },
    "Punch EV": {
        "Electric": ["Smart", "Smart+", "Adventure", "Empowered", "Empowered+"]
    },
    "Nexon EV": {
        "Electric": ["Creative", "Fearless", "Empowered"]
    },
    "Tiago EV": {
        "Electric": ["XE", "XT", "XZ+", "XZ+ Tech Lux"]
    },
    "Harrier": {
      "Diesel": ["Smart", "Pure", "Adventure", "Fearless"]
    },
    "Safari": {
      "Diesel": ["Smart", "Pure", "Adventure", "Accomplished"]
    },
    "Tiago": {
      "Petrol": ["XE", "XM", "XT", "XZ+"],
      "CNG": ["XE CNG", "XM CNG", "XT CNG"]
    },
    "Altroz": {
      "Petrol": ["XE", "XM", "XT", "XZ"],
      "Diesel": ["XM", "XT", "XZ"],
      "CNG": ["XE CNG", "XM+ CNG", "XZ CNG"]
    },
    "Curvv": {
       "Petrol": ["Smart", "Pure", "Creative", "Accomplished"],
       "Diesel": ["Smart", "Pure", "Creative", "Accomplished"],
       "Electric": ["Creative", "Accomplished", "Empowered"]
    }
  },
  
  "MG Motor": {
      "Comet EV": {
          "Electric": ["Pace", "Play", "Plush"]
      },
      "ZS EV": {
          "Electric": ["Excite", "Exclusive", "Exclusive Pro"]
      },
      "Hector": {
        "Petrol": ["Style", "Shine", "Smart", "Sharp Pro"],
        "Diesel": ["Shine", "Smart", "Sharp Pro"]
      }
  }
};

function Varients2() {
  const navigate = useNavigate();
  const location = useLocation();
  
  const brandName = location.state?.brandName || "Car";
  const modelName = location.state?.modelName || "Model"; 
  const initialFuel = location.state?.fuelType || "Petrol";
  
  const [selectedFuel, setSelectedFuel] = useState(initialFuel);
  const [availableFuels, setAvailableFuels] = useState(["Petrol", "Diesel"]);
  const [variantList, setVariantList] = useState([]);

  const steps = [
    { id: 1, label: "Car Details" },
    { id: 2, label: "02 Personal details" },
    { id: 3, label: "03 Done" },
  ];

  const progressPercent = 32; 

  useEffect(() => {
    let matchedBrandKey = Object.keys(carVariantsData).find(
        key => key.toLowerCase() === brandName.toLowerCase()
    );

    if (!matchedBrandKey) {
        if (brandName.toLowerCase().includes("mahindra")) {
            matchedBrandKey = "Mahindra";
        }
    }

    const brandData = matchedBrandKey ? carVariantsData[matchedBrandKey] : null;
    let modelData = null;
    
    if (brandData) {
        const matchedModelKey = Object.keys(brandData).find(
            key => key.toLowerCase().replace(/\s/g, '') === modelName.toLowerCase().replace(/\s/g, '')
        );
        
        if (matchedModelKey) {
            modelData = brandData[matchedModelKey];
        } else {
            const key = Object.keys(brandData).find(k => 
                modelName.toLowerCase().includes(k.toLowerCase()) || 
                k.toLowerCase().includes(modelName.toLowerCase())
            );
            if (key) modelData = brandData[key];
        }
    }

    if (modelData) {
      const fuels = Object.keys(modelData);
      setAvailableFuels(fuels);
      
      if (modelData[selectedFuel]) {
          setVariantList(modelData[selectedFuel]);
      } else {
          if (fuels.length > 0) {
            setSelectedFuel(fuels[0]);
            setVariantList(modelData[fuels[0]]);
          }
      }
      
    } else {
      if (selectedFuel === "Electric") {
        setAvailableFuels(["Electric"]);
        setVariantList(["Base Model EV", "Mid Model EV", "Top Model EV"]);
      } else if (selectedFuel === "CNG") {
        setAvailableFuels(["Petrol", "CNG"]);
        setVariantList(["Base Model CNG", "Mid Model CNG", "Top Model CNG"]);
      } else {
        setAvailableFuels(["Petrol", "Diesel", "CNG"]);
        setVariantList([
          "Base Model", 
          "Mid Model", 
          "Top Model", 
          "Top Model (O)"
        ]);
      }
    }
  }, [brandName, modelName, selectedFuel]);

  const handleFuelChange = (fuel) => {
    setSelectedFuel(fuel);
  };

  const handleVariantClick = (variant) => {
    const currentYear = new Date().getFullYear();

    navigate("/auto/step-4", { 
      state: { 
        ...location.state, 
        brandName, 
        modelName, 
        fuelType: selectedFuel, 
        variantName: variant,
        registrationYear: currentYear 
      } 
    });
  };

  const handlePrevious = () => {
    navigate(-1);
  };

  return (
    <section className="varients2-step">
      <div className="varients2-progress-wrapper">
        <div className="varients2-progress-steps">
          {steps.map((s) => (
            <span key={s.id} className={s.id === 1 ? "active" : ""}>
              {s.label}
            </span>
          ))}
        </div>
        <div className="varients2-progress-bar">
          <div className="varients2-progress-fill" style={{ width: `${progressPercent}%` }}></div>
        </div>
      </div>

      <div className="varients2-step-box">
        <div className="varients2-header">
          <h2 className="varients2-title">
            Which <span className="highlight-model">{modelName}</span> variant do you drive?
          </h2>
        </div>

        <div className="fuel-toggle-container">
          {availableFuels.map((fuel) => (
            <button
              key={fuel}
              className={`fuel-toggle-btn ${selectedFuel === fuel ? "active" : ""}`}
              onClick={() => handleFuelChange(fuel)}
            >
              {fuel}
            </button>
          ))}
        </div>

        <div className="varients2-list-wrapper">
          {variantList.length > 0 ? (
            variantList.map((variant, index) => (
              <div 
                key={index} 
                className="varients2-item"
                onClick={() => handleVariantClick(variant)}
              >
                <span className="variant-name">{variant}</span>
                <img src={chevronRight} alt=">" className="chevron-icon" />
              </div>
            ))
          ) : (
            <p className="no-data-text">No variants found</p>
          )}
        </div>

        <div className="varients2-footer">
          <button className="varients2-prev-btn" onClick={handlePrevious}>
            <img src={arrowLeft} alt="prev" className="prev-icon" /> Previous
          </button>
        </div>
      </div>
    </section>
  );
}

export default Varients2;