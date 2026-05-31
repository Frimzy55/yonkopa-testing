import { useEffect, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";

const AUTO_LOGOUT_TIME = 15 * 60 * 1000;

const AutoLogout = () => {
  const navigate = useNavigate();
  const timeoutRef = useRef(null);

  const logout = useCallback(() => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/access", {
      state: {
        message: "Logged out due to inactivity"
      }
    });

  }, [navigate]);

  const resetTimer = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      logout();
    }, AUTO_LOGOUT_TIME);

  }, [logout]);

  useEffect(() => {

    const events = [
      "mousemove",
      "mousedown",
      "keypress",
      "scroll",
      "touchstart",
      "click"
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

  }, [resetTimer]);

  return null;
};

export default AutoLogout;