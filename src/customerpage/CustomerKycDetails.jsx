import React, { useEffect, useState } from "react";
import "./CustomerKycDetails.css";

const CustomerKycDetails = ({ user }) => {
  const [kyc, setKyc] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const formatDate = (dateString) => {
    if (!dateString) return null;
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) return dateString;
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    } catch {
      return dateString;
    }
  };

  const getFullName = () => {
    const parts = [];
    if (kyc?.title) parts.push(kyc.title);
    if (kyc?.firstname) parts.push(kyc.firstname);
    if (kyc?.middlename) parts.push(kyc.middlename);
    if (kyc?.lastname) parts.push(kyc.lastname);
    return parts.length ? parts.join(" ") : null;
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
    if (user?.userId) fetchKyc();
  }, [user]);

  if (loading) return (<div className="kyc-container"><div className="kyc-card"><div className="spinner"></div><p>Loading KYC details...</p></div></div>);
  if (error) return (<div className="kyc-container"><div className="kyc-card error"><p>{error}</p></div></div>);
  if (!kyc) return (<div className="kyc-container"><div className="kyc-card"><p>No KYC details found.</p></div></div>);

  // Helper to conditionally render a row
  const renderRow = (label, value) => {
    if (value === null || value === undefined || value === "") return null;
    return (
      <div className="info-row">
        <div className="info-label">{label}:</div>
        <div className="info-value">{value}</div>
      </div>
    );
  };

  // Helper for document links
  const renderDocLink = (label, filePath) => {
    if (!filePath) return null;
    const url = `${process.env.REACT_APP_API_URL.replace(/\/$/, "")}/uploads/${filePath}`;
    return (
      <div className="info-row">
        <div className="info-label">{label}:</div>
        <div className="info-value">
          <a href={url} target="_blank" rel="noopener noreferrer">View Document</a>
        </div>
      </div>
    );
  };

  const fullName = getFullName();
  const formattedDob = formatDate(kyc.dateofbirth);

  // Determine if each section has any data
  const hasPersonal = kyc.kycCode || fullName || formattedDob || kyc.gender || kyc.maritalstatus || kyc.nationalid || kyc.residentiallocation;
  const hasFamily = kyc.spousename || kyc.spousecontact || kyc.dependents;
  const hasContact = kyc.mobileNumber || kyc.email || kyc.residentialAddress || kyc.residentialLandmark || kyc.city || kyc.state || kyc.alternatePhone;
  const hasEmployment = kyc.employmentStatus || kyc.employerName || kyc.jobTitle || kyc.monthlyIncome || kyc.yearsInCurrentEmployment != null || kyc.workPlaceLocation || kyc.employmentId || kyc.payslip || kyc.ghanaCardFront || kyc.ghanaCardBack;
  const hasBusiness = kyc.businessName || kyc.businessType || kyc.monthlyBusinessIncome || kyc.businessLocation || kyc.businessGpsAddress || kyc.numberOfWorkers != null || kyc.yearsInBusiness != null || kyc.workingCapital != null || kyc.businessPicture;
  const hasReferences = kyc.referenceName1 || kyc.referencePhone1 || kyc.referenceRelationship1 || kyc.referenceName2 || kyc.referencePhone2 || kyc.referenceRelationship2;

  return (
    <div className="kyc-container">
      <h2 className="kyc-title">KYC Details</h2>
      <div className="kyc-grid">

        {/* Personal Information */}
        {hasPersonal && (
          <div className="kyc-card">
            <h3>Personal Information</h3>
            {renderRow("KYC Code", kyc.kycCode)}
            {renderRow("Full Name", fullName)}
            {renderRow("Date of Birth", formattedDob)}
            {renderRow("Gender", kyc.gender)}
            {renderRow("Marital Status", kyc.maritalstatus)}
            {renderRow("National ID", kyc.nationalid)}
            {renderRow("Residential Location", kyc.residentiallocation)}
          </div>
        )}

        {/* Family & Spouse Details */}
        {hasFamily && (
          <div className="kyc-card">
            <h3>Family & Spouse Details</h3>
            {renderRow("Spouse Name", kyc.spousename)}
            {renderRow("Spouse Contact", kyc.spousecontact)}
            {renderRow("Dependents", kyc.dependents)}
          </div>
        )}

        {/* Contact Information */}
        {hasContact && (
          <div className="kyc-card">
            <h3>Contact Information</h3>
            {renderRow("Mobile Number", kyc.mobileNumber)}
            {renderRow("Email", kyc.email)}
            {renderRow("Residential Address", kyc.residentialAddress)}
            {renderRow("Landmark", kyc.residentialLandmark)}
            {renderRow("City", kyc.city)}
            {renderRow("State", kyc.state)}
            {renderRow("Alternate Phone", kyc.alternatePhone)}
          </div>
        )}

        {/* Employment Details (Formal) */}
        {hasEmployment && (
          <div className="kyc-card">
            <h3>Employment Details (Formal)</h3>
            {renderRow("Employment Status", kyc.employmentStatus)}
            {renderRow("Employer Name", kyc.employerName)}
            {renderRow("Job Title", kyc.jobTitle)}
            {renderRow("Monthly Income", kyc.monthlyIncome)}
            {renderRow("Years in Current Employment", kyc.yearsInCurrentEmployment)}
            {renderRow("Workplace Location", kyc.workPlaceLocation)}
            {renderRow("Employment ID", kyc.employmentId)}
            {renderDocLink("Payslip", kyc.payslip)}
            {renderDocLink("Ghana Card (Front)", kyc.ghanaCardFront)}
            {renderDocLink("Ghana Card (Back)", kyc.ghanaCardBack)}
          </div>
        )}

        {/* Business Details */}
        {hasBusiness && (
          <div className="kyc-card">
            <h3>Business Details</h3>
            {renderRow("Business Name", kyc.businessName)}
            {renderRow("Business Type", kyc.businessType)}
            {renderRow("Monthly Business Income", kyc.monthlyBusinessIncome)}
            {renderRow("Business Location", kyc.businessLocation)}
            {renderRow("Business GPS Address", kyc.businessGpsAddress)}
            {renderRow("Number of Workers", kyc.numberOfWorkers)}
            {renderRow("Years in Business", kyc.yearsInBusiness)}
            {renderRow("Working Capital", kyc.workingCapital ? `₵${kyc.workingCapital}` : null)}
            {renderDocLink("Business Picture", kyc.businessPicture)}
          </div>
        )}

        {/* References */}
        {hasReferences && (
          <div className="kyc-card">
            <h3>References</h3>
            {renderRow("Reference 1 - Name", kyc.referenceName1)}
            {renderRow("Phone 1", kyc.referencePhone1)}
            {renderRow("Relationship 1", kyc.referenceRelationship1)}
            <hr style={{ margin: "0.75rem 0", borderColor: "#eef2f6" }} />
            {renderRow("Reference 2 - Name", kyc.referenceName2)}
            {renderRow("Phone 2", kyc.referencePhone2)}
            {renderRow("Relationship 2", kyc.referenceRelationship2)}
          </div>
        )}

        {/* Profile Picture (always show if avatar exists) */}
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
              <div className="info-value" style={{ textAlign: "center" }}>No image uploaded</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerKycDetails;