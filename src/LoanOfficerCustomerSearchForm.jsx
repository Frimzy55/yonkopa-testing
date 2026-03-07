import React, { useState } from "react";

const CustomerSearchForm = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [searched, setSearched] = useState(false);

  const handleSearch = async () => {
    if (!query.trim()) return;

    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/api/customers/search?q=${query}`
      );

      const data = await response.json();
      setResults(data);
      setSearched(true);
    } catch (error) {
      console.error("Search error:", error);
    }
  };

  return (
    <div className="form-container" style={{ padding: "20px" }}>
      <h2>Search Customers</h2>

      <div style={{ marginBottom: "20px" }}>
        <input
          type="text"
          placeholder="Search by Name or KYC Code"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          style={{
            padding: "10px",
            width: "250px",
            marginRight: "10px",
            borderRadius: "6px",
            border: "1px solid #ccc",
          }}
        />

        <button
          type="button"
          onClick={handleSearch}
          style={{
            padding: "10px 18px",
            border: "none",
            borderRadius: "6px",
            background: "#007bff",
            color: "#fff",
            cursor: "pointer",
          }}
        >
          Search
        </button>
      </div>

      {/* Results */}
      <div className="results">
        <h3>Results</h3>

        {!searched ? (
          <p>Search for a customer to see results.</p>
        ) : results.length === 0 ? (
          <p>No customers found</p>
        ) : (
          results.map((customer) => (
            <div
              key={customer.id}
              style={{
                border: "1px solid #eee",
                padding: "15px",
                marginBottom: "10px",
                borderRadius: "8px",
                background: "#fafafa",
              }}
            >
              <p>
                <strong>KYC Code:</strong> {customer.kyc_code}
              </p>

              <p>
                <strong>Name:</strong>{" "}
                {customer.firstName} {customer.middleName} {customer.lastName}
              </p>

              <p>
                <strong>Phone:</strong> {customer.mobileNumber}
              </p>

              <p>
                <strong>Email:</strong> {customer.email}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default CustomerSearchForm;