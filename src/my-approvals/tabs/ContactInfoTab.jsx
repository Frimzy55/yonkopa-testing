import React from "react";
import { Card, Row, Col } from "react-bootstrap";

const ContactInfoTab = ({ loan }) => {
  return (
    
      <Card>
        <Card.Header as="h5">Contact Information</Card.Header>
        <Card.Body>
          <Row>
            <Col md={6}>
              <p><strong>Mobile Number:</strong> {loan.mobileNumber || "N/A"}</p>
              <p><strong>Email:</strong> {loan.contact_email || "N/A"}</p>
              <p><strong>Alternate Phone:</strong> {loan.alternatePhone || "N/A"}</p>
              <p><strong>City:</strong> {loan.city || "N/A"}</p>
              <p><strong>State:</strong> {loan.state || "N/A"}</p>
            </Col>
            <Col md={6}>
              <p><strong>Residential Address:</strong> {loan.contact_residentialAddress || "N/A"}</p>
              <p><strong>Residential Landmark:</strong> {loan.residentialLandmark || "N/A"}</p>
              <p><strong>GPS Address:</strong> {loan.residentialGPS || "N/A"}</p>
            </Col>
          </Row>
        </Card.Body>
      </Card>

  );
};

export default ContactInfoTab;