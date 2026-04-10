// hooks/useScrollPersistence.js
import { useRef, useCallback, useEffect } from 'react';

export const useScrollPersistence = (navigation) => {
  const contentAreaRef = useRef(null);
  const scrollPositions = useRef({
    Dashboard: 0,
    Customer: {},
    Account: {},
    Teller: {},
    Loans: {},
    'Internal Accounts': {},
    Admin: {},
    'My Approvals': {},
    Reports: {},
    'Batch Upload': {},
    'System Settings': {}
  });

  const saveCurrentScrollPosition = useCallback(() => {
    if (!contentAreaRef.current) return;
    
    const currentScrollTop = contentAreaRef.current.scrollTop;
    const { activeMenu, activeSubMenu, activeNestedMenu, activeReportName } = navigation;
    
    let scrollKey = activeMenu;
    if (activeSubMenu) scrollKey = `${activeMenu}-${activeSubMenu}`;
    if (activeNestedMenu) scrollKey = `${activeMenu}-${activeSubMenu}-${activeNestedMenu}`;
    if (activeReportName) scrollKey = `Reports-${activeReportName}`;
    
    scrollPositions.current[scrollKey] = currentScrollTop;
    sessionStorage.setItem(`scroll_${scrollKey}`, currentScrollTop);
  }, [navigation]);

  const restoreScrollPosition = useCallback(() => {
    if (!contentAreaRef.current) return;
    
    const { activeMenu, activeSubMenu, activeNestedMenu, activeReportName } = navigation;
    
    let scrollKey = activeMenu;
    if (activeSubMenu) scrollKey = `${activeMenu}-${activeSubMenu}`;
    if (activeNestedMenu) scrollKey = `${activeMenu}-${activeSubMenu}-${activeNestedMenu}`;
    if (activeReportName) scrollKey = `Reports-${activeReportName}`;
    
    let savedPosition = scrollPositions.current[scrollKey];
    if (savedPosition === undefined) {
      savedPosition = sessionStorage.getItem(`scroll_${scrollKey}`);
      if (savedPosition) {
        savedPosition = parseInt(savedPosition);
        scrollPositions.current[scrollKey] = savedPosition;
      }
    }
    
    if (savedPosition && !isNaN(savedPosition)) {
      setTimeout(() => {
        if (contentAreaRef.current) {
          contentAreaRef.current.scrollTop = savedPosition;
        }
      }, 50);
    } else {
      setTimeout(() => {
        if (contentAreaRef.current) {
          contentAreaRef.current.scrollTop = 0;
        }
      }, 50);
    }
  }, [navigation]);

  useEffect(() => {
    const scrollContainer = contentAreaRef.current;
    if (scrollContainer) {
      const handleScroll = () => saveCurrentScrollPosition();
      scrollContainer.addEventListener('scroll', handleScroll, { passive: true });
      return () => scrollContainer.removeEventListener('scroll', handleScroll);
    }
  }, [saveCurrentScrollPosition]);

  useEffect(() => {
    restoreScrollPosition();
  }, [navigation.activeMenu, navigation.activeSubMenu, navigation.activeNestedMenu, navigation.activeReportName, restoreScrollPosition]);

  return { contentAreaRef, saveCurrentScrollPosition };
};