// src/components/SignUpPage.jsx
import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const SignUpPage = ({ onClose, onSwitchToLogin }) => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  const validateField = (name, value) => {
    const newErrors = { ...errors };

    switch (name) {
      case "fullName":
        if (!value.trim()) newErrors.fullName = "Full name is required";
        else if (value.trim().length < 2)
          newErrors.fullName = "Must be at least 2 characters";
        else if (!/^[a-zA-Z\s]+$/.test(value.trim()))
          newErrors.fullName = "Only letters and spaces allowed";
        else delete newErrors.fullName;
        break;

      case "email":
        if (!value) newErrors.email = "Email is required";
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value))
          newErrors.email = "Enter a valid email";
        else delete newErrors.email;
        break;

      case "phone":
        if (!value) newErrors.phone = "Phone number is required";
        else if (!/^\d{10}$/.test(value.replace(/\D/g, "")))
          newErrors.phone = "Enter a valid 10-digit number";
        else delete newErrors.phone;
        break;

      case "password":
        if (!value) newErrors.password = "Password is required";
        else if (value.length < 8)
          newErrors.password = "Must be at least 8 characters";
        else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(value))
          newErrors.password =
            "Must contain uppercase, lowercase and a number";
        else delete newErrors.password;
        break;

      case "confirmPassword":
        if (!value) newErrors.confirmPassword = "Confirm your password";
        else if (value !== formData.password)
          newErrors.confirmPassword = "Passwords do not match";
        else delete newErrors.confirmPassword;
        break;

      default:
        break;
    }

    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });

    if (touched[name]) setErrors(validateField(name, value));
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;

    setTouched({ ...touched, [name]: true });

    setErrors(validateField(name, value));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let newErrors = {};
    Object.keys(formData).forEach((key) => {
      newErrors = validateField(key, formData[key]);
    });

    if (Object.keys(newErrors).length > 0) {
      alert("Fix validation errors!");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        alert(data.message);
        onClose();
      } else {
        alert(data.message || "Error creating account");
      }
    } catch (err) {
      console.error(err);
      alert("Server error. Try later.");
    }
  };

  return (
    <div className="position-fixed top-0 start-0 w-100 h-100 bg-dark bg-opacity-50 d-flex justify-content-center align-items-center">
      <div className="bg-white rounded shadow p-4" style={{ width: "400px" }}>
        
        {/* Header */}
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h4 className="m-0">Create Your Account</h4>
          <button className="btn-close" onClick={onClose}></button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} noValidate>
          {/* Full Name */}
          <div className="mb-3">
            <label className="form-label">Full Name</label>
            <input
              type="text"
              name="fullName"
              className={`form-control ${
                touched.fullName && errors.fullName ? "is-invalid" : ""
              }`}
              value={formData.fullName}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Enter your full name"
            />
            {touched.fullName && errors.fullName && (
              <div className="invalid-feedback">{errors.fullName}</div>
            )}
          </div>

          {/* Email */}
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              type="email"
              name="email"
              className={`form-control ${
                touched.email && errors.email ? "is-invalid" : ""
              }`}
              value={formData.email}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Enter your email"
            />
            {touched.email && errors.email && (
              <div className="invalid-feedback">{errors.email}</div>
            )}
          </div>

          {/* Phone */}
          <div className="mb-3">
            <label className="form-label">Phone Number</label>
            <input
              type="tel"
              name="phone"
              maxLength={14}
              className={`form-control ${
                touched.phone && errors.phone ? "is-invalid" : ""
              }`}
              value={formData.phone}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="(123) 456-7890"
            />
            {touched.phone && errors.phone && (
              <div className="invalid-feedback">{errors.phone}</div>
            )}
          </div>

          {/* Password */}
          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
              type="password"
              name="password"
              className={`form-control ${
                touched.password && errors.password ? "is-invalid" : ""
              }`}
              value={formData.password}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Create a password"
            />
            {touched.password && errors.password && (
              <div className="invalid-feedback">{errors.password}</div>
            )}
          </div>

          {/* Confirm Password */}
          <div className="mb-3">
            <label className="form-label">Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              className={`form-control ${
                touched.confirmPassword && errors.confirmPassword
                  ? "is-invalid"
                  : ""
              }`}
              value={formData.confirmPassword}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Confirm password"
            />
            {touched.confirmPassword && errors.confirmPassword && (
              <div className="invalid-feedback">{errors.confirmPassword}</div>
            )}
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="btn btn-primary w-100"
            disabled={Object.keys(errors).length > 0}
          >
            Create Account
          </button>
        </form>

        {/* Switch to Login */}
        <p className="text-center mt-3">
          Already have an account?{" "}
          <button className="btn btn-link p-0" onClick={onSwitchToLogin}>
            Login here
          </button>
        </p>
      </div>
    </div>
  );
};

export default SignUpPage;
