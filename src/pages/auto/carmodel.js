import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./carmodel.css";

import searchIcon from "../../assets/images/search.png";
import arrowLeft from "../../assets/images/arrow-left.png"; 
import chevronRight from "../../assets/images/arrow2.png"; 

const carModelsData = {
  // Key matches Varient.js now
  "Mahindra": ["XUV 3XO", "XUV 700", "Scorpio-N", "XEV 9e", "Thar Roxx", "Bolero Neo", "XUV 400 EV", "Thar", "Bolero", "Marazzo", "XUV 300", "Scorpio Classic", "KUV100", "Alturas G4", "TUV300"],

  "Maruti Suzuki": ["Swift", "Dzire", "Brezza", "Fronx", "Grand Vitara", "Jimny", "Invicto", "Ertiga", "Baleno", "WagonR", "Alto K10", "S-Presso", "Celerio", "Eeco", "XL6", "Ciaz", "Ignis", "Ritz", "Esteem", "Gypsy"],

  "Tata Motors": ["Curvv", "Punch EV", "Harrier Facelift", "Safari Facelift", "Nexon Facelift", "Tiago EV", "Altroz Racer", "Punch", "Nexon", "Harrier", "Safari", "Tiago", "Altroz", "Tigor", "Zest", "Bolt", "Hexa", "Indica", "Nano"],

  "Hyundai": ["Creta Facelift", "Verna", "Venue", "Exter", "Alcazar", "i20", "Aura", "Grand i10 Nios", "Tucson", "Kona EV", "Elantra", "Santro", "Xcent", "Eon", "Getz"],

  "Toyota": ["Innova Hycross", "Urban Cruiser Taisor", "Hyryder", "Fortuner", "Innova Crysta", "Glanza", "Hilux", "Camry", "Vellfire", "Yaris", "Corolla Altis", "Etios", "Qualis"],

  "Kia": ["Sonet Facelift", "Seltos Facelift", "Carens", "EV6", "Carnival", "Telluride", "Stinger"],

  "Honda": ["Elevate", "City", "Amaze", "City Hybrid", "WR-V", "Jazz", "Brio", "CR-V", "Civic", "Accord"],

  "Skoda": ["Kylaq", "Slavia", "Kushaq", "Superb", "Kodiaq", "Octavia", "Rapid", "Yeti"],

  "Volkswagen": ["Virtus", "Taigun", "Tiguan", "Vento", "Polo", "Passat", "Jetta"],

  "Renault": ["Kiger", "Triber", "Kwid", "Duster", "Captur", "Fluence", "Scala", "Lodgy"],

  "Nissan": ["X-Trail", "Magnite", "Kicks", "Terrano", "Micra", "Sunny", "Evalia"],

  "MG Motor": ["Comet EV", "Hector Plus", "Hector", "Astor", "ZS EV", "Gloster"],

  "BMW": ["iX", "XM", "X7", "X5", "X3", "X1", "5 Series", "3 Series", "7 Series", "Z4", "M4", "M5"],

  "Mercedes-Benz": ["EQS", "EQE", "GLS", "GLE", "GLC", "GLA", "C-Class", "E-Class", "S-Class", "A-Class", "B-Class", "CLA"],

  "Audi": ["Q8 e-tron", "Q7", "Q5", "Q3", "A6", "A4", "A8L", "RS5", "TT", "R8"],

  "Jeep": ["Avenger", "Compass", "Meridian", "Wrangler", "Grand Cherokee"],

  "Ford": ["Endeavour", "EcoSport", "Figo", "Aspire", "Freestyle", "Fiesta"],

  "Lamborghini": ["Revuelto", "Urus Performante", "Urus", "Huracan EVO", "Aventador"],

  "Ferrari": ["Purosangue", "296 GTB", "Roma", "SF90 Stradale", "Portofino"],

  "Tesla": ["Model Y", "Model 3", "Model X", "Model S"],

  "Citroën": ["Basalt", "C3 Aircross", "C3", "eC3", "C5 Aircross"],

  "Lexus": ["LM", "RX", "NX", "ES", "LS", "LX"],

  "Volvo": ["EX30", "XC40 Recharge", "XC60", "XC90", "S60", "S90"],

  "Jaguar Land Rover": ["Range Rover SV", "Range Rover", "Range Rover Sport", "Defender", "Discovery", "Velar", "Evoque", "F-Pace", "XE", "XF"],

  "Porsche": ["Macan EV", "Cayenne", "Macan", "Taycan", "911", "Panamera", "718 Cayman", "718 Boxster"]
};


function CarModel() {
  const navigate = useNavigate();
  const location = useLocation();
  
  const brandName = location.state?.brandName || "Car"; 
  const progressPercent = 16; 

  const [searchTerm, setSearchTerm] = useState("");

  const steps = [
    { id: 1, label: "Car Details" },
    { id: 2, label: "02 Personal details" },
    { id: 3, label: "03 Done" },
  ];

  // Smart Matching Logic
  // 1. Exact Match
  let matchedKey = Object.keys(carModelsData).find(k => k.toLowerCase() === brandName.toLowerCase());
  
  // 2. Fallback: Contains Check (e.g. "Mahindra & Mahindra" vs "Mahindra")
  if (!matchedKey) {
      matchedKey = Object.keys(carModelsData).find(k => brandName.toLowerCase().includes(k.toLowerCase()) || k.toLowerCase().includes(brandName.toLowerCase()));
  }

  const modelsList = matchedKey ? carModelsData[matchedKey] : (carModelsData[brandName] || ["Model A", "Model B", "Model C"]);

  const filteredModels = modelsList.filter((model) =>
    model.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleModelClick = (model) => {
    // Pass standardized Brand Name to next steps
    navigate("/auto/step-3", { 
        state: { 
            brandName: matchedKey || brandName, // Use the matched key if found (e.g. "Mahindra")
            modelName: model 
        } 
    });
  };

  const handlePrevious = () => {
    navigate(-1);
  };

  return (
    <section className="carmodel-step">
      <div className="carmodel-progress-wrapper">
        <div className="carmodel-progress-steps">
          {steps.map((s) => (
            <span key={s.id} className={s.id === 1 ? "active" : ""}>
              {s.label}
            </span>
          ))}
        </div>
        <div className="carmodel-progress-bar">
          <div
            className="carmodel-progress-fill"
            style={{ width: `${progressPercent}%` }}
          ></div>
        </div>
      </div>

      <div className="carmodel-step-box">
        <div className="carmodel-header">
          <h2 className="carmodel-title">
            Which model of <span className="highlight-brand">{brandName}</span>?
          </h2>
        </div>

        <div className="carmodel-search-box">
          <img src={searchIcon} alt="Search" className="search-icon-img" />
          <input
            type="text"
            placeholder="Search your car's Model"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="carmodel-list-wrapper">
          {filteredModels.length > 0 ? (
            filteredModels.map((model, index) => (
              <div
                key={index}
                className="carmodel-item"
                onClick={() => handleModelClick(model)}
              >
                <span className="model-name">{model}</span>
                <img src={chevronRight} alt=">" className="chevron-icon" />
              </div>
            ))
          ) : (
            <p className="no-data-text">No models found</p>
          )}
        </div>

        <div className="carmodel-footer">
          <button className="carmodel-prev-btn" onClick={handlePrevious}>
            <img src={arrowLeft} alt="prev" className="prev-icon" /> Previous
          </button>
        </div>
      </div>
    </section>
  );
}

export default CarModel;