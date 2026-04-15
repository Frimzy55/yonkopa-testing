import React, { useEffect, useState } from "react";
import "./CustomerKycDetails.css";

const CustomerKycDetails = ({ user }) => {
  const [kyc, setKyc] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Helper function to format date
  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  useEffect(() => {
    const fetchKyc = async () => {
      try {
        setLoading(true);
        const res = await fetch(
          `${process.env.REACT_APP_API_URL}/api/kyc-view/${user.userId}`
        );

        if (!res.ok) throw new Error("Failed to fetch KYC details");

        const data = await res.json();
        if (data.success) {
          setKyc(data.data);
        } else {
          setError("No KYC details found");
        }
      } catch (err) {
        console.error(err);
        setError("Unable to load KYC details.");
      } finally {
        setLoading(false);
      }
    };

    if (user?.userId) {
      fetchKyc();
    }
  }, [user]);

  if (loading) {
    return (
      <div className="kyc-container">
        <div className="kyc-card">
          <div className="spinner"></div>
          <p style={{ textAlign: "center" }}>Loading KYC details...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="kyc-container">
        <div className="kyc-card error">
          <p>{error}</p>
        </div>
      </div>
    );
  }

  if (!kyc) {
    return (
      <div className="kyc-container">
        <div className="kyc-card">
          <p>No KYC details found.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="kyc-container">
      <h2 className="kyc-title">KYC Details</h2>

      <div className="kyc-grid">
        {/* PERSONAL INFO */}
        <div className="kyc-card">
          <h3>Personal Information</h3>
          <div className="info-row">
            <div className="info-label">Full Name:</div>
            <div className="info-value">{kyc.firstname}</div>
          </div>
          <div className="info-row">
            <div className="info-label">Date of Birth:</div>
            <div className="info-value">{formatDate(kyc.dateofbirth)}</div>
          </div>
          <div className="info-row">
            <div className="info-label">Gender:</div>
            <div className="info-value">{kyc.gender}</div>
          </div>
          <div className="info-row">
            <div className="info-label">Marital Status:</div>
            <div className="info-value">{kyc.maritalStatus}</div>
          </div>
          <div className="info-row">
            <div className="info-label">Dependents:</div>
            <div className="info-value">{kyc.dependents}</div>
          </div>
        </div>

        {/* CONTACT INFO */}
        <div className="kyc-card">
          <h3>Contact Information</h3>
          <div className="info-row">
            <div className="info-label">Phone:</div>
            <div className="info-value">{kyc.phone}</div>
          </div>
          <div className="info-row">
            <div className="info-label">Email:</div>
            <div className="info-value">{kyc.email}</div>
          </div>
          <div className="info-row">
            <div className="info-label">Address:</div>
            <div className="info-value">{kyc.residentialAddress}</div>
          </div>
          <div className="info-row">
            <div className="info-label">GPS:</div>
            <div className="info-value">{kyc.residentialGPS}</div>
          </div>
        </div>

        {/* ID DETAILS */}
        <div className="kyc-card">
          <h3>Identification</h3>
          <div className="info-row">
            <div className="info-label">National ID:</div>
            <div className="info-value">{kyc.nationalid}</div>
          </div>
        </div>

        {/* EMPLOYMENT */}
        <div className="kyc-card">
          <h3>Employment</h3>
          <div className="info-row">
            <div className="info-label">Status:</div>
            <div className="info-value">{kyc.employmentStatus}</div>
          </div>
        </div>

        {/* AVATAR - FIXED VERSION */}
        <div className="kyc-card">
          <h3>Profile Picture</h3>
          <div className="avatar-container">
            {kyc.avatar ? (
              <img
                src={`${process.env.REACT_APP_API_URL.replace(/\/$/, "")}/uploads/${kyc.avatar}`}
                alt="Profile"
                className="kyc-avatar"
              />
            ) : (
              <div className="info-value" style={{ textAlign: "center" }}>
                No image uploaded
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerKycDetails;