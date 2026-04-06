import React, { useState,  } from 'react';
import { Card, Row, Col, Table, Badge, Button, Form, Spinner } from 'react-bootstrap';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const LoanReports = () => {
  const [loading, setLoading] = useState(false);
  const [dateRange, setDateRange] = useState({ start: '', end: '' });
  const [reportType, setReportType] = useState('applications');
  const [loanData, setLoanData] = useState({
    applications: [],
    approvals: [],
    disbursements: [],
    repayments: []
  });

  // Sample data
  const applicationsData = [
    { id: 'LN001', customer: 'John Doe', amount: 50000, date: '2024-03-01', status: 'Pending' },
    { id: 'LN002', customer: 'Jane Smith', amount: 75000, date: '2024-03-02', status: 'Approved' },
    { id: 'LN003', customer: 'Bob Johnson', amount: 100000, date: '2024-03-03', status: 'Rejected' },
    { id: 'LN004', customer: 'Alice Brown', amount: 25000, date: '2024-03-04', status: 'Pending' },
  ];

  const chartData = [
    { name: 'Jan', applications: 45, approvals: 32, disbursements: 28 },
    { name: 'Feb', applications: 52, approvals: 41, disbursements: 38 },
    { name: 'Mar', applications: 48, approvals: 39, disbursements: 35 },
    { name: 'Apr', applications: 60, approvals: 48, disbursements: 44 },
    { name: 'May', applications: 55, approvals: 44, disbursements: 40 },
    { name: 'Jun', applications: 62, approvals: 51, disbursements: 47 },
  ];

  const pieData = [
    { name: 'Approved', value: 45, color: '#28a745' },
    { name: 'Pending', value: 30, color: '#ffc107' },
    { name: 'Rejected', value: 25, color: '#dc3545' },
  ];

 

  const fetchLoanData = () => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoanData({
        applications: applicationsData,
        approvals: applicationsData.filter(l => l.status === 'Approved'),
        disbursements: applicationsData.filter(l => l.status === 'Approved'),
        repayments: []
      });
      setLoading(false);
    }, 1000);
  };

  const handleExport = (format) => {
    console.log(`Exporting as ${format}`);
    alert(`Report exported as ${format.toUpperCase()}`);
  };

  const getStatusBadge = (status) => {
    const variants = {
      'Pending': 'warning',
      'Approved': 'success',
      'Rejected': 'danger',
      'Disbursed': 'info'
    };
    return <Badge bg={variants[status] || 'secondary'}>{status}</Badge>;
  };

  return (
    <div>
      <Row className="mb-4">
        <Col>
          <h5 className="mb-3">Loan Reports Dashboard</h5>
        </Col>
      </Row>

      {/* Filters */}
      <Card className="mb-4">
        <Card.Body>
          <Row>
            <Col md={3}>
              <Form.Group>
                <Form.Label>Report Type</Form.Label>
                <Form.Select value={reportType} onChange={(e) => setReportType(e.target.value)}>
                  <option value="applications">Loan Applications</option>
                  <option value="approvals">Loan Approvals</option>
                  <option value="disbursements">Loan Disbursements</option>
                  <option value="repayments">Loan Repayments</option>
                </Form.Select>
              </Form.Group>
            </Col>
            <Col md={3}>
              <Form.Group>
                <Form.Label>From Date</Form.Label>
                <Form.Control
                  type="date"
                  value={dateRange.start}
                  onChange={(e) => setDateRange({ ...dateRange, start: e.target.value })}
                />
              </Form.Group>
            </Col>
            <Col md={3}>
              <Form.Group>
                <Form.Label>To Date</Form.Label>
                <Form.Control
                  type="date"
                  value={dateRange.end}
                  onChange={(e) => setDateRange({ ...dateRange, end: e.target.value })}
                />
              </Form.Group>
            </Col>
            <Col md={3} className="d-flex align-items-end">
              <Button variant="primary" onClick={() => fetchLoanData()} className="w-100">
                <i className="bi bi-search me-2"></i>Generate Report
              </Button>
            </Col>
          </Row>
        </Card.Body>
      </Card>

      {/* Summary Cards */}
      <Row className="mb-4">
        <Col md={3}>
          <Card className="text-center">
            <Card.Body>
              <h6 className="text-muted">Total Applications</h6>
              <h3 className="mb-0">{loanData.applications.length}</h3>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="text-center">
            <Card.Body>
              <h6 className="text-muted">Approved Loans</h6>
              <h3 className="mb-0 text-success">{loanData.approvals.length}</h3>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="text-center">
            <Card.Body>
              <h6 className="text-muted">Total Amount</h6>
              <h3 className="mb-0">
                GHS {loanData.applications.reduce((sum, l) => sum + l.amount, 0).toLocaleString()}
              </h3>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="text-center">
            <Card.Body>
              <h6 className="text-muted">Approval Rate</h6>
              <h3 className="mb-0 text-info">
                {loanData.applications.length ? 
                  ((loanData.approvals.length / loanData.applications.length) * 100).toFixed(1) : 0}%
              </h3>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Charts */}
      <Row className="mb-4">
        <Col md={8}>
          <Card>
            <Card.Header>Loan Trends</Card.Header>
            <Card.Body>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="applications" fill="#8884d8" />
                  <Bar dataKey="approvals" fill="#82ca9d" />
                  <Bar dataKey="disbursements" fill="#ffc658" />
                </BarChart>
              </ResponsiveContainer>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card>
            <Card.Header>Status Distribution</Card.Header>
            <Card.Body>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Data Table */}
      <Card>
        <Card.Header className="d-flex justify-content-between align-items-center">
          <span>Loan {reportType.charAt(0).toUpperCase() + reportType.slice(1)}</span>
          <div>
            <Button variant="outline-success" size="sm" className="me-2" onClick={() => handleExport('excel')}>
              <i className="bi bi-file-excel me-1"></i>Excel
            </Button>
            <Button variant="outline-danger" size="sm" onClick={() => handleExport('pdf')}>
              <i className="bi bi-file-pdf me-1"></i>PDF
            </Button>
          </div>
        </Card.Header>
        <Card.Body>
          {loading ? (
            <div className="text-center py-5">
              <Spinner animation="border" variant="primary" />
              <p className="mt-2">Loading loan data...</p>
            </div>
          ) : (
            <div className="table-responsive">
              <Table striped hover>
                <thead>
                  <tr>
                    <th>Loan ID</th>
                    <th>Customer Name</th>
                    <th>Amount (GHS)</th>
                    <th>Application Date</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {loanData[reportType]?.map((loan, idx) => (
                    <tr key={idx}>
                      <td>{loan.id}</td>
                      <td>{loan.customer}</td>
                      <td>{loan.amount.toLocaleString()}</td>
                      <td>{loan.date}</td>
                      <td>{getStatusBadge(loan.status)}</td>
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

export default LoanReports;