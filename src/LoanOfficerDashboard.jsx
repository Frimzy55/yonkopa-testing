// src/components/loan-officer/LoanOfficerDashboard.jsx

import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./LoanOfficerDashboard.css";

import LoanOfficerDashboardContent from "./LoanOfficerDashboardContent";
import LoanOfficerCustomers from "./LoanOfficerCustomers";
import LoanOfficerLoanApplication from "./LoanOfficerLoanApplication";
import LoanOfficerCreditCommittee from "./LoanOfficerCreditCommittee";
import LoanOfficerReports from "./LoanOfficerReports";
import LoanOfficerOperationalWorkflow from "./LoanOfficerOperationalWorkflow";
import LoanOfficerChangePassword from "./LoanOfficerChangePassword";

const LoanOfficerDashboard = () => {

  const navigate = useNavigate();

  const [officerName, setOfficerName] = useState("Loan Officer");
  const [officerEmail, setOfficerEmail] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [activeSection, setActiveSection] = useState("dashboard");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const dropdownRef = useRef(null);

  useEffect(() => {

    const storedUser = JSON.parse(localStorage.getItem("user"));

    if (storedUser && storedUser.role === "loan_officer") {

      setOfficerName(
        storedUser.full_name ||
        storedUser.name ||
        storedUser.username ||
        "Loan Officer"
      );

      setOfficerEmail(storedUser.email || "");

    } else {
      navigate("/staff-login");
    }

    // close dropdown if clicked outside
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };

  }, [navigate]);


  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };


  const handleChangePassword = () => {
    setActiveSection("change-password");
    setIsDropdownOpen(false);
  };


  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };


  const menuItems = [

    { id: "dashboard", label: "Dashboard", icon: "📊" },

    { id: "customers", label: "Customer Menu", icon: "👥" },

    { id: "loan-application", label: "Loan Application", icon: "📝" },

    { id: "credit-committee", label: "Credit Committee", icon: "⚖️" },

    { id: "reports", label: "Reports", icon: "📈" },

    { id: "operational-workflow", label: "Operational Workflow", icon: "🔄" }

  ];


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

      case "change-password":
        return <LoanOfficerChangePassword />;

      default:
        return <LoanOfficerDashboardContent />;
    }
  };


  return (

    <div className="officer-layout">

      {/* TOP BAR */}

      <header className="top-bar">

        <div className="top-bar-left">

          <button
            className="sidebar-toggle"
            onClick={toggleSidebar}
          >
            ☰
          </button>

          <h1 className="top-bar-title">
            Loan Officer Portal
          </h1>

        </div>


        <div className="top-bar-right" ref={dropdownRef}>

          {/* USER INFO */}

          <div className="officer-info">

            <span className="officer-name">
              {officerName}
            </span>

            <span className="officer-email">
              {officerEmail}
            </span>

          </div>


          {/* AVATAR */}

          <div
            className="avatar-wrapper"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          >

            <div className="avatar">
              {officerName.charAt(0).toUpperCase()}
            </div>

          </div>


          {/* DROPDOWN */}

          {isDropdownOpen && (

            <div className="avatar-dropdown">

              <button onClick={handleChangePassword}>
                🔐 Change Password
              </button>

              <button onClick={handleLogout}>
                🚪 Logout
              </button>

            </div>

          )}

        </div>

      </header>



      {/* MAIN CONTAINER */}

      <div className="main-container">


        {/* SIDEBAR */}

        <aside className={`sidebar ${isSidebarOpen ? "open" : "closed"}`}>

          <nav className="sidebar-nav">

            {isSidebarOpen && <h3>Main Menu</h3>}

            <ul>

              {menuItems.map((item) => (

                <li key={item.id}>

                  <button
                    className={`sidebar-item ${activeSection === item.id ? "active" : ""}`}
                    onClick={() => setActiveSection(item.id)}
                  >

                    <span className="sidebar-icon">
                      {item.icon}
                    </span>

                    {isSidebarOpen && (
                      <span className="sidebar-label">
                        {item.label}
                      </span>
                    )}

                  </button>

                </li>

              ))}

            </ul>

          </nav>

        </aside>



        {/* MAIN CONTENT */}

        <main className="main-content">

          <div className="content-wrapper">

            {renderSection()}

          </div>

        </main>

      </div>

    </div>

  );

};

export default LoanOfficerDashboard;