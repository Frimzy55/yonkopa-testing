import React, { useState } from "react";

const ReleaseLien = () => {
  const [account, setAccount] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Release Lien:", account);
  };

  return (
    <div>
      <h2>Release Lien</h2>
      <form onSubmit={handleSubmit}>
        <input
          placeholder="Account Number"
          value={account}
          onChange={(e) => setAccount(e.target.value)}
        />
        <br />
        <button type="submit">Release</button>
      </form>
    </div>
  );
};

export default ReleaseLien;