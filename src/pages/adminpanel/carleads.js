import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./carleads.css";

import { 
  FiSearch, FiBell, FiChevronDown, FiChevronRight, FiX, FiLogOut 
} from "react-icons/fi";

import { 
  RiHome5Line, 
  RiUserFollowLine, 
  RiFileChartLine, 
  RiGroupLine 
} from "react-icons/ri";

import logoImg from "../../assets/images/logo.png"; 
import adminImg from "../../assets/images/admin.png"; 

function CarLeads() {
  const navigate = useNavigate();
  
  const [isLeadsOpen, setIsLeadsOpen] = useState(true);
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [data, setData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
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
        (item.mobile && item.mobile.includes(lower)) ||
        (item.registration_no && item.registration_no.toLowerCase().includes(lower)) ||
        (item.car_model && item.car_model.toLowerCase().includes(lower))
      );
      setFilteredData(filtered);
      setCurrentPage(1);
    }
  }, [searchQuery, data]);

  const fetchData = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/get-auto");
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
    const headers = ["ID,Owner Name,Mobile,Email,Reg No,Brand,Model,Variant,Pincode,GST No,Status,Date,Time"];
    const rows = filteredData.map(item => 
      `${item.id},"${item.full_name}","${item.mobile}","${item.email}","${item.registration_no || 'N/A'}","${item.car_brand}","${item.car_model}","${item.car_variant}","${item.pincode}","${item.gst_no || 'N/A'}",New,${formatDate(item.created_at)},${formatTime(item.created_at)}`
    );
    
    const csvContent = "data:text/csv;charset=utf-8," + [headers, ...rows].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "car_insurance_leads.csv");
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

  return (
    <div className="car-layout">
      <aside className="sidebar">
        <div className="logo-box">
          <img src={logoImg} alt="PolicyXpert" className="sidebar-logo" />
        </div>

        <nav className="menu">
          <div className="menu-item" onClick={() => navigate("/admin/dashboard")}>
            <RiHome5Line className="icon" /> Home
          </div>

          <div className="menu-item-group">
            <div 
              className="menu-item active" 
              onClick={() => setIsLeadsOpen(!isLeadsOpen)}
              style={{ justifyContent: "space-between", cursor: "pointer" }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <RiUserFollowLine className="icon" /> Leads
              </div>
              {isLeadsOpen ? <FiChevronDown /> : <FiChevronRight />}
            </div>

            {isLeadsOpen && (
              <div className="submenu">
                <div className="submenu-item" onClick={() => navigate("/admin/consultation")}>Consultation</div>
                <div className="submenu-item" onClick={() => navigate("/admin/life")}>Life Insurance</div>
                <div className="submenu-item" onClick={() => navigate("/admin/health")}>Health Insurance</div>
                <div className="submenu-item active-sub">Car Insurance</div>
              </div>
            )}
          </div>

          <div className="menu-item">
            <RiFileChartLine className="icon" /> Reports
          </div>
          <div className="menu-item">
            <RiGroupLine className="icon" /> Customer
          </div>
        </nav>

        <div className="logout-box" onClick={handleLogout}>
          <FiLogOut className="icon" /> Logout
        </div>
      </aside>

      <main className="content-area">
        <header className="top-bar">
          <div className="welcome-msg">
            <h1>Car Insurance Leads</h1>
            <p>Manage all car insurance requests here.</p>
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
                        <div className="notif-icon car"></div>
                        <div className="notif-content">
                          <p><strong>{lead.full_name}</strong> requested car insurance.</p>
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
                  <th style={{textAlign: "left"}}>Owner Name</th>
                  <th style={{textAlign: "left"}}>Mobile</th>
                  <th style={{textAlign: "left"}}>Email</th>
                  <th style={{textAlign: "left"}}>Reg No</th>
                  <th style={{textAlign: "left"}}>Brand</th>
                  <th style={{textAlign: "left"}}>Model</th>
                  <th style={{textAlign: "left"}}>Variant</th>
                  <th style={{textAlign: "left"}}>Pincode</th>
                  <th style={{textAlign: "left"}}>GST No</th>
                  <th style={{textAlign: "left"}}>Status</th>
                  <th style={{textAlign: "left"}}>Date</th>
                  <th style={{textAlign: "left"}}>Time</th>
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
                      <td style={{textAlign: "left"}}>{item.registration_no || "N/A"}</td>
                      <td style={{textAlign: "left"}}>{item.car_brand}</td>
                      <td style={{textAlign: "left"}}>{item.car_model}</td>
                      <td style={{textAlign: "left"}}>{item.car_variant}</td>
                      <td style={{textAlign: "left"}}>{item.pincode}</td>
                      <td style={{textAlign: "left"}}>{item.gst_no || "N/A"}</td>
                      <td style={{textAlign: "left"}}><span className="badge car">New</span></td>
                      <td style={{textAlign: "left"}}>{formatDate(item.created_at)}</td>
                      <td style={{textAlign: "left"}}>{formatTime(item.created_at)}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="13" style={{textAlign: "center", padding: "30px"}}>No Data Found</td>
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

      </main>
    </div>
  );
}

export default CarLeads;