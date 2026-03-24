import React, { useState} from 'react';
import { Card, Row, Col, Table, Badge, Button, Form, Spinner } from 'react-bootstrap';

const AuthorizationReports = () => {
  const [loading, setLoading] = useState(false);
  const [authorizations, setAuthorizations] = useState([]);
  const [statusFilter, setStatusFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');

  const sampleAuths = [
    { id: 'AUTH001', requestor: 'John Teller', type: 'Withdrawal', amount: 5000, requestedAt: '2024-03-01 10:30', authorizedBy: 'Manager', status: 'Approved', authorizedAt: '2024-03-01 11:00' },
    { id: 'AUTH002', requestor: 'Jane Teller', type: 'Deposit', amount: 25000, requestedAt: '2024-03-02 09:15', authorizedBy: 'Supervisor', status: 'Pending', authorizedAt: null },
    { id: 'AUTH003', requestor: 'Mike Teller', type: 'Loan Disbursement', amount: 50000, requestedAt: '2024-03-02 14:20', authorizedBy: 'Manager', status: 'Approved', authorizedAt: '2024-03-02 15:30' },
    { id: 'AUTH004', requestor: 'Sarah Teller', type: 'Account Closure', amount: 0, requestedAt: '2024-03-03 11:45', authorizedBy: 'Supervisor', status: 'Rejected', authorizedAt: '2024-03-03 12:15' },
  ];

 
  const fetchAuthorizations = () => {
    setLoading(true);
    setTimeout(() => {
      setAuthorizations(sampleAuths);
      setLoading(false);
    }, 1000);
  };

  const filteredAuths = authorizations.filter(auth => {
    if (statusFilter !== 'all' && auth.status.toLowerCase() !== statusFilter) return false;
    if (typeFilter !== 'all' && auth.type.toLowerCase() !== typeFilter) return false;
    return true;
  });

  const stats = {
    total: authorizations.length,
    approved: authorizations.filter(a => a.status === 'Approved').length,
    pending: authorizations.filter(a => a.status === 'Pending').length,
    rejected: authorizations.filter(a => a.status === 'Rejected').length,
    avgApprovalTime: '2.5 hours'
  };

  const getStatusBadge = (status) => {
    const variants = {
      'Approved': 'success',
      'Pending': 'warning',
      'Rejected': 'danger'
    };
    return <Badge bg={variants[status]}>{status}</Badge>;
  };

  return (
    <div>
      <Row className="mb-4">
        <Col>
          <h5 className="mb-3">Authorization Reports</h5>
        </Col>
      </Row>

      {/* Summary Cards */}
      <Row className="mb-4">
        <Col md={3}>
          <Card className="text-center">
            <Card.Body>
              <h6 className="text-muted">Total Requests</h6>
              <h3 className="mb-0">{stats.total}</h3>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="text-center">
            <Card.Body>
              <h6 className="text-muted">Approved</h6>
              <h3 className="mb-0 text-success">{stats.approved}</h3>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="text-center">
            <Card.Body>
              <h6 className="text-muted">Pending</h6>
              <h3 className="mb-0 text-warning">{stats.pending}</h3>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="text-center">
            <Card.Body>
              <h6 className="text-muted">Rejected</h6>
              <h3 className="mb-0 text-danger">{stats.rejected}</h3>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Filters */}
      <Card className="mb-4">
        <Card.Body>
          <Row>
            <Col md={4}>
              <Form.Group>
                <Form.Label>Authorization Status</Form.Label>
                <Form.Select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
                  <option value="all">All</option>
                  <option value="approved">Approved</option>
                  <option value="pending">Pending</option>
                  <option value="rejected">Rejected</option>
                </Form.Select>
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group>
                <Form.Label>Transaction Type</Form.Label>
                <Form.Select value={typeFilter} onChange={(e) => setTypeFilter(e.target.value)}>
                  <option value="all">All Types</option>
                  <option value="withdrawal">Withdrawal</option>
                  <option value="deposit">Deposit</option>
                  <option value="loan disbursement">Loan Disbursement</option>
                  <option value="account closure">Account Closure</option>
                </Form.Select>
              </Form.Group>
            </Col>
            <Col md={4} className="d-flex align-items-end">
              <Button variant="primary" onClick={fetchAuthorizations} className="w-100">
                <i className="bi bi-search me-2"></i>Filter
              </Button>
            </Col>
          </Row>
        </Card.Body>
      </Card>

      {/* Authorizations Table */}
      <Card>
        <Card.Header className="d-flex justify-content-between align-items-center">
          <span>Authorization Requests</span>
          <Button variant="outline-success" size="sm">
            <i className="bi bi-file-excel me-1"></i>Export
          </Button>
        </Card.Header>
        <Card.Body>
          {loading ? (
            <div className="text-center py-5">
              <Spinner animation="border" variant="primary" />
              <p className="mt-2">Loading authorization data...</p>
            </div>
          ) : (
            <div className="table-responsive">
              <Table striped hover>
                <thead>
                  <tr>
                    <th>Request ID</th>
                    <th>Requestor</th>
                    <th>Type</th>
                    <th>Amount (GHS)</th>
                    <th>Requested At</th>
                    <th>Authorized By</th>
                    <th>Status</th>
                    <th>Authorized At</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredAuths.map((auth, idx) => (
                    <tr key={idx}>
                      <td>{auth.id}</td>
                      <td>{auth.requestor}</td>
                      <td><Badge bg="info">{auth.type}</Badge></td>
                      <td>{auth.amount > 0 ? auth.amount.toLocaleString() : '-'} </td>
                      <td>{auth.requestedAt} </td>
                      <td>{auth.authorizedBy || '-'} </td>
                      <td>{getStatusBadge(auth.status)}</td>
                      <td>{auth.authorizedAt || '-'} </td>
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

export default AuthorizationReports;