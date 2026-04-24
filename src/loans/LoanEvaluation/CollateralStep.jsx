import React, { useState } from "react";
import { Card, Button, Form } from "react-bootstrap";

const CollateralStep = ({ loan, onBack, onNext }) => {
  const [lendingType, setLendingType] = useState("");
  const [collateralType, setCollateralType] = useState("");
  const [formData, setFormData] = useState({});

  //const [, setFormData] = useState({});

  const handleChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleNext = () => {
  onNext({
    lendingType,
    collateralType,
    formData
  });
};
  const renderCollateralForm = () => {
    switch (collateralType) {
      case "land":
        return (
          <>
            <Form.Group className="mb-2">
              <Form.Label>Land Location</Form.Label>
              <Form.Control
                type="text"
                onChange={(e) => handleChange("landLocation", e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-2">
              <Form.Label>Size (acres)</Form.Label>
              <Form.Control
                type="number"
                onChange={(e) => handleChange("landSize", e.target.value)}
              />
            </Form.Group>
          </>
        );

      case "vehicle":
        return (
          <>
            <Form.Group className="mb-2">
              <Form.Label>Vehicle Model</Form.Label>
              <Form.Control
                type="text"
                onChange={(e) => handleChange("vehicleModel", e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-2">
              <Form.Label>Registration Number</Form.Label>
              <Form.Control
                type="text"
                onChange={(e) =>
                  handleChange("vehicleRegNo", e.target.value)
                }
              />
            </Form.Group>
          </>
        );

      case "building":
        return (
          <>
            <Form.Group className="mb-2">
              <Form.Label>Building Address</Form.Label>
              <Form.Control
                type="text"
                onChange={(e) =>
                  handleChange("buildingAddress", e.target.value)
                }
              />
            </Form.Group>

            <Form.Group className="mb-2">
              <Form.Label>Estimated Value</Form.Label>
              <Form.Control
                type="number"
                onChange={(e) =>
                  handleChange("buildingValue", e.target.value)
                }
              />
            </Form.Group>
          </>
        );

      case "cash_fd":
        return (
          <>
            <Form.Group className="mb-2">
              <Form.Label>Bank Name</Form.Label>
              <Form.Control
                type="text"
                onChange={(e) => handleChange("bankName", e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-2">
              <Form.Label>Amount</Form.Label>
              <Form.Control
                type="number"
                onChange={(e) => handleChange("amount", e.target.value)}
              />
            </Form.Group>
          </>
        );

      default:
        return null;
    }
  };

  return (
    <>
      <h5 className="mb-1">Collateral Details</h5>

      <p className="text-muted mb-3">
        Collateral information for {loan?.applicant_fullName}
     
      </p>
      <div className="mb-3">
                <small className="text-muted text-uppercase d-block mb-1">Loan ID</small>
                <strong className="fs-5">{loan.loan_id || loan.id}</strong>
              </div>

      {/* Lending Type */}
      <Card className="p-3 mb-3 bg-light border">
        <h6 className="mb-3">Lending Type</h6>

        <Form>
          <Form.Check
            type="radio"
            label="Secured Lending"
            value="secured"
            checked={lendingType === "secured"}
            onChange={(e) => {
              setLendingType(e.target.value);
              setCollateralType("");
              setFormData({});
            }}
            className="mb-2"
          />

          <Form.Check
            type="radio"
            label="Unsecured Lending"
            value="unsecured"
            checked={lendingType === "unsecured"}
            onChange={(e) => {
              setLendingType(e.target.value);
              setCollateralType("");
              setFormData({});
            }}
          />

          {/* Collateral Type */}
          {lendingType === "secured" && (
            <Form.Group className="mt-3">
              <Form.Label>Collateral Type</Form.Label>

              <Form.Select
                value={collateralType}
                onChange={(e) => setCollateralType(e.target.value)}
              >
                <option value="">-- Select Type --</option>
                <option value="land">Land</option>
                <option value="vehicle">Vehicle</option>
                <option value="building">Building</option>
                <option value="cash_fd">Cash / Fixed Deposit</option>
              </Form.Select>
            </Form.Group>
          )}
        </Form>
      </Card>

      {/* Dynamic Form */}
      {lendingType === "secured" && collateralType && (
        <Card className="p-3 mb-3 bg-light border">
          <h6 className="mb-3">Collateral Form</h6>
          {renderCollateralForm()}
        </Card>
      )}

      <div className="d-flex justify-content-between mt-4">
        <Button variant="outline-secondary" onClick={onBack}>
          ← Previous
        </Button>

       <Button onClick={handleNext} disabled={!lendingType || (lendingType === "secured" && !collateralType)}>
  Next →
</Button>
      </div>
    </>
  );
};

export default CollateralStep;