// src/components/admin/AdminBatchUpload.jsx
import React, { useState } from 'react';

const AdminBatchUpload = () => {
  const [activeTab, setActiveTab] = useState('upload');
  const [file, setFile] = useState(null);
  const [uploadType, setUploadType] = useState('customers');
  const [uploadHistory, setUploadHistory] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) return;
    
    setUploading(true);
    setUploadProgress(0);
    
    // Simulate upload progress
    for (let i = 0; i <= 100; i += 10) {
      await new Promise(resolve => setTimeout(resolve, 200));
      setUploadProgress(i);
    }
    
    // Simulate successful upload
    const newUpload = {
      id: uploadHistory.length + 1,
      type: uploadType,
      filename: file.name,
      date: new Date().toISOString(),
      status: 'completed',
      records: Math.floor(Math.random() * 100) + 50
    };
    
    setUploadHistory([newUpload, ...uploadHistory]);
    setFile(null);
    setUploading(false);
    setUploadProgress(0);
  };

  const downloadTemplate = (type) => {
    // In a real app, this would download the actual template file
    alert(`Downloading template for ${type}`);
  };

  return (
    <div className="admin-batch-upload">
      <div className="page-header">
        <h2>Batch Upload</h2>
      </div>

      <div className="batch-tabs">
        <button 
          className={activeTab === 'upload' ? 'active' : ''}
          onClick={() => setActiveTab('upload')}
        >
          Upload Data
        </button>
        <button 
          className={activeTab === 'history' ? 'active' : ''}
          onClick={() => setActiveTab('history')}
        >
          Upload History
        </button>
        <button 
          className={activeTab === 'templates' ? 'active' : ''}
          onClick={() => setActiveTab('templates')}
        >
          Batch Templates
        </button>
      </div>

      {activeTab === 'upload' && (
        <div className="upload-section">
          <div className="upload-card">
            <h3>Batch Data Upload</h3>
            
            <div className="form-group">
              <label>Data Type</label>
              <select 
                value={uploadType} 
                onChange={(e) => setUploadType(e.target.value)}
                className="select-input"
              >
                <option value="customers">Customers</option>
                <option value="transactions">Transactions</option>
                <option value="loans">Loans</option>
                <option value="accounts">Accounts</option>
              </select>
            </div>

            <div className="upload-area">
              <input
                type="file"
                onChange={handleFileChange}
                accept=".csv, .xlsx, .xls"
                className="file-input"
                id="file-upload"
              />
              <label htmlFor="file-upload" className="file-label">
                {file ? file.name : 'Choose file or drag and drop'}
              </label>
              <p className="file-hint">Supported formats: CSV, Excel (max 10MB)</p>
            </div>

            {uploading && (
              <div className="progress-bar">
                <div 
                  className="progress-fill" 
                  style={{ width: `${uploadProgress}%` }}
                >
                  {uploadProgress}%
                </div>
              </div>
            )}

            <button 
              className="btn-primary" 
              onClick={handleUpload}
              disabled={!file || uploading}
            >
              {uploading ? 'Uploading...' : 'Start Upload'}
            </button>

            <div className="upload-instructions">
              <h4>Instructions:</h4>
              <ul>
                <li>File must be in CSV or Excel format</li>
                <li>First row should contain column headers</li>
                <li>Maximum file size: 10MB</li>
                <li>Download template for correct format</li>
              </ul>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'history' && (
        <div className="history-section">
          <div className="history-filters">
            <input 
              type="text" 
              placeholder="Search uploads..." 
              className="search-input"
            />
            <select className="select-input">
              <option>All Types</option>
              <option>Customers</option>
              <option>Transactions</option>
              <option>Loans</option>
              <option>Accounts</option>
            </select>
          </div>

          <div className="history-table">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Type</th>
                  <th>Filename</th>
                  <th>Records</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {uploadHistory.map(upload => (
                  <tr key={upload.id}>
                    <td>{new Date(upload.date).toLocaleString()}</td>
                    <td>{upload.type}</td>
                    <td>{upload.filename}</td>
                    <td>{upload.records}</td>
                    <td>
                      <span className={`status-badge ${upload.status}`}>
                        {upload.status}
                      </span>
                    </td>
                    <td>
                      <button className="btn-icon">View Details</button>
                      <button className="btn-icon">Download Report</button>
                    </td>
                  </tr>
                ))}
                {uploadHistory.length === 0 && (
                  <tr>
                    <td colSpan="6" className="text-center">
                      No upload history available
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === 'templates' && (
        <div className="templates-section">
          <div className="templates-grid">
            <div className="template-card">
              <div className="template-icon">👥</div>
              <h3>Customer Template</h3>
              <p>Template for bulk customer registration</p>
              <ul>
                <li>Full Name (required)</li>
                <li>Email (required)</li>
                <li>Phone Number</li>
                <li>Address</li>
                <li>Date of Birth</li>
              </ul>
              <button 
                className="btn-secondary"
                onClick={() => downloadTemplate('customers')}
              >
                Download Template
              </button>
            </div>

            <div className="template-card">
              <div className="template-icon">💰</div>
              <h3>Transaction Template</h3>
              <p>Template for bulk transaction import</p>
              <ul>
                <li>Account Number (required)</li>
                <li>Transaction Type (required)</li>
                <li>Amount (required)</li>
                <li>Description</li>
                <li>Transaction Date</li>
              </ul>
              <button 
                className="btn-secondary"
                onClick={() => downloadTemplate('transactions')}
              >
                Download Template
              </button>
            </div>

            <div className="template-card">
              <div className="template-icon">📝</div>
              <h3>Loan Template</h3>
              <p>Template for bulk loan applications</p>
              <ul>
                <li>Customer ID (required)</li>
                <li>Loan Type (required)</li>
                <li>Amount (required)</li>
                <li>Tenure (required)</li>
                <li>Interest Rate</li>
              </ul>
              <button 
                className="btn-secondary"
                onClick={() => downloadTemplate('loans')}
              >
                Download Template
              </button>
            </div>

            <div className="template-card">
              <div className="template-icon">🏦</div>
              <h3>Account Template</h3>
              <p>Template for bulk account creation</p>
              <ul>
                <li>Customer ID (required)</li>
                <li>Account Type (required)</li>
                <li>Initial Deposit</li>
                <li>Branch Code</li>
                <li>Account Officer</li>
              </ul>
              <button 
                className="btn-secondary"
                onClick={() => downloadTemplate('accounts')}
              >
                Download Template
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminBatchUpload;