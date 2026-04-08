// src/components/LoginPage.jsx
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google'; // Google OAuth
import logo from '../image/yonko.png'; // import your logo
import './LoginPage.css';
import "bootstrap-icons/font/bootstrap-icons.css";

const LoginPage = ({ onClose }) => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    identifier: '', // email or phone
    password: ''
  });

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [serverError, setServerError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // Validate single field
  const validateField = (name, value) => {
    const newErrors = { ...errors };
    switch (name) {
      /*case 'identifier':
        if (!value.trim()) newErrors.identifier = 'Email or phone is required';
        else if (
          !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) && // not valid email
          !/^\d{10}$/.test(value.replace(/\D/g, ''))    // not 10-digit phone
        ) {
          newErrors.identifier = 'Enter a valid email or 10-digit phone';
        } else delete newErrors.identifier;
        break;*/

        case 'identifier':
  const trimmed = value.trim();
  // Normalize phone: remove non-digits, remove leading country code if any
  const digits = trimmed.replace(/\D/g, '');
  const isValidPhone = digits.length === 10 || (digits.length === 12 && digits.startsWith('233'));
  const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed);

  if (!trimmed) {
    newErrors.identifier = 'Email or phone is required';
  } else if (!isValidEmail && !isValidPhone) {
    newErrors.identifier = 'Enter a valid email or 10-digit phone';
  } else {
    delete newErrors.identifier;
  }
  break;

      case 'password':
        if (!value) newErrors.password = 'Password is required';
        else if (value.length < 6)
          newErrors.password = 'Password must be at least 6 characters';
        else delete newErrors.password;
        break;

      default:
        break;
    }
    return newErrors;
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouched({ ...touched, [name]: true });
    setErrors(validateField(name, value));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (serverError) setServerError('');
    if (touched[name]) setErrors(validateField(name, value));
  };

  const validateForm = () => {
    const newErrors = {};
    Object.keys(formData).forEach(field => {
      Object.assign(newErrors, validateField(field, formData[field]));
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setServerError('');
    setIsSubmitting(true);

    if (!validateForm()) {
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/login`, formData);
      const { token, user } = response.data;

      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      if (user.role === "admin") navigate("/admin-dashboard");
      else if (user.role === "loan_officer") navigate("/loan-officer-dashboard");
      else navigate("/customer-page");

      onClose && onClose();
    } catch (err) {
      const errorMessage = err.response?.data?.message || "Login failed.";
      setServerError(errorMessage);
      setTimeout(() => setServerError(''), 5000);
    } finally {
      setIsSubmitting(false);
    }
  };

  const canSubmit = 
    Object.keys(errors).length === 0 &&
    formData.identifier &&
    formData.password &&
    !isSubmitting;

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="card shadow p-4" style={{ maxWidth: '420px', width: '100%' }}>
        
        {/* Logo */}
        <div className="d-flex justify-content-center mb-3">
          <img src={logo} alt="Logo" style={{ height: '80px', objectFit: 'contain' }} />
        </div>

        <div className="d-flex justify-content-between align-items-center mb-3">
          <h3 className="m-0">Login</h3>
          {onClose && <button className="btn-close" onClick={onClose}></button>}
        </div>

        {serverError && (
          <div className="alert alert-danger py-2">{serverError}</div>
        )}

        <form onSubmit={handleSubmit} noValidate>
          {/* Email or Phone */}
          <div className="mb-3">
            <label className="form-label">Email or Phone</label>
            <input 
              type="text" 
              name="identifier"
              className={`form-control ${touched.identifier && errors.identifier ? 'is-invalid' : ''}`}
              placeholder="Enter email or phone"
              value={formData.identifier}
              onChange={handleChange}
              onBlur={handleBlur}
              disabled={isSubmitting}
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
                className={`form-control ${touched.password && errors.password ? 'is-invalid' : ''}`}
                placeholder="Enter password"
                value={formData.password}
                onChange={handleChange}
                onBlur={handleBlur}
                disabled={isSubmitting}
              />
              <span
                className="input-group-text"
                style={{ cursor: "pointer" }}
                onClick={() => setShowPassword(!showPassword)}
              >
                <i className={`bi ${showPassword ? "bi-eye-slash" : "bi-eye"}`}></i>
              </span>
            </div>
            {touched.password && errors.password && (
              <div className="invalid-feedback d-block">{errors.password}</div>
            )}
          </div>

          {/* Options */}
          <div className="d-flex justify-content-between align-items-center mb-3">
            <div className="form-check">
              <input className="form-check-input" type="checkbox" disabled={isSubmitting} />
              <label className="form-check-label">Remember me</label>
            </div>
            <a href="/forgot-password" className="text-decoration-none">Forgot password?</a>
          </div>

          {/* Login Button */}
          <button 
            type="submit"
            className="btn btn-primary w-100"
            disabled={!canSubmit}
          >
            {isSubmitting ? "Logging in..." : "Login"}
          </button>
        </form>

        {/* Social Login */}
        <div className="text-center my-3">
          <p className="my-2">Or login with</p>

          {/* Google Login */}
          <GoogleLogin
            onSuccess={credentialResponse => {
              console.log('Google login success:', credentialResponse);
              // TODO: send credentialResponse.credential to backend for login
            }}
            onError={() => console.log('Google login failed')}
            width="100%"
          />

          {/* Apple Login */}
          <button
            type="button"
            className="btn btn-dark w-100 mt-2"
            onClick={() => alert("Apple login clicked! Implement OAuth flow on backend.")}
          >
            <i className="bi bi-apple me-2"></i> Login with Apple
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;