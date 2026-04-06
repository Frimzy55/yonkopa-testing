import React, { useState,  } from 'react';
import { Card, Row, Col, Table, Badge, Button, Form, Spinner, ProgressBar } from 'react-bootstrap';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const RiskReports = () => {
  const [loading, setLoading] = useState(false);
  const [riskData, setRiskData] = useState([]);
  const [riskLevel, setRiskLevel] = useState('all');

  const sampleRisks = [
    { id: 'C001', customer: 'John Doe', riskScore: 85, riskLevel: 'Low', exposure: 50000, npl: false, overdueDays: 0, lastReview: '2024-03-01' },
    { id: 'C002', customer: 'Jane Smith', riskScore: 55, riskLevel: 'Medium', exposure: 75000, npl: false, overdueDays: 15, lastReview: '2024-02-15' },
    { id: 'C003', customer: 'Bob Johnson', riskScore: 30, riskLevel: 'High', exposure: 100000, npl: true, overdueDays: 60, lastReview: '2024-01-20' },
    { id: 'C004', customer: 'Alice Brown', riskScore: 75, riskLevel: 'Low', exposure: 25000, npl: false, overdueDays: 0, lastReview: '2024-03-05' },
  ];

  const riskDistribution = [
    { level: 'Low', count: 45, color: '#28a745' },
    { level: 'Medium', count: 35, color: '#ffc107' },
    { level: 'High', count: 20, color: '#dc3545' },
  ];

  const riskTrend = [
    { quarter: 'Q1 2023', lowRisk: 55, mediumRisk: 30, highRisk: 15 },
    { quarter: 'Q2 2023', lowRisk: 52, mediumRisk: 32, highRisk: 16 },
    { quarter: 'Q3 2023', lowRisk: 50, mediumRisk: 33, highRisk: 17 },
    { quarter: 'Q4 2023', lowRisk: 48, mediumRisk: 34, highRisk: 18 },
    { quarter: 'Q1 2024', lowRisk: 45, mediumRisk: 35, highRisk: 20 },
  ];

 

  const fetchRiskData = () => {
    setLoading(true);
    setTimeout(() => {
      setRiskData(sampleRisks);
      setLoading(false);
    }, 1000);
  };

  const filteredRisks = riskData.filter(r => {
    if (riskLevel === 'all') return true;
    return r.riskLevel.toLowerCase() === riskLevel;
  });

  const stats = {
    totalCustomers: riskData.length,
    highRiskCount: riskData.filter(r => r.riskLevel === 'High').length,
    mediumRiskCount: riskData.filter(r => r.riskLevel === 'Medium').length,
    lowRiskCount: riskData.filter(r => r.riskLevel === 'Low').length,
    totalExposure: riskData.reduce((sum, r) => sum + r.exposure, 0),
    nplCount: riskData.filter(r => r.npl).length,
    avgRiskScore: riskData.reduce((sum, r) => sum + r.riskScore, 0) / riskData.length || 0
  };

  const getRiskBadge = (level) => {
    const variants = {
      'Low': 'success',
      'Medium': 'warning',
      'High': 'danger'
    };
    return <Badge bg={variants[level]}>{level}</Badge>;
  };

  return (
    <div>
      <Row className="mb-4">
        <Col>
          <h5 className="mb-3">Risk Assessment Reports</h5>
        </Col>
      </Row>

      {/* Summary Cards */}
      <Row className="mb-4">
        <Col md={3}>
          <Card className="text-center">
            <Card.Body>
              <h6 className="text-muted">Total Customers</h6>
              <h3 className="mb-0">{stats.totalCustomers}</h3>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="text-center">
            <Card.Body>
              <h6 className="text-muted">High Risk Customers</h6>
              <h3 className="mb-0 text-danger">{stats.highRiskCount}</h3>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="text-center">
            <Card.Body>
              <h6 className="text-muted">Total Exposure</h6>
              <h3 className="mb-0">GHS {stats.totalExposure.toLocaleString()}</h3>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="text-center">
            <Card.Body>
              <h6 className="text-muted">NPL Ratio</h6>
              <h3 className="mb-0 text-warning">{((stats.nplCount / stats.totalCustomers) * 100).toFixed(1)}%</h3>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Charts */}
      <Row className="mb-4">
        <Col md={6}>
          <Card>
            <Card.Header>Risk Distribution</Card.Header>
            <Card.Body>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie data={riskDistribution} cx="50%" cy="50%" labelLine={false} label={({ level, percent }) => `${level} ${(percent * 100).toFixed(0)}%`} outerRadius={80} dataKey="count">
                    {riskDistribution.map((entry, index) => (<Cell key={`cell-${index}`} fill={entry.color} />))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </Card.Body>
          </Card>
        </Col>
        <Col md={6}>
          <Card>
            <Card.Header>Risk Trend Analysis</Card.Header>
            <Card.Body>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={riskTrend}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="quarter" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="lowRisk" fill="#28a745" name="Low Risk" />
                  <Bar dataKey="mediumRisk" fill="#ffc107" name="Medium Risk" />
                  <Bar dataKey="highRisk" fill="#dc3545" name="High Risk" />
                </BarChart>
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
                <Form.Label>Risk Level</Form.Label>
                <Form.Select value={riskLevel} onChange={(e) => setRiskLevel(e.target.value)}>
                  <option value="all">All Levels</option>
                  <option value="low">Low Risk</option>
                  <option value="medium">Medium Risk</option>
                  <option value="high">High Risk</option>
                </Form.Select>
              </Form.Group>
            </Col>
            <Col md={6} className="d-flex align-items-end">
              <Button variant="primary" onClick={fetchRiskData} className="w-100">
                <i className="bi bi-search me-2"></i>Filter
              </Button>
            </Col>
          </Row>
        </Card.Body>
      </Card>

      {/* Risk Table */}
      <Card>
        <Card.Header className="d-flex justify-content-between align-items-center">
          <span>Risk Assessment Details</span>
          <Button variant="outline-primary" size="sm">
            <i className="bi bi-download me-1"></i>Export
          </Button>
        </Card.Header>
        <Card.Body>
          {loading ? (
            <div className="text-center py-5">
              <Spinner animation="border" variant="primary" />
              <p className="mt-2">Loading risk data...</p>
            </div>
          ) : (
            <div className="table-responsive">
              <Table striped hover>
                <thead>
                  <tr>
                    <th>Customer ID</th>
                    <th>Customer Name</th>
                    <th>Risk Score</th>
                    <th>Risk Level</th>
                    <th>Exposure (GHS)</th>
                    <th>NPL Status</th>
                    <th>Overdue Days</th>
                    <th>Last Review</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredRisks.map((risk, idx) => (
                    <tr key={idx}>
                      <td>{risk.id}</td>
                      <td>{risk.customer}</td>
                      <td>
                        <div className="d-flex align-items-center">
                          <span className="me-2">{risk.riskScore}</span>
                          <ProgressBar now={risk.riskScore} style={{ width: '100px' }} variant={risk.riskLevel === 'High' ? 'danger' : risk.riskLevel === 'Medium' ? 'warning' : 'success'} />
                        </div>
                      </td>
                      <td>{getRiskBadge(risk.riskLevel)}</td>
                      <td>{risk.exposure.toLocaleString()}</td>
                      <td><Badge bg={risk.npl ? 'danger' : 'success'}>{risk.npl ? 'Yes' : 'No'}</Badge></td>
                      <td className={risk.overdueDays > 30 ? 'text-danger' : ''}>{risk.overdueDays}</td>
                      <td>{risk.lastReview}</td>
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

export default RiskReports;