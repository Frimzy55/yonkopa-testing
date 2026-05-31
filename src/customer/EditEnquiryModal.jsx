import React from "react";

const EditEnquiryModal = ({
  show,
  enquiry,
  formData,
  onFormChange,
  onClose,
  onSave,
}) => {
  if (!show || !enquiry) return null;

  const handleInputChange = (e) => {
    onFormChange({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(
        `${process.env.REACT_APP_API_URL}/api/customer-enquiries/${enquiry.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            status: formData.status,
            comments: formData.response,
          }),
        }
      );

      if (!res.ok) throw new Error("Update failed");

      const updatedEnquiry = {
        ...enquiry,
        status: formData.status,
        response: formData.response,
      };
      onSave(updatedEnquiry);
      onClose();
    } catch (err) {
      console.error(err);
      alert("Update failed");
    }
  };

  return (
    <div className="modal show d-block" style={{ backgroundColor: "rgba(0,0,0,0.5)" }}>
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content border-0 rounded-4 shadow">
          <div className="modal-header bg-warning">
            <h5 className="modal-title">Update Status</h5>
            <button type="button" className="btn-close" onClick={onClose}></button>
          </div>

          <div className="modal-body">
            <div className="mb-3">
              <label className="form-label fw-semibold">Status</label>
              <select
                name="status"
                className="form-select"
                value={formData.status}
                onChange={handleInputChange}
              >
                <option value="pending">Pending</option>
                <option value="approved">Approved</option>
                <option value="under_review">Under Review</option>
                <option value="disbursed">Disbursed</option>
                <option value="rejected">Rejected</option>
              </select>
            </div>

            <div>
              <label className="form-label fw-semibold">Comments</label>
              <textarea
                name="response"
                className="form-control"
                rows="4"
                value={formData.response}
                onChange={handleInputChange}
              ></textarea>
            </div>
          </div>

          <div className="modal-footer">
            <button className="btn btn-secondary" onClick={onClose}>
              Cancel
            </button>
            <button className="btn btn-primary" onClick={handleSave}>
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditEnquiryModal;