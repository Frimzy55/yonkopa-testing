import React, { useEffect, useState } from "react";
import {
  Spinner,
  Alert,
} from "react-bootstrap";
import {
  CheckCircleFill,
  ClockFill,
  HourglassSplit,
  CheckLg,
  XCircleFill,
  
  FileText,
  ArrowRepeat       // ← fixed: replaced RefreshCw with ArrowRepeat
} from "react-bootstrap-icons";

// STEPS, extractUserId, normalizeStatus remain exactly the same as before
const STEPS = [
  {
    name: "No Loan",
    icon: ClockFill,
    description: "You have not applied for any loan yet",
    color: "secondary",
    details: "Start by applying for a loan."
  },
  {
    name: "Pending",
    icon: HourglassSplit,
    description: "Application submitted and awaiting review",
    color: "warning",
    details: "Your application is being processed."
  },
  {
    name: "Approved",
    icon: CheckLg,
    description: "Loan approved",
    color: "info",
    details: "Your loan has been approved."
  },
  {
    name: "Rejected",
    icon: XCircleFill,
    description: "Loan rejected",
    color: "danger",
    details: "Your loan was not approved."
  }
];

const extractUserId = (user) => {
  if (!user) return null;
  const idFields = ["id", "userId", "user_id", "ID", "uid", "_id"];
  for (const field of idFields) {
    if (user[field]) return user[field];
  }
  if (user.user?.id) return user.user.id;
  if (user.user?.userId) return user.user.userId;
  if (user.profile?.id) return user.profile.id;
  return null;
};

const normalizeStatus = (status) => {
  if (!status) return "No Loan";
  const s = status.toLowerCase();
  if (s === "pending") return "Pending";
  if (s === "approved") return "Approved";
  if (s === "rejected") return "Rejected";
  return "No Loan";
};

// Professional styles (same as before, fixed the borderLeftColor usage)
const styles = {
  container: {
    maxWidth: '900px',
    margin: '0 auto',
    padding: '1.5rem',
    fontFamily: "'Inter', system-ui, -apple-system, sans-serif"
  },
  card: {
    background: '#ffffff',
    borderRadius: '24px',
    boxShadow: '0 20px 35px -12px rgba(0,0,0,0.1), 0 1px 3px rgba(0,0,0,0.02)',
    overflow: 'hidden',
    transition: 'transform 0.2s ease, box-shadow 0.2s ease'
  },
  header: {
    padding: '1.5rem 2rem',
    borderBottom: '1px solid #f0f2f5',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: '1rem'
  },
  title: {
    fontSize: '1.5rem',
    fontWeight: '600',
    color: '#1a2c3e',
    margin: 0,
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem'
  },
  badge: (variant) => ({
    padding: '0.4rem 1rem',
    borderRadius: '40px',
    fontSize: '0.8rem',
    fontWeight: '500',
    display: 'inline-flex',
    alignItems: 'center',
    gap: '0.5rem',
    background: variant === 'warning' ? '#fef3c7' : variant === 'info' ? '#e0f2fe' : variant === 'danger' ? '#fee2e2' : '#f3f4f6',
    color: variant === 'warning' ? '#b45309' : variant === 'info' ? '#0369a1' : variant === 'danger' ? '#b91c1c' : '#4b5563',
    border: '1px solid',
    borderColor: variant === 'warning' ? '#fde68a' : variant === 'info' ? '#bae6fd' : variant === 'danger' ? '#fecaca' : '#e5e7eb'
  }),
  progressWrapper: {
    padding: '1.5rem 2rem 0.5rem 2rem',
    background: '#ffffff'
  },
  progressLabel: {
    display: 'flex',
    justifyContent: 'space-between',
    fontSize: '0.75rem',
    fontWeight: '500',
    marginBottom: '0.5rem',
    color: '#4b5563'
  },
  progressBar: {
    height: '8px',
    background: '#e5e7eb',
    borderRadius: '10px',
    overflow: 'hidden'
  },
  progressFill: (progress, variant) => ({
    width: `${progress}%`,
    height: '100%',
    background: variant === 'warning' ? '#f59e0b' : variant === 'info' ? '#0ea5e9' : variant === 'danger' ? '#ef4444' : '#6b7280',
    borderRadius: '10px',
    transition: 'width 0.4s ease'
  }),
  timeline: {
    padding: '1rem 2rem 2rem 2rem',
    display: 'flex',
    justifyContent: 'space-between',
    position: 'relative'
  },
  step: {
    flex: 1,
    textAlign: 'center',
    position: 'relative',
    zIndex: 2
  },
  stepIconWrapper: (isActive, isDone, color) => ({
    width: '48px',
    height: '48px',
    margin: '0 auto 0.75rem auto',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: isDone ? (color === 'warning' ? '#f59e0b' : color === 'info' ? '#0ea5e9' : color === 'danger' ? '#ef4444' : '#9ca3af') : (isActive ? (color === 'warning' ? '#fef3c7' : color === 'info' ? '#e0f2fe' : color === 'danger' ? '#fee2e2' : '#f3f4f6') : '#f9fafb'),
    border: isActive && !isDone ? `2px solid ${color === 'warning' ? '#f59e0b' : color === 'info' ? '#0ea5e9' : color === 'danger' ? '#ef4444' : '#9ca3af'}` : 'none',
    transition: 'all 0.2s ease'
  }),
  stepIcon: (isDone, color) => ({
    fontSize: '1.4rem',
    color: isDone ? '#ffffff' : (color === 'warning' ? '#f59e0b' : color === 'info' ? '#0ea5e9' : color === 'danger' ? '#ef4444' : '#6b7280')
  }),
  stepName: {
    fontSize: '0.85rem',
    fontWeight: '500',
    color: '#1f2937'
  },
  stepStatus: {
    fontSize: '0.7rem',
    color: '#6b7280',
    marginTop: '0.25rem'
  },
  connector: {
    position: 'absolute',
    top: '24px',
    left: '0',
    right: '0',
    height: '2px',
    background: '#e5e7eb',
    zIndex: 1
  },
  connectorFill: (progress, color) => ({
    position: 'absolute',
    top: '24px',
    left: '0',
    width: `${progress}%`,
    height: '2px',
    background: color === 'warning' ? '#f59e0b' : color === 'info' ? '#0ea5e9' : color === 'danger' ? '#ef4444' : '#9ca3af',
    transition: 'width 0.4s ease',
    zIndex: 2
  }),
  detailsCard: (variant) => ({
    margin: '0 2rem 2rem 2rem',
    padding: '1.25rem 1.5rem',
    borderRadius: '16px',
    background: '#f8fafc',
    borderLeft: `4px solid ${variant === 'warning' ? '#f59e0b' : variant === 'info' ? '#0ea5e9' : variant === 'danger' ? '#ef4444' : '#9ca3af'}`
  }),
  actionButton: (variant) => ({
    background: variant === 'warning' ? '#f59e0b' : variant === 'info' ? '#0ea5e9' : variant === 'danger' ? '#ef4444' : '#3b82f6',
    color: 'white',
    border: 'none',
    padding: '0.6rem 1.5rem',
    borderRadius: '40px',
    fontWeight: '500',
    fontSize: '0.9rem',
    display: 'inline-flex',
    alignItems: 'center',
    gap: '0.5rem',
    cursor: 'pointer',
    transition: 'transform 0.1s ease, background 0.2s',
    boxShadow: '0 1px 2px rgba(0,0,0,0.05)'
  }),
  emptyState: {
    textAlign: 'center',
    padding: '3rem 2rem',
    background: '#ffffff'
  }
};

const CustomerLoanStatus = ({ user, onStatusChange, showDetails = true, onApplyLoan }) => {
  const [currentStatus, setCurrentStatus] = useState("No Loan");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!user) {
      setError("User data is missing. Please log in again.");
      setIsLoading(false);
      return;
    }

    const userId = extractUserId(user);
    if (!userId) {
      setError("User ID not found.");
      setIsLoading(false);
      return;
    }

    const fetchStatus = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const apiUrl = process.env.REACT_APP_API_URL || "http://localhost:5000";
        const response = await fetch(`${apiUrl}/api/loan-status/${userId}`);
        if (!response.ok) throw new Error(`HTTP error! ${response.status}`);
        const data = await response.json();
        const newStatus = normalizeStatus(data.status);
        setCurrentStatus((prev) => {
          if (onStatusChange && newStatus !== prev) onStatusChange(newStatus);
          return newStatus;
        });
      } catch (err) {
        console.error(err);
        setError("Failed to load loan status");
      } finally {
        setIsLoading(false);
      }
    };

    fetchStatus();
  }, [user, onStatusChange]);

  if (isLoading) {
    return (
      <div style={styles.container}>
        <div style={styles.card}>
          <div style={styles.emptyState}>
            <Spinner animation="border" variant="info" />
            <p style={{ marginTop: '1rem', color: '#4b5563' }}>Loading loan status...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div style={styles.container}>
        <div style={styles.card}>
          <div style={styles.emptyState}>
            <Alert variant="danger" style={{ width: '100%' }}>
              <p>{error}</p>
              <button
                style={styles.actionButton('info')}
                onClick={() => window.location.reload()}
              >
                <ArrowRepeat size={16} /> Retry
              </button>
            </Alert>
          </div>
        </div>
      </div>
    );
  }

  if (currentStatus === "No Loan") {
    return (
      <div style={styles.container}>
        <div style={styles.card}>
          <div style={styles.emptyState}>
            <ClockFill size={48} style={{ color: '#9ca3af', marginBottom: '1rem' }} />
            <h3 style={{ color: '#1f2937', marginBottom: '0.5rem' }}>No Loan Application</h3>
            <p style={{ color: '#6b7280', marginBottom: '1.5rem' }}>You have not applied for a loan yet.</p>
            <button style={styles.actionButton('info')} onClick={onApplyLoan}>
              <FileText size={16} /> Apply for Loan
            </button>
          </div>
        </div>
      </div>
    );
  }

  const currentIndex = STEPS.findIndex((step) => step.name === currentStatus);
  const progress = (currentIndex / (STEPS.length - 1)) * 100;
  const currentStep = STEPS[currentIndex];
  const getVariant = () => {
    if (currentStatus === "Pending") return "warning";
    if (currentStatus === "Approved") return "info";
    if (currentStatus === "Rejected") return "danger";
    return "secondary";
  };
  const variant = getVariant();

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <div style={styles.header}>
          <div style={styles.title}>
            <FileText size={22} /> Loan Progress
          </div>
          <div style={styles.badge(variant)}>
            {React.createElement(currentStep.icon, { size: 14 })}
            {currentStatus}
          </div>
        </div>

        <div style={styles.progressWrapper}>
          <div style={styles.progressLabel}>
            <span>Application</span>
            <span>Review</span>
            <span>Decision</span>
          </div>
          <div style={styles.progressBar}>
            <div style={styles.progressFill(progress, variant)}></div>
          </div>
        </div>

        <div style={{ position: 'relative', padding: '0 2rem' }}>
          <div style={styles.connector}></div>
          <div style={styles.connectorFill(progress, variant)}></div>
          <div style={styles.timeline}>
            {STEPS.slice(1).map((step, idx) => {
              const realIndex = idx + 1;
              const isActive = realIndex === currentIndex;
              const isDone = realIndex < currentIndex;
              const Icon = step.icon;
              return (
                <div key={step.name} style={styles.step}>
                  <div style={styles.stepIconWrapper(isActive, isDone, variant)}>
                    {isDone ? (
                      <CheckCircleFill style={{ color: '#fff', fontSize: '1.4rem' }} />
                    ) : (
                      <Icon style={styles.stepIcon(isDone, variant)} />
                    )}
                  </div>
                  <div style={styles.stepName}>{step.name}</div>
                  <div style={styles.stepStatus}>
                    {isDone ? 'Completed' : isActive ? 'Current' : 'Pending'}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {showDetails && (
          <div style={styles.detailsCard(variant)}>
            <strong>{currentStatus}</strong> — {currentStep.details}
          </div>
        )}

        {currentStatus === "Rejected" && (
          <div style={{ padding: '0 2rem 2rem 2rem', textAlign: 'center' }}>
            <button style={styles.actionButton(variant)} onClick={onApplyLoan}>
              <ArrowRepeat size={16} /> Apply Again
            </button>
            <p style={{ fontSize: '0.75rem', color: '#6b7280', marginTop: '0.75rem' }}>
              Your previous application was not approved. You can submit a new one.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CustomerLoanStatus;