import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
import "./healthreport.css";
import arrowRight from "../../assets/images/arrow2.png";

function HealthReport({ openForm }) {
  const location = useLocation();
  const navigate = useNavigate();
  
  const data = location.state || {};
  const memberDetails = data.memberDetails || [];
  const policyDetails = data.policyDetails || [];
  const existingPolicy = data.existingPolicy || { hasPolicy: false, count: 0 };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [data]);

  const formatDate = (dateString) => {
    if (!dateString) return "-";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-GB");
  };

  const formatHeightWeight = (member) => {
    if (!member.heightFeet && !member.weight) return "N/A";
    return `${member.heightFeet || 0}'${member.heightInches || 0}" | ${member.weight || 0}kg`;
  };

  const handleEdit = (path) => {
    navigate(path, { state: data });
  };

  const handleSubmit = async () => {
    try {
      let finalName = "Unknown";
      let finalMobile = data.mobile || "Unknown";
      let finalPincode = data.pincode || "Unknown";
      let finalDob = "Unknown";

      if (memberDetails.length > 0) {
          const primary = memberDetails[0];
          finalName = primary.fullName || primary.label || "Unknown";
          finalDob = primary.dob || "Unknown";
          
          if (finalMobile === "Unknown" && primary.mobile) finalMobile = primary.mobile;
          if (finalPincode === "Unknown" && primary.pincode) finalPincode = primary.pincode;
      } else if (data.firstName) {
          finalName = `${data.firstName} ${data.lastName || ''}`.trim();
      }

      const payload = {
          ...data,
          firstName: finalName,
          mobile: finalMobile,
          pincode: finalPincode,
          dob: finalDob,
          memberDetails: memberDetails
      };

      const response = await axios.post("http://localhost:5000/api/save-health", payload);
      
      if (response.status === 200) {
        navigate("/thanks", { state: { fullName: finalName } });
      }
    } catch (error) {
      console.error(error);
      alert("Server Connection Error. Please ensure Node server is running on Port 5000.");
    }
  };

  return (
    <section className="health-report-section">
      <div className="health-report-container">
        <div className="health-report-header">
          <h2>Review and confirm your details</h2>
          <p>Please review the information below carefully. You won't be able to make changes after submission.</p>
        </div>

        <div className="health-report-card">
          
          <div className="report-section">
            <div className="section-title-row">
              <h3>1. Personal Details</h3>
              <button className="edit-btn" onClick={() => handleEdit("/health")}>Edit</button>
            </div>
            <div className="report-table">
              <div className="report-row header">
                <span className="col-name">Name</span>
                <span className="col-gender">Gender</span>
                <span className="col-dob">Date of Birth</span>
              </div>
              {memberDetails.map((member, index) => (
                <div key={index} className="report-row">
                  <span className="col-name">{member.fullName || member.label}</span>
                  <span className="col-gender">{member.gender || "Male"}</span>
                  <span className="col-dob">{formatDate(member.dob)}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="report-section">
            <div className="section-title-row">
              <h3>2. Lifestyle Details</h3>
              <button className="edit-btn" onClick={() => handleEdit("/health/step-5")}>Edit</button>
            </div>
            <div className="report-table">
              <div className="report-row header">
                <span className="col-name">Name</span>
                <span className="col-fit">Fitness (Ht/Wt)</span>
                <span className="col-alcohol">Consumes alcohol</span>
                <span className="col-tobacco">Consumes tobacco</span>
              </div>
              {memberDetails.map((member, index) => (
                <div key={index} className="report-row">
                  <span className="col-name">{member.fullName || member.label}</span>
                  <span className="col-fit">{formatHeightWeight(member)}</span>
                  <span className="col-alcohol">
                    {member.consumesAlcohol ? `Yes (${member.alcoholFrequency || ''})` : "No"}
                  </span>
                  <span className="col-tobacco">
                    {member.usesTobacco ? `Yes (${member.tobaccoFrequency || ''})` : "No"}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="report-section">
            <div className="section-title-row">
              <h3>3. Medical/Health Details</h3>
              <button className="edit-btn" onClick={() => handleEdit("/health/step-9")}>Edit</button>
            </div>
            <div className="report-table">
              <div className="report-row header">
                <span className="col-name">Name</span>
                <span className="col-medical">Medical history</span>
                <span className="col-hospital">Hospitalized</span>
              </div>
              {memberDetails.map((member, index) => (
                <div key={index} className="report-row">
                  <span className="col-name">{member.fullName || member.label}</span>
                  <span className="col-medical">
                    {member.hasAbnormalTests 
                      ? (Array.isArray(member.abnormalDetails) 
                          ? member.abnormalDetails.join(", ") 
                          : member.abnormalDetails) 
                      : "No"}
                  </span>
                  <span className="col-hospital">
                    {member.wasHospitalized 
                      ? `${Array.isArray(member.hospitalizationDetails) ? member.hospitalizationDetails.join(", ") : member.hospitalizationDetails} (${member.hospitalizationYear || ''})` 
                      : "No"}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="report-section">
            <div className="section-title-row">
              <h3>4. Existing Policy Details</h3>
              <button className="edit-btn" onClick={() => handleEdit("/health/step-13")}>Edit</button>
            </div>
            
            {!existingPolicy.hasPolicy ? (
              <div className="no-policy-msg">No existing health insurance policies declared.</div>
            ) : (
              <div className="policy-list">
                {policyDetails.map((policy, index) => (
                  <div key={index} className="policy-summary-card">
                    <div className="policy-row">
                      <span className="p-label">ID</span>
                      <span className="p-value">Policy {index + 1}</span>
                    </div>
                    <div className="policy-row">
                      <span className="p-label">Plan name</span>
                      <span className="p-value">{policy.planName === "Other" ? policy.otherPlanName : policy.planName}</span>
                    </div>
                    <div className="policy-row">
                      <span className="p-label">Policy Renewal Date</span>
                      <span className="p-value">{policy.renewalDate}</span>
                    </div>
                    <div className="policy-row">
                      <span className="p-label">Cover amount</span>
                      <span className="p-value">{policy.coverAmount}</span>
                    </div>
                    <div className="policy-row">
                      <span className="p-label">Type of Policy</span>
                      <span className="p-value">{policy.policyType}</span>
                    </div>
                    <div className="policy-row">
                      <span className="p-label">Members covered</span>
                      <span className="p-value">{policy.membersCovered}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="health-report-footer-inside">
            <button className="submit-btn" onClick={handleSubmit}>
              Confirm and genrate report <img src={arrowRight} alt="arrow" />
            </button>
          </div>

        </div>
      </div>
    </section>
  );
}

export default HealthReport;