import React, { useState } from "react";

const CustomerSearchForm = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [searched, setSearched] = useState(false);

  const handleSearch = async (e) => {
    if (e) e.preventDefault();

    if (!query.trim()) return;

    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/api/customers/search?q=${encodeURIComponent(query)}`
      );

      const data = await response.json();

      setResults(data);
      setSearched(true);
    } catch (error) {
      console.error("Search error:", error);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
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
          }}
        />

        <button type="button" onClick={handleSearch}>
          Search
        </button>
      </div>

      <div>
        <h3>Results</h3>

        {!searched ? (
          <p>Search for a customer to see results.</p>
        ) : results.length === 0 ? (
          <p>No customers found</p>
        ) : (
          results.map((customer) => (
            <div key={customer.id}>
              <p>KYC Code: {customer.kyc_code}</p>
              <p>
                Name: {customer.firstName} {customer.middleName}{" "}
                {customer.lastName}
              </p>
              <p>Phone: {customer.mobileNumber}</p>
              <p>Email: {customer.email}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default CustomerSearchForm;