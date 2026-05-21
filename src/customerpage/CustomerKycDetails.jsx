import React, { useEffect, useState } from "react";
import {
  User,
  Calendar,
  MapPin,
  Phone,
  Mail,
  Briefcase,
  DollarSign,
  Users,
  Heart,
  FileText,
  Copy,
  Check,
  Image,
} from "react-feather";
import "./CustomerKycDetails.css";

const CustomerKycDetails = ({ user }) => {
  const [kyc, setKyc] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [copySuccess, setCopySuccess] = useState(false);

  const formatDate = (dateString) => {
    if (!dateString) return null;
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) return dateString;
      return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
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

  const handleCopyCode = () => {
    if (!kyc?.kycCode) return;
    navigator.clipboard.writeText(kyc.kycCode);
    setCopySuccess(true);
    setTimeout(() => setCopySuccess(false), 2000);
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

  if (loading) {
    return (
      <div className="kyc-container">
        <div className="kyc-loading">
          <div className="spinner"></div>
          <p>Loading KYC details...</p>
        </div>
      </div>
    );
  }
  if (error) {
    return (
      <div className="kyc-container">
        <div className="kyc-error">
          <p>{error}</p>
        </div>
      </div>
    );
  }
  if (!kyc) {
    return (
      <div className="kyc-container">
        <div className="kyc-empty">
          <p>No KYC details found.</p>
        </div>
      </div>
    );
  }

  const fullName = getFullName();
  const formattedDob = formatDate(kyc.dateofbirth);

  // Helper to render a row with optional icon
  const renderInfoRow = (label, value, Icon = null) => {
    if (value === null || value === undefined || value === "") return null;
    return (
      <div className="info-row">
        <div className="info-label">
          {Icon && <Icon size={14} />}
          <span>{label}</span>
        </div>
        <div className="info-value">{value}</div>
      </div>
    );
  };

  // Document link row (styled as a button)
  const renderDocLink = (label, filePath, Icon = FileText) => {
    if (!filePath) return null;
    const url = `${process.env.REACT_APP_API_URL.replace(/\/$/, "")}/uploads/${filePath}`;
    return (
      <div className="info-row">
        <div className="info-label">
          <Icon size={14} />
          <span>{label}</span>
        </div>
        <div className="info-value">
          <a href={url} target="_blank" rel="noopener noreferrer" className="doc-link">
            View Document
          </a>
        </div>
      </div>
    );
  };

  return (
    <div className="kyc-container">
      <div className="kyc-header">
        <h2>KYC Details</h2>
        <p>Your verified identity information</p>
      </div>

      <div className="kyc-grid">
        {/* KYC Code Card - prominent */}
        <div className="kyc-card code-card">
          <div className="code-header">
            <FileText size={20} />
            <h3>KYC Code</h3>
          </div>
          <div className="code-display">
            <span className="code-value">{kyc.kycCode || "Not assigned"}</span>
            {kyc.kycCode && (
              <button className="copy-code-btn" onClick={handleCopyCode}>
                {copySuccess ? <Check size={16} /> : <Copy size={16} />}
                {copySuccess ? "Copied!" : "Copy"}
              </button>
            )}
          </div>
        </div>

        {/* Personal Information */}
        <div className="kyc-card">
          <div className="card-header">
            <User size={18} />
            <h3>Personal Information</h3>
          </div>
          <div className="card-body">
            {renderInfoRow("Full Name", fullName, User)}
            {renderInfoRow("Date of Birth", formattedDob, Calendar)}
            {renderInfoRow("Gender", kyc.gender)}
            {renderInfoRow("Marital Status", kyc.maritalstatus)}
            {renderInfoRow("National ID", kyc.nationalid)}
            {renderInfoRow("Residential Location", kyc.residentiallocation, MapPin)}
          </div>
        </div>

        {/* Family & Spouse */}
        {(kyc.spousename || kyc.spousecontact || kyc.dependents) && (
          <div className="kyc-card">
            <div className="card-header">
              <Heart size={18} />
              <h3>Family & Spouse</h3>
            </div>
            <div className="card-body">
              {renderInfoRow("Spouse Name", kyc.spousename)}
              {renderInfoRow("Spouse Contact", kyc.spousecontact, Phone)}
              {renderInfoRow("Dependents", kyc.dependents, Users)}
            </div>
          </div>
        )}

        {/* Contact Information */}
        <div className="kyc-card">
          <div className="card-header">
            <Mail size={18} />
            <h3>Contact Information</h3>
          </div>
          <div className="card-body">
            {renderInfoRow("Mobile Number", kyc.mobileNumber, Phone)}
            {renderInfoRow("Email", kyc.email, Mail)}
            {renderInfoRow("Residential Address", kyc.residentialAddress, MapPin)}
            {renderInfoRow("Landmark", kyc.residentialLandmark)}
            {renderInfoRow("City", kyc.city)}
            {renderInfoRow("State", kyc.state)}
            {renderInfoRow("Alternate Phone", kyc.alternatePhone, Phone)}
          </div>
        </div>

        {/* Formal Employment */}
        {(kyc.employmentStatus ||
          kyc.employerName ||
          kyc.jobTitle ||
          kyc.monthlyIncome ||
          kyc.yearsInCurrentEmployment != null ||
          kyc.workPlaceLocation ||
          kyc.employmentId ||
          kyc.payslip ||
          kyc.ghanaCardFront ||
          kyc.ghanaCardBack) && (
          <div className="kyc-card">
            <div className="card-header">
              <Briefcase size={18} />
              <h3>Employment Details (Formal)</h3>
            </div>
            <div className="card-body">
              {renderInfoRow("Employment Status", kyc.employmentStatus)}
              {renderInfoRow("Employer Name", kyc.employerName)}
              {renderInfoRow("Job Title", kyc.jobTitle)}
              {renderInfoRow("Monthly Income", kyc.monthlyIncome, DollarSign)}
              {renderInfoRow("Years in Current Employment", kyc.yearsInCurrentEmployment)}
              {renderInfoRow("Workplace Location", kyc.workPlaceLocation, MapPin)}
              {renderInfoRow("Employment ID", kyc.employmentId)}
              {renderDocLink("Payslip", kyc.payslip)}
              {renderDocLink("Ghana Card (Front)", kyc.ghanaCardFront)}
              {renderDocLink("Ghana Card (Back)", kyc.ghanaCardBack)}
            </div>
          </div>
        )}

        {/* Business Details */}
        {(kyc.businessName ||
          kyc.businessType ||
          kyc.monthlyBusinessIncome ||
          kyc.businessLocation ||
          kyc.businessGpsAddress ||
          kyc.numberOfWorkers != null ||
          kyc.yearsInBusiness != null ||
          kyc.workingCapital != null ||
          kyc.businessPicture) && (
          <div className="kyc-card">
            <div className="card-header">
              <Briefcase size={18} />
              <h3>Business Details</h3>
            </div>
            <div className="card-body">
              {renderInfoRow("Business Name", kyc.businessName)}
              {renderInfoRow("Business Type", kyc.businessType)}
              {renderInfoRow("Monthly Business Income", kyc.monthlyBusinessIncome, DollarSign)}
              {renderInfoRow("Business Location", kyc.businessLocation, MapPin)}
              {renderInfoRow("Business GPS Address", kyc.businessGpsAddress)}
              {renderInfoRow("Number of Workers", kyc.numberOfWorkers, Users)}
              {renderInfoRow("Years in Business", kyc.yearsInBusiness)}
              {renderInfoRow("Working Capital", kyc.workingCapital ? `₵${kyc.workingCapital}` : null, DollarSign)}
              {renderDocLink("Business Picture", kyc.businessPicture, Image)}
            </div>
          </div>
        )}

        {/* References */}
        {(kyc.referenceName1 ||
          kyc.referencePhone1 ||
          kyc.referenceRelationship1 ||
          kyc.referenceName2 ||
          kyc.referencePhone2 ||
          kyc.referenceRelationship2) && (
          <div className="kyc-card">
            <div className="card-header">
              <Users size={18} />
              <h3>References</h3>
            </div>
            <div className="card-body">
              <div className="ref-group">
                <strong>Reference 1</strong>
                {renderInfoRow("Name", kyc.referenceName1)}
                {renderInfoRow("Phone", kyc.referencePhone1, Phone)}
                {renderInfoRow("Relationship", kyc.referenceRelationship1)}
              </div>
              <div className="ref-group">
                <strong>Reference 2</strong>
                {renderInfoRow("Name", kyc.referenceName2)}
                {renderInfoRow("Phone", kyc.referencePhone2, Phone)}
                {renderInfoRow("Relationship", kyc.referenceRelationship2)}
              </div>
            </div>
          </div>
        )}

        {/* Profile Picture */}
        <div className="kyc-card">
          <div className="card-header">
            <Image size={18} />
            <h3>Profile Picture</h3>
          </div>
          <div className="card-body avatar-section">
            {kyc.avatar ? (
              <img
                src={`${process.env.REACT_APP_API_URL.replace(/\/$/, "")}/uploads/${kyc.avatar}`}
                alt="Profile"
                className="kyc-avatar"
              />
            ) : (
              <div className="no-image">No image uploaded</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerKycDetails;