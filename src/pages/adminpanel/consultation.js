import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Sidebar from "./sidebar";
import "./consultation.css";
import { FiSearch, FiBell, FiX } from "react-icons/fi";
import adminImg from "../../assets/images/admin.png"; 

function Consultation() {
  const navigate = useNavigate();
  
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [data, setData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [activeTab, setActiveTab] = useState("Leads");

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
        (item.email_address && item.email_address.toLowerCase().includes(lower)) ||
        (item.phone_number && item.phone_number.includes(lower))
      );
      setFilteredData(filtered);
    }
  }, [searchQuery, data]);

  const fetchData = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/get-consultations");
      const sorted = res.data.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
      setData(sorted);
      setFilteredData(sorted);
    } catch (error) {
      console.error(error);
    }
  };

  const handleLogout = () => navigate("/admin");

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });
  };

  const formatTime = (dateString) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" });
  };

  const handleExport = () => {
    const headers = ["ID,Full Name,Email Address,Phone Number,Date,Time,Status"];
    const rows = filteredData.map(item => 
      `${item.id},"${item.full_name}","${item.email_address}","${item.phone_number}",${formatDate(item.created_at)},${formatTime(item.created_at)},New`
    );
    
    const csvContent = "data:text/csv;charset=utf-8," + [headers, ...rows].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "consultation_leads.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="consultation-layout">
      <Sidebar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        navigate={navigate} 
        handleLogout={handleLogout} 
      />

      <main className="content-area">
        <header className="top-bar">
          <div className="welcome-msg">
            <h1>Consultation Leads</h1>
            <p>Manage all consultation requests here.</p>
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
                        <div className="notif-icon consultation"></div>
                        <div className="notif-content">
                          <p><strong>{lead.full_name}</strong> requested a consultation.</p>
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

        <section className="table-card">
          <div className="table-responsive">
            <table>
              <thead>
                <tr>
                  <th style={{textAlign: "left"}}>ID</th>
                  <th style={{textAlign: "left"}}>Full Name</th>
                  <th style={{textAlign: "left"}}>Email Address</th>
                  <th style={{textAlign: "left"}}>Phone Number</th>
                  <th style={{textAlign: "left"}}>Date</th>
                  <th style={{textAlign: "left"}}>Time</th>
                  <th style={{textAlign: "left"}}>Status</th>
                </tr>
              </thead>
              <tbody>
                {filteredData.length > 0 ? (
                  filteredData.map((item, index) => (
                    <tr key={index}>
                      <td style={{textAlign: "left"}}>#{item.id}</td>
                      <td style={{textAlign: "left"}}>{item.full_name}</td>
                      <td style={{textAlign: "left"}}>{item.email_address}</td>
                      <td style={{textAlign: "left"}}>{item.phone_number}</td>
                      <td style={{textAlign: "left"}}>{formatDate(item.created_at)}</td>
                      <td style={{textAlign: "left"}}>{formatTime(item.created_at)}</td>
                      <td style={{textAlign: "left"}}>
                        <span className="badge consultation">New</span>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7" style={{textAlign: "center", padding: "30px"}}>No Data Found</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <div className="pagination">
              <span>Showing {filteredData.length > 0 ? `1-${Math.min(10, filteredData.length)}` : "0"} of {filteredData.length} items</span>
              <div className="page-controls">
                <span>&lt; Previous</span>
                <span className="page-num active">1</span>
                <span>Next &gt;</span>
              </div>
          </div>
        </section>

      </main>
    </div>
  );
}

export default Consultation;