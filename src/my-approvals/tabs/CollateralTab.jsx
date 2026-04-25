import React from "react";
import {  Card, Row, Col, Table } from "react-bootstrap";

const CollateralTab = ({ loan, formatDate }) => {
  return (
   
      <Card>
        <Card.Header as="h5">Collateral/Security Information</Card.Header>
        <Card.Body>
          <Row>
            <Col md={6}>
              <p><strong>Collateral ID:</strong> {loan.collateral_id || "N/A"}</p>
              <p><strong>Loan ID:</strong> {loan.loan_id || "N/A"}</p>
              <p><strong>Lending Type:</strong> {loan.lending_type || "N/A"}</p>
              <p><strong>Collateral Type:</strong> {loan.collateral_type || "N/A"}</p>
            </Col>
            <Col md={6}>
              <p><strong>Created At:</strong> {formatDate(loan.collateral_created_at)}</p>
            </Col>
          </Row>

          <hr />
          <h6 className="mb-3">Collateral Details</h6>

          {loan.collateral_data ? (
            <Card className="bg-light border-0">
              <Card.Body>
                <Table bordered size="sm" responsive className="mb-0">
                  <tbody>
                    {(() => {
                      const data = typeof loan.collateral_data === "string"
                        ? JSON.parse(loan.collateral_data)
                        : loan.collateral_data;
                      
                      return Object.entries(data).map(([key, value]) => (
                        <tr key={key}>
                          <td style={{ width: "40%" }}>
                            <strong>{key.replace(/_/g, " ")}</strong>
                          </td>
                          <td>{value || "N/A"}</td>
                        </tr>
                      ));
                    })()}
                  </tbody>
                </Table>
              </Card.Body>
            </Card>
          ) : (
            <p className="text-muted">No collateral data available</p>
          )}
        </Card.Body>
      </Card>

  );
};

export default CollateralTab;