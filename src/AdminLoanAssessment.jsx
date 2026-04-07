// src/components/admin/AdminLoanAssessment.jsx

import React, { useEffect, useState } from "react";
import axios from "axios";

const AdminLoanAssessment = () => {
  const [loans, setLoans] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLoans();
  }, []);

  const fetchLoans = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/admin/loan-assessment`
      );

      setLoans(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching loan assessments:", error);
      setLoading(false);
    }
  };

  const updateStatus = async (id, status) => {
    try {
      await axios.put(
        `${process.env.REACT_APP_API_URL}/api/admin/loan-assessment/${id}`,
        { status }
      );

      fetchLoans(); // refresh after update
    } catch (error) {
      console.error("Error updating loan status:", error);
    }
  };

  return (
    <div>
      <h2>Loan Assessment</h2>

      {loading ? (
        <p>Loading...</p>
      ) : loans.length === 0 ? (
        <p>No loans available for assessment.</p>
      ) : (
        <table border="1" width="100%">
          <thead>
            <tr>
              <th>ID</th>
              <th>Full Name</th>
              <th>Loan Amount</th>
              <th>Purpose</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {loans.map((loan) => (
              <tr key={loan.id}>
                <td>{loan.id}</td>
                <td>{loan.fullName}</td>
                <td>{loan.loanAmount}</td>
                <td>{loan.loanPurpose}</td>
                <td>{loan.status}</td>

                <td>
                  <button
                    onClick={() =>
                      updateStatus(loan.id, "approved")
                    }
                  >
                    Approve
                  </button>

                  <button
                    onClick={() =>
                      updateStatus(loan.id, "rejected")
                    }
                  >
                    Reject
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AdminLoanAssessment;