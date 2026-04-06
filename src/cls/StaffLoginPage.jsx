// src/components/LoginPage.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import myImage from '../image/image1.jpg';
import logo from '../image/yonko.png';
import christmasTree from '../image/cha.png';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import './LoginPage.css';

const LoginPage = ({ onClose }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ identifier: '', password: '' });
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [serverError, setServerError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showChristmasTree, setShowChristmasTree] = useState(false);

  // Show Christmas tree for Dec 24-31
  useEffect(() => {
    const today = new Date();
    if (today.getMonth() === 11 && today.getDate() >= 24 && today.getDate() <= 31) {
      setShowChristmasTree(true);
    }
  }, []);

  // Validation
  // Validation
const validateField = (name, value) => {
  const newErrors = { ...errors };

  if (name === 'identifier') {
    if (!value.trim()) newErrors.identifier = 'Email or phone is required';
    else delete newErrors.identifier; // remove format validation
  }

  if (name === 'password') {
    if (!value) newErrors.password = 'Password is required';
    else if (value.length < 6) newErrors.password = 'Password must be at least 6 characters';
    else delete newErrors.password;
  }

  return newErrors;
};

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (serverError) setServerError('');
    if (touched[name]) setErrors(validateField(name, value));
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouched({ ...touched, [name]: true });
    setErrors(validateField(name, value));
  };

  const validateForm = () => {
    const newTouched = {};
    const newErrors = {};
    Object.keys(formData).forEach(field => {
      newTouched[field] = true;
      Object.assign(newErrors, validateField(field, formData[field]));
    });
    setTouched(newTouched);
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

      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));

      if (user.role === 'admin') navigate('/admin-dashboard');
      else if (user.role === 'loan_officer') navigate('/loan-officer-dashboard');
      else if (user.role === 'manager') navigate('/loan-manager');
       else if (user.role === 'supervisor') navigate('/loan-supervisor');
      //else navigate('/customer-dashboard');

      onClose && onClose();
    } catch (err) {
      setServerError(err.response?.data?.message || 'Login failed. Try again.');
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
    <div className="login-page">
      {/* LEFT IMAGE */}
      <div className="login-image">
        <img src={myImage} alt="Background" />
        {showChristmasTree && (
          <img src={christmasTree} alt="Christmas Tree" className="christmas-tree" />
        )}
      </div>

      {/* RIGHT LOGIN FORM */}
      <div className="login-form-container">
        <div className="login-form-card">
          <div className="logo-container">
            <img src={logo} alt="Logo" className="logo" />
          </div>

          <h2 className="login-title">Login</h2>

          {serverError && <div className="server-error">{serverError}</div>}

          <form onSubmit={handleSubmit} noValidate>
            <div className="form-group">
              <label>Email or Phone</label>
              <input
                type="text"
                name="identifier"
                value={formData.identifier}
                onChange={handleChange}
                onBlur={handleBlur}
                className={touched.identifier && errors.identifier ? 'input-error' : ''}
                placeholder="Enter email or phone"
                disabled={isSubmitting}
              />
              {touched.identifier && errors.identifier && (
                <span className="error-message">{errors.identifier}</span>
              )}
            </div>

            <div className="form-group">
              <label>Password</label>
              <div className="password-input">
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={touched.password && errors.password ? 'input-error' : ''}
                  placeholder="Enter your password"
                  disabled={isSubmitting}
                />
                <span className="toggle-password" onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </span>
              </div>
              {touched.password && errors.password && (
                <span className="error-message">{errors.password}</span>
              )}
            </div>

            <button
              type="submit"
              disabled={!canSubmit}
              className={`btn-login ${isSubmitting ? 'loading' : ''}`}
            >
              {isSubmitting ? 'Logging in...' : 'Login'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;