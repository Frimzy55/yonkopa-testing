import React, { useState } from "react";

const SetLien = () => {
  const [account, setAccount] = useState("");
  const [amount, setAmount] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Set Lien:", { account, amount });
  };

  return (
    <div>
      <h2>Set Lien</h2>
      <form onSubmit={handleSubmit}>
        <input
          placeholder="Account Number"
          value={account}
          onChange={(e) => setAccount(e.target.value)}
        />
        <br />
        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <br />
        <button type="submit">Set Lien</button>
      </form>
    </div>
  );
};

export default SetLien;