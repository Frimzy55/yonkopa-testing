import React, { useState } from "react";
import axios from "axios";
import logo from "./image/yonko.png"; // adjust path if needed
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

const ForgotPassword = () => {
  const [identifier, setIdentifier] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [touched, setTouched] = useState(false);

  // ✅ Validation
  const isValid = () => {
    const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(identifier);
    const isPhone = /^\d{10}$/.test(identifier.replace(/\D/g, ""));
    return isEmail || isPhone;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");
    setLoading(true);

    if (!isValid()) {
      setError("Enter a valid email or 10-digit phone number");
      setLoading(false);
      return;
    }

    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API_URL}/forgot-password`,
        { identifier }
      );

      setMessage(res.data.message);
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div
        className="card shadow-lg p-4"
        style={{ width: "100%", maxWidth: "420px", borderRadius: "12px" }}
      >
        {/* 🔥 Logo */}
        <div className="text-center mb-3">
          <img
            src={logo}
            alt="Logo"
            style={{ width: "80px", objectFit: "contain" }}
          />
        </div>

        {/* Title */}
        <h4 className="text-center mb-3 fw-bold">Forgot Password</h4>
        <p className="text-center text-muted small">
          Enter your email or phone to reset your password
        </p>

        {/* Alerts */}
        {message && (
          <div className="alert alert-success text-center py-2">
            {message}
          </div>
        )}
        {error && (
          <div className="alert alert-danger text-center py-2">
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit}>
          <div className="mb-3 position-relative">
            <label className="form-label">Email or Phone</label>

            <input
              type="text"
              className={`form-control ${
                touched && !isValid() ? "is-invalid" : touched && isValid() ? "is-valid" : ""
              }`}
              placeholder="Enter email or phone"
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
              onBlur={() => setTouched(true)}
              disabled={loading}
            />

            {/* ICON */}
            {touched && (
              <i
                className={`bi ${
                  isValid()
                    ? "bi-check-circle text-success"
                    : "bi-x-circle text-danger"
                } position-absolute`}
                style={{ right: "10px", top: "38px" }}
              ></i>
            )}

            {touched && !isValid() && (
              <div className="invalid-feedback">
                Enter a valid email or 10-digit phone
              </div>
            )}
          </div>

          {/* Button */}
          <button
            className="btn btn-primary w-100 fw-bold"
            disabled={loading || !identifier}
          >
            {loading ? (
              <>
                <span className="spinner-border spinner-border-sm me-2"></span>
                Sending...
              </>
            ) : (
              "Send Reset Link"
            )}
          </button>
        </form>

        {/* Back to login */}
        <p className="text-center mt-3 mb-0">
          <a href="/" className="text-decoration-none">
            ← Back to Login
          </a>
        </p>
      </div>
    </div>
  );
};

export default ForgotPassword;