import { useEffect, useRef, useCallback } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const AUTO_LOGOUT_TIME = 1 * 60 * 1000;

const AutoLogout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const timeoutRef = useRef(null);

  const logout = useCallback(() => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/access", {
      replace: true,
      state: {
        message: "Logged out due to inactivity",
      },
    });
  }, [navigate]);

  const resetTimer = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(logout, AUTO_LOGOUT_TIME);
  }, [logout]);

  useEffect(() => {
    // Do not run on customer page
    if (location.pathname === "/customer-page") {
      return;
    }

    const user = JSON.parse(localStorage.getItem("user") || "{}");

    // Do not run for customers
    if (user.role === "customer") {
      return;
    }

    // Only run if logged in
    if (!localStorage.getItem("token")) {
      return;
    }

    const events = [
      "mousemove",
      "mousedown",
      "keypress",
      "scroll",
      "touchstart",
      "click",
    ];

    events.forEach((event) => {
      window.addEventListener(event, resetTimer);
    });

    resetTimer();

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      events.forEach((event) => {
        window.removeEventListener(event, resetTimer);
      });
    };
  }, [location.pathname, resetTimer]);

  return null;
};

export default AutoLogout;