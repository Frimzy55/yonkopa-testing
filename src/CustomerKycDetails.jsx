import React, { useEffect, useState } from "react";
import "./CustomerKycDetails.css";

const CustomerKycDetails = ({ user }) => {
  const [kyc, setKyc] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchKyc = async () => {
      try {
        setLoading(true);
        const res = await fetch(
          `${process.env.REACT_APP_API_URL}/api/customer1-kyc/${user.userId}`
        );

        if (!res.ok) throw new Error("Failed to fetch KYC details");

        const data = await res.json();
        setKyc(data);
      } catch (err) {
        console.error(err);
        setError("Unable to load KYC details.");
      } finally {
        setLoading(false);
      }
    };

    if (user?.userId) fetchKyc();
  }, [user]);

  if (loading) {
    return (
      <div className="kyc-container">
        <div className="kyc-card">
          <div className="spinner"></div>
          <p>Loading KYC details...</p>
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
          <p><strong>Full Name:</strong> {kyc.fullName}</p>
          <p><strong>Date of Birth:</strong> {kyc.dob}</p>
          <p><strong>Gender:</strong> {kyc.gender}</p>
          <p><strong>Marital Status:</strong> {kyc.maritalStatus}</p>
          <p><strong>Dependents:</strong> {kyc.dependents}</p>
        </div>

        {/* CONTACT INFO */}
        <div className="kyc-card">
          <h3>Contact Information</h3>
          <p><strong>Phone:</strong> {kyc.phone}</p>
          <p><strong>Email:</strong> {kyc.email}</p>
          <p><strong>Address:</strong> {kyc.residentialAddress}</p>
          <p><strong>GPS:</strong> {kyc.residentialGPS}</p>
        </div>

        {/* ID DETAILS */}
        <div className="kyc-card">
          <h3>Identification</h3>
          <p><strong>National ID:</strong> {kyc.nationalId}</p>
        </div>

        {/* EMPLOYMENT */}
        <div className="kyc-card">
          <h3>Employment</h3>
          <p><strong>Status:</strong> {kyc.employmentStatus}</p>
        </div>

        {/* AVATAR */}
        <div className="kyc-card">
          <h3>Profile Picture</h3>
          {kyc.avatar ? (
            <img
              src={`${process.env.REACT_APP_API_URL}/uploads/${kyc.avatar}`}
              alt="avatar"
              className="kyc-avatar"
            />
          ) : (
            <p>No image uploaded</p>
          )}
        </div>

      </div>
    </div>
  );
};

export default CustomerKycDetails;