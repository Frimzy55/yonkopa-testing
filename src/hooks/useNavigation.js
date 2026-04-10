// hooks/useNavigation.js
import { useState, useCallback } from 'react';

export const useNavigation = (initialState = null) => {
  const [navigation, setNavigation] = useState(
    initialState || {
      activeMenu: 'Dashboard',
      activeSubMenu: null,
      activeNestedMenu: null,
      activeReportType: null,
      activeReportName: null
    }
  );

  const [expandedMenus, setExpandedMenus] = useState({});
  const [expandedSubMenus, setExpandedSubMenus] = useState({});

  const toggleSubMenu = useCallback((menuName, e) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    setExpandedMenus(prev => ({
      ...prev,
      [menuName]: !prev[menuName]
    }));
  }, []);

  const toggleNestedMenu = useCallback((parentMenu, subMenuName, e) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    const key = `${parentMenu}-${subMenuName}`;
    setExpandedSubMenus(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  }, []);

  const handleMenuClick = useCallback((item, saveScrollFn) => {
    if (saveScrollFn) saveScrollFn();
    
    setNavigation({
      activeMenu: item.name,
      activeSubMenu: null,
      activeNestedMenu: null,
      activeReportType: null,
      activeReportName: null
    });
  }, []);

  const handleSubMenuClick = useCallback((parentMenu, subMenuName, saveScrollFn) => {
    if (saveScrollFn) saveScrollFn();
    
    setNavigation({
      activeMenu: parentMenu,
      activeSubMenu: subMenuName,
      activeNestedMenu: null,
      activeReportType: null,
      activeReportName: null
    });
  }, []);

  const handleNestedMenuClick = useCallback((parentMenu, subMenuName, nestedMenuName, saveScrollFn) => {
    if (saveScrollFn) saveScrollFn();
    
    setNavigation({
      activeMenu: parentMenu,
      activeSubMenu: subMenuName,
      activeNestedMenu: nestedMenuName,
      activeReportType: null,
      activeReportName: null
    });
  }, []);

  const handleReportClick = useCallback((reportType, reportName, saveScrollFn) => {
    if (saveScrollFn) saveScrollFn();
    
    setNavigation({
      activeMenu: 'Reports',
      activeSubMenu: reportType,
      activeNestedMenu: null,
      activeReportType: reportType,
      activeReportName: reportName
    });
  }, []);

  const getDisplayTitle = useCallback(() => {
    if (navigation.activeReportName) return navigation.activeReportName;
    if (navigation.activeNestedMenu) return navigation.activeNestedMenu;
    if (navigation.activeSubMenu) return navigation.activeSubMenu;
    return navigation.activeMenu;
  }, [navigation]);

  return {
    navigation,
    setNavigation,
    expandedMenus,
    expandedSubMenus,
    toggleSubMenu,
    toggleNestedMenu,
    handleMenuClick,
    handleSubMenuClick,
    handleNestedMenuClick,
    handleReportClick,
    getDisplayTitle
  };
};