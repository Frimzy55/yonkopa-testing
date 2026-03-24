import React, { useState, useEffect } from 'react';
import { Card, Row, Col, Table, Badge, Button, Form, Spinner } from 'react-bootstrap';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const TellerReports = () => {
  const [loading, setLoading] = useState(false);
  const [transactions, setTransactions] = useState([]);
  const [selectedTeller, setSelectedTeller] = useState('all');
  const [dateRange, setDateRange] = useState({ start: '', end: '' });

  const sampleTransactions = [
    { id: 'T001', teller: 'John Teller', type: 'Deposit', amount: 5000, date: '2024-03-01', customer: 'John Doe', status: 'Completed' },
    { id: 'T002', teller: 'Jane Teller', type: 'Withdrawal', amount: 2000, date: '2024-03-01', customer: 'Jane Smith', status: 'Completed' },
    { id: 'T003', teller: 'John Teller', type: 'Deposit', amount: 7500, date: '2024-03-02', customer: 'Bob Johnson', status: 'Completed' },
    { id: 'T004', teller: 'Mike Teller', type: 'Withdrawal', amount: 1500, date: '2024-03-02', customer: 'Alice Brown', status: 'Pending' },
  ];

  const dailyTrend = [
    { date: '2024-03-01', deposits: 25000, withdrawals: 15000 },
    { date: '2024-03-02', deposits: 32000, withdrawals: 18000 },
    { date: '2024-03-03', deposits: 28000, withdrawals: 16500 },
    { date: '2024-03-04', deposits: 35000, withdrawals: 20000 },
    { date: '2024-03-05', deposits: 31000, withdrawals: 17500 },
  ];

  useEffect(() => {
    fetchTellerData();
  }, []);

  const fetchTellerData = () => {
    setLoading(true);
    setTimeout(() => {
      setTransactions(sampleTransactions);
      setLoading(false);
    }, 1000);
  };

  const filteredTransactions = transactions.filter((t) => {
    if (selectedTeller !== 'all' && t.teller !== selectedTeller) return false;
    if (dateRange.start && t.date < dateRange.start) return false;
    if (dateRange.end && t.date > dateRange.end) return false;
    return true;
  });

  const stats = {
    totalDeposits: filteredTransactions
      .filter((t) => t.type === 'Deposit')
      .reduce((sum, t) => sum + t.amount, 0),

    totalWithdrawals: filteredTransactions
      .filter((t) => t.type === 'Withdrawal')
      .reduce((sum, t) => sum + t.amount, 0),

    totalTransactions: filteredTransactions.length,

    netFlow:
      filteredTransactions
        .filter((t) => t.type === 'Deposit')
        .reduce((sum, t) => sum + t.amount, 0) -
      filteredTransactions
        .filter((t) => t.type === 'Withdrawal')
        .reduce((sum, t) => sum + t.amount, 0),
  };

  const tellers = [...new Set(transactions.map((t) => t.teller))];

  const getStatusBadge = (status) => {
    if (status === 'Completed') return 'success';
    if (status === 'Pending') return 'warning';
    return 'secondary';
  };

  return (
    <div>
      {/* Header */}
      <Row className="mb-4">
        <Col>
          <h5 className="mb-3">Teller Reports Dashboard</h5>
        </Col>
      </Row>

      {/* Summary Cards */}
      <Row className="mb-4">
        <Col md={3}>
          <Card className="text-center">
            <Card.Body>
              <h6 className="text-muted">Total Deposits</h6>
              <h3 className="mb-0 text-success">GHS {stats.totalDeposits.toLocaleString()}</h3>
            </Card.Body>
          </Card>
        </Col>

        <Col md={3}>
          <Card className="text-center">
            <Card.Body>
              <h6 className="text-muted">Total Withdrawals</h6>
              <h3 className="mb-0 text-danger">GHS {stats.totalWithdrawals.toLocaleString()}</h3>
            </Card.Body>
          </Card>
        </Col>

        <Col md={3}>
          <Card className="text-center">
            <Card.Body>
              <h6 className="text-muted">Net Cash Flow</h6>
              <h3 className={`mb-0 ${stats.netFlow >= 0 ? 'text-success' : 'text-danger'}`}>
                GHS {stats.netFlow.toLocaleString()}
              </h3>
            </Card.Body>
          </Card>
        </Col>

        <Col md={3}>
          <Card className="text-center">
            <Card.Body>
              <h6 className="text-muted">Total Transactions</h6>
              <h3 className="mb-0 text-info">{stats.totalTransactions}</h3>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Chart */}
      <Row className="mb-4">
        <Col md={12}>
          <Card>
            <Card.Header>Daily Transaction Trends</Card.Header>
            <Card.Body>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={dailyTrend}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="deposits" stroke="#28a745" name="Deposits" />
                  <Line type="monotone" dataKey="withdrawals" stroke="#dc3545" name="Withdrawals" />
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
            <Col md={4}>
              <Form.Group>
                <Form.Label>Teller</Form.Label>
                <Form.Select value={selectedTeller} onChange={(e) => setSelectedTeller(e.target.value)}>
                  <option value="all">All Tellers</option>
                  {tellers.map((teller) => (
                    <option key={teller} value={teller}>
                      {teller}
                    </option>
                  ))}
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

            <Col md={2} className="d-flex align-items-end">
              <Button variant="primary" onClick={fetchTellerData} className="w-100">
                <i className="bi bi-search me-2"></i>Filter
              </Button>
            </Col>
          </Row>
        </Card.Body>
      </Card>

      {/* Table */}
      <Card>
        <Card.Header className="d-flex justify-content-between align-items-center">
          <span>Transaction History</span>
          <Button variant="outline-success" size="sm">
            <i className="bi bi-file-excel me-1"></i>Export
          </Button>
        </Card.Header>

        <Card.Body>
          {loading ? (
            <div className="text-center py-5">
              <Spinner animation="border" variant="primary" />
              <p className="mt-2">Loading transactions...</p>
            </div>
          ) : (
            <div className="table-responsive">
              <Table striped hover>
                <thead>
                  <tr>
                    <th>Transaction ID</th>
                    <th>Teller</th>
                    <th>Type</th>
                    <th>Amount (GHS)</th>
                    <th>Customer</th>
                    <th>Date</th>
                    <th>Status</th>
                  </tr>
                </thead>

                <tbody>
                  {filteredTransactions.map((t, idx) => (
                    <tr key={idx}>
                      <td>{t.id}</td>
                      <td>{t.teller}</td>
                      <td>
                        <Badge bg={t.type === 'Deposit' ? 'success' : 'danger'}>
                          {t.type}
                        </Badge>
                      </td>
                      <td>{t.amount.toLocaleString()}</td>
                      <td>{t.customer}</td>
                      <td>{t.date}</td>
                      <td>
                        <Badge bg={getStatusBadge(t.status)}>
                          {t.status}
                        </Badge>
                      </td>
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

export default TellerReports;