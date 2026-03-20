import React, { useEffect, useState } from "react";
import { 
  Card, 
  Badge, 
  Spinner, 
  Alert, 
  ProgressBar,
  Button,
  Nav
} from "react-bootstrap";
import { 
  CheckCircleFill, 
  ClockFill, 
  HourglassSplit, 
  CheckLg, 
  XCircleFill
} from "react-bootstrap-icons";

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
    color: "success",
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

const CustomerLoanStatus = ({ user, onStatusChange, showDetails = true }) => {
  const [currentStatus, setCurrentStatus] = useState("No Loan");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [, setLoanDetails] = useState(null);

  useEffect(() => {
    if (!user?.id) return;

    const fetchStatus = async () => {
      setIsLoading(true);
      setError(null);
      
      try {
        const res = await fetch(
          `${process.env.REACT_APP_API_URL}/api/loan-status/${user.id}`
        );

        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }

        const data = await res.json();

        // ✅ HANDLE NO LOAN
        if (data.status === "No Loan") {
          setCurrentStatus("No Loan");
          setIsLoading(false);
          return;
        }

        // ✅ VALID STATUSES
        const validStatuses = ["Pending", "Approved", "Rejected"];

        const newStatus = validStatuses.includes(data.status)
          ? data.status
          : "Pending";

        setCurrentStatus(newStatus);
        setLoanDetails(data.details || null);
        
        if (onStatusChange && newStatus !== currentStatus) {
          onStatusChange(newStatus);
        }
        
      } catch (error) {
        console.error("Error fetching loan status:", error);
        setError("Failed to load loan status. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchStatus();
  }, []);

  // ✅ SHOW LOADING
  if (isLoading) {
    return (
      <Card className="shadow-sm border-0">
        <Card.Body className="text-center py-5">
          <Spinner animation="border" variant="primary" />
          <p className="mt-3 text-muted">Loading loan status...</p>
        </Card.Body>
      </Card>
    );
  }

  // ✅ SHOW ERROR
  if (error) {
    return (
      <Card className="shadow-sm border-0">
        <Card.Body className="py-4">
          <Alert variant="danger">
            <h5>Error Loading Status</h5>
            <p>{error}</p>
            <Button onClick={() => window.location.reload()} size="sm">
              Retry
            </Button>
          </Alert>
        </Card.Body>
      </Card>
    );
  }

  // ✅ NO LOAN UI
  if (currentStatus === "No Loan") {
    return (
      <Card className="shadow-sm border-0">
        <Card.Body className="p-4 text-center">
          <ClockFill size={40} className="mb-3 text-secondary" />
          <h4>No Loan Application</h4>
          <p className="text-muted">
            You have not applied for a loan yet.
          </p>
          <Button variant="primary">
            Apply for Loan
          </Button>
        </Card.Body>
      </Card>
    );
  }

  const currentIndex = STEPS.findIndex(step => step.name === currentStatus);
  const progressPercentage = ((currentIndex) / (STEPS.length - 1)) * 100;
  const currentStep = STEPS[currentIndex];
  const CurrentIcon = currentStep?.icon || ClockFill;

  const getStatusVariant = () => {
    switch(currentStatus) {
      case "Pending": return "warning";
      case "Approved": return "success";
      case "Rejected": return "danger";
      default: return "secondary";
    }
  };

  return (
    <Card className="shadow-sm border-0">
      <Card.Body className="p-4">

        {/* HEADER */}
        <div className="d-flex justify-content-between align-items-start mb-4">
          <div>
            <h2 className="h4 fw-bold">Loan Progress</h2>
            <p className="text-muted mb-0">Track your loan journey</p>
          </div>

          <Badge bg={getStatusVariant()} className="px-3 py-2">
            <CurrentIcon size={14} className="me-1" />
            {currentStatus}
          </Badge>
        </div>

        {/* PROGRESS */}
        <ProgressBar 
          now={progressPercentage} 
          variant={getStatusVariant()}
          style={{ height: "8px", borderRadius: "5px" }}
          className="mb-4"
        />

        {/* STEPS */}
        <Nav className="justify-content-between mb-4">
          {STEPS.slice(1).map((step, index) => {
            const realIndex = index + 1;
            const isActive = realIndex === currentIndex;
            const isCompleted = realIndex < currentIndex;
            const StepIcon = step.icon;

            return (
              <Nav.Item key={step.name} className="text-center" style={{ flex: 1 }}>
                <div className={isCompleted ? 'text-success' : isActive ? 'text-warning' : 'text-secondary'}>
                  <div 
                    className={`
                      rounded-circle d-flex align-items-center justify-content-center mx-auto mb-2
                      ${isCompleted ? 'bg-success' : isActive ? 'bg-warning' : 'bg-light'}
                    `}
                    style={{ width: "40px", height: "40px" }}
                  >
                    {isCompleted ? (
                      <CheckCircleFill className="text-white" size={18} />
                    ) : (
                      <StepIcon size={18} />
                    )}
                  </div>
                  <div className="small fw-semibold">{step.name}</div>
                </div>
              </Nav.Item>
            );
          })}
        </Nav>

        {/* DETAILS */}
        {showDetails && currentStep && (
          <Alert variant={getStatusVariant()}>
            <h6 className="mb-1">Status: {currentStatus}</h6>
            <p className="mb-0 small">{currentStep.details}</p>
          </Alert>
        )}

      </Card.Body>
    </Card>
  );
};

export default CustomerLoanStatus;