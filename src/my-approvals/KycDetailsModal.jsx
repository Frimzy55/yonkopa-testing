import React, { useState } from "react";
import { Modal, Table, Button, ProgressBar } from "react-bootstrap";

const KycDetailsModal = ({ show, onClose, kyc }) => {
  const [step, setStep] = useState(1);
  const totalSteps = 4;

  if (!kyc) return null;

  const nextStep = () => setStep((prev) => Math.min(prev + 1, totalSteps));
  const prevStep = () => setStep((prev) => Math.max(prev - 1, 1));

  return (
    <Modal show={show} onHide={onClose} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>KYC Details</Modal.Title>
      </Modal.Header>

      {/* ✅ Progress Bar */}
      <ProgressBar
        now={(step / totalSteps) * 100}
        label={`Step ${step} of ${totalSteps}`}
        className="mb-3"
      />

      <Modal.Body>

        {/* ✅ STEP 1: PERSONAL DETAILS */}
        {step === 1 && (
          <>
            <h5>Personal Details</h5>
            <Table bordered>
              <tbody>
                <tr><td><b>KYC Code</b></td><td>{kyc.kyc_code}</td></tr>
                <tr><td><b>Full Name</b></td><td>{kyc.applicant_fullName}</td></tr>
                <tr>
                  <td><b>Date of Birth</b></td>
                  <td>
                    {kyc.personal_dob
                      ? new Date(kyc.personal_dob).toLocaleDateString()
                      : "—"}
                  </td>
                </tr>
                <tr><td><b>Gender</b></td><td>{kyc.applicant_gender || "—"}</td></tr>
                <tr><td><b>National ID</b></td><td>{kyc.applicant_national_id || "—"}</td></tr>
              </tbody>
            </Table>
          </>
        )}

        {/* ✅ STEP 2: CONTACT DETAILS */}
        {step === 2 && (
          <>
            <h5>Contact Details</h5>
            <Table bordered>
              <tbody>
                <tr><td><b>Email</b></td><td>{kyc.applicant_email || "—"}</td></tr>
                <tr><td><b>Phone</b></td><td>{kyc.applicant_phone || "—"}</td></tr>
                <tr><td><b>Address</b></td><td>{kyc.applicant_address || "—"}</td></tr>
                <tr><td><b>City</b></td><td>{kyc.applicant_city || "—"}</td></tr>
              </tbody>
            </Table>
          </>
        )}

        {/* ✅ STEP 3: EMPLOYMENT DETAILS */}
        {step === 3 && (
          <>
            <h5>Employment Details</h5>
            <Table bordered>
              <tbody>
                <tr><td><b>Status</b></td><td>{kyc.employment_status || "—"}</td></tr>
                <tr><td><b>Employer Name</b></td><td>{kyc.employer_name || "—"}</td></tr>
                <tr><td><b>Job Title</b></td><td>{kyc.job_title || "—"}</td></tr>
                <tr><td><b>Monthly Income</b></td><td>{kyc.monthly_income || "—"}</td></tr>
                <tr><td><b>Work Address</b></td><td>{kyc.work_address || "—"}</td></tr>
              </tbody>
            </Table>
          </>
        )}

        {/* ✅ STEP 4: REFERENCE DETAILS */}
        {step === 4 && (
          <>
            <h5>Reference Details</h5>
            <Table bordered>
              <tbody>
                <tr><td><b>Reference Name</b></td><td>{kyc.reference_name || "—"}</td></tr>
                <tr><td><b>Reference Phone</b></td><td>{kyc.reference_phone || "—"}</td></tr>
                <tr><td><b>Relationship</b></td><td>{kyc.reference_relationship || "—"}</td></tr>
                <tr><td><b>Reference Address</b></td><td>{kyc.reference_address || "—"}</td></tr>
              </tbody>
            </Table>
          </>
        )}

      </Modal.Body>

      {/* ✅ Footer Navigation */}
      <Modal.Footer className="d-flex justify-content-between">

        <div>
          {step > 1 && (
            <Button variant="secondary" onClick={prevStep} className="me-2">
              Previous
            </Button>
          )}

          {step < totalSteps && (
            <Button variant="primary" onClick={nextStep}>
              Next
            </Button>
          )}
        </div>

        <Button variant="dark" onClick={onClose}>
          Close
        </Button>

      </Modal.Footer>
    </Modal>
  );
};

export default KycDetailsModal;