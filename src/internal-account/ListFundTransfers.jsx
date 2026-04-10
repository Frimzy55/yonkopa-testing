import React from "react";

const ListFundTransfers = () => {
  const transfers = [
    { id: 1, from: "123", to: "456", amount: 500 },
    { id: 2, from: "789", to: "111", amount: 1000 },
  ];

  return (
    <div>
      <h2>Fund Transfers</h2>
      <table border="1">
        <thead>
          <tr>
            <th>ID</th>
            <th>From</th>
            <th>To</th>
            <th>Amount</th>
          </tr>
        </thead>
        <tbody>
          {transfers.map((t) => (
            <tr key={t.id}>
              <td>{t.id}</td>
              <td>{t.from}</td>
              <td>{t.to}</td>
              <td>{t.amount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListFundTransfers;