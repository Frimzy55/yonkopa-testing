



import React, { useEffect, useState ,useCallback} from "react";
import axios from "axios";

const AdminStaffTable = () => {

  const [staffs, setStaffs] = useState([]);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    phone: "",
    password: "",
    role: "loan_officer",
  });

  const [editingId, setEditingId] = useState(null);

  const apiUrl = process.env.REACT_APP_API_URL || "http://localhost:5000";

  // Fetch Staff
 const fetchStaffs = useCallback(async () => {
  try {
    setLoading(true);
    const res = await axios.get(`${apiUrl}/users`, {
      params: { role: "staff" },
    });
    setStaffs(res.data);
  } catch (error) {
    console.error(error);
  } finally {
    setLoading(false);
  }
}, [apiUrl]);

useEffect(() => {
  fetchStaffs();
}, [fetchStaffs]);

  // Handle Input Change
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Add or Update Staff
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editingId) {
        await axios.put(`${apiUrl}/users/${editingId}`, formData);
      } else {
        await axios.post(`${apiUrl}/signup1`, formData);
      }

      setFormData({
        full_name: "",
        email: "",
        phone: "",
        password: "",
        role: "loan_officer",
      });

      setEditingId(null);

      fetchStaffs();

    } catch (error) {
      console.error(error);
    }
  };

  // Edit Staff
  const handleEdit = (staff) => {
    setFormData({
      full_name: staff.full_name,
      email: staff.email,
      phone: staff.phone,
      password: "",
      role: staff.role,
    });
    setEditingId(staff.id);
  };

  // Delete Staff
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this staff?")) return;

    try {
      await axios.delete(`${apiUrl}/users/${id}`);
      fetchStaffs();
    } catch (error) {
      console.error(error);
    }
  };

  if (loading) return <p className="text-center">Loading staff...</p>;

  return (
    <div>
      {/* Add / Edit Staff Form */}
      <div className="card mb-4">
        <div className="card-header bg-primary text-white">
          {editingId ? "Update Staff" : "Add Staff"}
        </div>
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="row g-2">
              <div className="col-md-3">
                <input
                  type="text"
                  name="full_name"
                  placeholder="Full Name"
                  className="form-control"
                  value={formData.full_name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="col-md-3">
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  className="form-control"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="col-md-2">
                <input
                  type="text"
                  name="phone"
                  placeholder="Phone"
                  className="form-control"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="col-md-2">
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  className="form-control"
                  value={formData.password}
                  onChange={handleChange}
                  required={!editingId}
                />
              </div>
              <div className="col-md-2">
                <select
                  name="role"
                  className="form-control"
                  value={formData.role}
                  onChange={handleChange}
                >
                  <option value="loan_officer">Loan Officer</option>
                  <option value="admin">Admin</option>
                </select>
              </div>
              <div className="col-md-2">
                <button className="btn btn-success w-100">
                  {editingId ? "Update" : "Add"}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>

      {/* Staff Table */}
      <div className="table-responsive">
        <h4 className="mb-3 text-primary">Staff List</h4>
        <table className="table table-bordered table-striped">
          <thead className="table-dark">
            <tr>
              <th>#</th>
              <th>Full Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Role</th>
              <th width="180">Actions</th>
            </tr>
          </thead>
          <tbody>
            {staffs.map((staff, index) => (
              <tr key={staff.id}>
                <td>{index + 1}</td>
                <td>
                  {/* Green dot if online */}
                  {staff.status === "online" && (
                    <span
                      style={{
                        display: "inline-block",
                        width: "10px",
                        height: "10px",
                        backgroundColor: "green",
                        borderRadius: "50%",
                        marginRight: "5px",
                      }}
                    ></span>
                  )}
                  {staff.full_name}
                </td>
                <td>{staff.email}</td>
                <td>{staff.phone}</td>
                <td>{staff.role}</td>
                <td>
                  <button
                    className="btn btn-warning btn-sm me-2"
                    onClick={() => handleEdit(staff)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => handleDelete(staff.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminStaffTable; 