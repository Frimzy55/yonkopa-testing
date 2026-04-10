import React, { useState } from "react";

const LienEnquiries = () => {
  const [account, setAccount] = useState("");

  const handleSearch = () => {
    console.log("Searching lien for:", account);
  };

  return (
    <div>
      <h2>Lien Enquiries</h2>
      <input
        placeholder="Enter Account Number"
        value={account}
        onChange={(e) => setAccount(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>
    </div>
  );
};

export default LienEnquiries;