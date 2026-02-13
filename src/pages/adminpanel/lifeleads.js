import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Sidebar from "./sidebar";
import "./lifeleads.css";

import { 
  FiSearch, FiBell, FiX, FiEye 
} from "react-icons/fi";

import adminImg from "../../assets/images/admin.png"; 

function LifeLeads() {
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
        (item.full_name && item.full_name.toLowerCase().includes(lower)) ||
        (item.email && item.email.toLowerCase().includes(lower)) ||
        (item.mobile && item.mobile.includes(lower))
      );
      setFilteredData(filtered);
      setCurrentPage(1);
    }
  }, [searchQuery, data]);

  const fetchData = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/get-life");
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
    const headers = ["ID,Name,Mobile,Email,Gender,Age,Education,Status,Date,Time"];
    const rows = filteredData.map(item => 
      `${item.id},"${item.full_name}","${item.mobile}","${item.email}","${item.gender}","${item.age}","${item.education}",New,${formatDate(item.created_at)},${formatTime(item.created_at)}`
    );
    
    const csvContent = "data:text/csv;charset=utf-8," + [headers, ...rows].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "life_insurance_leads.csv");
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
    const report = parseReportData(lead.report_data);
    
    const fullName = report.firstName 
      ? `${report.firstName} ${report.lastName || ''}`.trim() 
      : lead.full_name;

    const Row = ({ label, value }) => (
      <div className="admin-life-row">
        <div className="admin-life-label">{label}</div>
        <div className="admin-life-value">{value || "N/A"}</div>
      </div>
    );

    return (
      <div className="admin-life-wrapper">
        <h2 className="admin-report-title">Summary of details</h2>
        <p className="admin-report-subtitle">Report for: {fullName}</p>

        <div className="admin-life-card">
          
          <div className="admin-life-section">
            <div className="admin-section-header">
              <div className="admin-life-section-title">1. Basic</div>
            </div>
            <div className="admin-section-items">
              <Row label="Name" value={fullName} />
              <Row label="Mobile Number" value={report.mobile || lead.mobile} />
              <Row label="Email Address" value={report.email || lead.email} />
              <Row label="Date Of Birth" value={report.dob || lead.age} />
              <Row label="Gender" value={report.gender || lead.gender} />
              <Row label="Highest Education" value={report.education || lead.education} />
              <Row label="Use tobacco" value={report.tobacco || "No"} />
              <Row label="Do you drink alcohol?" value={report.alcohol || "No"} />
            </div>
          </div>

          <div className="admin-life-section">
            <div className="admin-section-header">
              <div className="admin-life-section-title">2. Income</div>
            </div>
            <div className="admin-section-items">
              <Row label="Total income" value={report.totalIncome} />
              <Row label="10–15 years income stability" value={report.stability} />
              <Row label="Retirement age from work" value={report.retirementAge} />
            </div>
          </div>

          <div className="admin-life-section">
            <div className="admin-section-header">
              <div className="admin-life-section-title">3. Dependants</div>
            </div>
            <div className="admin-section-items">
              <Row label="Dependant family members" value={report.hasDependants || "No"} />
              <Row label="Nominee reaction to 2 Cr" value={report.nomineeResponse} />
            </div>
          </div>

          <div className="admin-life-section">
            <div className="admin-section-header">
              <div className="admin-life-section-title">4. Assets & Liabilities</div>
            </div>
            <div className="admin-section-items">
              <Row label="Major loans" value={report.hasLoans || "No"} />
              <Row label="Significant expenses" value={report.hasExpenses || "None"} />
              <Row label="Existing life cover" value={report.hasLifeCover || "None"} />
            </div>
          </div>

        </div>
      </div>
    );
  };

  return (
    <div className="life-layout">
      <Sidebar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        navigate={navigate} 
        handleLogout={handleLogout} 
      />

      <main className="content-area">
        <header className="top-bar">
          <div className="welcome-msg">
            <h1>Life Insurance Leads</h1>
            <p>Manage all life insurance requests here.</p>
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
                        <div className="notif-icon life"></div>
                        <div className="notif-content">
                          <p><strong>{lead.full_name}</strong> requested life info.</p>
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
                  <th style={{textAlign: "left"}}>Name</th>
                  <th style={{textAlign: "left"}}>Mobile</th>
                  <th style={{textAlign: "left"}}>Email</th>
                  <th style={{textAlign: "left"}}>Gender</th>
                  <th style={{textAlign: "left"}}>Age</th>
                  <th style={{textAlign: "left"}}>Education</th>
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
                      <td style={{textAlign: "left"}}>{item.full_name}</td>
                      <td style={{textAlign: "left"}}>{item.mobile}</td>
                      <td style={{textAlign: "left"}}>{item.email}</td>
                      <td style={{textAlign: "left"}}>{item.gender}</td>
                      <td style={{textAlign: "left"}}>{item.age}</td>
                      <td style={{textAlign: "left"}}>{item.education}</td>
                      <td style={{textAlign: "left"}}><span className="badge life">New</span></td>
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
                    <td colSpan="10" style={{textAlign: "center", padding: "30px"}}>No Data Found</td>
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

export default LifeLeads;