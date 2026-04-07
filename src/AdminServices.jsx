// src/components/admin/AdminServices.jsx
import React, { useState } from "react";
import "./AdminServices.css";

const AdminServices = () => {
  const [services, setServices] = useState([
    { id: 1, name: "Loan Processing", status: "active", description: "Process loan applications" },
    { id: 2, name: "Credit Scoring", status: "active", description: "Calculate credit scores" },
    { id: 3, name: "Document Verification", status: "maintenance", description: "Verify customer documents" },
    { id: 4, name: "Payment Processing", status: "active", description: "Handle payment transactions" },
  ]);

  const [newService, setNewService] = useState({ name: "", description: "", status: "active" });
  const [editingService, setEditingService] = useState(null);

  const handleAddService = () => {
    if (newService.name.trim()) {
      const service = {
        id: services.length + 1,
        name: newService.name,
        description: newService.description,
        status: newService.status
      };
      setServices([...services, service]);
      setNewService({ name: "", description: "", status: "active" });
    }
  };

  const handleEditService = (service) => {
    setEditingService(service);
    setNewService({ name: service.name, description: service.description, status: service.status });
  };

  const handleUpdateService = () => {
    if (editingService && newService.name.trim()) {
      setServices(services.map(service => 
        service.id === editingService.id 
          ? { ...service, ...newService }
          : service
      ));
      setEditingService(null);
      setNewService({ name: "", description: "", status: "active" });
    }
  };

  const handleDeleteService = (id) => {
    setServices(services.filter(service => service.id !== id));
  };

  const toggleServiceStatus = (id) => {
    setServices(services.map(service => 
      service.id === id 
        ? { ...service, status: service.status === "active" ? "inactive" : "active" }
        : service
    ));
  };

  return (
    <div className="admin-services">
      <div className="services-header">
        <h2>Service Management</h2>
        <p>Manage and configure system services</p>
      </div>

      {/* Add/Edit Service Form */}
      <div className="service-form">
        <h3>{editingService ? "Edit Service" : "Add New Service"}</h3>
        <div className="form-group">
          <input
            type="text"
            placeholder="Service Name"
            value={newService.name}
            onChange={(e) => setNewService({ ...newService, name: e.target.value })}
            className="form-input"
          />
          <input
            type="text"
            placeholder="Service Description"
            value={newService.description}
            onChange={(e) => setNewService({ ...newService, description: e.target.value })}
            className="form-input"
          />
          <select
            value={newService.status}
            onChange={(e) => setNewService({ ...newService, status: e.target.value })}
            className="form-select"
          >
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
            <option value="maintenance">Maintenance</option>
          </select>
          <button
            onClick={editingService ? handleUpdateService : handleAddService}
            className="btn btn-primary"
          >
            {editingService ? "Update Service" : "Add Service"}
          </button>
          {editingService && (
            <button
              onClick={() => {
                setEditingService(null);
                setNewService({ name: "", description: "", status: "active" });
              }}
              className="btn btn-secondary"
            >
              Cancel
            </button>
          )}
        </div>
      </div>

      {/* Services List */}
      <div className="services-list">
        <h3>System Services</h3>
        <div className="services-grid">
          {services.map(service => (
            <div key={service.id} className="service-card">
              <div className="service-header">
                <h4>{service.name}</h4>
                <span className={`status-badge status-${service.status}`}>
                  {service.status}
                </span>
              </div>
              <p className="service-description">{service.description}</p>
              <div className="service-actions">
                <button
                  onClick={() => toggleServiceStatus(service.id)}
                  className={`btn btn-sm ${service.status === "active" ? "btn-warning" : "btn-success"}`}
                >
                  {service.status === "active" ? "Deactivate" : "Activate"}
                </button>
                <button
                  onClick={() => handleEditService(service)}
                  className="btn btn-sm btn-info"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteService(service.id)}
                  className="btn btn-sm btn-danger"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Service Statistics */}
      <div className="service-stats">
        <h3>Service Statistics</h3>
        <div className="stats-grid">
          <div className="stat-card">
            <h4>Total Services</h4>
            <span className="stat-number">{services.length}</span>
          </div>
          <div className="stat-card">
            <h4>Active Services</h4>
            <span className="stat-number">
              {services.filter(s => s.status === "active").length}
            </span>
          </div>
          <div className="stat-card">
            <h4>In Maintenance</h4>
            <span className="stat-number">
              {services.filter(s => s.status === "maintenance").length}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminServices;