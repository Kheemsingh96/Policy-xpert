import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./admin.css";

import { 
  FiSearch, FiBell, FiChevronDown, FiChevronRight, FiX, FiLogOut 
} from "react-icons/fi";

import { 
  RiHome5Line, 
  RiUserFollowLine, 
  RiFileChartLine, 
  RiGroupLine, 
  RiStackLine, 
  RiHeartPulseLine, 
  RiShieldCrossLine, 
  RiRoadsterLine 
} from "react-icons/ri";

import logoImg from "../../assets/images/logo.png"; 
import adminImg from "../../assets/images/admin.png"; 

import {
  PieChart, Pie, Cell,
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from "recharts";

const PIE_COLORS = ["#10b981", "#3b82f6", "#ef4444"];

const processChartData = (leads) => {
  const daysMap = {};
  const today = new Date();
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  for (let i = 6; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(today.getDate() - i);
    const dateStr = d.toLocaleDateString("en-GB"); 
    const dayName = days[d.getDay()];
    const dateNum = d.getDate();
    
    daysMap[dateStr] = {
      name: `${dayName} ${dateNum}`,
      dateStr: dateStr,
      car: 0,
      life: 0,
      health: 0,
      total: 0
    };
  }

  leads.forEach(lead => {
    if (!lead.dateRaw) return;
    const leadDate = new Date(lead.dateRaw).toLocaleDateString("en-GB");
    if (daysMap[leadDate]) {
      daysMap[leadDate].total += 1;
      if (lead.type === 'Car') daysMap[leadDate].car += 1;
      if (lead.type === 'Life') daysMap[leadDate].life += 1;
      if (lead.type === 'Health') daysMap[leadDate].health += 1;
    }
  });

  return Object.values(daysMap);
};

const TinyLineChart = ({ data, dataKey, color }) => (
  <div className="tiny-chart-wrapper">
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={data}>
        <Line 
          type="monotone" 
          dataKey={dataKey} 
          stroke={color} 
          strokeWidth={3} 
          dot={false} 
          isAnimationActive={true} 
        />
      </LineChart>
    </ResponsiveContainer>
  </div>
);

const CustomXAxisTick = ({ x, y, payload }) => {
  const [day, date] = payload.value.split(" ");
  return (
    <g transform={`translate(${x},${y})`}>
      <text x={0} y={0} dy={15} textAnchor="middle" fill="#9ca3af" fontSize={12} fontWeight={500}>
        {day}
      </text>
      <text x={0} y={0} dy={32} textAnchor="middle" fill="#9ca3af" fontSize={12}>
        {date}
      </text>
    </g>
  );
};

const CustomYAxisTick = ({ x, y, payload }) => {
  return (
    <g transform={`translate(${x},${y})`}>
      <text x={-35} y={4} textAnchor="start" fill="#9ca3af" fontSize={12}>
        {payload.value}
      </text>
    </g>
  );
};

function Admin() {
  const navigate = useNavigate();
  
  const [activeTab, setActiveTab] = useState("Home");
  const [isLeadsOpen, setIsLeadsOpen] = useState(false);
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  
  const [allLeads, setAllLeads] = useState([]); 
  const [filteredLeads, setFilteredLeads] = useState([]); 
  const [graphData, setGraphData] = useState([]);
  
  const [searchQuery, setSearchQuery] = useState("");
  const [dateFilter, setDateFilter] = useState("Last 7 days");

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const [stats, setStats] = useState({
    total: 0, life: 0, health: 0, auto: 0, consult: 0,
    trends: {
        total: { val: "0.0%", dir: "up", msg: "from yesterday" },
        life: { val: "0.0%", dir: "up", msg: "from yesterday" },
        health: { val: "0.0%", dir: "up", msg: "from yesterday" },
        auto: { val: "0.0%", dir: "up", msg: "from yesterday" }
    }
  });

  const [pieData, setPieData] = useState([
    { name: "Health", value: 0 },
    { name: "Car", value: 0 },
    { name: "Life", value: 0 },
  ]);

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [searchQuery, dateFilter, allLeads]);

  const fetchData = async () => {
    try {
      const [autoRes, lifeRes, healthRes, consultRes] = await Promise.all([
        axios.get("http://localhost:5000/api/get-auto").catch(e => ({ data: [] })),
        axios.get("http://localhost:5000/api/get-life").catch(e => ({ data: [] })),
        axios.get("http://localhost:5000/api/get-health").catch(e => ({ data: [] })),
        axios.get("http://localhost:5000/api/get-consultations").catch(e => ({ data: [] }))
      ]);

      const formatLead = (list, type) => list.map(item => ({
        ...item, 
        type,
        id: item.id,
        full_name: item.full_name || item.member_name || item.name || "Unknown User",
        email: item.email || item.email_address || "N/A",
        mobile: item.mobile || item.phone_number || "N/A",
        dateRaw: item.created_at || new Date().toISOString()
      }));

      const combined = [
        ...formatLead(autoRes.data, "Car"),
        ...formatLead(lifeRes.data, "Life"),
        ...formatLead(healthRes.data, "Health"),
        ...formatLead(consultRes.data, "Consultation")
      ].sort((a, b) => new Date(b.dateRaw) - new Date(a.dateRaw));

      setAllLeads(combined);
      setFilteredLeads(combined);
      setGraphData(processChartData(combined));

    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const applyFilters = () => {
    let result = [...allLeads];

    if (searchQuery) {
      const lowerQuery = searchQuery.toLowerCase();
      result = result.filter(lead => 
        (lead.full_name && lead.full_name.toLowerCase().includes(lowerQuery)) ||
        (lead.mobile && lead.mobile.includes(lowerQuery)) ||
        (lead.type && lead.type.toLowerCase().includes(lowerQuery))
      );
    }

    const now = new Date();
    if (dateFilter !== "All Time") {
      result = result.filter(lead => {
        const leadDate = new Date(lead.dateRaw);
        const diffTime = Math.abs(now - leadDate);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        if (dateFilter === "Last 7 days") return diffDays <= 7;
        if (dateFilter === "Last 30 days") return diffDays <= 30;
        if (dateFilter === "Last 6 months") return diffDays <= 180;
        if (dateFilter === "This Year") return leadDate.getFullYear() === now.getFullYear();
        return true;
      });
    }

    setFilteredLeads(result);
    setCurrentPage(1); 
    calculateStats(result);
    
    if (dateFilter === "Last 7 days" || dateFilter === "All Time") {
        setGraphData(processChartData(result));
    }
  };

  const calculateStats = (data) => {
    const lifeCount = data.filter(l => l.type === "Life").length;
    const healthCount = data.filter(l => l.type === "Health").length;
    const carCount = data.filter(l => l.type === "Car").length;
    const consultCount = data.filter(l => l.type === "Consultation").length;

    const getTrend = (subset) => {
        const today = new Date();
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        
        const isSameDay = (d1, d2) => 
            d1.getDate() === d2.getDate() && 
            d1.getMonth() === d2.getMonth() && 
            d1.getFullYear() === d2.getFullYear();

        const todayCount = subset.filter(i => isSameDay(new Date(i.dateRaw), today)).length;
        const yesterdayCount = subset.filter(i => isSameDay(new Date(i.dateRaw), yesterday)).length;

        if (yesterdayCount === 0) {
            return { 
                val: todayCount > 0 ? "100%" : "0.0%", 
                dir: todayCount > 0 ? "up" : "neutral", 
                msg: "from yesterday" 
            };
        }
        
        const diff = ((todayCount - yesterdayCount) / yesterdayCount) * 100;
        return {
            val: Math.abs(diff).toFixed(1) + "%",
            dir: diff >= 0 ? "up" : "down",
            msg: diff >= 0 ? "Up from yesterday" : "Down from yesterday"
        };
    };

    setStats({
      total: data.length,
      life: lifeCount,
      health: healthCount,
      auto: carCount,
      consult: consultCount,
      trends: {
          total: getTrend(data),
          life: getTrend(data.filter(l => l.type === "Life")),
          health: getTrend(data.filter(l => l.type === "Health")),
          auto: getTrend(data.filter(l => l.type === "Car"))
      }
    });

    setPieData([
      { name: "Health", value: healthCount },
      { name: "Car", value: carCount },
      { name: "Life", value: lifeCount },
    ]);
  };

  const handleLogout = () => navigate("/admin");

  const toggleLeadsMenu = () => {
    setIsLeadsOpen(!isLeadsOpen);
  };

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });
  };

  const formatTime = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" });
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredLeads.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredLeads.length / itemsPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(prev => prev + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(prev => prev - 1);
    }
  };

  const getTrendColor = (dir) => dir === 'up' ? "#10b981" : "#ef4444";

  return (
    <div className="admin-layout">
      <aside className="sidebar">
        <div className="logo-box">
          <img src={logoImg} alt="PolicyXpert" className="sidebar-logo" />
        </div>

        <nav className="menu">
          <div className={`menu-item ${activeTab === "Home" ? "active" : ""}`} onClick={() => setActiveTab("Home")}>
            <RiHome5Line className="icon" /> Home
          </div>

          <div className="menu-item-group">
            <div 
              className={`menu-item ${activeTab !== "Home" && (isLeadsOpen || activeTab.includes("Insurance") || activeTab === "Consultation") ? "active" : ""}`} 
              onClick={toggleLeadsMenu}
              style={{ justifyContent: "space-between", cursor: "pointer" }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <RiUserFollowLine className="icon" /> Leads
              </div>
              {isLeadsOpen ? <FiChevronDown /> : <FiChevronRight />}
            </div>

            {isLeadsOpen && (
              <div className="submenu" style={{ paddingLeft: "40px", display: "flex", flexDirection: "column", gap: "10px", marginTop: "5px" }}>
                <div className="submenu-item" onClick={() => navigate("/admin/consultation")} style={{ cursor: "pointer", fontSize: "0.9rem", color: "#666" }}>Consultation</div>
                <div className="submenu-item" onClick={() => navigate("/admin/life")} style={{ cursor: "pointer", fontSize: "0.9rem", color: "#666" }}>Life Insurance</div>
                <div className="submenu-item" onClick={() => navigate("/admin/health")} style={{ cursor: "pointer", fontSize: "0.9rem", color: "#666" }}>Health Insurance</div>
                <div className="submenu-item" onClick={() => navigate("/admin/car")} style={{ cursor: "pointer", fontSize: "0.9rem", color: "#666" }}>Car Insurance</div>
              </div>
            )}
          </div>

          <div className="menu-item"><RiFileChartLine className="icon" /> Reports</div>
          <div className="menu-item"><RiGroupLine className="icon" /> Customer</div>
        </nav>

        <div className="logout-box" onClick={handleLogout}>
          <FiLogOut className="icon" /> Logout
        </div>
      </aside>

      <main className="content-area">
        <header className="top-bar">
          <div className="welcome-msg">
            <h1>Welcome back Pranay</h1>
            <p>Welcome back! Here's what's happening today.</p>
          </div>
          <div className="header-right">
            <div className="search-bar-wrapper">
              <FiSearch className="search-icon" />
              <input type="text" placeholder="Search leads..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
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
                    {allLeads.slice(0, 5).map((lead, idx) => (
                      <div className="notif-item" key={idx}>
                        <div className={`notif-icon ${lead.type.toLowerCase()}`}></div>
                        <div className="notif-content">
                          <p><strong>{lead.full_name}</strong> submitted a {lead.type} request.</p>
                          <span>{formatTime(lead.dateRaw)}</span>
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
          <h2>Dashboard</h2>
          <div className="filter-group">
            <select className="date-select" value={dateFilter} onChange={(e) => setDateFilter(e.target.value)}>
              <option>Last 7 days</option>
              <option>Last 30 days</option>
              <option>Last 6 months</option>
              <option>This Year</option>
              <option>All Time</option>
            </select>
            <button className="export-btn">Export</button>
          </div>
        </div>

        <section className="stats-row">
          
          <div className="stat-card">
            <div className="stat-top">
              <span className="stat-title">Total Leads</span>
              <div className="icon-sq purple"><RiStackLine /></div>
            </div>
            <div className="stat-middle">
              <h3 className="stat-count">{stats.total}</h3>
            </div>
            <div className={`stat-bottom ${stats.trends.total.dir}`}>
              <TinyLineChart data={graphData} dataKey="total" color={getTrendColor(stats.trends.total.dir)} />
              <div className="trend-text">
                <span className="trend-val">{stats.trends.total.val}</span>
                <span className="trend-msg">{stats.trends.total.msg}</span>
              </div>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-top">
              <span className="stat-title">Life Insurance</span>
              <div className="icon-sq yellow"><RiHeartPulseLine /></div>
            </div>
            <div className="stat-middle">
              <h3 className="stat-count">{stats.life}</h3>
            </div>
            <div className={`stat-bottom ${stats.trends.life.dir}`}>
              <TinyLineChart data={graphData} dataKey="life" color={getTrendColor(stats.trends.life.dir)} />
              <div className="trend-text">
                <span className="trend-val">{stats.trends.life.val}</span>
                <span className="trend-msg">{stats.trends.life.msg}</span>
              </div>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-top">
              <span className="stat-title">Health Insurance</span>
              <div className="icon-sq green"><RiShieldCrossLine /></div>
            </div>
            <div className="stat-middle">
              <h3 className="stat-count">{stats.health}</h3>
            </div>
            <div className={`stat-bottom ${stats.trends.health.dir}`}>
              <TinyLineChart data={graphData} dataKey="health" color={getTrendColor(stats.trends.health.dir)} />
              <div className="trend-text">
                <span className="trend-val">{stats.trends.health.val}</span>
                <span className="trend-msg">{stats.trends.health.msg}</span>
              </div>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-top">
              <span className="stat-title">Car Insurance</span>
              <div className="icon-sq orange"><RiRoadsterLine /></div>
            </div>
            <div className="stat-middle">
              <h3 className="stat-count">{stats.auto}</h3>
            </div>
            <div className={`stat-bottom ${stats.trends.auto.dir}`}>
              <TinyLineChart data={graphData} dataKey="car" color={getTrendColor(stats.trends.auto.dir)} />
              <div className="trend-text">
                <span className="trend-val">{stats.trends.auto.val}</span>
                <span className="trend-msg">{stats.trends.auto.msg}</span>
              </div>
            </div>
          </div>

        </section>

        <section className="charts-grid">
          <div className="chart-card">
            <h4>Leads by insurance type</h4>
            <div className="pie-wrapper">
              <ResponsiveContainer width="100%" height={320}>
                <PieChart>
                  <Pie data={pieData} cx="50%" cy="50%" innerRadius={90} outerRadius={125} paddingAngle={0} dataKey="value">
                    {pieData.map((entry, index) => <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} />)}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
              <div className="custom-pie-legend">
                 <span style={{color: "#10b981"}}>Health</span>
                 <span style={{color: "#3b82f6"}}>Car</span>
                 <span style={{color: "#ef4444"}}>Life</span>
              </div>
            </div>
          </div>

          <div className="chart-card">
            <h4>Recent Activity</h4>
            <ul className="activity-list">
              {filteredLeads.length > 0 ? (
                filteredLeads.slice(0, 5).map((lead, i) => (
                  <li key={i}>
                    <div className="bullet"></div>
                    <div>
                      <strong>New lead: {lead.full_name} ({lead.type})</strong>
                      <span>{formatTime(lead.dateRaw)}</span>
                    </div>
                  </li>
                ))
              ) : (
                <li style={{textAlign: 'center', color: '#999'}}>No recent activity.</li>
              )}
            </ul>
          </div>
        </section>

        <section className="line-chart-section">
          <h4>Leads Over Time</h4>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={graphData} margin={{ top: 10, right: 30, left: 30, bottom: 20 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={true} stroke="#f0f0f0" />
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={<CustomXAxisTick />} interval={0} />
              <YAxis axisLine={false} tickLine={false} tick={<CustomYAxisTick />} domain={['auto', 'auto']} width={20} />
              <Tooltip />
              <Line type="monotone" dataKey="health" stroke="#10b981" strokeWidth={3} dot={false} />
              <Line type="monotone" dataKey="car" stroke="#3b82f6" strokeWidth={3} dot={false} />
              <Line type="monotone" dataKey="life" stroke="#ef4444" strokeWidth={3} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </section>

        <section className="table-section-card">
          <div className="table-responsive">
            <table>
              <thead>
                <tr>
                  <th style={{textAlign: "left"}}>ID</th>
                  <th style={{textAlign: "left"}}>Name</th>
                  <th style={{textAlign: "left"}}>Email</th>
                  <th style={{textAlign: "left"}}>Mobile</th>
                  <th style={{textAlign: "left"}}>Type</th>
                  <th style={{textAlign: "left"}}>Date</th>
                  <th style={{textAlign: "left"}}>Time</th>
                </tr>
              </thead>
              <tbody>
                {currentItems.length > 0 ? (
                  currentItems.map((lead, index) => (
                    <tr key={index}>
                      <td style={{textAlign: "left"}}>#{lead.id}</td>
                      <td style={{textAlign: "left"}}>{lead.full_name}</td>
                      <td style={{textAlign: "left"}}>{lead.email}</td>
                      <td style={{textAlign: "left"}}>{lead.mobile}</td>
                      <td style={{textAlign: "left"}}><span className={`badge ${lead.type.toLowerCase()}`}>{lead.type}</span></td>
                      <td style={{textAlign: "left"}}>{formatDate(lead.dateRaw)}</td>
                      <td style={{textAlign: "left"}}>{formatTime(lead.dateRaw)}</td>
                    </tr>
                  ))
                ) : (
                  <tr><td colSpan="7" style={{textAlign: "center"}}>No leads found matching filters</td></tr>
                )}
              </tbody>
            </table>
          </div>
          <div className="pagination">
              <span>Showing {filteredLeads.length > 0 ? `${indexOfFirstItem + 1}-${Math.min(indexOfLastItem, filteredLeads.length)}` : "0"} of {filteredLeads.length} items</span>
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

export default Admin;