import { useLocation, useNavigate } from "react-router-dom";
import "./lifereport.css";

function LifeReport({ openForm }) {
  const location = useLocation();
  const navigate = useNavigate();
  
  // Pichle saare steps ka data yahan hai
  const userData = location.state || {};

  // Consultation Form kholne ke liye function
  const handleGenerateClick = () => {
    if (openForm) {
      openForm();
    } else {
      alert("Error: App.js se openForm function nahi mil raha!");
    }
  };

  return (
    <div className="life-report">
      <div className="life-report-wrapper">
        <h2 className="report-title">Summary of your details</h2>
        <p className="report-subtitle">
          Please confirm if all the details shown below are correct.
        </p>

        <div className="report-card">
          
          {/* --- SECTION 1: BASIC --- */}
          <div className="report-section">
            <div className="section-header">
              <div className="lifereport-section-title">1. Basic</div>
              {/* Basic ke liye Step 2 khulega */}
              <button className="section-edit" onClick={() => navigate("/life/step-2", { state: userData })}>
                Edit
              </button>
            </div>
            <div className="section-items">
              <Row label="Name" value={`${userData.firstName || ""} ${userData.lastName || ""}`.trim() || "N/A"} />
              <Row label="Date Of Birth" value={userData.dob || "N/A"} />
              <Row label="Gender" value={userData.gender || "N/A"} />
              <Row label="Highest Education" value={userData.education || "N/A"} />
              <Row label="Use tobacco" value={userData.tobacco || "N/A"} />
              <Row label="Do you drink alcohol?" value={userData.alcohol || "N/A"} />
            </div>
          </div>

          {/* --- SECTION 2: INCOME --- */}
          <div className="report-section">
            <div className="section-header">
              <div className="lifereport-section-title">2. Income</div>
              {/* Income ke liye Step 4 khulega (Jaisa tumne bola) */}
              <button className="section-edit" onClick={() => navigate("/life/step-4", { state: userData })}>
                Edit
              </button>
            </div>
            <div className="section-items">
              <Row label="Total income" value={userData.totalIncome || "N/A"} />
              <Row label="10–15 years income stability" value={userData.incomeStability || "N/A"} />
              <Row label="Retirement age from work" value={userData.retirementAge || "N/A"} />
            </div>
          </div>

          {/* --- SECTION 3: DEPENDANTS --- */}
          <div className="report-section">
            <div className="section-header">
              <div className="lifereport-section-title">3. Dependants</div>
              {/* Dependants ke liye Step 7 khulega (Jaisa tumne bola) */}
              <button className="section-edit" onClick={() => navigate("/life/step-7", { state: userData })}>
                Edit
              </button>
            </div>
            <div className="section-items">
              <Row label="Dependant family members" value={userData.dependantsCount || "N/A"} />
              <Row label="Nominee details" value={userData.nomineeStatus || "N/A"} />
              <Row label="Retirement age" value={userData.retirementAge || "N/A"} />
            </div>
          </div>

          {/* --- SECTION 4: ASSETS & LIABILITIES --- */}
          <div className="report-section">
            <div className="section-header">
              <div className="lifereport-section-title">4. Assets & Liabilities</div>
              {/* Assets ke liye Step 10 khulega (Jaisa tumne bola) */}
              <button className="section-edit" onClick={() => navigate("/life/step-10", { state: userData })}>
                Edit
              </button>
            </div>
            <div className="section-items">
              <Row label="Major loans" value={userData.hasLoans || "N/A"} />
              <Row label="Significant expenses" value={userData.futureExpenses || "N/A"} />
              <Row label="Existing life cover" value={userData.lifeCover || "N/A"} />
            </div>
          </div>

          {/* --- GENERATE REPORT BUTTON --- */}
          <div className="report-footer">
            <button 
              type="button" 
              className="generate-report-btn" 
              onClick={handleGenerateClick}
            >
              Generate Report
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// Row component ko file ke niche hi rakha hai taaki asani ho
function Row({ label, value }) {
  return (
    <div className="report-row">
      <div className="row-label">{label}</div>
      <div className="row-value">{value}</div>
    </div>
  );
}

export default LifeReport;