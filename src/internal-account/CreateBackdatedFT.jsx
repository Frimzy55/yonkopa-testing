import React, { useState } from "react";

const CreateBackdatedFT = () => {
  const [form, setForm] = useState({
    fromAccount: "",
    toAccount: "",
    amount: "",
    date: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Backdated Transfer:", form);
  };

  return (
    <div>
      <h2>Create Backdated Fund Transfer</h2>
      <form onSubmit={handleSubmit}>
        <input name="fromAccount" placeholder="From Account" onChange={handleChange} />
        <br />
        <input name="toAccount" placeholder="To Account" onChange={handleChange} />
        <br />
        <input type="number" name="amount" placeholder="Amount" onChange={handleChange} />
        <br />
        <input type="date" name="date" onChange={handleChange} />
        <br />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default CreateBackdatedFT;