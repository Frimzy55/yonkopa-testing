import React, { useEffect, useState } from "react";
import axios from "axios";

const AdminCustomerTable = () => {

  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(false);

  const apiUrl = process.env.REACT_APP_API_URL || "http://localhost:5000";

  useEffect(() => {

    const fetchCustomers = async () => {

      try {
        setLoading(true);

        const res = await axios.get(`${apiUrl}/userss`, {
          params: { role: "customer" }
        });

        setCustomers(res.data);

      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }

    };

    fetchCustomers();

  }, [apiUrl]);

  if (loading) return <p className="text-center">Loading customers...</p>;

  return (
    <div className="table-responsive">

      <h4 className="mb-3 text-success">Customer List</h4>

      <table className="table table-bordered table-striped">

        <thead className="table-success">
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Email</th>
            <th>phone</th>
            <th>Role</th>
          </tr>
        </thead>

        <tbody>
          {customers.map((user, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{user.full_name}</td>
              <td>{user.email}</td>
            <td>{user.phone}</td>
              <td>{user.role}</td>
            </tr>
          ))}
        </tbody>

      </table>

    </div>
  );
};

export default AdminCustomerTable;