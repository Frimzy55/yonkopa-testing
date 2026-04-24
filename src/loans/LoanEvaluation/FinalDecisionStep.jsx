import React, { useState } from "react";
import { Card, Button, Form } from "react-bootstrap";

const FinalDecisionStep = ({ loan,onBack, onSubmit }) => {
  const [comments, setComments] = useState("");
  const [confirmed, setConfirmed] = useState(false);

  const handleSubmit = () => {
    if (!confirmed) return;

    const finalData = {
      comments,
      confirmed,
    };

    onSubmit(finalData);
  };

  return (
    <>
      <h5 className="mb-3">Final Decision</h5>
       <p className="text-muted mb-3">
        Credit information for <strong>{loan?.applicant_fullName}</strong>
        
      </p>
      <div className="mb-3">
                <small className="text-muted text-uppercase d-block mb-1">Loan ID</small>
                <strong className="fs-5">{loan.loan_id || loan.id}</strong>
              </div>

      <Card className="p-3 bg-light border">
        <p className="mb-0">
          Review all details before submitting the evaluation.
        </p>
      </Card>

      {/* Final Comments */}
      <Form.Group className="mt-4">
        <Form.Label>Recommendation</Form.Label>
        <Form.Control
          as="textarea"
          rows={3}
          placeholder="Enter any final remarks..."
          value={comments}
          onChange={(e) => setComments(e.target.value)}
        />
      </Form.Group>

      {/* Confirmation Checkbox */}
      <Form.Check
        type="checkbox"
        label="I confirm that all information provided is accurate."
        className="mt-3"
        checked={confirmed}
        onChange={(e) => setConfirmed(e.target.checked)}
      />

      {/* Buttons */}
      <div className="d-flex justify-content-between mt-4">
        <Button variant="outline-secondary" onClick={onBack}>
          ← Previous
        </Button>

        <Button
          variant="success"
          onClick={handleSubmit}
          disabled={!confirmed}
        >
          Submit Evaluation
        </Button>
      </div>
    </>
  );
};

export default FinalDecisionStep;