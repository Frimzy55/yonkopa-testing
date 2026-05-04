import React, { useState, useEffect } from 'react';
import SignUpPage from './SignUpPage';
import LoginPage from './LoginPage';
import logo from '../image/yonko.png';

const CustomerLanding = () => {
  const [showSignUp, setShowSignUp] = useState(false);
  const [showLogin, setShowLogin] = useState(false);

  // Prevent body scroll only when modal is open
  useEffect(() => {
    document.body.style.overflow =
      showSignUp || showLogin ? 'hidden' : 'auto';

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [showSignUp, showLogin]);

  const handleCloseSignUp = () => setShowSignUp(false);
  const handleCloseLogin = () => setShowLogin(false);

  const handleSwitchToLogin = () => {
    setShowSignUp(false);
    setShowLogin(true);
  };

  const handleSwitchToSignUp = () => {
    setShowLogin(false);
    setShowSignUp(true);
  };

  return (
    <div className="bg-light min-vh-100 d-flex flex-column">
      {/* HEADER */}
      <nav className="navbar navbar-light bg-white shadow-sm py-2">
        <div className="container d-flex justify-content-between align-items-center">
          <div className="d-flex align-items-center gap-2">
            <img
              src={logo}
              alt="Yonkopa Logo"
              style={{
                width: '40px',
                height: '40px',
                objectFit: 'contain',
              }}
            />
            <h3 className="navbar-brand m-0 fw-semibold">
              Yonkopa Micro Credit
            </h3>
          </div>

          <button
            className="btn btn-primary px-4 rounded-pill"
            onClick={() => setShowLogin(true)}
          >
            Login
          </button>
        </div>
      </nav>

      {/* HERO SECTION */}
      <section
        className="py-5 text-white text-center"
        style={{
          background:
            'linear-gradient(135deg, #0d6efd 0%, #0b5ed7 100%)',
        }}
      >
        <div className="container py-4">
          <h1 className="display-4 fw-bold mb-3">
            Get the Loan You Need
          </h1>

          <p className="lead mb-4">
            Simple, fast, and transparent loan process with
            competitive rates
          </p>

          <div className="d-flex justify-content-center gap-3 flex-wrap">
            <button
              className="btn btn-light text-primary px-4 py-2 rounded-pill fw-semibold"
              onClick={() => setShowSignUp(true)}
            >
              Create Account
            </button>

            <button
              className="btn btn-outline-light px-4 py-2 rounded-pill"
              onClick={() => setShowLogin(true)}
            >
              Login
            </button>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="py-5">
        <div className="container">
          <div className="row g-4">
            <div className="col-md-4">
              <div className="card shadow-sm h-100 text-center p-4 border-0 rounded-4">
                <div className="mb-3">
                  <i className="bi bi-clock-history fs-1 text-primary"></i>
                </div>
                <h4 className="fw-semibold">Quick Approval</h4>
                <p className="text-muted">
                  Get decisions within 24 hours
                </p>
              </div>
            </div>

            <div className="col-md-4">
              <div className="card shadow-sm h-100 text-center p-4 border-0 rounded-4">
                <div className="mb-3">
                  <i className="bi bi-percent fs-1 text-primary"></i>
                </div>
                <h4 className="fw-semibold">Low Rates</h4>
                <p className="text-muted">
                  Competitive rates from 5.99% APR
                </p>
              </div>
            </div>

            <div className="col-md-4">
              <div className="card shadow-sm h-100 text-center p-4 border-0 rounded-4">
                <div className="mb-3">
                  <i className="bi bi-shield-check fs-1 text-primary"></i>
                </div>
                <h4 className="fw-semibold">No Hidden Fees</h4>
                <p className="text-muted">
                  Transparent pricing, no surprises
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-2 bg-dark text-white-50 text-center">
        <div className="container">
          <p className="mb-0">
            &copy; {new Date().getFullYear()} Yonkopa Micro Credit.
            All rights reserved.
          </p>
        </div>
      </footer>

      {/* SIGN UP MODAL */}
      {showSignUp && (
        <SignUpPage
          onClose={handleCloseSignUp}
          onSwitchToLogin={handleSwitchToLogin}
        />
      )}

      {/* LOGIN MODAL */}
      {showLogin && (
        <LoginPage
          onClose={handleCloseLogin}
          onSwitchToSignUp={handleSwitchToSignUp}
        />
      )}
    </div>
  );
};

export default CustomerLanding;
