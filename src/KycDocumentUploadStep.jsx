import React, { useRef, useState } from "react";
import Webcam from "react-webcam";

const DocumentUploadStep = ({ formData, handleInputChange, setFormData }) => {
  const webcamRef = useRef(null);
  const [showCamera, setShowCamera] = useState(false);

  const documents = [
    { label: "ID Document", name: "idDocument" },
    { label: "Address Proof", name: "addressProof" },
    { label: "Income Proof", name: "incomeProof" },
  ];

  const capturePhoto = () => {
    const imageSrc = webcamRef.current.getScreenshot();

    setFormData(prev => ({
      ...prev,
      livePhoto: {
        file: imageSrc,
        preview: imageSrc
      }
    }));

    setShowCamera(false);
  };

  return (
    <div className="form-step">
      <h3 className="text-success mb-4">Document Upload</h3>

      <div className="doc-grid d-flex flex-wrap gap-3 justify-content-start">

        {documents.map((doc) => (
          <div
            key={doc.name}
            className="doc-card d-flex flex-column justify-content-center align-items-center rounded-circle shadow-sm border bg-white text-center"
            style={{
              width: "150px",
              height: "150px",
              cursor: "pointer",
              padding: "10px",
            }}
          >
            <strong style={{ fontSize: "0.8rem", marginBottom: "5px" }}>
              {doc.label}
            </strong>

            {formData[doc.name]?.preview ? (
              <img
                src={formData[doc.name].preview}
                alt={doc.label}
                className="rounded-circle mb-2"
                style={{ width: "60px", height: "60px", objectFit: "cover" }}
              />
            ) : (
              <i
                className="bi bi-file-earmark-arrow-up-fill mb-2"
                style={{ fontSize: "1.8rem", color: "#28a745" }}
              ></i>
            )}

            <input
              type="file"
              id={doc.name}
              name={doc.name}
              className="d-none"
              onChange={handleInputChange}
              accept=".jpg,.jpeg,.png,.pdf"
            />

            <label htmlFor={doc.name} className="btn btn-success btn-sm">
              Upload
            </label>

            <small className="text-muted mt-1">JPG, PNG, PDF</small>
          </div>
        ))}

        {/* Live Photo Capture */}
        <div
          className="doc-card d-flex flex-column justify-content-center align-items-center rounded-circle shadow-sm border bg-light text-center"
          style={{
            width: "150px",
            height: "150px",
            padding: "10px",
          }}
        >
          <strong style={{ fontSize: "0.8rem", marginBottom: "5px" }}>
            Live Photo
          </strong>

          {formData.livePhoto?.preview ? (
            <img
              src={formData.livePhoto.preview}
              alt="Live"
              className="rounded-circle mb-2"
              style={{ width: "60px", height: "60px", objectFit: "cover" }}
            />
          ) : (
            <i
              className="bi bi-camera-fill mb-2"
              style={{ fontSize: "1.8rem", color: "#007bff" }}
            ></i>
          )}

          <button
            type="button"
            className="btn btn-primary btn-sm"
            onClick={() => setShowCamera(true)}
          >
            Open Camera
          </button>

          <small className="text-muted mt-1">Use Webcam</small>
        </div>
      </div>

      {/* Webcam Modal */}
      {showCamera && (
        <div className="camera-modal">
          <div className="camera-box">
            <Webcam
              ref={webcamRef}
              screenshotFormat="image/jpeg"
              width={350}
              videoConstraints={{
                facingMode: "user"
              }}
            />

            <div style={{ marginTop: "10px" }}>
              <button className="btn btn-success me-2" onClick={capturePhoto}>
                Capture
              </button>

              <button
                className="btn btn-danger"
                onClick={() => setShowCamera(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DocumentUploadStep;