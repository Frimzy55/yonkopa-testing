import React from "react";
import {  Card } from "react-bootstrap";

const MobileMoneyTab = ({ loan, formatDate }) => {
  return (
    
      <Card>
        <Card.Header as="h5">Mobile Money Information</Card.Header>
        <Card.Body>
          <p><strong>Provider:</strong> {loan.momoProvider || "N/A"}</p>
          <p><strong>Mobile Money Number:</strong> {loan.momoNumber || "N/A"}</p>
          <p><strong>Account Name:</strong> {loan.momoAccountName || "N/A"}</p>
          <p><strong>Created At:</strong> {formatDate(loan.momo_created_at)}</p>
        </Card.Body>
      </Card>
    
  );
};

export default MobileMoneyTab;