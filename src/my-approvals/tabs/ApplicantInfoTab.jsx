import React from "react";
import { Card, Row, Col } from "react-bootstrap";

const ApplicantInfoTab = ({ loan }) => {
  return (
    <Card>
      <Card.Header as="h5">Personal Information</Card.Header>
      <Card.Body>
        <Row>
          <Col md={6}>
            <p><strong>Title:</strong> {loan.title || "N/A"}</p>
            <p><strong>First Name:</strong> {loan.firstname || "N/A"}</p>
            <p><strong>Middle Name:</strong> {loan.middlename || "N/A"}</p>
            <p><strong>Last Name:</strong> {loan.lastname || "N/A"}</p>
            <p><strong>Full Name:</strong> {loan.applicant_fullName || "N/A"}</p>
            <p><strong>Date of Birth:</strong> {loan.applicant_dob || loan.dateofbirth || "N/A"}</p>
            <p><strong>Gender:</strong> {loan.applicant_gender || loan.personal_gender || "N/A"}</p>
            <p><strong>Marital Status:</strong> {loan.applicant_maritalStatus || loan.personal_maritalstatus || "N/A"}</p>
            <p><strong>National ID:</strong> {loan.applicant_nationalid || loan.personal_nationalid || "N/A"}</p>
          </Col>

          <Col md={6}>
            <p><strong>Dependents:</strong> {loan.dependents || "N/A"}</p>
            <p><strong>Spouse Name:</strong> {loan.spousename || "N/A"}</p>
            <p><strong>Spouse Contact:</strong> {loan.spousecontact || "N/A"}</p>
            <p><strong>Phone:</strong> {loan.applicant_phone || loan.mobileNumber || "N/A"}</p>
            <p><strong>Email:</strong> {loan.applicant_email || loan.contact_email || "N/A"}</p>
            <p><strong>Residential Address:</strong> {loan.applicant_residentialAddress || loan.contact_residentialAddress || "N/A"}</p>
            <p><strong>GPS:</strong> {loan.residentialGPS || "N/A"}</p>
            <p><strong>Location:</strong> {loan.residentiallocation || "N/A"}</p>
            <p><strong>Landmark:</strong> {loan.residentialLandmark || "N/A"}</p>
            <p><strong>City:</strong> {loan.city || "N/A"}</p>
            <p><strong>State:</strong> {loan.state || "N/A"}</p>
            <p><strong>Alternate Phone:</strong> {loan.alternatePhone || "N/A"}</p>
            <p><strong>Avatar:</strong> {loan.avatar ? "Yes" : "No"}</p>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};

export default ApplicantInfoTab;