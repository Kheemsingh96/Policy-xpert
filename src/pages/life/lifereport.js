import { useLocation, useNavigate } from "react-router-dom";
import "./lifereport.css";

function LifeReport({ openForm }) {
  const location = useLocation();
  const navigate = useNavigate();
  
  const userData = location.state || {};
  console.log("Final Summary Data:", userData);

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
        <p className="report-subtitle">Please confirm if all the details shown below are correct.</p>

        <div className="report-card">
          
          {/* --- SECTION 1: BASIC --- */}
          <div className="report-section">
            <div className="section-header">
              <div className="lifereport-section-title">1. Basic</div>
              {/* Step 2: Name, DOB, Edu | Step 3: Tobacco | Step 4: Alcohol */}
              <button className="section-edit" onClick={() => navigate("/life/step-2", { state: userData })}>Edit</button>
            </div>
            <div className="section-items">
              <Row label="Name" value={`${userData.firstName || ""} ${userData.lastName || ""}`.trim() || "Please fill name"} />
              <Row label="Date Of Birth" value={userData.dob || "Please fill DOB"} />
              <Row label="Gender" value={userData.gender || "Please select"} />
              <Row label="Highest Education" value={userData.education || "Please select"} />
              <Row label="Use tobacco" value={userData.tobacco || "No"} />
              <Row label="Do you drink alcohol?" value={userData.alcohol || "No"} />
            </div>
          </div>

          {/* --- SECTION 2: INCOME --- */}
          <div className="report-section">
            <div className="section-header">
              <div className="lifereport-section-title">2. Income</div>
              {/* Step 5: Income Sources | Step 6: Stability | Step 7: Retirement */}
              <button className="section-edit" onClick={() => navigate("/life/step-5", { state: userData })}>Edit</button>
            </div>
            <div className="section-items">
              <Row label="Total income" value={userData.totalIncome || "Please fill"} />
              <Row label="10–15 years income stability" value={userData.stability || "Please fill"} />
              <Row label="Retirement age from work" value={userData.retirementAge || "Please fill"} />
            </div>
          </div>

          {/* --- SECTION 3: DEPENDANTS --- */}
          <div className="report-section">
            <div className="section-header">
              <div className="lifereport-section-title">3. Dependants</div>
              {/* Step 8: Dependants | Step 9: Nominee Reaction */}
              <button className="section-edit" onClick={() => navigate("/life/step-8", { state: userData })}>Edit</button>
            </div>
            <div className="section-items">
              <Row label="Dependant family members" value={userData.hasDependants || "No"} />
              <Row label="Nominee reaction to 2 Cr" value={userData.nomineeResponse || "Please fill"} />
            </div>
          </div>

          {/* --- SECTION 4: ASSETS & LIABILITIES --- */}
          <div className="report-section">
            <div className="section-header">
              <div className="lifereport-section-title">4. Assets & Liabilities</div>
              {/* Step 10: Loans | Step 11: Expenses | Step 12: Life Cover */}
              <button className="section-edit" onClick={() => navigate("/life/step-10", { state: userData })}>Edit</button>
            </div>
            <div className="section-items">
              <Row label="Major loans" value={userData.hasLoans || "No"} />
              <Row label="Significant expenses" value={userData.hasExpenses || "None"} />
              <Row label="Existing life cover" value={userData.hasLifeCover || "None"} />
            </div>
          </div>

          <div className="report-footer">
            <button type="button" className="generate-report-btn" onClick={handleGenerateClick}>
              Generate Report
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function Row({ label, value }) {
  return (
    <div className="report-row">
      <div className="row-label">{label}</div>
      <div className="row-value" style={{ textTransform: 'capitalize' }}>{value}</div>
    </div>
  );
}

export default LifeReport;