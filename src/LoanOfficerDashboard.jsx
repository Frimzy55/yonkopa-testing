import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./LoanOfficerDashboard.css";

import LoanOfficerDashboardContent from "./LoanOfficerDashboardContent";
import LoanOfficerCustomers from "./LoanOfficerCustomers";
import LoanOfficerLoanApplication from "./LoanOfficerLoanApplication";
import LoanOfficerCreditCommittee from "./LoanOfficerCreditCommittee";
import LoanOfficerReports from "./LoanOfficerReports";
import LoanOfficerOperationalWorkflow from "./LoanOfficerOperationalWorkflow";

const LoanOfficerDashboard = () => {
  const navigate = useNavigate();
  const [officerName, setOfficerName] = useState("Loan Officer");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [activeSection, setActiveSection] = useState("dashboard");

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));

    if (storedUser && storedUser.role === "loan_officer") {
      // Prefer full_name from backend; fallback to email or username
      setOfficerName(
        storedUser.full_name || storedUser.name || storedUser.email || "Loan Officer"
      );
    } else {
      navigate("/staff-login"); // redirect if not a loan officer
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  const renderSection = () => {
    switch (activeSection) {
      case "dashboard":
        return <LoanOfficerDashboardContent />;
      case "customers":
        return <LoanOfficerCustomers />;
      case "loan-application":
        return <LoanOfficerLoanApplication />;
      case "credit-committee":
        return <LoanOfficerCreditCommittee />;
      case "reports":
        return <LoanOfficerReports />;
      case "operational-workflow":
        return <LoanOfficerOperationalWorkflow />;
      default:
        return <LoanOfficerDashboardContent />;
    }
  };

  const menuItems = [
    { id: "dashboard", label: "Dashboard", icon: "📊" },
    { id: "customers", label: "Customer Menu", icon: "👥" },
    { id: "loan-application", label: "Loan Application", icon: "📝" },
    { id: "credit-committee", label: "Credit Committee", icon: "⚖️" },
    { id: "reports", label: "Reports", icon: "📈" },
    { id: "operational-workflow", label: "Operational Workflow", icon: "🔄" },
  ];

  return (
    <div className="officer-layout">
      {/* Top Bar */}
      <header className="top-bar">
        <div className="top-bar-left">
          <button className="sidebar-toggle" onClick={toggleSidebar}>
            ☰
          </button>
          <h1 className="top-bar-title">Loan Officer Portal</h1>
        </div>

        <div className="top-bar-right">
          <span className="officer-welcome">Welcome, {officerName}</span>
          <div className="user-badge">
            <span className="user-role">Loan Officer</span>
          </div>
          <button onClick={handleLogout} className="logout-btn">
            Logout
          </button>
        </div>
      </header>

      <div className="main-container">
        {/* Sidebar */}
        <aside className={`sidebar ${isSidebarOpen ? "open" : "closed"}`}>
          <nav className="sidebar-nav">
            {isSidebarOpen && <h3>Main Menu</h3>}
            <ul>
              {menuItems.map((item) => (
                <li key={item.id}>
                  <button
                    className={`sidebar-item ${
                      activeSection === item.id ? "active" : ""
                    }`}
                    onClick={() => setActiveSection(item.id)}
                  >
                    <span className="sidebar-icon">{item.icon}</span>
                    {isSidebarOpen && (
                      <span className="sidebar-label">{item.label}</span>
                    )}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </aside>

        {/* Dynamic Page Content */}
        <main className="main-content">
          <div className="content-wrapper">{renderSection()}</div>
        </main>
      </div>
    </div>
  );
};

export default LoanOfficerDashboard;
