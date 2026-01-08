import React, { useState } from "react";

const CustomerSearchForm = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  const handleSearch = async (e) => {
    e.preventDefault();

    if (!query.trim()) return;

    try {
      const response = await fetch(
        `http://localhost:5000/api/customers/search?q=${query}`
      );

      const data = await response.json();
      setResults(data);
    } catch (error) {
      console.error("Search error:", error);
    }
  };

  return (
    <div className="form-container">
      <h2>Search Customers</h2>

      <form onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Search by Name, Phone, or ID"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />

        <button type="submit">Search</button>
      </form>

      {/* Results */}
      <div className="results">
        <h3>Results</h3>
        {results.length === 0 ? (
          <p>No customers found</p>
        ) : (
          results.map((customer) => (
            <div key={customer.id} className="result-item">
              <p><strong>ID:</strong> {customer.id}</p>
              <p><strong>Name:</strong> {customer.full_name}</p>
              <p><strong>Phone:</strong> {customer.phone}</p>
              <p><strong>Email:</strong> {customer.email}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default CustomerSearchForm;
