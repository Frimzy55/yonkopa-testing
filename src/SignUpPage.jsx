// src/components/SignUpPage.jsx
import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

const SignUpPage = ({ onClose, onSwitchToLogin }) => {
  const [formData, setFormData] = useState({
    fullName: "",
    identifier: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [message, setMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const validateField = (name, value) => {
    let newErrors = { ...errors };

    switch (name) {
      case "fullName":
        if (!value.trim()) newErrors.fullName = "Full name is required";
        else delete newErrors.fullName;
        break;

      case "identifier":
        if (!value) {
          newErrors.identifier = "Email or phone number is required";
        } else {
          const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
          const isPhone = /^\d{10}$/.test(value.replace(/\D/g, ""));

          if (!isEmail && !isPhone) {
            newErrors.identifier =
              "Enter a valid email or 10-digit phone number";
          } else {
            delete newErrors.identifier;
          }
        }
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

    const updatedForm = { ...formData, [name]: value };
    setFormData(updatedForm);

    const updatedErrors = validateField(name, value);
    setErrors(updatedErrors);
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;

    setTouched({ ...touched, [name]: true });

    const updatedErrors = validateField(name, value);
    setErrors(updatedErrors);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let newErrors = {};

    Object.keys(formData).forEach((key) => {
      newErrors = {
        ...newErrors,
        ...validateField(key, formData[key]),
      };
    });

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      alert("Fix validation errors!");
      return;
    }

    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/signup`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }
      );

      const data = await response.json();

      if (response.ok) {
        setMessage(data.message);
        setTimeout(() => {
          onClose();
        }, 1500);
      } else {
        setMessage(data.message || "Error creating account");
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
          <h4 className="m-0">Create Account</h4>
          <button className="btn-close" onClick={onClose}></button>
        </div>

        {message && (
          <div className="alert alert-info text-center">{message}</div>
        )}

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
            />
            {touched.fullName && errors.fullName && (
              <div className="invalid-feedback">{errors.fullName}</div>
            )}
          </div>

          {/* Identifier */}
          <div className="mb-3">
            <label className="form-label">Email or Phone Number</label>
            <input
              type="text"
              name="identifier"
              className={`form-control ${
                touched.identifier && errors.identifier ? "is-invalid" : ""
              }`}
              value={formData.identifier}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Enter email or phone number"
            />
            {touched.identifier && errors.identifier && (
              <div className="invalid-feedback">{errors.identifier}</div>
            )}
          </div>

          {/* Password */}
          <div className="mb-3">
            <label className="form-label">Password</label>

            <div className="input-group">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                className={`form-control ${
                  touched.password && errors.password ? "is-invalid" : ""
                }`}
                value={formData.password}
                onChange={handleChange}
                onBlur={handleBlur}
              />

              <span
                className="input-group-text"
                onClick={() => setShowPassword(!showPassword)}
                style={{ cursor: "pointer" }}
              >
                <i className={`bi ${showPassword ? "bi-eye-slash" : "bi-eye"}`}></i>
              </span>
            </div>

            {touched.password && errors.password && (
              <div className="invalid-feedback d-block">
                {errors.password}
              </div>
            )}
          </div>

          {/* Confirm Password */}
          <div className="mb-3">
            <label className="form-label">Confirm Password</label>

            <div className="input-group">
              <input
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                className={`form-control ${
                  touched.confirmPassword && errors.confirmPassword
                    ? "is-invalid"
                    : ""
                }`}
                value={formData.confirmPassword}
                onChange={handleChange}
                onBlur={handleBlur}
              />

              <span
                className="input-group-text"
                onClick={() =>
                  setShowConfirmPassword(!showConfirmPassword)
                }
                style={{ cursor: "pointer" }}
              >
                <i
                  className={`bi ${
                    showConfirmPassword ? "bi-eye-slash" : "bi-eye"
                  }`}
                ></i>
              </span>
            </div>

            {touched.confirmPassword && errors.confirmPassword && (
              <div className="invalid-feedback d-block">
                {errors.confirmPassword}
              </div>
            )}
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="btn btn-primary w-100"
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