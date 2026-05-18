// utils/staffHelpers.js

export const getRoleBadgeColor = (roleName) => {
  const colors = { admin: 'primary', manager: 'primary', supervisor: 'primary', loan_officer: 'primary' };
  return colors[roleName] || 'secondary';
};

export const getRoleDisplayName = (roleName) => {
  const names = { loan_officer: 'Loan Officer', supervisor: 'Supervisor', manager: 'Manager', admin: 'Admin' };
  return names[roleName] || roleName;
};

export const getStatusBadge = (user) => {
  const status = user.status ? user.status.toLowerCase() : (user.is_blocked ? 'blocked' : (user.is_active === false ? 'inactive' : 'active'));
  switch (status) {
    case 'active': return { text: 'Active', class: 'bg-success' };
    case 'inactive': return { text: 'Inactive', class: 'bg-secondary' };
    case 'blocked': return { text: 'Blocked', class: 'bg-danger' };
    default: return { text: user.status || 'Unknown', class: 'bg-secondary' };
  }
};

export const getStatusText = (user) => {
  return getStatusBadge(user).text;
};

export const displayContactInfo = (user) => {
  const hasEmail = user.email?.trim();
  const hasPhone = user.phone?.trim();
  if (hasEmail && hasPhone) return `${user.email} / ${user.phone}`;
  if (hasEmail) return user.email;
  if (hasPhone) return user.phone;
  return '—';
};

export const filterStaffMembers = (staffList, searchTerm) => {
  if (!searchTerm.trim()) return staffList;
  const lowerTerm = searchTerm.toLowerCase();
  return staffList.filter(staff => {
    return (
      staff.userId?.toString().includes(lowerTerm) ||
      staff.full_name?.toLowerCase().includes(lowerTerm) ||
      staff.username?.toLowerCase().includes(lowerTerm) ||
      staff.email?.toLowerCase().includes(lowerTerm) ||
      staff.phone?.toLowerCase().includes(lowerTerm) ||
      getRoleDisplayName(staff.role).toLowerCase().includes(lowerTerm) ||
      getStatusText(staff).toLowerCase().includes(lowerTerm)
    );
  });
};