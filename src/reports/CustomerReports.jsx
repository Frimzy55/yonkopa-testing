import React, { useState} from 'react';
import { Card, Row, Col, Table, Badge, Button, Form, Spinner } from 'react-bootstrap';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const CustomerReports = () => {
  const [loading, setLoading] = useState(false);
  const [customers, setCustomers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [customerType, setCustomerType] = useState('all');

  const sampleCustomers = [
    { id: 'C001', name: 'John Doe', type: 'Individual', email: 'john@email.com', phone: '1234567890', accounts: 2, status: 'Active', joinedDate: '2024-01-15' },
    { id: 'C002', name: 'Jane Smith', type: 'Individual', email: 'jane@email.com', phone: '1234567891', accounts: 1, status: 'Active', joinedDate: '2024-01-20' },
    { id: 'C003', name: 'Tech Corp', type: 'Corporate', email: 'info@techcorp.com', phone: '1234567892', accounts: 3, status: 'Active', joinedDate: '2024-02-01' },
    { id: 'C004', name: 'Alice Brown', type: 'Individual', email: 'alice@email.com', phone: '1234567893', accounts: 1, status: 'Inactive', joinedDate: '2024-02-10' },
  ];

  const typeDistribution = [
    { name: 'Individual', value: 65, color: '#8884d8' },
    { name: 'Corporate', value: 25, color: '#82ca9d' },
    { name: 'Joint', value: 10, color: '#ffc658' },
  ];

  const monthlyGrowth = [
    { month: 'Jan', new: 45, active: 280 },
    { month: 'Feb', new: 52, active: 332 },
    { month: 'Mar', new: 48, active: 380 },
    { month: 'Apr', new: 60, active: 440 },
    { month: 'May', new: 55, active: 495 },
    { month: 'Jun', new: 62, active: 557 },
  ];

  
  const fetchCustomers = () => {
    setLoading(true);
    setTimeout(() => {
      setCustomers(sampleCustomers);
      setLoading(false);
    }, 1000);
  };

  const filteredCustomers = customers.filter(customer => {
    const matchesSearch = customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          customer.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = customerType === 'all' || customer.type.toLowerCase() === customerType;
    return matchesSearch && matchesType;
  });

  const handleExport = () => {
    alert('Exporting customer report...');
  };

  const getStatusBadge = (status) => {
    return <Badge bg={status === 'Active' ? 'success' : 'secondary'}>{status}</Badge>;
  };

  return (
    <div>
      <Row className="mb-4">
        <Col>
          <h5 className="mb-3">Customer Reports Dashboard</h5>
        </Col>
      </Row>

      {/* Filters */}
      <Card className="mb-4">
        <Card.Body>
          <Row>
            <Col md={4}>
              <Form.Group>
                <Form.Label>Search Customer</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Name or Email..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </Form.Group>
            </Col>
            <Col md={3}>
              <Form.Group>
                <Form.Label>Customer Type</Form.Label>
                <Form.Select value={customerType} onChange={(e) => setCustomerType(e.target.value)}>
                  <option value="all">All Customers</option>
                  <option value="individual">Individual</option>
                  <option value="corporate">Corporate</option>
                </Form.Select>
              </Form.Group>
            </Col>
            <Col md={5} className="d-flex align-items-end">
              <Button variant="primary" onClick={fetchCustomers} className="w-100">
                <i className="bi bi-search me-2"></i>Refresh Data
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
              <h6 className="text-muted">Total Customers</h6>
              <h3 className="mb-0">{customers.length}</h3>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="text-center">
            <Card.Body>
              <h6 className="text-muted">Active Customers</h6>
              <h3 className="mb-0 text-success">{customers.filter(c => c.status === 'Active').length}</h3>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="text-center">
            <Card.Body>
              <h6 className="text-muted">Total Accounts</h6>
              <h3 className="mb-0 text-info">{customers.reduce((sum, c) => sum + c.accounts, 0)}</h3>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="text-center">
            <Card.Body>
              <h6 className="text-muted">Avg Accounts/Customer</h6>
              <h3 className="mb-0">{(customers.reduce((sum, c) => sum + c.accounts, 0) / customers.length || 0).toFixed(1)}</h3>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Charts */}
      <Row className="mb-4">
        <Col md={8}>
          <Card>
            <Card.Header>Customer Growth</Card.Header>
            <Card.Body>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={monthlyGrowth}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="new" fill="#8884d8" name="New Customers" />
                  <Bar dataKey="active" fill="#82ca9d" name="Total Active" />
                </BarChart>
              </ResponsiveContainer>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card>
            <Card.Header>Customer Type Distribution</Card.Header>
            <Card.Body>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={typeDistribution}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {typeDistribution.map((entry, index) => (
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

      {/* Customer Table */}
      <Card>
        <Card.Header className="d-flex justify-content-between align-items-center">
          <span>Customer List</span>
          <Button variant="outline-success" size="sm" onClick={handleExport}>
            <i className="bi bi-download me-1"></i>Export Report
          </Button>
        </Card.Header>
        <Card.Body>
          {loading ? (
            <div className="text-center py-5">
              <Spinner animation="border" variant="primary" />
              <p className="mt-2">Loading customer data...</p>
            </div>
          ) : (
            <div className="table-responsive">
              <Table striped hover>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Customer Name</th>
                    <th>Type</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Accounts</th>
                    <th>Status</th>
                    <th>Joined Date</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredCustomers.map((customer, idx) => (
                    <tr key={idx}>
                      <td>{customer.id}</td>
                      <td>{customer.name}</td>
                      <td><Badge bg="info">{customer.type}</Badge></td>
                      <td>{customer.email}</td>
                      <td>{customer.phone}</td>
                      <td>{customer.accounts}</td>
                      <td>{getStatusBadge(customer.status)}</td>
                      <td>{customer.joinedDate}</td>
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

export default CustomerReports;