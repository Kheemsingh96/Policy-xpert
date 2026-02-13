import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FiChevronDown, FiChevronRight, FiLogOut } from "react-icons/fi";
import { 
  RiHome5Line, RiUserFollowLine, RiFileChartLine, 
  RiGroupLine, RiEditBoxLine, RiRobot2Line 
} from "react-icons/ri";
import logoImg from "../../assets/images/logo.png";

const Sidebar = ({ handleLogout }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const path = location.pathname;

  const [isLeadsOpen, setIsLeadsOpen] = useState(false);
  const [isContentOpen, setIsContentOpen] = useState(false);

  const leadsRoutes = [
    "/admin/consultation",
    "/admin/life",
    "/admin/health",
    "/admin/car"
  ];

  const contentRoutes = [
    "/admin/faqs",
    "/admin/blogs",
    "/admin/testimonials"
  ];

  const isLeadsPathActive = leadsRoutes.some(route => path.includes(route));
  const isContentPathActive = contentRoutes.some(route => path.includes(route));

  useEffect(() => {
    if (isLeadsPathActive) {
      setIsLeadsOpen(true);
      setIsContentOpen(false);
    } else if (isContentPathActive) {
      setIsContentOpen(true);
      setIsLeadsOpen(false);
    }
  }, [path, isLeadsPathActive, isContentPathActive]);

  const toggleLeads = () => {
    setIsLeadsOpen(!isLeadsOpen);
    setIsContentOpen(false);
  };

  const toggleContent = () => {
    setIsContentOpen(!isContentOpen);
    setIsLeadsOpen(false);
  };

  return (
    <aside className="sidebar">
      <div className="logo-box">
        <img src={logoImg} alt="PolicyXpert" className="sidebar-logo" />
      </div>

      <nav className="menu">

        <div 
          className={`menu-item ${path === "/admin/dashboard" ? "active" : ""}`}
          onClick={() => {
            navigate("/admin/dashboard");
            setIsLeadsOpen(false);
            setIsContentOpen(false);
          }}
        >
          <RiHome5Line className="icon" /> Home
        </div>

        <div className="menu-item-group">
          <div 
            className={`menu-item ${isLeadsPathActive ? "active" : ""}`}
            onClick={toggleLeads}
            style={{ justifyContent: "space-between" }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <RiUserFollowLine className="icon" /> Leads
            </div>
            {isLeadsOpen ? <FiChevronDown /> : <FiChevronRight />}
          </div>

          {isLeadsOpen && (
            <div className="submenu" style={{ paddingLeft: "40px", display: "flex", flexDirection: "column", gap: "10px", marginTop: "5px" }}>
              <div 
                className={`submenu-item ${path === "/admin/consultation" ? "active-sub" : ""}`} 
                onClick={() => navigate("/admin/consultation")}
              >
                Consultation
              </div>
              <div 
                className={`submenu-item ${path === "/admin/life" ? "active-sub" : ""}`} 
                onClick={() => navigate("/admin/life")}
              >
                Life Insurance
              </div>
              <div 
                className={`submenu-item ${path === "/admin/health" ? "active-sub" : ""}`} 
                onClick={() => navigate("/admin/health")}
              >
                Health Insurance
              </div>
              <div 
                className={`submenu-item ${path === "/admin/car" ? "active-sub" : ""}`} 
                onClick={() => navigate("/admin/car")}
              >
                Car Insurance
              </div>
            </div>
          )}
        </div>

        <div className="menu-item-group">
          <div 
            className={`menu-item ${isContentPathActive ? "active" : ""}`}
            onClick={toggleContent}
            style={{ justifyContent: "space-between" }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <RiEditBoxLine className="icon" /> Content Manage
            </div>
            {isContentOpen ? <FiChevronDown /> : <FiChevronRight />}
          </div>

          {isContentOpen && (
            <div className="submenu" style={{ paddingLeft: "40px", display: "flex", flexDirection: "column", gap: "10px", marginTop: "5px" }}>
              <div 
                className={`submenu-item ${path === "/admin/faqs" ? "active-sub" : ""}`} 
                onClick={() => navigate("/admin/faqs")}
              >
                FAQs
              </div>
              <div 
                className={`submenu-item ${path === "/admin/blogs" ? "active-sub" : ""}`} 
                onClick={() => navigate("/admin/blogs")}
              >
                Blogs
              </div>
              <div 
                className={`submenu-item ${path === "/admin/testimonials" ? "active-sub" : ""}`} 
                onClick={() => navigate("/admin/testimonials")}
              >
                Testimonials
              </div>
            </div>
          )}
        </div>

        <div 
          className={`menu-item ${path === "/admin/chatleads" ? "active" : ""}`}
          onClick={() => {
            navigate("/admin/chatleads");
            setIsLeadsOpen(false);
            setIsContentOpen(false);
          }}
        >
          <RiRobot2Line className="icon" style={{ fontSize: "20px" }} /> Chatbot
        </div>

        <div 
          className={`menu-item ${path === "/admin/reports" ? "active" : ""}`}
          onClick={() => {
            navigate("/admin/reports");
            setIsLeadsOpen(false);
            setIsContentOpen(false);
          }}
        >
          <RiFileChartLine className="icon" /> Reports
        </div>

        <div 
          className={`menu-item ${path === "/admin/customer" ? "active" : ""}`}
          onClick={() => {
            navigate("/admin/customer");
            setIsLeadsOpen(false);
            setIsContentOpen(false);
          }}
        >
          <RiGroupLine className="icon" /> Customer
        </div>

      </nav>

      <div className="logout-box" onClick={handleLogout}>
        <FiLogOut className="icon" /> Logout
      </div>
    </aside>
  );
};

export default Sidebar;