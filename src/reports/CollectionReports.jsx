import React, { useState, useEffect } from 'react';
import { Card, Row, Col, Table, Badge, Button, Form, Spinner } from 'react-bootstrap';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const CollectionReports = () => {
  const [loading, setLoading] = useState(false);
  const [collections, setCollections] = useState([]);
  const [statusFilter, setStatusFilter] = useState('all');

  const sampleCollections = [
    { id: 'COL001', customer: 'John Doe', type: 'Loan Repayment', amount: 2500, dueDate: '2024-03-01', paidDate: '2024-03-01', status: 'Paid', daysOverdue: 0 },
    { id: 'COL002', customer: 'Jane Smith', type: 'Loan Repayment', amount: 1800, dueDate: '2024-02-15', paidDate: null, status: 'Overdue', daysOverdue: 15 },
    { id: 'COL003', customer: 'Bob Johnson', type: 'Interest Payment', amount: 500, dueDate: '2024-03-05', paidDate: null, status: 'Pending', daysOverdue: 0 },
    { id: 'COL004', customer: 'Alice Brown', type: 'Loan Repayment', amount: 3000, dueDate: '2024-02-20', paidDate: '2024-02-25', status: 'Paid Late', daysOverdue: 5 },
  ];

  const collectionTrend = [
    { month: 'Jan', expected: 150000, collected: 135000, overdue: 15000 },
    { month: 'Feb', expected: 165000, collected: 148000, overdue: 17000 },
    { month: 'Mar', expected: 180000, collected: 162000, overdue: 18000 },
    { month: 'Apr', expected: 175000, collected: 158000, overdue: 17000 },
    { month: 'May', expected: 190000, collected: 171000, overdue: 19000 },
  ];

  useEffect(() => {
    fetchCollections();
  }, []);

  const fetchCollections = () => {
    setLoading(true);
    setTimeout(() => {
      setCollections(sampleCollections);
      setLoading(false);
    }, 1000);
  };

  const filteredCollections = collections.filter(c => {
    if (statusFilter === 'all') return true;
    return c.status.toLowerCase() === statusFilter;
  });

  const stats = {
    totalExpected: collections.reduce((sum, c) => sum + c.amount, 0),
    totalCollected: collections.filter(c => c.status === 'Paid').reduce((sum, c) => sum + c.amount, 0),
    totalOverdue: collections.filter(c => c.status === 'Overdue').reduce((sum, c) => sum + c.amount, 0),
    collectionRate: (collections.filter(c => c.status === 'Paid').reduce((sum, c) => sum + c.amount, 0) / 
                     collections.reduce((sum, c) => sum + c.amount, 0)) * 100 || 0
  };

  const getStatusBadge = (status) => {
    const variants = {
      'Paid': 'success',
      'Pending': 'warning',
      'Overdue': 'danger',
      'Paid Late': 'info'
    };
    return <Badge bg={variants[status]}>{status}</Badge>;
  };

  return (
    <div>
      <Row className="mb-4">
        <Col>
          <h5 className="mb-3">Collection Reports</h5>
        </Col>
      </Row>

      {/* Summary Cards */}
      <Row className="mb-4">
        <Col md={3}>
          <Card className="text-center">
            <Card.Body>
              <h6 className="text-muted">Total Expected</h6>
              <h3 className="mb-0">GHS {stats.totalExpected.toLocaleString()}</h3>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="text-center">
            <Card.Body>
              <h6 className="text-muted">Total Collected</h6>
              <h3 className="mb-0 text-success">GHS {stats.totalCollected.toLocaleString()}</h3>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="text-center">
            <Card.Body>
              <h6 className="text-muted">Total Overdue</h6>
              <h3 className="mb-0 text-danger">GHS {stats.totalOverdue.toLocaleString()}</h3>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="text-center">
            <Card.Body>
              <h6 className="text-muted">Collection Rate</h6>
              <h3 className="mb-0 text-info">{stats.collectionRate.toFixed(1)}%</h3>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Chart */}
      <Row className="mb-4">
        <Col md={12}>
          <Card>
            <Card.Header>Collection Performance Trend</Card.Header>
            <Card.Body>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={collectionTrend}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="expected" stroke="#ffc107" name="Expected" />
                  <Line type="monotone" dataKey="collected" stroke="#28a745" name="Collected" />
                  <Line type="monotone" dataKey="overdue" stroke="#dc3545" name="Overdue" />
                </LineChart>
              </ResponsiveContainer>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Filters */}
      <Card className="mb-4">
        <Card.Body>
          <Row>
            <Col md={6}>
              <Form.Group>
                <Form.Label>Collection Status</Form.Label>
                <Form.Select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
                  <option value="all">All</option>
                  <option value="paid">Paid</option>
                  <option value="pending">Pending</option>
                  <option value="overdue">Overdue</option>
                </Form.Select>
              </Form.Group>
            </Col>
            <Col md={6} className="d-flex align-items-end">
              <Button variant="primary" onClick={fetchCollections} className="w-100">
                <i className="bi bi-arrow-repeat me-2"></i>Refresh
              </Button>
            </Col>
          </Row>
        </Card.Body>
      </Card>

      {/* Collections Table */}
      <Card>
        <Card.Header className="d-flex justify-content-between align-items-center">
          <span>Collection Details</span>
          <Button variant="outline-success" size="sm">
            <i className="bi bi-file-excel me-1"></i>Export
          </Button>
        </Card.Header>
        <Card.Body>
          {loading ? (
            <div className="text-center py-5">
              <Spinner animation="border" variant="primary" />
              <p className="mt-2">Loading collection data...</p>
            </div>
          ) : (
            <div className="table-responsive">
              <Table striped hover>
                <thead>
                  <tr>
                    <th>Collection ID</th>
                    <th>Customer</th>
                    <th>Type</th>
                    <th>Amount (GHS)</th>
                    <th>Due Date</th>
                    <th>Paid Date</th>
                    <th>Days Overdue</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredCollections.map((c, idx) => (
                    <tr key={idx}>
                      <td>{c.id}</td>
                      <td>{c.customer}</td>
                      <td>{c.type}</td>
                      <td>{c.amount.toLocaleString()}</td>
                      <td>{c.dueDate}</td>
                      <td>{c.paidDate || '-'}</td>
                      <td className={c.daysOverdue > 0 ? 'text-danger' : ''}>{c.daysOverdue}</td>
                      <td>{getStatusBadge(c.status)}</td>
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

export default CollectionReports;