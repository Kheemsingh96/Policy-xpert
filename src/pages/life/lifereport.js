import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import "./lifereport.css";

function LifeReport({ openForm }) {
  const location = useLocation();
  const navigate = useNavigate();
  
  const userData = location.state || {};
  
  const handleGenerateClick = async () => {
    try {
      const response = await axios.post("http://localhost:5000/api/save-life", userData);
      
      if (response.status === 200) {
        navigate("/thanks", { state: { fullName: userData.firstName } });
      }
    } catch (error) {
      console.error(error);
      alert("Server Connection Error. Please ensure Node server is running on Port 5000.");
    }
  };

  return (
    <div className="life-report">
      <div className="life-report-wrapper">
        <h2 className="report-title">Summary of your details</h2>
        <p className="report-subtitle">Please confirm if all the details shown below are correct.</p>

        <div className="report-card">
          <div className="report-section">
            <div className="section-header">
              <div className="lifereport-section-title">1. Basic</div>
              <button className="section-edit" onClick={() => navigate("/life/step-2", { state: userData })}>Edit</button>
            </div>
            <div className="section-items">
              <Row label="Name" value={`${userData.firstName || ""} ${userData.lastName || ""}`.trim() || "Please fill name"} />
              <Row label="Mobile Number" value={userData.mobile || "Please fill"} />
              <Row label="Email Address" value={userData.email || "Please fill"} />
              <Row label="Date Of Birth" value={userData.dob || "Please fill DOB"} />
              <Row label="Gender" value={userData.gender || "Please select"} />
              <Row label="Highest Education" value={userData.education || "Please select"} />
              <Row label="Use tobacco" value={userData.tobacco || "No"} />
              <Row label="Do you drink alcohol?" value={userData.alcohol || "No"} />
            </div>
          </div>

        
          <div className="report-section">
            <div className="section-header">
              <div className="lifereport-section-title">2. Income</div>
              <button className="section-edit" onClick={() => navigate("/life/step-5", { state: userData })}>Edit</button>
            </div>
            <div className="section-items">
              <Row label="Total income" value={userData.totalIncome || "Please fill"} />
              <Row label="10–15 years income stability" value={userData.stability || "Please fill"} />
              <Row label="Retirement age from work" value={userData.retirementAge || "Please fill"} />
            </div>
          </div>

  
          <div className="report-section">
            <div className="section-header">
              <div className="lifereport-section-title">3. Dependants</div>
          
              <button className="section-edit" onClick={() => navigate("/life/step-8", { state: userData })}>Edit</button>
            </div>
            <div className="section-items">
              <Row label="Dependant family members" value={userData.hasDependants || "No"} />
              <Row label="Nominee reaction to 2 Cr" value={userData.nomineeResponse || "Please fill"} />
            </div>
          </div>

          
          <div className="report-section">
            <div className="section-header">
              <div className="lifereport-section-title">4. Assets & Liabilities</div>
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