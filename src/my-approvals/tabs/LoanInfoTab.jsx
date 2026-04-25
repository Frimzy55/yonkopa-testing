import React from "react";
import { Card, Row, Col } from "react-bootstrap";

const LoanInfoTab = ({ loan, formatCurrency, formatDate }) => {
  return (
    
      <Card>
        <Card.Header as="h5">Loan Information</Card.Header>
        <Card.Body>
          <Row>
            <Col md={6}>
              <p><strong>Loan ID:</strong> {loan.loan_id || "N/A"}</p>
              <p><strong>Customer Code:</strong> {loan.kyc_code || "N/A"}</p>
              <p><strong>Loan Amount:</strong> {formatCurrency(loan.kyc_loan_amount)}</p>
              <p><strong>Loan Purpose:</strong> {loan.kyc_loan_purpose || "N/A"}</p>
              <p><strong>Loan Term:</strong> {loan.loanTerm || "N/A"} months</p>
              <p><strong>Repayment Frequency:</strong> {loan.repaymentFrequency || "N/A"}</p>
              <p><strong>Interest Rate:</strong> {loan.ratePerAnnum || "N/A"}% per annum</p>
            </Col>
            <Col md={6}>
              <p><strong>Interest Amount:</strong> {formatCurrency(loan.kyc_interest)}</p>
              <p><strong>Total Interest:</strong> {formatCurrency(loan.totalInterest)}</p>
              <p><strong>Number of Payments:</strong> {loan.numberOfPayments || "N/A"}</p>
              <p><strong>Monthly Payment:</strong> {formatCurrency(loan.monthlyPayment)}</p>
              <p><strong>Loan Fees:</strong> {formatCurrency(loan.loanFees)}</p>
              <p><strong>Created At:</strong> {formatDate(loan.loan_created_at)}</p>
              <p><strong>Loan Status:</strong> {loan.momo_loan_status || "N/A"}</p>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    
  );
};

export default LoanInfoTab;