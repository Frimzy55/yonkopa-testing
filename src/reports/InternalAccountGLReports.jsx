import React, { useState } from 'react';
import { Card, Row, Col, Table, Badge, Button, Form, Spinner } from 'react-bootstrap';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const InternalAccountGLReports = () => {
  const [loading, setLoading] = useState(false);
  const [glAccounts, setGlAccounts] = useState([]);
  const [accountType, setAccountType] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const sampleGLAccounts = [
    { code: '1001', name: 'Cash in Hand', type: 'Asset', balance: 150000, category: 'Current Asset', lastUpdated: '2024-03-01' },
    { code: '1002', name: 'Cash at Bank', type: 'Asset', balance: 850000, category: 'Current Asset', lastUpdated: '2024-03-01' },
    { code: '2001', name: 'Customer Deposits', type: 'Liability', balance: 1200000, category: 'Current Liability', lastUpdated: '2024-03-01' },
    { code: '3001', name: 'Loan Portfolio', type: 'Asset', balance: 2500000, category: 'Non-Current Asset', lastUpdated: '2024-03-01' },
    { code: '4001', name: 'Interest Income', type: 'Income', balance: 45000, category: 'Revenue', lastUpdated: '2024-03-01' },
    { code: '5001', name: 'Salaries Expense', type: 'Expense', balance: 35000, category: 'Operating Expense', lastUpdated: '2024-03-01' },
  ];

  const trialBalance = [
    { account: 'Cash in Hand', debit: 150000, credit: 0, balance: 150000 },
    { account: 'Cash at Bank', debit: 850000, credit: 0, balance: 850000 },
    { account: 'Customer Deposits', debit: 0, credit: 1200000, balance: -1200000 },
    { account: 'Loan Portfolio', debit: 2500000, credit: 0, balance: 2500000 },
    { account: 'Interest Income', debit: 0, credit: 45000, balance: -45000 },
    { account: 'Salaries Expense', debit: 35000, credit: 0, balance: 35000 },
  ];

  const monthlyActivity = [
    { month: 'Jan', debits: 125000, credits: 98000 },
    { month: 'Feb', debits: 142000, credits: 115000 },
    { month: 'Mar', debits: 138000, credits: 109000 },
    { month: 'Apr', debits: 156000, credits: 128000 },
    { month: 'May', debits: 149000, credits: 121000 },
    { month: 'Jun', debits: 163000, credits: 135000 },
  ];

  const fetchGLData = () => {
    setLoading(true);
    setTimeout(() => {
      setGlAccounts(sampleGLAccounts);
      setLoading(false);
    }, 1000);
  };

  const filteredAccounts = glAccounts.filter(acc => {
    if (accountType !== 'all' && acc.type.toLowerCase() !== accountType) return false;
    if (searchTerm && !acc.name.toLowerCase().includes(searchTerm.toLowerCase()) && 
        !acc.code.includes(searchTerm)) return false;
    return true;
  });

  const totalDebits = trialBalance.reduce((sum, item) => sum + item.debit, 0);
  const totalCredits = trialBalance.reduce((sum, item) => sum + item.credit, 0);

  return (
    <div>
      <Row className="mb-4">
        <Col>
          <h5 className="mb-3">Internal Accounts & GL Reports</h5>
        </Col>
      </Row>

      {/* Summary Cards */}
      <Row className="mb-4">
        <Col md={3}>
          <Card className="text-center">
            <Card.Body>
              <h6 className="text-muted">Total GL Accounts</h6>
              <h3 className="mb-0">{glAccounts.length}</h3>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="text-center">
            <Card.Body>
              <h6 className="text-muted">Total Assets</h6>
              <h3 className="mb-0 text-success">GHS {glAccounts.filter(a => a.type === 'Asset').reduce((s, a) => s + a.balance, 0).toLocaleString()}</h3>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="text-center">
            <Card.Body>
              <h6 className="text-muted">Total Liabilities</h6>
              <h3 className="mb-0 text-danger">GHS {glAccounts.filter(a => a.type === 'Liability').reduce((s, a) => s + a.balance, 0).toLocaleString()}</h3>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="text-center">
            <Card.Body>
              <h6 className="text-muted">Net Position</h6>
              <h3 className="mb-0 text-primary">GHS {(glAccounts.filter(a => a.type === 'Asset').reduce((s, a) => s + a.balance, 0) - 
                glAccounts.filter(a => a.type === 'Liability').reduce((s, a) => s + a.balance, 0)).toLocaleString()}</h3>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Monthly Activity Chart */}
      <Row className="mb-4">
        <Col md={12}>
          <Card>
            <Card.Header>Monthly GL Activity</Card.Header>
            <Card.Body>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={monthlyActivity}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="debits" fill="#dc3545" name="Debits" />
                  <Bar dataKey="credits" fill="#28a745" name="Credits" />
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
                  <option value="asset">Asset</option>
                  <option value="liability">Liability</option>
                  <option value="income">Income</option>
                  <option value="expense">Expense</option>
                </Form.Select>
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group>
                <Form.Label>Search</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Account name or code..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </Form.Group>
            </Col>
            <Col md={4} className="d-flex align-items-end">
              <Button variant="primary" onClick={fetchGLData} className="w-100">
                <i className="bi bi-search me-2"></i>Filter
              </Button>
            </Col>
          </Row>
        </Card.Body>
      </Card>

      {/* GL Accounts Table */}
      <Card className="mb-4">
        <Card.Header className="d-flex justify-content-between align-items-center">
          <span>General Ledger Accounts</span>
          <Button variant="outline-success" size="sm">
            <i className="bi bi-file-excel me-1"></i>Export
          </Button>
        </Card.Header>
        <Card.Body>
          {loading ? (
            <div className="text-center py-5">
              <Spinner animation="border" variant="primary" />
              <p className="mt-2">Loading GL data...</p>
            </div>
          ) : (
            <div className="table-responsive">
              <Table striped hover>
                <thead>
                  <tr>
                    <th>Account Code</th>
                    <th>Account Name</th>
                    <th>Type</th>
                    <th>Category</th>
                    <th>Balance (GHS)</th>
                    <th>Last Updated</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredAccounts.map((acc, idx) => (
                    <tr key={idx}>
                      <td>{acc.code}</td>
                      <td>{acc.name}</td>
                      <td><Badge bg={acc.type === 'Asset' ? 'success' : acc.type === 'Liability' ? 'danger' : 'info'}>{acc.type}</Badge></td>
                      <td>{acc.category}</td>
                      <td className={acc.balance > 0 ? 'text-success' : 'text-danger'}>{acc.balance.toLocaleString()}</td>
                      <td>{acc.lastUpdated}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          )}
        </Card.Body>
      </Card>

      {/* Trial Balance */}
      <Card>
        <Card.Header>Trial Balance</Card.Header>
        <Card.Body>
          <div className="table-responsive">
            <Table striped>
              <thead>
                <tr>
                  <th>Account</th>
                  <th className="text-end">Debit (GHS)</th>
                  <th className="text-end">Credit (GHS)</th>
                  <th className="text-end">Balance (GHS)</th>
                </tr>
              </thead>
              <tbody>
                {trialBalance.map((item, idx) => (
                  <tr key={idx}>
                    <td>{item.account}</td>
                    <td className="text-end">{item.debit.toLocaleString()}</td>
                    <td className="text-end">{item.credit.toLocaleString()}</td>
                    <td className={`text-end ${item.balance > 0 ? 'text-success' : 'text-danger'}`}>
                      {Math.abs(item.balance).toLocaleString()} {item.balance > 0 ? 'Dr' : 'Cr'}
                    </td>
                  </tr>
                ))}
                <tr className="table-primary fw-bold">
                  <td>TOTAL</td>
                  <td className="text-end">{totalDebits.toLocaleString()}</td>
                  <td className="text-end">{totalCredits.toLocaleString()}</td>
                  <td className="text-end">{(totalDebits - totalCredits).toLocaleString()}</td>
                </tr>
              </tbody>
            </Table>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
};

export default InternalAccountGLReports;