// components/Roles/MenuTree.js
import React from 'react';
import { getPermissionId } from './permissionsUtils';

const MenuTree = ({
  menuItems,
  expandedMenus,
  expandedSubMenus,
  expandedNestedMenus,
  onToggleMenu,
  onToggleSubMenu,
  onToggleNestedMenu,
  selectedPermissions,
  onPermissionChange
}) => {
  const isSelected = (id) => selectedPermissions.includes(id);

  // Helper render functions (same as original, but using props)
  const renderReports = (reports, menuName, subMenuName) => {
    if (!reports?.length) return null;
    return (
      <ul className="list-unstyled ms-4 mt-2">
        {reports.map((report, idx) => {
          const permId = getPermissionId(menuName, subMenuName, report.name);
          return (
            <li key={idx} className="mb-1">
              <div className="d-flex align-items-center p-1 rounded hover-bg">
                <input type="checkbox" className="form-check-input me-2" id={permId}
                  checked={isSelected(permId)} onChange={() => onPermissionChange(permId)} />
                <i className={`${report.icon} me-2 text-success`}></i>
                <label className="form-check-label small" htmlFor={permId}>{report.name}</label>
              </div>
            </li>
          );
        })}
      </ul>
    );
  };

  const renderNestedMenus = (nestedMenus, menuName, subMenuName) => {
    if (!nestedMenus?.length) return null;
    return (
      <ul className="list-unstyled ms-4 mt-2">
        {nestedMenus.map((nested, idx) => {
          const nestedKey = `${menuName}_${subMenuName}_${nested.name}`;
          const hasNestedChildren = nested.nestedMenus?.length > 0;
          const hasReports = nested.reports?.length > 0;
          const permId = getPermissionId(menuName, subMenuName, nested.name);
          return (
            <li key={idx} className="mb-2">
              {hasNestedChildren || hasReports ? (
                <>
                  <div className="d-flex align-items-center p-2 rounded hover-bg cursor-pointer" style={{ cursor: 'pointer', backgroundColor: '#f8f9fa' }}>
                    <i className={`bi ${expandedNestedMenus[nestedKey] ? 'bi-chevron-down' : 'bi-chevron-right'} me-2 text-info`}
                      onClick={() => onToggleNestedMenu(menuName, subMenuName, nested.name)} style={{ cursor: 'pointer' }}></i>
                    <input type="checkbox" className="form-check-input me-2" id={permId}
                      checked={isSelected(permId)} onChange={() => onPermissionChange(permId)} />
                    <i className={`${nested.icon} me-2 text-primary`}></i>
                    <label className="form-check-label fw-semibold" htmlFor={permId}>{nested.name}</label>
                  </div>
                  {expandedNestedMenus[nestedKey] && (
                    <>
                      {hasNestedChildren && renderNestedMenus(nested.nestedMenus, menuName, `${subMenuName}_${nested.name}`)}
                      {hasReports && renderReports(nested.reports, menuName, `${subMenuName}_${nested.name}`)}
                    </>
                  )}
                </>
              ) : (
                <div className="d-flex align-items-center p-2 rounded hover-bg ms-3">
                  <input type="checkbox" className="form-check-input me-2" id={permId}
                    checked={isSelected(permId)} onChange={() => onPermissionChange(permId)} />
                  <i className={`${nested.icon} me-2 text-secondary`}></i>
                  <label className="form-check-label" htmlFor={permId}>{nested.name}</label>
                </div>
              )}
            </li>
          );
        })}
      </ul>
    );
  };

  const renderSubMenus = (subMenus, menuName) => {
    if (!subMenus?.length) return null;
    return (
      <ul className="list-unstyled mt-2 ms-4">
        {subMenus.map((subMenu, idx) => {
          const subMenuKey = `${menuName}_${subMenu.name}`;
          const hasNested = subMenu.nestedMenus?.length > 0;
          const hasReports = subMenu.reports?.length > 0;
          const hasContent = hasNested || hasReports;
          const permId = getPermissionId(menuName, subMenu.name);
          return (
            <li key={idx} className="mb-2">
              {hasContent ? (
                <>
                  <div className="d-flex align-items-center p-2 rounded hover-bg cursor-pointer" style={{ cursor: 'pointer', backgroundColor: '#e9ecef' }}>
                    <i className={`bi ${expandedSubMenus[subMenuKey] ? 'bi-chevron-down' : 'bi-chevron-right'} me-2 text-info`}
                      onClick={() => onToggleSubMenu(menuName, subMenu.name)} style={{ cursor: 'pointer' }}></i>
                    <input type="checkbox" className="form-check-input me-2" id={permId}
                      checked={isSelected(permId)} onChange={() => onPermissionChange(permId)} />
                    <i className={`${subMenu.icon} me-2 text-primary`}></i>
                    <label className="form-check-label fw-semibold" htmlFor={permId}>{subMenu.name}</label>
                  </div>
                  {expandedSubMenus[subMenuKey] && (
                    <div className="mt-2">
                      {hasNested && renderNestedMenus(subMenu.nestedMenus, menuName, subMenu.name)}
                      {hasReports && renderReports(subMenu.reports, menuName, subMenu.name)}
                    </div>
                  )}
                </>
              ) : (
                <div className="d-flex align-items-center p-2 rounded hover-bg">
                  <input type="checkbox" className="form-check-input me-2" id={permId}
                    checked={isSelected(permId)} onChange={() => onPermissionChange(permId)} />
                  <i className={`${subMenu.icon} me-2 text-secondary`}></i>
                  <label className="form-check-label" htmlFor={permId}>{subMenu.name}</label>
                </div>
              )}
            </li>
          );
        })}
      </ul>
    );
  };

  return (
    <div className="menu-tree">
      {menuItems.map((menu, idx) => {
        const menuPermId = getPermissionId(menu.name);
        return (
          <div key={idx} className="mb-3 border rounded">
            <div className="d-flex justify-content-between align-items-center p-3 bg-primary bg-opacity-10 rounded-top cursor-pointer" style={{ cursor: 'pointer' }}>
              <div className="d-flex align-items-center">
                <i className={`bi ${expandedMenus[menu.name] ? 'bi-chevron-down' : 'bi-chevron-right'} me-3 text-primary fs-5`}
                  onClick={() => onToggleMenu(menu.name)} style={{ cursor: 'pointer' }}></i>
                <input type="checkbox" className="form-check-input me-3" id={menuPermId}
                  checked={isSelected(menuPermId)} onChange={() => onPermissionChange(menuPermId)}
                  disabled={menu.name === 'Dashboard'} />
                <i className={`${menu.icon} me-3 text-primary fs-4`}></i>
                <label className="form-check-label h5 mb-0 text-primary" htmlFor={menuPermId}>{menu.name}</label>
              </div>
              <div className="d-flex align-items-center">
                {menu.subMenus?.length > 0 && <span className="badge bg-primary me-2">{menu.subMenus.length} items</span>}
                <i className={`bi ${expandedMenus[menu.name] ? 'bi-chevron-up' : 'bi-chevron-down'} text-primary`}
                  onClick={() => onToggleMenu(menu.name)} style={{ cursor: 'pointer' }}></i>
              </div>
            </div>
            {expandedMenus[menu.name] && (
              <div className="p-3 border-top">
                {menu.subMenus?.length > 0 ? renderSubMenus(menu.subMenus, menu.name) :
                  <div className="text-muted text-center py-3"><i className="bi bi-info-circle me-2"></i>No sub-menus available</div>}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default MenuTree;