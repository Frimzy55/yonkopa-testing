import React from "react";
import {  Card, Row, Col } from "react-bootstrap";

const FinancialAssessmentTab = ({ loan, formatCurrency }) => {
  return (
    
      <Card>
        <Card.Header as="h5">Financial Assessment</Card.Header>
        <Card.Body>
          <Row>
            <Col md={6}>
              <h6>Loan Assessment Details</h6>
              <p><strong>Principal:</strong> {formatCurrency(loan.principal)}</p>
              <p><strong>Assessment Rate:</strong> {loan.assessment_rate || "N/A"}%</p>
              <p><strong>Assessment Loan Term:</strong> {loan.assessment_loan_term || "N/A"} months</p>
              <p><strong>Assessment Interest:</strong> {formatCurrency(loan.assessment_interest)}</p>
              <p><strong>Assessment Loan Amount:</strong> {formatCurrency(loan.assessment_loan_amount)}</p>
              <p><strong>Monthly Installment:</strong> {formatCurrency(loan.monthly_installment)}</p>
            </Col>
            <Col md={6}>
              <h6>Business Financials</h6>
              <p><strong>Monthly Sales Revenue:</strong> {formatCurrency(loan.monthly_sales_revenue)}</p>
              <p><strong>Cost of Goods Sold:</strong> {formatCurrency(loan.cost_of_goods_sold)}</p>
              <p><strong>Gross Profit:</strong> {formatCurrency(loan.gross_profit)}</p>
              <p><strong>Gross Margin:</strong> {loan.gross_margin_percentage || "N/A"}%</p>
              <p><strong>Total Operating Expenses:</strong> {formatCurrency(loan.total_operating_expenses)}</p>
              <p><strong>Net Business Profit:</strong> {formatCurrency(loan.net_business_profit)}</p>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    
  );
};

export default FinancialAssessmentTab;