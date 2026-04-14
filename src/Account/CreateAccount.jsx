// CreateAccount.jsx
import React, { useState } from "react";

const CreateAccount = () => {
  const [formData, setFormData] = useState({
    customerNumber: "",
    firstName: "",
    lastName: "",
    otherName: "",
    dob: "",
    gender: "",
    branch: "",
    image: null,

    productType: "",
    accountName: "",
    accountDescription: "",
    accountMandate: "",
  });

  const [preview, setPreview] = useState(null);
  const [accountNumber, setAccountNumber] = useState("");

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const branches = [
    "Head Office",
    "Downtown Branch",
    "Uptown Branch",
    "Eastside Branch",
    "Westside Branch",
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // IMAGE HANDLER
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setError("Only image files are allowed");
      return;
    }

    setFormData((prev) => ({ ...prev, image: file }));

    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  // GENERATE ACCOUNT NUMBER
  const generateAccountNumber = () => {
    const random = Math.floor(1000000000 + Math.random() * 9000000000);
    setAccountNumber(random.toString());
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    if (
      !formData.customerNumber ||
      !formData.firstName ||
      !formData.lastName ||
      !formData.dob ||
      !formData.gender ||
      !formData.branch
    ) {
      setError("Please complete all customer details");
      setLoading(false);
      return;
    }

    if (
      !formData.productType ||
      !formData.accountName ||
      !formData.accountMandate
    ) {
      setError("Please complete all account details");
      setLoading(false);
      return;
    }

    if (!accountNumber) {
      setError("Please generate an account number");
      setLoading(false);
      return;
    }

    try {
      await new Promise((res) => setTimeout(res, 1200));

      setSuccess(
        `Account created successfully! Account No: ${accountNumber}`
      );

      setFormData({
        customerNumber: "",
        firstName: "",
        lastName: "",
        otherName: "",
        dob: "",
        gender: "",
        branch: "",
        image: null,
        productType: "",
        accountName: "",
        accountDescription: "",
        accountMandate: "",
      });

      setPreview(null);
      setAccountNumber("");
    } catch {
      setError("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container py-4">

      {/* HEADER */}
      <div className="mb-4">
        <h4 className="fw-bold">Create Customer & Open Account</h4>
        <p className="text-muted">KYC & Account Opening Form</p>
      </div>

      {/* ALERTS */}
      {error && <div className="alert alert-danger">{error}</div>}
      {success && <div className="alert alert-success">{success}</div>}

      <form onSubmit={handleSubmit}>

        {/* CUSTOMER SECTION */}
        <div className="card shadow-sm mb-4">
          <div className="card-body">

            <h5 className="text-primary mb-3">Customer Details</h5>

            <div className="row">

              {/* IMAGE */}
              <div className="col-md-3 text-center mb-3">
                <div
                  onClick={() => document.getElementById("imageUpload").click()}
                  style={{
                    width: 150,
                    height: 150,
                    border: "2px solid #dee2e6",
                    borderRadius: 10,
                    margin: "auto",
                    overflow: "hidden",
                    background: "#f8f9fa",
                    cursor: "pointer",
                  }}
                >
                  {preview && (
                    <img
                      src={preview}
                      alt="preview"
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                      }}
                    />
                  )}
                </div>

                <input
                  id="imageUpload"
                  type="file"
                  accept="image/*"
                  style={{ display: "none" }}
                  onChange={handleImageChange}
                />
              </div>

              {/* FORM */}
              <div className="col-md-9">
                <div className="row g-3">

                  <div className="col-md-6">
                    <label className="form-label">Customer Number</label>
                    <input className="form-control" name="customerNumber" value={formData.customerNumber} onChange={handleChange} />
                  </div>

                  <div className="col-md-6">
                    <label className="form-label">First Name</label>
                    <input className="form-control" name="firstName" value={formData.firstName} onChange={handleChange} />
                  </div>

                  <div className="col-md-6">
                    <label className="form-label">Last Name</label>
                    <input className="form-control" name="lastName" value={formData.lastName} onChange={handleChange} />
                  </div>

                  <div className="col-md-6">
                    <label className="form-label">Other Name</label>
                    <input className="form-control" name="otherName" value={formData.otherName} onChange={handleChange} />
                  </div>

                  <div className="col-md-6">
                    <label className="form-label">Date of Birth</label>
                    <input type="date" className="form-control" name="dob" value={formData.dob} onChange={handleChange} />
                  </div>

                  <div className="col-md-6">
                    <label className="form-label">Gender</label>
                    <select className="form-select" name="gender" value={formData.gender} onChange={handleChange}>
                      <option value="">Select</option>
                      <option>Male</option>
                      <option>Female</option>
                      <option>Other</option>
                    </select>
                  </div>

                  <div className="col-md-6">
                    <label className="form-label">Branch</label>
                    <select className="form-select" name="branch" value={formData.branch} onChange={handleChange}>
                      <option value="">Select Branch</option>
                      {branches.map((b) => (
                        <option key={b}>{b}</option>
                      ))}
                    </select>
                  </div>

                </div>
              </div>
            </div>

          </div>
        </div>

        {/* ACCOUNT DETAILS */}
        <div className="card shadow-sm mb-4">
          <div className="card-body">

            <h5 className="text-success mb-3">Account Details</h5>

            <div className="row g-3">

              <div className="col-md-6">
                <label className="form-label">Product Type</label>
                <select className="form-select" name="productType" value={formData.productType} onChange={handleChange}>
                  <option value="">Select</option>
                  <option>Savings</option>
                  <option>Current</option>
                  <option>Fixed Deposit</option>
                  <option>Business</option>
                </select>
              </div>

              <div className="col-md-6">
                <label className="form-label">Account Name</label>
                <input className="form-control" name="accountName" value={formData.accountName} onChange={handleChange} />
              </div>

              <div className="col-md-6">
                <label className="form-label">Account Description</label>
                <input className="form-control" name="accountDescription" value={formData.accountDescription} onChange={handleChange} />
              </div>

              <div className="col-md-6">
                <label className="form-label">Account Mandate</label>
                <select className="form-select" name="accountMandate" value={formData.accountMandate} onChange={handleChange}>
                  <option value="">Select</option>
                  <option>Single Signatory</option>
                  <option>Joint Signatory</option>
                  <option>Any to Sign</option>
                  <option>All Must Sign</option>
                </select>
              </div>

            </div>

          </div>
        </div>

        {/* ACCOUNT NUMBER */}
        <div className="card shadow-sm mb-4">
          <div className="card-body">

            <h5 className="mb-3">Account Number</h5>

            <div className="d-flex gap-3 align-items-center">

              <button
                type="button"
                className="btn btn-success"
                onClick={generateAccountNumber}
              >
                Generate Account Number
              </button>

              <div className="border rounded px-3 py-2 bg-light fw-bold">
                {accountNumber || "No Account Number Generated"}
              </div>

            </div>

          </div>
        </div>

        {/* BUTTONS */}
        <div className="d-flex gap-2">
          <button className="btn btn-primary px-4" disabled={loading}>
            {loading ? "Processing..." : "Create Account"}
          </button>

          <button
            type="button"
            className="btn btn-outline-secondary"
            onClick={() => {
              setFormData({
                customerNumber: "",
                firstName: "",
                lastName: "",
                otherName: "",
                dob: "",
                gender: "",
                branch: "",
                image: null,
                productType: "",
                accountName: "",
                accountDescription: "",
                accountMandate: "",
              });
              setPreview(null);
              setAccountNumber("");
            }}
          >
            Reset
          </button>
        </div>

      </form>
    </div>
  );
};

export default CreateAccount;