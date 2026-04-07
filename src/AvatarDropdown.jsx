import React from "react";
import "./AvatarDropdown.css";

const AvatarDropdown = ({ onClose, onChangePassword, onViewKyc }) => {
  return (
    <div className="avatar-dropdown">
      <div className="dropdown-item" onClick={onViewKyc}>
        View KYC Details
      </div>

      <div className="dropdown-item" onClick={onChangePassword}>
        Change Password
      </div>

      <div className="dropdown-item logout" onClick={onClose}>
        Close
      </div>
    </div>
  );
};

export default AvatarDropdown;
