import React, { useState, useEffect, useRef } from "react";

const AccountTable = ({ accounts = [], globalOfficer, onAction }) => {
  const [openDropdownId, setOpenDropdownId] = useState(null);
  const [dropdownPosition, setDropdownPosition] = useState({ top: "50%", transform: "translate(-50%, -50%)" });
  const buttonRefs = useRef({});

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (openDropdownId !== null) {
        const buttonEl = buttonRefs.current[openDropdownId];
        const dropdownEl = document.querySelector(`.dropdown-menu-${openDropdownId}`);
        if (buttonEl && dropdownEl && !buttonEl.contains(event.target) && !dropdownEl.contains(event.target)) {
          setOpenDropdownId(null);
        }
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [openDropdownId]);

  // Calculate dropdown position when opened
  useEffect(() => {
    if (openDropdownId !== null) {
      const buttonEl = buttonRefs.current[openDropdownId];
      if (buttonEl) {
        const rect = buttonEl.getBoundingClientRect();
        const viewportHeight = window.innerHeight;
        const dropdownHeightEstimate = 380; // approximate height of all items
        const spaceBelow = viewportHeight - rect.bottom;
        const spaceAbove = rect.top;

        if (spaceBelow < dropdownHeightEstimate && spaceAbove > spaceBelow) {
          // Not enough space below → show above the button
          setDropdownPosition({
            top: "auto",
            bottom: "100%",
            transform: "translateX(-50%)",
            marginBottom: "8px",
          });
        } else {
          // Enough space below → show centered vertically on the button (original behavior)
          setDropdownPosition({
            top: "50%",
            transform: "translate(-50%, -50%)",
            bottom: "auto",
          });
        }
      }
    }
  }, [openDropdownId]);

  const handleAction = (action, account) => {
    setOpenDropdownId(null);
    if (onAction) onAction(action, account);
    else console.log(`${action} for account:`, account);
  };

  const stopPropagation = (e) => e.stopPropagation();

  // Dummy fallback data
  const dummyAccounts = [
    {
      id: 1,
      productName: "Savings Account",
      accountNumber: "SA-100245",
      accountName: "John Doe",
      relationshipOfficer: "Mary K.",
      currentBalance: 5000,
      holdBalance: 500,
      availableBalance: 4500,
    },
    {
      id: 2,
      productName: "Current Account",
      accountNumber: "CA-889012",
      accountName: "Ama Mensah",
      relationshipOfficer: "",
      currentBalance: 12000,
      holdBalance: 2000,
      availableBalance: 10000,
    },
  ];

  const dataToRender = accounts.length > 0 ? accounts : dummyAccounts;

  // Compact dropdown item style
  const dropdownItemStyle = {
    padding: "4px 12px",
    fontSize: "0.875rem",
    cursor: "pointer",
  };
  const dropdownDividerStyle = { margin: "4px 0" };

  return (
    <div>
      <h6 className="fw-semibold mb-3">Accounts Overview</h6>

      <div className="table-responsive">
        <table className="table table-sm table-bordered table-hover align-middle mb-0">
          <thead className="table-light">
            <tr>
              <th>S/N</th>
              <th>Action</th>
              <th>Product Name</th>
              <th>Account Number</th>
              <th>Account Name</th>
              <th>Relationship Officer</th>
              <th>Current Balance (₵)</th>
              <th>Hold Balance (₵)</th>
              <th>Available Balance (₵)</th>
            </tr>
          </thead>

          <tbody>
            {dataToRender.map((acc, idx) => (
              <tr key={acc.id || idx}>
                <td>{idx + 1}</td>

                {/* ACTION DROPDOWN - centered & auto-flips above if needed */}
                <td className="text-center">
                  <div className="dropdown" style={{ position: "relative" }}>
                    <button
                      ref={(el) => (buttonRefs.current[idx] = el)}
                      className="btn btn-sm btn-outline-secondary dropdown-toggle"
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setOpenDropdownId(openDropdownId === idx ? null : idx);
                      }}
                    >
                      Select
                    </button>

                    {openDropdownId === idx && (
                      <div
                        className={`dropdown-menu show dropdown-menu-${idx}`}
                        style={{
                          position: "absolute",
                          left: "50%",
                          ...dropdownPosition,
                          zIndex: 1060,
                          minWidth: "180px",
                        }}
                        onClick={stopPropagation}
                      >
                        <button
                          className="dropdown-item"
                          style={dropdownItemStyle}
                          onClick={() => handleAction("Edit", acc)}
                        >
                          <i className="bi bi-pencil me-2"></i> Edit
                        </button>

                        <button
                          className="dropdown-item"
                          style={dropdownItemStyle}
                          onClick={() => handleAction("Details", acc)}
                        >
                          <i className="bi bi-info-circle me-2"></i> Details
                        </button>

                        <button
                          className="dropdown-item"
                          style={dropdownItemStyle}
                          onClick={() => handleAction("Statement", acc)}
                        >
                          <i className="bi bi-receipt me-2"></i> Statement
                        </button>

                        <div className="dropdown-divider" style={dropdownDividerStyle}></div>

                        <button
                          className="dropdown-item"
                          style={dropdownItemStyle}
                          onClick={() => handleAction("Activate Dormant", acc)}
                        >
                          <i className="bi bi-toggle-on me-2"></i> Activate Dormant
                        </button>

                        <button
                          className="dropdown-item"
                          style={dropdownItemStyle}
                          onClick={() => handleAction("Re-activate Account", acc)}
                        >
                          <i className="bi bi-arrow-repeat me-2"></i> Re-activate Account
                        </button>

                        <button
                          className="dropdown-item text-warning"
                          style={dropdownItemStyle}
                          onClick={() => handleAction("Freeze Account", acc)}
                        >
                          <i className="bi bi-snow2 me-2"></i> Freeze Account
                        </button>

                        <button
                          className="dropdown-item"
                          style={dropdownItemStyle}
                          onClick={() => handleAction("Manage Lien", acc)}
                        >
                          <i className="bi bi-lock me-2"></i> Manage Lien
                        </button>

                        <button
                          className="dropdown-item text-danger"
                          style={dropdownItemStyle}
                          onClick={() => handleAction("Close Account", acc)}
                        >
                          <i className="bi bi-x-circle me-2"></i> Close Account
                        </button>
                      </div>
                    )}
                  </div>
                </td>

                <td>{acc.productName}</td>
                <td>{acc.accountNumber}</td>
                <td>{acc.accountName}</td>
                <td>{acc.relationshipOfficer || globalOfficer || "—"}</td>
                <td>{acc.currentBalance?.toLocaleString() || "0.00"}</td>
                <td>{acc.holdBalance?.toLocaleString() || "0.00"}</td>
                <td>{acc.availableBalance?.toLocaleString() || "0.00"}</td>
              </tr>
            ))}

            {dataToRender.length === 0 && (
              <tr>
                <td colSpan="9" className="text-center text-muted">No accounts found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AccountTable;