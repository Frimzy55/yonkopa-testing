import React, { useEffect, useState } from "react";
import axios from "axios";

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);
  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    phone: "",
    password: "",
    role: "customer",
  });
  const [searchTerm, setSearchTerm] = useState("");

 // const apiUrl = "http://localhost:5000/userss";
  const apiUrl = `${process.env.REACT_APP_API_URL}/userss`;

  // Fetch users from backend, optionally with search
  const fetchUsers = async (search = "") => {
    try {
      const res = await axios.get(apiUrl, {
        params: { search },
      });
      setUsers(res.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, );

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle search input
  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    fetchUsers(value); // live search as user types
  };

  // Add or update user
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingUser) {
        await axios.put(`${apiUrl}/${editingUser.id}`, formData);
        setEditingUser(null);
      } else {
        await axios.post(apiUrl, formData);
      }
      setFormData({
        full_name: "",
        email: "",
        phone: "",
        password: "",
        role: "customer",
      });
      fetchUsers(searchTerm);
    } catch (error) {
      console.error("Error saving user:", error);
    }
  };

  // Delete user
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        await axios.delete(`${apiUrl}/${id}`);
        fetchUsers(searchTerm);
      } catch (error) {
        console.error("Error deleting user:", error);
      }
    }
  };

  // Edit user
  const handleEdit = (user) => {
    setEditingUser(user);
    setFormData({
      full_name: user.full_name,
      email: user.email,
      phone: user.phone,
      password: "",
      role: user.role,
    });
  };

  return (
    <div>
      <h2>User Management</h2>

      <input
        type="text"
        placeholder="Search by name or role"
        value={searchTerm}
        onChange={handleSearch}
        style={{ marginBottom: "10px", padding: "5px", width: "250px" }}
      />

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="full_name"
          placeholder="Full Name"
          value={formData.full_name}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="phone"
          placeholder="Phone"
          value={formData.phone}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder={editingUser ? "Leave blank to keep current" : "Password"}
          value={formData.password}
          onChange={handleChange}
          required={!editingUser}
        />
        <select name="role" value={formData.role} onChange={handleChange}>
          <option value="customer">Customer</option>
          <option value="loan_officer">Loan Officer</option>
          <option value="admin">Admin</option>
        </select>
        <button type="submit">{editingUser ? "Update User" : "Add User"}</button>
        {editingUser && <button onClick={() => setEditingUser(null)}>Cancel</button>}
      </form>

      <table border="1" style={{ marginTop: "20px", width: "100%" }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Full Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Role</th>
            <th>Created At</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.full_name}</td>
              <td>{user.email}</td>
              <td>{user.phone}</td>
              <td>{user.role}</td>
              <td>{new Date(user.created_at).toLocaleString()}</td>
              <td>
                <button onClick={() => handleEdit(user)}>Edit</button>
                <button onClick={() => handleDelete(user.id)}>Delete</button>
              </td>
            </tr>
          ))}
          {users.length === 0 && (
            <tr>
              <td colSpan="7" style={{ textAlign: "center" }}>
                No users found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AdminUsers;
