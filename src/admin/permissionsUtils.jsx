// permissionsUtils.js
import { menuItems } from '../menuItems';

// Generate a consistent permission ID
export const getPermissionId = (menuName, subMenuName = null, itemName = null) => {
  if (itemName && subMenuName) {
    return `${menuName.toLowerCase()}_${subMenuName.toLowerCase().replace(/ /g, '_')}_${itemName.toLowerCase().replace(/ /g, '_')}`;
  } else if (subMenuName) {
    return `${menuName.toLowerCase()}_${subMenuName.toLowerCase().replace(/ /g, '_')}`;
  }
  return menuName.toLowerCase().replace(/ /g, '_');
};

// Recursively flatten all permissions from menuItems
const flattenPermissions = (items, parentMenu = null, parentSubMenu = null) => {
  let permissions = [];
  for (const item of items) {
    // Reports (special case for Reports submenu)
    if (item.reports && Array.isArray(item.reports)) {
      for (const report of item.reports) {
        const id = getPermissionId(parentMenu, parentSubMenu, report.name);
        permissions.push({ id, name: report.name, category: parentMenu });
      }
    }
    // Nested menus
    if (item.nestedMenus && Array.isArray(item.nestedMenus)) {
      permissions.push(...flattenPermissions(item.nestedMenus, parentMenu, item.name));
    }
    // Sub menus
    if (item.subMenus && Array.isArray(item.subMenus)) {
      const subMenuId = getPermissionId(item.name, item.name);
      permissions.push({ id: subMenuId, name: item.name, category: item.name });
      permissions.push(...flattenPermissions(item.subMenus, item.name, null));
    }
    // Leaf menu item (no children) – but skip Dashboard
    else if (!item.subMenus && !item.nestedMenus && !item.reports && item.name !== 'Dashboard') {
      const id = parentSubMenu 
        ? getPermissionId(parentMenu, parentSubMenu, item.name)
        : getPermissionId(parentMenu, null, item.name);
      permissions.push({ id, name: item.name, category: parentMenu || item.name });
    }
  }
  return permissions;
};

// Get all available permissions (list of { id, name, category })
export const getAllPermissionsFromMenu = () => {
  const perms = flattenPermissions(menuItems);
  const unique = {};
  perms.forEach(p => { unique[p.id] = p; });
  return Object.values(unique);
};

// Group permissions by top-level category (first-level menu name)
export const getGroupedPermissionsFromMenu = () => {
  const allPerms = getAllPermissionsFromMenu();
  const grouped = {};
  allPerms.forEach(perm => {
    if (!grouped[perm.category]) grouped[perm.category] = [];
    grouped[perm.category].push(perm);
  });
  return grouped;
};

// Group given permission IDs by category (for display)
export const groupPermissionsByCategory = (permissions, availablePermissions) => {
  const grouped = {};
  permissions.forEach((permId) => {
    const matched = availablePermissions.find(p => p.id === permId);
    const rawCategory = permId.split('_')[0];
    const category = matched?.category || rawCategory;
    if (!grouped[category]) grouped[category] = [];
    grouped[category].push({
      id: permId,
      name: matched?.name || permId.split('_').slice(1).join('_'),
    });
  });
  return grouped;
};