import React, { useState } from "react";
import AvatarDropdown from "./AvatarDropdown";

const UserProfile = ({ user }) => {
  const [kycData, setKycData] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);

  const handleViewKyc = async () => {
    try {
      const res = await fetch(
        `${process.env.REACT_APP_API_URL}/api/kycc/${user.userId}`
      );

      const data = await res.json();

      console.log("KYC DATA:", data);

      setKycData(data); // store data in state
    } catch (error) {
      console.error("Error fetching KYC:", error);
    }
  };

  return (
    <div>
      {/* Avatar */}
      <div onClick={() => setShowDropdown(!showDropdown)}>
        Avatar
      </div>

      {/* Dropdown */}
      {showDropdown && (
        <AvatarDropdown
          onClose={() => setShowDropdown(false)}
          onChangePassword={() => console.log("Change password")}
          onViewKyc={handleViewKyc}
        />
      )}

      {/* Display KYC */}
      {kycData && (
        <div>
          <h3>KYC Details</h3>
          <p>{kycData.firstname}</p>
          <p>{kycData.email}</p>
          <p>{kycData.mobileNumber}</p>
        </div>
      )}
    </div>
  );
};

export default UserProfile;