// src/components/admin/AdminDashboard.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AdminDashboard.css";

// Import section components
import AdminDashboardHome from "./AdminDashboardHome";
import AdminUsers from "./AdminUsers";
import AdminCustomers from "./AdminCustomers";
import AdminLoanApplication from "./AdminLoanApplication";
import AdminCreditCommittee from "./AdminCreditCommittee";
import AdminReports from "./AdminReports";
import AdminOperationalWorkflow from "./AdminOperationalWorkflow";
import AdminServices from "./AdminServices"; // Add this import

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [adminName, setAdminName] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [activeSection, setActiveSection] = useState("dashboard");

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser && storedUser.role === "admin") {
      setAdminName(storedUser.fullname || storedUser.username || "Admin");
    } else {
      navigate("/login");
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  const menuItems = [
    { id: "dashboard", label: "Dashboard", icon: "📊" },
    { id: "users", label: "User Management", icon: "👥" },
    { id: "customers", label: "Customer Menu", icon: "👤" },
    { id: "loan-application", label: "Loan Application", icon: "📝" },
    { id: "credit-committee", label: "Credit Committee", icon: "⚖️" },
    { id: "reports", label: "Reports", icon: "📈" },
    { id: "operational-workflow", label: "Operational Workflow", icon: "🔄" },
    { id: "services", label: "Service Management", icon: "🔧" }, // Add this menu item
  ];

  const renderContent = () => {
    switch (activeSection) {
      case "dashboard": return <AdminDashboardHome />;
      case "users": return <AdminUsers />;
      case "customers": return <AdminCustomers />;
      case "loan-application": return <AdminLoanApplication />;
      case "credit-committee": return <AdminCreditCommittee />;
      case "reports": return <AdminReports />;
      case "operational-workflow": return <AdminOperationalWorkflow />;
      case "services": return <AdminServices />; // Add this case
      default: return <AdminDashboardHome />;
    }
  };

  return (
    <div className="admin-layout">
      {/* Top Bar */}
      <header className="top-bar">
        <div className="top-bar-left">
          <button className="sidebar-toggle" onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
            ☰
          </button>
          <h1 className="top-bar-title">Admin Panel</h1>
        </div>
        <div className="top-bar-right">
          <span className="admin-welcome">Welcome, {adminName}</span>
          <button onClick={handleLogout} className="logout-btn">Logout</button>
        </div>
      </header>

      <div className="main-container">
        {/* Sidebar */}
        <aside className={`sidebar ${isSidebarOpen ? "open" : "closed"}`}>
          <nav className="sidebar-nav">
            <ul>
              {menuItems.map((item) => (
                <li key={item.id}>
                  <button
                    className={`sidebar-item ${activeSection === item.id ? "active" : ""}`}
                    onClick={() => setActiveSection(item.id)}
                  >
                    <span className="sidebar-icon">{item.icon}</span>
                    {isSidebarOpen && <span className="sidebar-label">{item.label}</span>}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="main-content">
          <div className="content-wrapper">{renderContent()}</div>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;