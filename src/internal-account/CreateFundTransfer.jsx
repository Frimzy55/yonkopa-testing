import React, { useState } from "react";

const CreateFundTransfer = () => {
  const [form, setForm] = useState({
    fromAccount: "",
    toAccount: "",
    amount: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Fund Transfer:", form);
  };

  return (
    <div>
      <h2>Create Fund Transfer</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="fromAccount"
          placeholder="From Account"
          onChange={handleChange}
        />
        <br />
        <input
          type="text"
          name="toAccount"
          placeholder="To Account"
          onChange={handleChange}
        />
        <br />
        <input
          type="number"
          name="amount"
          placeholder="Amount"
          onChange={handleChange}
        />
        <br />
        <button type="submit">Transfer</button>
      </form>
    </div>
  );
};

export default CreateFundTransfer;