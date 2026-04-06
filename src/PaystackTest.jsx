import React, { useState } from "react";
import axios from "axios";

const PaystackTest = () => {
  const [email, setEmail] = useState("customer@test.com");
  const [amount, setAmount] = useState(""); // user will type the amount

  // Function to handle payment
  const handlePayNow = async () => {
    if (!amount || isNaN(amount) || Number(amount) <= 0) {
      return alert("Please enter a valid amount");
    }

    try {
      // 1️⃣ Initialize payment on backend
      const initRes = await axios.post("http://localhost:5000/api/payment/initialize", {
        email,
        amount: Number(amount),
      });

      const { reference } = initRes.data.data;

      if (!window.PaystackPop) {
        return alert("Paystack script not loaded");
      }

      // 2️⃣ Open Paystack inline modal
      const handler = window.PaystackPop.setup({
        key: "pk_test_a831f2ddc214f42275db01b9a52d3ebf15edd407", // Test Public Key
        email,
        amount: Number(amount) * 100, // convert to pesewas
        currency: "GHS",
        ref: reference,
        callback: function (response) {
          // 3️⃣ Verify payment after success
          verifyPayment(response.reference);
        },
        onClose: function () {
          alert("Payment closed");
        },
      });

      handler.openIframe();
    } catch (err) {
      console.error("Payment initialization error:", err.response?.data || err.message);
      alert("Payment initialization failed: " + (err.response?.data?.error || err.message));
    }
  };

  // Function to verify payment on backend
  const verifyPayment = async (reference) => {
    try {
      const verifyRes = await axios.post("http://localhost:5000/api/payment/verify", { reference });
      alert("Payment verified and stored! Status: " + verifyRes.data.data.status);
    } catch (err) {
      console.error("Verification error:", err.response?.data || err.message);
      alert("Payment verification failed");
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "50px auto", textAlign: "center" }}>
      <h2>Test Paystack Payment (GHS)</h2>

      <div style={{ marginBottom: "10px" }}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{ width: "100%", padding: "10px", marginBottom: "10px" }}
        />
        <input
          type="number"
          placeholder="Enter amount (₵)"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          style={{ width: "100%", padding: "10px", marginBottom: "10px" }}
        />
      </div>

      <button
        onClick={handlePayNow}
        style={{ padding: "10px 20px", fontSize: "16px", cursor: "pointer" }}
      >
        Pay Now
      </button>
    </div>
  );
};

export default PaystackTest;