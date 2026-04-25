import React from "react";
import {  Card, Row, Col } from "react-bootstrap";

const ReferencesTab = ({ loan }) => {
  return (
    
      <Card>
        <Card.Header as="h5">References</Card.Header>
        <Card.Body>
          <Row>
            <Col md={6}>
              <h6>Reference 1</h6>
              <p><strong>Name:</strong> {loan.referenceName1 || "N/A"}</p>
              <p><strong>Phone:</strong> {loan.referencePhone1 || "N/A"}</p>
              <p><strong>Relationship:</strong> {loan.referenceRelationship1 || "N/A"}</p>
            </Col>
            <Col md={6}>
              <h6>Reference 2</h6>
              <p><strong>Name:</strong> {loan.referenceName2 || "N/A"}</p>
              <p><strong>Phone:</strong> {loan.referencePhone2 || "N/A"}</p>
              <p><strong>Relationship:</strong> {loan.referenceRelationship2 || "N/A"}</p>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    
  );
};

export default ReferencesTab;