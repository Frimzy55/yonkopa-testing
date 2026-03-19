import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const KycReferenceInfo = ({ formData, handleInputChange, formErrors }) => {
  return (
    <div className="container-fluid">
      <h4 className="mb-4 fw-bold text-primary">Reference Information</h4>

      {/* Reference 1 */}
      <div className="card shadow-sm mb-4">
        <div className="card-header bg-light fw-semibold">
          Reference 1
        </div>
        <div className="card-body row g-3">

          <div className="col-md-6">
            <label className="form-label">Full Name</label>
            <input
              type="text"
              name="referenceName1"
              value={formData.referenceName1}
              onChange={handleInputChange}
              className={`form-control ${formErrors.referenceName1 ? "is-invalid" : ""}`}
              placeholder="Enter full name"
            />
            <div className="invalid-feedback">
              {formErrors.referenceName1}
            </div>
          </div>

          <div className="col-md-6">
            <label className="form-label">Phone Number</label>
            <input
              type="text"
              name="referencePhone1"
              value={formData.referencePhone1}
              onChange={handleInputChange}
              className={`form-control ${formErrors.referencePhone1 ? "is-invalid" : ""}`}
              placeholder="e.g. 0241234567"
            />
            <div className="invalid-feedback">
              {formErrors.referencePhone1}
            </div>
          </div>

          <div className="col-md-6">
            <label className="form-label">Relationship</label>
            <input
              type="text"
              name="referenceRelationship1"
              value={formData.referenceRelationship1}
              onChange={handleInputChange}
              className="form-control"
              placeholder="e.g. Brother, Friend"
            />
          </div>

        </div>
      </div>

      {/* Reference 2 */}
      <div className="card shadow-sm">
        <div className="card-header bg-light fw-semibold">
          Reference 2
        </div>
        <div className="card-body row g-3">

          <div className="col-md-6">
            <label className="form-label">Full Name</label>
            <input
              type="text"
              name="referenceName2"
              value={formData.referenceName2}
              onChange={handleInputChange}
              className={`form-control ${formErrors.referenceName2 ? "is-invalid" : ""}`}
              placeholder="Enter full name"
            />
            <div className="invalid-feedback">
              {formErrors.referenceName2}
            </div>
          </div>

          <div className="col-md-6">
            <label className="form-label">Phone Number</label>
            <input
              type="text"
              name="referencePhone2"
              value={formData.referencePhone2}
              onChange={handleInputChange}
              className={`form-control ${formErrors.referencePhone2 ? "is-invalid" : ""}`}
              placeholder="e.g. 0209876543"
            />
            <div className="invalid-feedback">
              {formErrors.referencePhone2}
            </div>
          </div>

          <div className="col-md-6">
            <label className="form-label">Relationship</label>
            <input
              type="text"
              name="referenceRelationship2"
              value={formData.referenceRelationship2}
              onChange={handleInputChange}
              className="form-control"
              placeholder="e.g. Colleague, Sister"
            />
          </div>

        </div>
      </div>
    </div>
  );
};

export default KycReferenceInfo;