import React from "react";
import { Card, Button } from "react-bootstrap";

const FinalDecisionStep = ({ onBack, onSubmit }) => {
  return (
    <>
      <h5 className="mb-3">Final Decision</h5>

      <Card className="p-3 bg-light border">
        <p className="mb-0">
          Review all details before submitting the evaluation.
        </p>
      </Card>

      <div className="d-flex justify-content-between mt-4">
        <Button variant="outline-secondary" onClick={onBack}>
          ← Previous
        </Button>

        <Button variant="success" onClick={onSubmit}>
          Submit Evaluation
        </Button>
      </div>
    </>
  );
};

export default FinalDecisionStep;