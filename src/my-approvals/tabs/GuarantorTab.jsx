import React from "react";
import {  Card, Row, Col } from "react-bootstrap";

const GuarantorTab = ({ loan }) => {
  return (
    
      <Card>
        <Card.Header as="h5">Guarantor Information</Card.Header>
        <Card.Body>
          <Row className="mb-3">
            <Col md={6}>
              <p><strong>Name:</strong> {loan.guarantorName || "N/A"}</p>
              <p><strong>Phone:</strong> {loan.guarantorPhone || "N/A"}</p>
              <p><strong>Address:</strong> {loan.guarantorAddress || "N/A"}</p>
              <p><strong>Residence Location:</strong> {loan.guarantorResidenceLocation || "N/A"}</p>
              <p><strong>ID Number:</strong> {loan.guarantorIdNumber || "N/A"}</p>
              <p><strong>Employee Type:</strong> {loan.guarantorEmployeeType || "N/A"}</p>
            </Col>
          </Row>

          {loan.guarantorEmployeeType === "salary worker" && (
            <Row>
              <Col md={6}>
                <p><strong>Rank:</strong> {loan.guarantorRank || "N/A"}</p>
                <p><strong>Work Location:</strong> {loan.guarantorWorkLocation || "N/A"}</p>
                <p><strong>Employer:</strong> {loan.guarantorNameOfEmployer || "N/A"}</p>
                <p><strong>Years in Service:</strong> {loan.guarantorYearsInService || "N/A"}</p>
              </Col>
            </Row>
          )}

          {loan.guarantorEmployeeType === "self employed" && (
            <Row>
              <Col md={6}>
                <p><strong>Business Name:</strong> {loan.guarantorBusinessName || "N/A"}</p>
                <p><strong>Business Location:</strong> {loan.guarantorBusinessLocation || "N/A"}</p>
                <p><strong>Years in Business:</strong> {loan.guarantorYearsInBusiness || "N/A"}</p>
              </Col>
            </Row>
          )}
        </Card.Body>
      </Card>
    
  );
};

export default GuarantorTab;