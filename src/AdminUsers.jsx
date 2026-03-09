import React, { useState } from "react";

import StaffTable from "./AdminStaffTable";
import CustomerTable from "./AdminCustomerTable";

const AdminManageUsers = () => {

  const [viewType, setViewType] = useState("");

  return (
    <div className="container mt-4">

      <h2 className="mb-4 text-center text-success">
        Admin Manage Users
      </h2>

      <div className="d-flex justify-content-center gap-3 mb-4">

        <button
          className="btn btn-primary px-4"
          onClick={() => setViewType("staff")}
        >
          View All Staffs
        </button>

        <button
          className="btn btn-success px-4"
          onClick={() => setViewType("customer")}
        >
          View All Customers
        </button>

      </div>

      {/* Staff Table */}
      {viewType === "staff" && <StaffTable />}

      {/* Customer Table */}
      {viewType === "customer" && <CustomerTable />}

    </div>
  );
};

export default AdminManageUsers;