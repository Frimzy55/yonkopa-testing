import React, { useState, useEffect } from 'react';
import { Card, Row, Col, Table, Badge, Button, Form, Spinner,  } from 'react-bootstrap';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const SavingsAccountReports = () => {
  const [loading, setLoading] = useState(false);
  const [accounts, setAccounts] = useState([]);
  const [accountType, setAccountType] = useState('all');
  const [balanceRange, setBalanceRange] = useState('all');

  const sampleAccounts = [
    { id: 'SAV001', customer: 'John Doe', type: 'Savings', balance: 25000, interest: 3.5, status: 'Active', openedDate: '2024-01-15' },
    { id: 'SAV002', customer: 'Jane Smith', type: 'Current', balance: 50000, interest: 2.0, status: 'Active', openedDate: '2024-01-20' },
    { id: 'SAV003', customer: 'Bob Johnson', type: 'Fixed Deposit', balance: 100000, interest: 5.0, status: 'Active', openedDate: '2024-02-01' },
    { id: 'SAV004', customer: 'Alice Brown', type: 'Savings', balance: 5000, interest: 3.5, status: 'Dormant', openedDate: '2024-02-10' },
  ];

  const typeDistribution = [
    { name: 'Savings', value: 45, color: '#8884d8' },
    { name: 'Current', value: 30, color: '#82ca9d' },
    { name: 'Fixed Deposit', value: 25, color: '#ffc658' },
  ];

  const balanceBrackets = [
    { range: '0-10k', count: 25, color: '#28a745' },
    { range: '10k-50k', count: 40, color: '#17a2b8' },
    { range: '50k-100k', count: 20, color: '#ffc107' },
    { range: '100k+', count: 15, color: '#dc3545' },
  ];

  useEffect(() => {
    fetchAccounts();
  }, []);

  const fetchAccounts = () => {
    setLoading(true);
    setTimeout(() => {
      setAccounts(sampleAccounts);
      setLoading(false);
    }, 1000);
  };

  const filteredAccounts = accounts.filter(acc => {
    if (accountType !== 'all' && acc.type !== accountType) return false;
    if (balanceRange !== 'all') {
      if (balanceRange === 'low' && acc.balance < 10000) return true;
      if (balanceRange === 'medium' && acc.balance >= 10000 && acc.balance < 50000) return true;
      if (balanceRange === 'high' && acc.balance >= 50000) return true;
      return false;
    }
    return true;
  });

  const stats = {
    totalAccounts: accounts.length,
    totalBalance: accounts.reduce((sum, acc) => sum + acc.balance, 0),
    averageBalance: accounts.reduce((sum, acc) => sum + acc.balance, 0) / accounts.length || 0,
    activeAccounts: accounts.filter(acc => acc.status === 'Active').length
  };

  return (
    <div>
      <Row className="mb-4">
        <Col>
          <h5 className="mb-3">Savings & Account Reports</h5>
        </Col>
      </Row>

      {/* Summary Cards */}
      <Row className="mb-4">
        <Col md={3}>
          <Card className="text-center">
            <Card.Body>
              <h6 className="text-muted">Total Accounts</h6>
              <h3 className="mb-0">{stats.totalAccounts}</h3>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="text-center">
            <Card.Body>
              <h6 className="text-muted">Total Balance</h6>
              <h3 className="mb-0 text-success">GHS {stats.totalBalance.toLocaleString()}</h3>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="text-center">
            <Card.Body>
              <h6 className="text-muted">Average Balance</h6>
              <h3 className="mb-0 text-info">GHS {stats.averageBalance.toLocaleString()}</h3>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="text-center">
            <Card.Body>
              <h6 className="text-muted">Active Accounts</h6>
              <h3 className="mb-0 text-success">{stats.activeAccounts}</h3>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Charts */}
      <Row className="mb-4">
        <Col md={6}>
          <Card>
            <Card.Header>Account Type Distribution</Card.Header>
            <Card.Body>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie data={typeDistribution} cx="50%" cy="50%" labelLine={false} label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`} outerRadius={80} dataKey="value">
                    {typeDistribution.map((entry, index) => (<Cell key={`cell-${index}`} fill={entry.color} />))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </Card.Body>
          </Card>
        </Col>
        <Col md={6}>
          <Card>
            <Card.Header>Balance Distribution</Card.Header>
            <Card.Body>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={balanceBrackets}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="range" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="count" fill="#8884d8" />
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
            <Col md={4}>
              <Form.Group>
                <Form.Label>Account Type</Form.Label>
                <Form.Select value={accountType} onChange={(e) => setAccountType(e.target.value)}>
                  <option value="all">All Types</option>
                  <option value="Savings">Savings</option>
                  <option value="Current">Current</option>
                  <option value="Fixed Deposit">Fixed Deposit</option>
                </Form.Select>
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group>
                <Form.Label>Balance Range</Form.Label>
                <Form.Select value={balanceRange} onChange={(e) => setBalanceRange(e.target.value)}>
                  <option value="all">All Balances</option>
                  <option value="low">Below GHS 10,000</option>
                  <option value="medium">GHS 10,000 - 49,999</option>
                  <option value="high">GHS 50,000+</option>
                </Form.Select>
              </Form.Group>
            </Col>
            <Col md={4} className="d-flex align-items-end">
              <Button variant="primary" onClick={fetchAccounts} className="w-100">
                <i className="bi bi-search me-2"></i>Filter
              </Button>
            </Col>
          </Row>
        </Card.Body>
      </Card>

      {/* Accounts Table */}
      <Card>
        <Card.Header className="d-flex justify-content-between align-items-center">
          <span>Account Details</span>
          <Button variant="outline-success" size="sm">
            <i className="bi bi-file-excel me-1"></i>Export
          </Button>
        </Card.Header>
        <Card.Body>
          {loading ? (
            <div className="text-center py-5">
              <Spinner animation="border" variant="primary" />
              <p className="mt-2">Loading account data...</p>
            </div>
          ) : (
            <div className="table-responsive">
              <Table striped hover>
                <thead>
                  <tr>
                    <th>Account ID</th>
                    <th>Customer</th>
                    <th>Type</th>
                    <th>Balance (GHS)</th>
                    <th>Interest Rate</th>
                    <th>Status</th>
                    <th>Opened Date</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredAccounts.map((acc, idx) => (
                    <tr key={idx}>
                      <td>{acc.id}</td>
                      <td>{acc.customer}</td>
                      <td><Badge bg="info">{acc.type}</Badge></td>
                      <td className={acc.balance > 50000 ? 'text-success fw-bold' : ''}>{acc.balance.toLocaleString()}</td>
                      <td>{acc.interest}%</td>
                      <td><Badge bg={acc.status === 'Active' ? 'success' : 'secondary'}>{acc.status}</Badge></td>
                      <td>{acc.openedDate}</td>
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

export default SavingsAccountReports;