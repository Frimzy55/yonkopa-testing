import React from "react";
import { Card, Row, Col } from "react-bootstrap";

const CommentsTab = ({ loan, formatDate }) => {
  return (
    
      <Card>
        <Card.Header as="h5">Loan Final Decision</Card.Header>
        <Card.Body>
          <Row>
            <Col md={12}>
              <h6>Decision Information</h6>
              <p><strong>Comments:</strong> {loan.comments || "No comments provided"}</p>
              <p>
                <strong>Confirmed:</strong>{" "}
                {loan.is_confirmed === true
                  ? "✅ Confirmed"
                  : loan.is_confirmed === false
                  ? "❌ Not Confirmed"
                  : "Pending"}
              </p>
              <p><strong>Decision Date:</strong> {loan.decision_date ? formatDate(loan.decision_date) : "N/A"}</p>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    
  );
};

export default CommentsTab;