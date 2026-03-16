// src/pages/CustomerDashboard/NotificationsSupport.jsx
import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const NotificationsSupport = ({ user }) => {

  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    if (!user) return;

    const fetchNotifications = async () => {
      try {

        const res = await fetch(
          `${process.env.REACT_APP_API_URL}/api/notifications/${user.id}`
        );

        const data = await res.json();

        setNotifications(data);
        setLoading(false);

      } catch (error) {
        console.error("Error fetching notifications:", error);
        setLoading(false);
      }
    };

    fetchNotifications();

  }, [user]);

  return (
    <div className="container-fluid py-4">
      <div className="row justify-content-center">
        <div className="col-lg-8">

          {/* Title */}
          <div className="mb-4">
            <h3 className="fw-bold">Notifications & Support</h3>
            <p className="text-muted">
              View system notifications related to your account.
            </p>
          </div>

          {/* Notifications Card */}
          <div className="card shadow-sm border-0 mb-4">
            <div className="card-body">

              <h5 className="fw-semibold mb-3">Your Notifications</h5>

              {loading ? (
                <p>Loading notifications...</p>
              ) : notifications.length === 0 ? (
                <p className="text-muted">No notifications available.</p>
              ) : (

                <ul className="list-group">

                  {notifications.map((note) => (
                    <li
                      key={note.id}
                      className={`list-group-item ${
                        note.isRead ? "" : "list-group-item-warning"
                      }`}
                    >

                      <div className="d-flex justify-content-between">

                        <div>

                          <p className="mb-1">
                            <strong>User ID:</strong> {note.userId}
                          </p>

                          <p className="mb-1">
                            <strong>Type:</strong> {note.type}
                          </p>

                          <p className="mb-1">
                            {note.message}
                          </p>

                          <small className="text-muted">
                            {new Date(note.createdAt).toLocaleString()}
                          </small>

                        </div>

                        {!note.isRead && (
                          <span className="badge bg-primary align-self-start">
                            New
                          </span>
                        )}

                      </div>

                    </li>
                  ))}

                </ul>

              )}

            </div>
          </div>

          {/* Support Section */}
          <div className="card shadow-sm border-0">
            <div className="card-body">

              <h5 className="fw-semibold mb-3">Customer Support</h5>

              <div className="d-flex gap-3 flex-wrap">
                <button className="btn btn-primary">
                  Contact Support
                </button>

                <button className="btn btn-outline-primary">
                  Live Chat
                </button>
              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default NotificationsSupport;