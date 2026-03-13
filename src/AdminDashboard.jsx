// src/components/admin/AdminDashboard.jsx

import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./AdminDashboard.css";

import { FaBell } from "react-icons/fa";

import AdminDashboardHome from "./AdminDashboardHome";
import AdminUsers from "./AdminUsers";
import AdminCustomers from "./AdminCustomers";
import AdminLoanApplication from "./AdminLoanApplication";
import AdminCreditCommittee from "./AdminCreditCommittee";
import AdminReports from "./AdminReports";
import AdminOperationalWorkflow from "./AdminOperationalWorkflow";
import AdminServices from "./AdminServices";
import AdminChangePassword from "./AdminChangePassword";
import AdminProgressApplication from "./AdminProgressApplication";
import AdminLoanAssessment from "./AdminLoanAssessment";

const AdminDashboard = () => {
  const navigate = useNavigate();

  const [adminName, setAdminName] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [activeSection, setActiveSection] = useState("dashboard");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState(null);

  // 🔔 Notification state
  const [notifications, ] = useState(3);

  const dropdownRef = useRef(null);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));

    if (storedUser && storedUser.role === "admin") {
      setAdminName(
        storedUser.full_name ||
        storedUser.fullname ||
        storedUser.username ||
        "Admin"
      );
    } else {
      navigate("/login");
    }

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

  const menuItems = [
    { id: "dashboard", label: "Dashboard", icon: "📊" },
    { id: "users", label: "User Management", icon: "👥" },
    { id: "customers",
       label: "Customer Menu",
        icon: "👤",
         subMenu: [
        { id: "customer-registration", label: "New Customer Registration" },
        { id: "customer-search", label: "Customer Search" },
        { id: "View-all", label: "View all Registered Customers" }
     ]
      
      
      },

    {
      id: "loans",
      label: "Loans",
      icon: "📝",
      subMenu: [
        { id: "loan-applications", label: "New Loan Applications" },
        { id: "application-progress", label: "Application in Progress" },
        { id: "loan-assessment", label: "Loan Assessment" }
      ]
    },
    { id: "credit-committee", label: "Credit Committee", icon: "⚖️" },
    { id: "reports", label: "Reports", icon: "📈" },
    { id: "operational-workflow", label: "Operational Workflow", icon: "🔄" },
    { id: "services", label: "Service Management", icon: "🔧" }
  ];

  const renderContent = () => {
    switch (activeSection) {
      case "dashboard":
        return <AdminDashboardHome />;
      case "users":
        return <AdminUsers />;
      case "customers":
        return <AdminCustomers />;
      case "loan-applications":
        return <AdminLoanApplication />;
      case "application-progress":
        return <AdminProgressApplication />;
      case "credit-committee":
        return <AdminCreditCommittee />;
      case "reports":
        return <AdminReports />;
        case "loan-assessment":
        return <AdminLoanAssessment />;
      case "operational-workflow":
        return <AdminOperationalWorkflow />;
      case "services":
        return <AdminServices />;
      case "change-password":
        return <AdminChangePassword />;
      default:
        return <AdminDashboardHome />;
    }
  };

  return (
    <div className="admin-layout">

      {/* TOP BAR */}
      <header className="top-bar">

        <div className="top-bar-left">
          <button
            className="sidebar-toggle"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          >
            ☰
          </button>

          <h1 className="top-bar-title">Admin Panel</h1>
        </div>

        <div className="top-bar-right" ref={dropdownRef}>

          {/* 🔔 Notification Bell */}
          <div className="notification-icon">
            <FaBell size={20} />

            {notifications > 0 && (
              <span className="notification-badge">
                {notifications}
              </span>
            )}
          </div>

          {/* Avatar */}
          <div
            className="avatar-wrapper"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          >
            <div className="avatar">
              {adminName.charAt(0).toUpperCase()}
            </div>
          </div>

          {isDropdownOpen && (
            <div className="avatar-dropdown">
              <button onClick={handleChangePassword}>
                Change Password
              </button>
              <button onClick={handleLogout}>
                Logout
              </button>
            </div>
          )}

        </div>
      </header>

      <div className="main-container">

        {/* SIDEBAR */}
        <aside className={`sidebar ${isSidebarOpen ? "open" : "closed"}`}>
          <nav className="sidebar-nav">
            <ul>
              {menuItems.map((item) => (
                <li key={item.id}>
                  <button
                    className={`sidebar-item ${
                      activeSection === item.id ? "active" : ""
                    }`}
                    onClick={() => {
                      if (item.subMenu) {
                        setOpenMenu(
                          openMenu === item.id ? null : item.id
                        );
                      } else {
                        setActiveSection(item.id);
                      }
                    }}
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

                  {item.subMenu &&
                    openMenu === item.id &&
                    isSidebarOpen && (
                      <ul className="submenu">
                        {item.subMenu.map((sub) => (
                          <li key={sub.id}>
                            <button
                              className={`sidebar-subitem ${
                                activeSection === sub.id
                                  ? "active"
                                  : ""
                              }`}
                              onClick={() =>
                                setActiveSection(sub.id)
                              }
                            >
                              <span>{sub.label}</span>
                            </button>
                          </li>
                        ))}
                      </ul>
                    )}
                </li>
              ))}
            </ul>
          </nav>
        </aside>

        {/* MAIN CONTENT */}
        <main className="main-content">
          <div className="content-wrapper">
            {renderContent()}
          </div>
        </main>

      </div>
    </div>
  );
};

export default AdminDashboard;