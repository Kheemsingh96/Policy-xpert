import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./carbrand.css";

import searchIcon from "../../assets/images/search.png";

// Logos
import marutiLogo from "../../assets/images/suzuki-logo.png";
import hyundaiLogo from "../../assets/images/hyundai-logo.png";
import tataLogo from "../../assets/images/tata-logo.png";
import mahindraLogo from "../../assets/images/mahindra-logo.png";
import toyotaLogo from "../../assets/images/toyota-logo.png";
import kiaLogo from "../../assets/images/kia-logo.png";
import hondaLogo from "../../assets/images/honda-logo.png";
import skodaLogo from "../../assets/images/skoda-logo.png";
import vwLogo from "../../assets/images/volkswagen-logo.png";
import renaultLogo from "../../assets/images/renault-logo.png";
import nissanLogo from "../../assets/images/nissan-logo.png";
import mgLogo from "../../assets/images/mg-logo.png";
import bmwLogo from "../../assets/images/bmw-logo.png";
import mercedesLogo from "../../assets/images/mercedes-benz-logo.png";
import audiLogo from "../../assets/images/audi-logo.png";
import volvoLogo from "../../assets/images/volvo-logo.png";
import landroverLogo from "../../assets/images/land-rover-logo.png";
import porscheLogo from "../../assets/images/porsche-logo.png";
import lexusLogo from "../../assets/images/lexus-logo.png";
import citroenLogo from "../../assets/images/citroen-logo.png";
import bydLogo from "../../assets/images/tesla-logo.png";
import jeepLogo from "../../assets/images/jeep-logo.png";
import fordLogo from "../../assets/images/ford-logo.png";
import lamborghiniLogo from "../../assets/images/lamborghini-logo.png";
import ferrariLogo from "../../assets/images/ferrari-logo.png";

const carBrandsList = [
  { id: 1, name: "Maruti Suzuki", logo: marutiLogo },
  { id: 2, name: "Hyundai", logo: hyundaiLogo },
  { id: 3, name: "Tata Motors", logo: tataLogo },
  { id: 4, name: "Mahindra", logo: mahindraLogo }, // Matches your other files now
  { id: 5, name: "Toyota", logo: toyotaLogo },
  { id: 6, name: "Kia", logo: kiaLogo },
  { id: 7, name: "Honda", logo: hondaLogo },
  { id: 8, name: "Skoda", logo: skodaLogo },
  { id: 9, name: "Volkswagen", logo: vwLogo },
  { id: 10, name: "Renault", logo: renaultLogo },
  { id: 11, name: "Nissan", logo: nissanLogo },
  { id: 12, name: "MG Motor", logo: mgLogo },
  { id: 13, name: "BMW", logo: bmwLogo },
  { id: 14, name: "Mercedes-Benz", logo: mercedesLogo },
  { id: 15, name: "Audi", logo: audiLogo },
  { id: 16, name: "Volvo", logo: volvoLogo },
  { id: 17, name: "Jaguar Land Rover", logo: landroverLogo },
  { id: 18, name: "Porsche", logo: porscheLogo },
  { id: 19, name: "Lexus", logo: lexusLogo },
  { id: 20, name: "Citroën", logo: citroenLogo },
  { id: 21, name: "Tesla", logo: bydLogo },
  { id: 22, name: "Jeep", logo: jeepLogo },
  { id: 23, name: "Ford", logo: fordLogo },
  { id: 24, name: "Lamborghini", logo: lamborghiniLogo },
  { id: 25, name: "Ferrari", logo: ferrariLogo }
];

function CarBrand() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");

  const steps = [
    { id: 1, label: "Car Details" },
    { id: 2, label: "02 Personal details" },
    { id: 3, label: "03 Done" },
  ];

  const progressPercent = 8;

  const filteredBrands = carBrandsList.filter((brand) =>
    brand.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleBrandClick = (brandName) => {
    // Passes the brand name to the next step
    navigate("/auto/step-2", { state: { brandName: brandName } });
  };

  return (
    <section className="carbrand-step">
      <div className="carbrand-progress-wrapper">
        <div className="carbrand-progress-steps">
          {steps.map((s) => (
            <span key={s.id} className={s.id === 1 ? "active" : ""}>
              {s.label}
            </span>
          ))}
        </div>
        <div className="carbrand-progress-bar">
          <div
            className="carbrand-progress-fill"
            style={{ width: `${progressPercent}%` }}
          ></div>
        </div>
      </div>

      <div className="carbrand-step-box">
        <div className="carbrand-header">
          <h2 className="carbrand-title">Tell us about your car</h2>
          <p className="carbrand-subtitle">Select your car's brand</p>
        </div>

        <div className="carbrand-search-box">
          <img src={searchIcon} alt="Search" className="search-icon-img" />
          <input
            type="text"
            placeholder="Search car brand name"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="carbrand-grid-scroll-wrapper">
          <div className="carbrand-grid">
            {filteredBrands.length > 0 ? (
              filteredBrands.map((brand) => (
                <div
                  key={brand.id}
                  className="carbrand-card"
                  onClick={() => handleBrandClick(brand.name)}
                >
                  <div className="carbrand-icon">
                    <img src={brand.logo} alt={brand.name} />
                  </div>
                  <span>{brand.name}</span>
                </div>
              ))
            ) : (
              <p style={{ width: "100%", textAlign: "center", color: "#94a3b8" }}>
                No brand found
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default CarBrand;