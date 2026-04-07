import React, { useState } from "react";
import axios from "axios";

const AdminChangePassword = () => {

  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: ""
  });

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const user = JSON.parse(localStorage.getItem("user"));

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    setMessage("");
    setError("");

    if (formData.newPassword !== formData.confirmPassword) {
      setError("New passwords do not match");
      return;
    }

    try {

      const res = await axios.post(
        "http://localhost:5000/api/change-password",
        {
          userId: user.id,
          currentPassword: formData.currentPassword,
          newPassword: formData.newPassword
        }
      );

      setMessage(res.data.message);

      setFormData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: ""
      });

    } catch (err) {

      setError(
        err.response?.data?.message ||
        "Error changing password"
      );

    }

  };

  return (

    <div style={{ maxWidth: "500px", margin: "auto" }}>

      <h2>Change Password</h2>

      {message && <p style={{ color: "green" }}>{message}</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      <form onSubmit={handleSubmit}>

        <div style={{ marginBottom: "15px" }}>
          <label>Current Password</label>
          <input
            type="password"
            name="currentPassword"
            value={formData.currentPassword}
            onChange={handleChange}
            required
            style={{ width: "100%", padding: "10px" }}
          />
        </div>

        <div style={{ marginBottom: "15px" }}>
          <label>New Password</label>
          <input
            type="password"
            name="newPassword"
            value={formData.newPassword}
            onChange={handleChange}
            required
            style={{ width: "100%", padding: "10px" }}
          />
        </div>

        <div style={{ marginBottom: "15px" }}>
          <label>Confirm New Password</label>
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
            style={{ width: "100%", padding: "10px" }}
          />
        </div>

        <button
          type="submit"
          style={{
            padding: "10px 20px",
            background: "#1976d2",
            color: "#fff",
            border: "none",
            cursor: "pointer"
          }}
        >
          Update Password
        </button>

      </form>

    </div>

  );

};

export default AdminChangePassword;