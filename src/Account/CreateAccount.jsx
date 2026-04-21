import React, { useState } from "react";

const CreateAccount = () => {
  const [formData, setFormData] = useState({
//customerNumber: "",
    kyc_code: ""  ,  
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
  const [fetchingCustomer, setFetchingCustomer] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const [locked, setLocked] = useState(false); // lock after fetch

  const branches = [
    "Head Office",
    "Downtown Branch",
    "Uptown Branch",
    "Eastside Branch",
    "Westside Branch",
  ];

  const handleChange = (e) => {
    if (locked) return;
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // IMAGE HANDLER (manual upload still allowed if needed)
  const handleImageChange = (e) => {
    if (locked) return;

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

  // FETCH CUSTOMER FROM BACKEND
 const fetchCustomer = async () => {
  if (!formData.kyc_code) {
    setError("Enter KYC code");
    return;
  }

  setFetchingCustomer(true);
  setError("");
  setSuccess("");

  try {
    const res = await fetch(
      `${process.env.REACT_APP_API_URL}/api/customer/${formData.kyc_code}`
    );

    const data = await res.json();

    if (!data.success) {
      setError(data.message);
      return;
    }

    const c = data.customer;

    setFormData((prev) => ({
      ...prev,
      firstName: c.firstname || "",
      lastName: c.lastname || "",
      otherName: c.middlename || "",
      dob: c.personal_dob ? c.personal_dob.split("T")[0] : "",
      gender: c.personal_gender || "",
    }));

    if (c.avatar) {
      setPreview(
        `${process.env.REACT_APP_API_URL.replace(/\/$/, "")}/uploads/${c.avatar}`
      );
    }

    setLocked(true);
    setSuccess("Approved KYC loaded successfully");

  } catch (err) {
    setError("Failed to fetch customer");
  } finally {
    setFetchingCustomer(false);
  }
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

    try {
      await new Promise((res) => setTimeout(res, 1200));

      setSuccess(`Account created successfully! Account No: ${accountNumber}`);

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
      setLocked(false);

    } catch {
      setError("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const resetAll = () => {
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
    setLocked(false);
    setError("");
    setSuccess("");
  };

  return (
    <div className="container py-4">

      <h4 className="fw-bold">Create Customer & Open Account</h4>
      <p className="text-muted">KYC & Account Opening Form</p>

      {error && <div className="alert alert-danger">{error}</div>}
      {success && <div className="alert alert-success">{success}</div>}

      <form onSubmit={handleSubmit}>

        {/* CUSTOMER SECTION */}
        <div className="card shadow-sm mb-4">
          <div className="card-body">

            <h5 className="text-primary">Customer Details</h5>

            <div className="row">

              {/* IMAGE */}
              <div className="col-md-3 text-center">
                <div
                  style={{
                    width: 150,
                    height: 150,
                    border: "2px solid #ccc",
                    borderRadius: 10,
                    overflow: "hidden",
                    margin: "auto",
                    cursor: locked ? "not-allowed" : "pointer",
                  }}
                  onClick={() =>
                    !locked && document.getElementById("img").click()
                  }
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
                  id="img"
                  type="file"
                  hidden
                  onChange={handleImageChange}
                />
              </div>

              {/* FORM */}
              <div className="col-md-9">
                <div className="row g-3">

                  {/* CUSTOMER NUMBER */}
                  <div className="col-md-6">
                    <label>Customer Number</label>
                    <div className="d-flex gap-2">
                      <input
                        className="form-control"
                        name="kyc_code"
                        value={formData.kyc_code}
                        onChange={handleChange}
                        disabled={locked}
                      />

                      <button
                        type="button"
                        className="btn btn-primary"
                        onClick={fetchCustomer}
                        disabled={fetchingCustomer}
                      >
                        {fetchingCustomer ? "Loading..." : "Fetch"}
                      </button>
                    </div>
                  </div>

                  <div className="col-md-6">
                    <label>First Name</label>
                    <input className="form-control" value={formData.firstName} readOnly />
                  </div>

                  <div className="col-md-6">
                    <label>Last Name</label>
                    <input className="form-control" value={formData.lastName} readOnly />
                  </div>

                  <div className="col-md-6">
                    <label>Other Name</label>
                    <input className="form-control" value={formData.otherName} readOnly />
                  </div>

                  <div className="col-md-6">
                    <label>DOB</label>
                    <input className="form-control" value={formData.dob} readOnly />
                  </div>

                  <div className="col-md-6">
                    <label>Gender</label>
                    <input className="form-control" value={formData.gender} readOnly />
                  </div>

                  <div className="col-md-6">
                    <label>Branch</label>
                    <select
                      className="form-select"
                      name="branch"
                      value={formData.branch}
                      onChange={handleChange}
                      disabled={locked}
                    >
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

        {/* ACCOUNT SECTION */}
        <div className="card shadow-sm mb-4">
          <div className="card-body">

            <h5 className="text-success">Account Details</h5>

            <div className="row g-3">

              <div className="col-md-6">
                <label>Product Type</label>
                <select className="form-select" name="productType" onChange={handleChange}>
                  <option value="">Select</option>
                  <option>Savings</option>
                  <option>Current</option>
                </select>
              </div>

              <div className="col-md-6">
                <label>Account Name</label>
                <input className="form-control" name="accountName" onChange={handleChange} />
              </div>

              <div className="col-md-6">
                <label>Description</label>
                <input className="form-control" name="accountDescription" onChange={handleChange} />
              </div>

              <div className="col-md-6">
                <label>Mandate</label>
                <select className="form-select" name="accountMandate" onChange={handleChange}>
                  <option>Single</option>
                  <option>Joint</option>
                </select>
              </div>

            </div>
          </div>
        </div>

        {/* ACCOUNT NUMBER */}
        <button type="button" className="btn btn-success" onClick={generateAccountNumber}>
          Generate Account Number
        </button>

        <div className="mt-2 fw-bold">
          {accountNumber || "No Account Number"}
        </div>

        {/* ACTIONS */}
        <div className="mt-4 d-flex gap-2">
          <button className="btn btn-primary" disabled={loading}>
            {loading ? "Processing..." : "Create Account"}
          </button>

          <button type="button" className="btn btn-secondary" onClick={resetAll}>
            Reset
          </button>
        </div>

      </form>
    </div>
  );
};

export default CreateAccount;