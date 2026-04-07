import React, { useEffect, useState } from "react";
import axios from "axios";
import "./AdminCustomerList.css";

const CustomerList = () => {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    axios.get("http://localhost:5000/api/customers/all")
      .then(res => {
        setCustomers(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setError("Failed to load customers");
        setLoading(false);
      });
  }, []);

  const formatDate = (dateStr) => {
    if (!dateStr) return "";
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-GB"); // formats as DD/MM/YYYY
  };

  if (loading) return <p>Loading customers...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="customer-list-container">
      <h2>All Registered Customers</h2>
      <div className="table-wrapper">
        <table className="customer-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>KYC Code</th>
              <th>Full Name</th>
              <th>DOB</th>
              <th>Gender</th>
              <th>Mobile</th>
              <th>Email</th>
              <th>City</th>
              <th>Employment</th>
              <th>Monthly Income</th>
            </tr>
          </thead>
          <tbody>
            {customers.map(c => (
              <tr key={c.id}>
                <td>{c.id}</td>
                <td>{c.kyc_code}</td>
                <td>{c.firstName} {c.middleName} {c.lastName}</td>
                <td>{formatDate(c.dateOfBirth)}</td> {/* formatted */}
                <td>{c.gender}</td>
                <td>{c.mobileNumber}</td>
                <td>{c.email}</td>
                <td>{c.city}</td>
                <td>{c.employmentStatus}</td>
                <td>{c.monthlyIncome}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CustomerList;