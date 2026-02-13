import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Sidebar from "./sidebar";
import "./healthleads.css";

import { 
  FiSearch, FiBell, FiX, FiEye 
} from "react-icons/fi";

import adminImg from "../../assets/images/admin.png"; 

function HealthLeads() {
  const navigate = useNavigate();
  
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [data, setData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedLead, setSelectedLead] = useState(null); 
  const [activeTab, setActiveTab] = useState("Leads");
  const itemsPerPage = 10;

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (!searchQuery) {
      setFilteredData(data);
    } else {
      const lower = searchQuery.toLowerCase();
      const filtered = data.filter(item => 
        (item.member_name && item.member_name.toLowerCase().includes(lower)) ||
        (item.mobile && item.mobile.includes(lower)) ||
        (item.pincode && item.pincode.includes(lower))
      );
      setFilteredData(filtered);
      setCurrentPage(1);
    }
  }, [searchQuery, data]);

  const fetchData = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/get-health");
      const sorted = res.data.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
      setData(sorted);
      setFilteredData(sorted);
    } catch (error) {
      console.error(error);
    }
  };

  const handleLogout = () => navigate("/admin");

  const formatDate = (dateString) => {
    if (!dateString) return "-";
    const date = new Date(dateString);
    if(isNaN(date.getTime())) return dateString;
    return date.toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });
  };

  const formatTime = (dateString) => {
    if (!dateString) return "-";
    return new Date(dateString).toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" });
  };

  const formatHeightWeight = (member) => {
    if (!member.heightFeet && !member.weight) return "N/A";
    return `${member.heightFeet || 0}'${member.heightInches || 0}" | ${member.weight || 0}kg`;
  };

  const parseReportData = (input) => {
    try {
      if (!input) return {};
      if (typeof input === 'object') return input;
      let parsed = JSON.parse(input);
      if (typeof parsed === 'string') {
        try { parsed = JSON.parse(parsed); } catch (e) {}
      }
      return parsed;
    } catch (e) {
      return {};
    }
  };

  const handleExport = () => {
    const headers = ["ID,Member Name,Mobile,Pincode,DOB,Status,Date,Time"];
    const rows = filteredData.map(item => 
      `${item.id},"${item.member_name}","${item.mobile}","${item.pincode}","${item.dob || 'N/A'}",New,${formatDate(item.created_at)},${formatTime(item.created_at)}`
    );
    
    const csvContent = "data:text/csv;charset=utf-8," + [headers, ...rows].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "health_insurance_leads.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(prev => prev + 1);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(prev => prev - 1);
  };

  const renderReportContent = (lead) => {
    const rawReport = parseReportData(lead.report_data);
    
    let members = [];
    if (rawReport.memberDetails && Array.isArray(rawReport.memberDetails)) {
        members = rawReport.memberDetails;
    } else if (Array.isArray(rawReport)) {
        members = rawReport;
    }

    const existingPolicy = rawReport.existingPolicy || { hasPolicy: false };
    const policyDetails = rawReport.policyDetails || [];

    return (
      <div className="admin-report-container">
        <div className="admin-report-header-main">
          <h2>Review details</h2>
          <p>Lead: {lead.member_name}</p>
        </div>

        <div className="admin-report-section">
          <div className="admin-section-title-row">
            <h3>1. Personal Details</h3>
          </div>
          <div className="admin-report-table">
            <div className="admin-report-row header">
              <span className="admin-col-name">Name</span>
              <span className="admin-col-gender">Gender</span>
              <span className="admin-col-dob">Date of Birth</span>
            </div>
            {members.length > 0 ? (
              members.map((person, idx) => (
                <div key={idx} className="admin-report-row">
                  <span className="admin-col-name">{person.fullName || person.label || "N/A"}</span>
                  <span className="admin-col-gender">{person.gender || person.defaultGender || "N/A"}</span>
                  <span className="admin-col-dob">{formatDate(person.dob)}</span>
                </div>
              ))
            ) : (
              <div className="admin-report-row"><span>No personal details available</span></div>
            )}
          </div>
        </div>

        <div className="admin-report-section">
          <div className="admin-section-title-row">
            <h3>2. Lifestyle Details</h3>
          </div>
          <div className="admin-report-table">
            <div className="admin-report-row header">
              <span className="admin-col-name">Name</span>
              <span className="admin-col-fit">Fitness (Ht/Wt)</span>
              <span className="admin-col-alcohol">Consumes alcohol</span>
              <span className="admin-col-tobacco">Consumes tobacco</span>
            </div>
            {members.length > 0 ? (
              members.map((item, idx) => (
                <div key={idx} className="admin-report-row">
                  <span className="admin-col-name">{item.fullName || item.label || "N/A"}</span>
                  <span className="admin-col-fit">{formatHeightWeight(item)}</span>
                  <span className="admin-col-alcohol">
                    {item.consumesAlcohol ? `Yes (${item.alcoholFrequency || ''})` : "No"}
                  </span>
                  <span className="admin-col-tobacco">
                    {item.usesTobacco ? `Yes (${item.tobaccoFrequency || ''})` : "No"}
                  </span>
                </div>
              ))
            ) : (
              <div className="admin-report-row"><span>No lifestyle details</span></div>
            )}
          </div>
        </div>

        <div className="admin-report-section">
          <div className="admin-section-title-row">
            <h3>3. Medical/Health Details</h3>
          </div>
          <div className="admin-report-table">
            <div className="admin-report-row header">
              <span className="admin-col-name">Name</span>
              <span className="admin-col-medical">Medical history</span>
              <span className="admin-col-hospital">Hospitalized</span>
            </div>
            {members.length > 0 ? (
              members.map((item, idx) => {
                let medicalText = "No";
                if (item.hasAbnormalTests) {
                    medicalText = Array.isArray(item.abnormalDetails) ? item.abnormalDetails.join(", ") : (item.abnormalDetails || "Yes");
                }
                let hospText = "No";
                if (item.wasHospitalized) {
                    const details = Array.isArray(item.hospitalizationDetails) ? item.hospitalizationDetails.join(", ") : (item.hospitalizationDetails || "Yes");
                    hospText = `${details} (${item.hospitalizationYear || ''})`;
                }
                return (
                  <div key={idx} className="admin-report-row">
                    <span className="admin-col-name">{item.fullName || item.label || "N/A"}</span>
                    <span className="admin-col-medical">{medicalText}</span>
                    <span className="admin-col-hospital">{hospText}</span>
                  </div>
                );
              })
            ) : (
              <div className="admin-report-row"><span>No medical details</span></div>
            )}
          </div>
        </div>

        <div className="admin-report-section">
          <div className="admin-section-title-row">
            <h3>4. Existing Policy Details</h3>
          </div>
          {!existingPolicy.hasPolicy ? (
            <div className="admin-no-policy-msg">No existing health insurance policies declared.</div>
          ) : (
            <div className="admin-policy-list">
               {policyDetails.map((policy, index) => (
                 <div key={index} className="admin-policy-summary-card">
                    <div className="admin-policy-row">
                      <span className="p-label">ID</span>
                      <span className="p-value">Policy {index + 1}</span>
                    </div>
                    <div className="admin-policy-row">
                      <span className="p-label">Plan name</span>
                      <span className="p-value">{policy.planName === "Other" ? policy.otherPlanName : policy.planName}</span>
                    </div>
                    <div className="admin-policy-row">
                      <span className="p-label">Renewal Date</span>
                      <span className="p-value">{policy.renewalDate}</span>
                    </div>
                    <div className="admin-policy-row">
                      <span className="p-label">Cover amount</span>
                      <span className="p-value">{policy.coverAmount}</span>
                    </div>
                    <div className="admin-policy-row">
                      <span className="p-label">Type</span>
                      <span className="p-value">{policy.policyType}</span>
                    </div>
                    <div className="admin-policy-row">
                      <span className="p-label">Members</span>
                      <span className="p-value">{policy.membersCovered}</span>
                    </div>
                 </div>
               ))}
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="health-layout">
      <Sidebar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        navigate={navigate} 
        handleLogout={handleLogout} 
      />

      <main className="content-area">
        <header className="top-bar">
          <div className="welcome-msg">
            <h1>Health Insurance Leads</h1>
            <p>Manage all health insurance requests here.</p>
          </div>
          <div className="header-right">
            <div className="search-bar-wrapper">
              <FiSearch className="search-icon" />
              <input 
                type="text" 
                placeholder="Search name, mobile..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <div className="notif-box" onClick={() => setIsNotifOpen(!isNotifOpen)}>
              <FiBell className="h-icon" />
              <span className="dot"></span>
              {isNotifOpen && (
                <div className="notif-dropdown">
                  <div className="notif-header">
                    <span>Notifications</span>
                    <FiX onClick={(e) => { e.stopPropagation(); setIsNotifOpen(false); }} />
                  </div>
                  <div className="notif-list">
                    {data.slice(0, 5).map((lead, idx) => (
                      <div className="notif-item" key={idx}>
                        <div className="notif-icon health"></div>
                        <div className="notif-content">
                          <p><strong>{lead.member_name}</strong> requested health insurance.</p>
                          <span>{formatTime(lead.created_at)}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="profile-sec">
              <img src={adminImg} alt="Admin" className="admin-avatar" />
              <div className="p-info"><span>Pranay</span><small>Admin</small></div>
            </div>
          </div>
        </header>

        <div className="dashboard-title-row">
          <h2>All Requests ({filteredData.length})</h2>
          <div className="filter-group">
            <select className="date-select">
              <option>All Time</option>
              <option>Last 7 Days</option>
            </select>
            <button className="export-btn" onClick={handleExport}>Export CSV</button>
          </div>
        </div>

        <section className="table-section-card">
          <div className="table-responsive">
            <table>
              <thead>
                <tr>
                  <th style={{textAlign: "left"}}>ID</th>
                  <th style={{textAlign: "left"}}>Member Name</th>
                  <th style={{textAlign: "left"}}>Mobile</th>
                  <th style={{textAlign: "left"}}>Pincode</th>
                  <th style={{textAlign: "left"}}>DOB</th>
                  <th style={{textAlign: "left"}}>Status</th>
                  <th style={{textAlign: "left"}}>Date</th>
                  <th style={{textAlign: "left"}}>Action</th>
                </tr>
              </thead>
              <tbody>
                {currentItems.length > 0 ? (
                  currentItems.map((item, index) => (
                    <tr key={index}>
                      <td style={{textAlign: "left"}}>#{item.id}</td>
                      <td style={{textAlign: "left"}}>{item.member_name}</td>
                      <td style={{textAlign: "left"}}>{item.mobile}</td>
                      <td style={{textAlign: "left"}}>{item.pincode}</td>
                      <td style={{textAlign: "left"}}>{item.dob || "N/A"}</td>
                      <td style={{textAlign: "left"}}><span className="badge health">New</span></td>
                      <td style={{textAlign: "left"}}>{formatDate(item.created_at)}</td>
                      <td style={{textAlign: "left"}}>
                        <button className="view-btn" onClick={() => setSelectedLead(item)}>
                          <FiEye /> View Report
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="8" style={{textAlign: "center", padding: "30px"}}>No Data Found</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <div className="pagination">
              <span>Showing {filteredData.length > 0 ? `${indexOfFirstItem + 1}-${Math.min(indexOfLastItem, filteredData.length)}` : "0"} of {filteredData.length} items</span>
              <div className="page-controls">
                <span onClick={handlePrevPage} style={{cursor: "pointer", opacity: currentPage === 1 ? 0.5 : 1}}>&lt; Previous</span>
                <span className="page-num active">{currentPage}</span>
                <span onClick={handleNextPage} style={{cursor: "pointer", opacity: currentPage === totalPages ? 0.5 : 1}}>Next &gt;</span>
             </div>
          </div>
        </section>

        {selectedLead && (
          <div className="modal-overlay" onClick={() => setSelectedLead(null)}>
            <div className="modal-content large" onClick={(e) => e.stopPropagation()}>
              <div className="modal-header">
                <h3>Customer Report</h3>
                <FiX className="close-modal-icon" onClick={() => setSelectedLead(null)} />
              </div>
              <div className="modal-body bg-light">
                {renderReportContent(selectedLead)}
              </div>
            </div>
          </div>
        )}

      </main>
    </div>
  );
}

export default HealthLeads;