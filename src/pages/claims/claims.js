import React, { useState } from 'react';
import './claims.css';

const iconCall = "https://cdn-icons-png.flaticon.com/512/724/724664.png";
const iconWhatsapp = "https://cdn-icons-png.flaticon.com/512/3670/3670051.png";
const iconEmail = "https://cdn-icons-png.flaticon.com/512/732/732200.png";

const Claims = () => {
  const [activeTab, setActiveTab] = useState('health');

  const [formData, setFormData] = useState({
    policyNo: '',
    name: '',
    mobile: '',
    issue: ''
  });

  const handleTabClick = (tab) => setActiveTab(tab);

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Your claim request has been received. Our claims expert will contact you shortly to guide you further.");
  }

  const documents = {
    health: [
      "Duly filled and signed Health Insurance Claim Form",
      "Doctor’s prescription along with hospital discharge summary",
      "Original hospital bills, payment receipts, and break-up details",
      "Diagnostic reports such as X-Ray, MRI, CT Scan, or lab reports",
      "Pharmacy bills supported by doctor’s prescription",
      "Valid KYC documents of the insured (Aadhaar / PAN)"
    ],
    car: [
      "Car Insurance claim form duly signed by the insured",
      "Copy of RC and valid driving license of the driver",
      "Original repair invoice issued by the garage",
      "Final payment receipt after vehicle repair",
      "FIR copy in case of theft or third-party involvement",
      "Clear photographs of the damaged vehicle from multiple angles"
    ],
    life: [
      "Original Life Insurance policy document or policy bond",
      "Death certificate issued by competent authority",
      "Claimant’s photograph and complete KYC documents",
      "Cancelled cheque or bank details for claim payout",
      "Medical cause of death certificate from attending doctor",
      "Post-mortem report if applicable as per insurer requirements"
    ]
  };

  return (
    <div className="cp-wrapper">
      
      <section className="cp-hero">
        <div className="cp-container">
          <div className="cp-hero-text">
            <h1>Claims Assistance & Support Center</h1>
            <p>Facing a claim situation can be overwhelming. At PolicyXpert, we simplify the entire claim process and stand by you at every step to ensure clarity, transparency, and faster resolution.</p>
          </div>
        </div>
      </section>

      <section className="cp-emergency-wrapper">
        <div className="cp-container">
          <div className="cp-emergency-grid">
            <a href="tel:1800123456" className="cp-emergency-card">
              <div className="cp-icon-circle">
                <img src={iconCall} alt="Call" />
              </div>
              <div className="cp-card-info">
                <span>Free Call with Expert</span>
                <strong>8080854433</strong>
              </div>
            </a>
            
            <a href="https://wa.me/8080854433" className="cp-emergency-card">
              <div className="cp-icon-circle">
                <img src={iconWhatsapp} alt="WhatsApp" />
              </div>
              <div className="cp-card-info">
                <span>Instant WhatsApp Support</span>
                <strong>Chat with a Claims Expert</strong>
              </div>
            </a>

            <a href="mailto:policyxpert@inivesh.com" className="cp-emergency-card">
              <div className="cp-icon-circle">
                <img src={iconEmail} alt="Email" />
              </div>
              <div className="cp-card-info">
                <span>Email Our Claims Team</span>
                <strong>policyxpert@inivesh.com</strong>
              </div>
            </a>
          </div>
        </div>
      </section>

      <section className="cp-main-content">
        <div className="cp-container cp-split-layout">
          
          <div className="cp-left-panel">
            <div className="cp-section-header">
              <h2>How Does the Claim Process Work?</h2>
              <p>Follow these simple and clearly defined steps to ensure a smooth and stress-free claim settlement experience.</p>
            </div>

            <div className="cp-steps-modern">
              <div className="cp-step-card">
                <div className="cp-step-badge">01</div>
                <h3>Claim Intimation</h3>
                <p>Notify us immediately after the incident through call, WhatsApp, or by submitting the form. Early intimation helps avoid unnecessary delays.</p>
              </div>
              
              <div className="cp-step-card">
                <div className="cp-step-badge">02</div>
                <h3>Document Review & Guidance</h3>
                <p>Our dedicated claims advisor will guide you on the exact documents required and assist you throughout the verification process.</p>
              </div>

              <div className="cp-step-card">
                <div className="cp-step-badge">03</div>
                <h3>Claim Settlement</h3>
                <p>Once all documents are verified and approved, the claim amount is directly settled with the hospital or credited to your bank account.</p>
              </div>
            </div>
          </div>

          <div className="cp-right-panel">
            <div className="cp-form-box">
              <div className="cp-form-head">
                <h3>Initiate Your Claim Request</h3>
                <p>Share your details and our claims expert will call you back within 10 minutes</p>
              </div>
              
              <form onSubmit={handleSubmit}>
                <div className="cp-input-row">
                  <div className="cp-input-group">
                    <label>Policy Number</label>
                    <input type="text" name="policyNo" placeholder="Enter your policy number" onChange={handleChange} required />
                  </div>
                </div>

                <div className="cp-input-row">
                  <div className="cp-input-group">
                    <label>Insured Person’s Name</label>
                    <input type="text" name="name" placeholder="Name as mentioned on policy" onChange={handleChange} required />
                  </div>
                </div>

                <div className="cp-input-row">
                  <div className="cp-input-group">
                    <label>Registered Mobile Number</label>
                    <input type="tel" name="mobile" placeholder="Mobile number linked with policy" onChange={handleChange} required />
                  </div>
                </div>

                <div className="cp-input-row">
                  <div className="cp-input-group">
                    <label>Select Claim Type</label>
                    <select name="issue" onChange={handleChange}>
                      <option value="Health">Health Insurance Claim</option>
                      <option value="Car">Car / Bike Insurance Claim</option>
                      <option value="Life">Life Insurance Claim</option>
                    </select>
                  </div>
                </div>

                <button type="submit" className="cp-submit-btn">
                  Request Callback
                </button>
              </form>
            </div>
          </div>

        </div>
      </section>

      <section className="cp-docs-section">
        <div className="cp-container">
          <div className="cp-docs-header">
            <h2>Documents Required for Claim Processing</h2>
            <p>Please select your policy type below to view the complete checklist of documents needed.</p>
          </div>

          <div className="cp-tab-container">
            <button className={`cp-tab ${activeTab === 'health' ? 'active' : ''}`} onClick={() => handleTabClick('health')}>Health Insurance</button>
            <button className={`cp-tab ${activeTab === 'car' ? 'active' : ''}`} onClick={() => handleTabClick('car')}>Motor Insurance</button>
            <button className={`cp-tab ${activeTab === 'life' ? 'active' : ''}`} onClick={() => handleTabClick('life')}>Life Insurance</button>
          </div>

          <div className="cp-checklist-box">
            <div className="cp-checklist-grid">
              {documents[activeTab].map((doc, index) => (
                <div key={index} className="cp-check-item">
                  <div className="cp-check-icon">✓</div>
                  <span>{doc}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Claims;
