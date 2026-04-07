import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";

const AdminDashboardHome = () => {
  const [stats, setStats] = useState({
    totalCustomers: 0,
    activeLoans: 0,
    disbursedAmount: 0,
    overdueLoans: 0,
    staffOnline: 0,
    newApplications: 0,
  });

  const apiUrl = process.env.REACT_APP_API_URL || "http://localhost:5000";

  // Fetch dashboard stats
  const fetchStats = useCallback(async () => {
    try {
      const res = await axios.get(`${apiUrl}/dashboard/stats`);
      setStats(res.data);
    } catch (error) {
      console.error("Failed to fetch dashboard stats:", error);
    }
  }, [apiUrl]);

  useEffect(() => {
    fetchStats();
  }, [fetchStats]);

  const statItems = [
    { title: "Total Customers", value: stats.totalCustomers },
    { title: "Active Loans", value: stats.activeLoans },
    { title: "Disbursed Amount", value: `$${stats.disbursedAmount}` },
    { title: "Overdue Loans", value: stats.overdueLoans },
    { title: "Staff Online", value: stats.staffOnline },
    { title: "New Applications ", value: stats.newApplications },
  ];

  return (
    <div className="container mt-4">
      <h2 className="mb-3">Dashboard Overview</h2>
      <div className="row g-2">
        {statItems.map((item, index) => (
          <div className="col-lg-2 col-md-4 col-sm-6" key={index}>
            <div
              className="card text-white bg-primary text-center"
              style={{
                padding: "8px",
                borderRadius: "5px",
                minHeight: "70px",
              }}
            >
              <div className="card-body p-1">
                <div
                  className="card-title mb-1"
                  style={{ fontSize: "0.75rem", fontWeight: "500" }}
                >
                  {item.title}
                </div>
                <div
                  className="card-text"
                  style={{ fontSize: "1rem", fontWeight: "bold" }}
                >
                  {item.value}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminDashboardHome;