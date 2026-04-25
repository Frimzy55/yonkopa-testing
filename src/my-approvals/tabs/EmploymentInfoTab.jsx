import React from "react";
import {  Card, Row, Col } from "react-bootstrap";

const EmploymentInfoTab = ({ loan, formatCurrency, formatDate, isSalariedWorker, isSelfEmployed }) => {
  return (
    
      <Card>
        <Card.Header as="h5">
          Employment Information
          <span className="ms-2 badge bg-info">
            {isSalariedWorker ? "Salaried Worker" : isSelfEmployed ? "Self Employed" : (loan.applicant_employmentStatus || loan.employmentStatus || "Not Specified")}
          </span>
        </Card.Header>
        <Card.Body>
          <p><strong>Employment Status:</strong> {loan.applicant_employmentStatus || loan.employmentStatus || "N/A"}</p>
          
          {isSalariedWorker && (
            <>
              <hr />
              <h6 className="text-primary">🏢 Employment Details</h6>
              <Row>
                <Col md={6}>
                  <p><strong>Employer Name:</strong> {loan.employerName || "N/A"}</p>
                  <p><strong>Job Title:</strong> {loan.jobTitle || "N/A"}</p>
                  <p><strong>Monthly Income:</strong> {formatCurrency(loan.monthlyIncome)}</p>
                  <p><strong>Years in Current Employment:</strong> {loan.yearsInCurrentEmployment || "N/A"}</p>
                </Col>
                <Col md={6}>
                  <p><strong>Work Location:</strong> {loan.workPlaceLocation || "N/A"}</p>
                  <p><strong>Employment ID:</strong> {loan.employmentId || "N/A"}</p>
                  <p><strong>Created At:</strong> {formatDate(loan.employment_created_at)}</p>
                  <p><strong>Updated At:</strong> {formatDate(loan.employment_updated_at)}</p>
                </Col>
              </Row>
            </>
          )}
          
          {isSelfEmployed && (
            <>
              <hr />
              <h6 className="text-success">🏪 Business Details</h6>
              <Row>
                <Col md={6}>
                  <p><strong>Business Name:</strong> {loan.businessName || "N/A"}</p>
                  <p><strong>Business Type:</strong> {loan.businessType || "N/A"}</p>
                  <p><strong>Monthly Business Income:</strong> {formatCurrency(loan.monthlyBusinessIncome)}</p>
                  <p><strong>Business Location:</strong> {loan.businessLocation || loan.business_location || "N/A"}</p>
                  <p><strong>Business GPS Address:</strong> {loan.businessGpsAddress || "N/A"}</p>
                </Col>
                <Col md={6}>
                  <p><strong>Number of Workers:</strong> {loan.numberOfWorkers || "N/A"}</p>
                  <p><strong>Years in Business:</strong> {loan.yearsInBusiness || "N/A"}</p>
                  <p><strong>Working Capital:</strong> {formatCurrency(loan.workingCapital)}</p>
                  <p><strong>Created At:</strong> {formatDate(loan.employment_created_at)}</p>
                  <p><strong>Updated At:</strong> {formatDate(loan.employment_updated_at)}</p>
                </Col>
              </Row>
            </>
          )}
        </Card.Body>
      </Card>
    
  );
};

export default EmploymentInfoTab;