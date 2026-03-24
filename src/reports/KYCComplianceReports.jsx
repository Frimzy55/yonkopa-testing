import React, { useState, useEffect } from 'react';
import { Card, Row, Col, Table, Badge, Button, Form, Spinner, ProgressBar } from 'react-bootstrap';

const KYCComplianceReports = () => {
  const [loading, setLoading] = useState(false);
  const [complianceData, setComplianceData] = useState([]);
  const [statusFilter, setStatusFilter] = useState('all');

  const sampleData = [
    { id: 'C001', name: 'John Doe', type: 'Individual', verificationStatus: 'Verified', documentStatus: 'Complete', lastUpdated: '2024-03-01', riskLevel: 'Low' },
    { id: 'C002', name: 'Jane Smith', type: 'Individual', verificationStatus: 'Pending', documentStatus: 'Incomplete', lastUpdated: '2024-03-02', riskLevel: 'Medium' },
    { id: 'C003', name: 'Tech Corp', type: 'Corporate', verificationStatus: 'Verified', documentStatus: 'Complete', lastUpdated: '2024-03-03', riskLevel: 'Low' },
    { id: 'C004', name: 'Alice Brown', type: 'Individual', verificationStatus: 'Failed', documentStatus: 'Expired', lastUpdated: '2024-03-04', riskLevel: 'High' },
    { id: 'C005', name: 'Bob Johnson', type: 'Individual', verificationStatus: 'Verified', documentStatus: 'Complete', lastUpdated: '2024-03-05', riskLevel: 'Low' },
  ];

  useEffect(() => {
    fetchComplianceData();
  }, []);

  const fetchComplianceData = () => {
    setLoading(true);
    setTimeout(() => {
      setComplianceData(sampleData);
      setLoading(false);
    }, 1000);
  };

  const filteredData = complianceData.filter(item => {
    if (statusFilter === 'all') return true;
    return item.verificationStatus.toLowerCase() === statusFilter;
  });

  const stats = {
    total: complianceData.length,
    verified: complianceData.filter(c => c.verificationStatus === 'Verified').length,
    pending: complianceData.filter(c => c.verificationStatus === 'Pending').length,
    failed: complianceData.filter(c => c.verificationStatus === 'Failed').length,
    complianceRate: (complianceData.filter(c => c.verificationStatus === 'Verified').length / complianceData.length) * 100 || 0
  };

  const getStatusBadge = (status) => {
    const variants = {
      'Verified': 'success',
      'Pending': 'warning',
      'Failed': 'danger',
      'Complete': 'success',
      'Incomplete': 'warning',
      'Expired': 'danger'
    };
    return <Badge bg={variants[status] || 'secondary'}>{status}</Badge>;
  };

  const getRiskBadge = (risk) => {
    const variants = {
      'Low': 'success',
      'Medium': 'warning',
      'High': 'danger'
    };
    return <Badge bg={variants[risk]}>{risk}</Badge>;
  };

  return (
    <div>
      <Row className="mb-4">
        <Col>
          <h5 className="mb-3">KYC & Compliance Reports</h5>
        </Col>
      </Row>

      {/* Summary Cards */}
      <Row className="mb-4">
        <Col md={3}>
          <Card className="text-center">
            <Card.Body>
              <h6 className="text-muted">Total Customers</h6>
              <h3 className="mb-0">{stats.total}</h3>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="text-center">
            <Card.Body>
              <h6 className="text-muted">Verified</h6>
              <h3 className="mb-0 text-success">{stats.verified}</h3>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="text-center">
            <Card.Body>
              <h6 className="text-muted">Pending Verification</h6>
              <h3 className="mb-0 text-warning">{stats.pending}</h3>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="text-center">
            <Card.Body>
              <h6 className="text-muted">Failed/Rejected</h6>
              <h3 className="mb-0 text-danger">{stats.failed}</h3>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Compliance Rate */}
      <Card className="mb-4">
        <Card.Body>
          <h6>Overall Compliance Rate</h6>
          <ProgressBar now={stats.complianceRate} label={`${stats.complianceRate.toFixed(1)}%`} variant="success" />
        </Card.Body>
      </Card>

      {/* Filters */}
      <Card className="mb-4">
        <Card.Body>
          <Row>
            <Col md={6}>
              <Form.Group>
                <Form.Label>Verification Status</Form.Label>
                <Form.Select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
                  <option value="all">All</option>
                  <option value="verified">Verified</option>
                  <option value="pending">Pending</option>
                  <option value="failed">Failed</option>
                </Form.Select>
              </Form.Group>
            </Col>
            <Col md={6} className="d-flex align-items-end">
              <Button variant="primary" onClick={fetchComplianceData} className="w-100">
                <i className="bi bi-arrow-repeat me-2"></i>Refresh Data
              </Button>
            </Col>
          </Row>
        </Card.Body>
      </Card>

      {/* Compliance Table */}
      <Card>
        <Card.Header className="d-flex justify-content-between align-items-center">
          <span>KYC Compliance Status</span>
          <Button variant="outline-primary" size="sm">
            <i className="bi bi-printer me-1"></i>Print Report
          </Button>
        </Card.Header>
        <Card.Body>
          {loading ? (
            <div className="text-center py-5">
              <Spinner animation="border" variant="primary" />
              <p className="mt-2">Loading compliance data...</p>
            </div>
          ) : (
            <div className="table-responsive">
              <Table striped hover>
                <thead>
                  <tr>
                    <th>Customer ID</th>
                    <th>Customer Name</th>
                    <th>Type</th>
                    <th>Verification Status</th>
                    <th>Document Status</th>
                    <th>Risk Level</th>
                    <th>Last Updated</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredData.map((item, idx) => (
                    <tr key={idx}>
                      <td>{item.id}</td>
                      <td>{item.name}</td>
                      <td>{item.type}</td>
                      <td>{getStatusBadge(item.verificationStatus)}</td>
                      <td>{getStatusBadge(item.documentStatus)}</td>
                      <td>{getRiskBadge(item.riskLevel)}</td>
                      <td>{item.lastUpdated}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          )}
        </Card.Body>
      </Card>
    </div>
  );
};

export default KYCComplianceReports;