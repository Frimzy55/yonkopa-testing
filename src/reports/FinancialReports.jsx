import React, { useState, useEffect } from 'react';
import { Card, Row, Col, Table, Badge, Button, Form, Spinner } from 'react-bootstrap';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from 'recharts';

const FinancialReports = () => {
  const [loading, setLoading] = useState(false);
  const [financialData, setFinancialData] = useState({});
  const [reportPeriod, setReportPeriod] = useState('monthly');

  const profitLossData = [
    { month: 'Jan', income: 85000, expenses: 45000, profit: 40000 },
    { month: 'Feb', income: 92000, expenses: 48000, profit: 44000 },
    { month: 'Mar', income: 88000, expenses: 47000, profit: 41000 },
    { month: 'Apr', income: 95000, expenses: 50000, profit: 45000 },
    { month: 'May', income: 91000, expenses: 49000, profit: 42000 },
    { month: 'Jun', income: 98000, expenses: 52000, profit: 46000 },
  ];

  const balanceSheet = {
    assets: {
      cash: 250000,
      loans: 500000,
      investments: 150000,
      fixedAssets: 100000
    },
    liabilities: {
      deposits: 600000,
      borrowings: 200000,
      other: 50000
    },
    equity: 150000
  };

  useEffect(() => {
    fetchFinancialData();
  }, [reportPeriod]);

  const fetchFinancialData = () => {
    setLoading(true);
    setTimeout(() => {
      setFinancialData({ profitLoss: profitLossData, balance: balanceSheet });
      setLoading(false);
    }, 1000);
  };

  const totalAssets = Object.values(balanceSheet.assets).reduce((a, b) => a + b, 0);
  const totalLiabilities = Object.values(balanceSheet.liabilities).reduce((a, b) => a + b, 0);

  return (
    <div>
      <Row className="mb-4">
        <Col>
          <h5 className="mb-3">Financial Reports</h5>
        </Col>
      </Row>

      {/* Summary Cards */}
      <Row className="mb-4">
        <Col md={3}>
          <Card className="text-center">
            <Card.Body>
              <h6 className="text-muted">Total Income (YTD)</h6>
              <h3 className="mb-0 text-success">GHS 549,000</h3>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="text-center">
            <Card.Body>
              <h6 className="text-muted">Total Expenses (YTD)</h6>
              <h3 className="mb-0 text-danger">GHS 291,000</h3>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="text-center">
            <Card.Body>
              <h6 className="text-muted">Net Profit (YTD)</h6>
              <h3 className="mb-0 text-primary">GHS 258,000</h3>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="text-center">
            <Card.Body>
              <h6 className="text-muted">Total Assets</h6>
              <h3 className="mb-0 text-info">GHS {totalAssets.toLocaleString()}</h3>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Profit & Loss Chart */}
      <Row className="mb-4">
        <Col md={12}>
          <Card>
            <Card.Header className="d-flex justify-content-between align-items-center">
              <span>Profit & Loss Statement</span>
              <Form.Select style={{ width: '150px' }} value={reportPeriod} onChange={(e) => setReportPeriod(e.target.value)}>
                <option value="monthly">Monthly</option>
                <option value="quarterly">Quarterly</option>
                <option value="yearly">Yearly</option>
              </Form.Select>
            </Card.Header>
            <Card.Body>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={profitLossData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="income" fill="#28a745" name="Income" />
                  <Bar dataKey="expenses" fill="#dc3545" name="Expenses" />
                  <Bar dataKey="profit" fill="#17a2b8" name="Profit" />
                </BarChart>
              </ResponsiveContainer>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Balance Sheet */}
      <Row className="mb-4">
        <Col md={6}>
          <Card>
            <Card.Header>Assets</Card.Header>
            <Card.Body>
              <Table striped>
                <tbody>
                  <tr>
                    <td>Cash & Cash Equivalents</td>
                    <td className="text-end">GHS {balanceSheet.assets.cash.toLocaleString()}</td>
                  </tr>
                  <tr>
                    <td>Loans & Advances</td>
                    <td className="text-end">GHS {balanceSheet.assets.loans.toLocaleString()}</td>
                  </tr>
                  <tr>
                    <td>Investments</td>
                    <td className="text-end">GHS {balanceSheet.assets.investments.toLocaleString()}</td>
                  </tr>
                  <tr>
                    <td>Fixed Assets</td>
                    <td className="text-end">GHS {balanceSheet.assets.fixedAssets.toLocaleString()}</td>
                  </tr>
                  <tr className="table-primary">
                    <td><strong>Total Assets</strong></td>
                    <td className="text-end"><strong>GHS {totalAssets.toLocaleString()}</strong></td>
                  </tr>
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Col>
        <Col md={6}>
          <Card>
            <Card.Header>Liabilities & Equity</Card.Header>
            <Card.Body>
              <Table striped>
                <tbody>
                  <tr>
                    <td>Customer Deposits</td>
                    <td className="text-end">GHS {balanceSheet.liabilities.deposits.toLocaleString()}</td>
                  </tr>
                  <tr>
                    <td>Borrowings</td>
                    <td className="text-end">GHS {balanceSheet.liabilities.borrowings.toLocaleString()}</td>
                  </tr>
                  <tr>
                    <td>Other Liabilities</td>
                    <td className="text-end">GHS {balanceSheet.liabilities.other.toLocaleString()}</td>
                  </tr>
                  <tr>
                    <td>Shareholders' Equity</td>
                    <td className="text-end">GHS {balanceSheet.equity.toLocaleString()}</td>
                  </tr>
                  <tr className="table-primary">
                    <td><strong>Total Liabilities & Equity</strong></td>
                    <td className="text-end"><strong>GHS {(totalLiabilities + balanceSheet.equity).toLocaleString()}</strong></td>
                  </tr>
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Key Ratios */}
      <Card>
        <Card.Header>Key Financial Ratios</Card.Header>
        <Card.Body>
          <Row>
            <Col md={4}>
              <div className="text-center p-3">
                <h6 className="text-muted">ROA (Return on Assets)</h6>
                <h4 className="text-success">18.5%</h4>
                <small>Industry Avg: 15%</small>
              </div>
            </Col>
            <Col md={4}>
              <div className="text-center p-3">
                <h6 className="text-muted">ROE (Return on Equity)</h6>
                <h4 className="text-success">22.3%</h4>
                <small>Industry Avg: 18%</small>
              </div>
            </Col>
            <Col md={4}>
              <div className="text-center p-3">
                <h6 className="text-muted">Capital Adequacy Ratio</h6>
                <h4 className="text-primary">16.8%</h4>
                <small>Regulatory Min: 12%</small>
              </div>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </div>
  );
};

export default FinancialReports;