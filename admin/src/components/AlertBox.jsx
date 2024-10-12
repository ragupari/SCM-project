import React, { useState, useEffect } from "react";
import { Alert } from "react-bootstrap";

const AlertBox = ({ show, variant, message, onClose }) => {
  const [visible, setVisible] = useState(show);

  useEffect(() => {
    if (show) {
      setVisible(true);

      const timer = setTimeout(() => {
        setVisible(false);
        onClose(); // Call the onClose callback to reset the state
      }, 3000); // Dismiss after 3 seconds

      return () => clearTimeout(timer); // Clean up the timer
    }
  }, [show, onClose]);

  // Define icon based on variant
  const renderIcon = () => {
    if (variant === "danger") {
      return <i class="bi bi-exclamation-circle" style={{ color: "red", marginRight: "10px" }} />;
    } else if (variant === "success") {
      return <i class="bi bi-check-circle" style={{ color: "green", marginRight: "10px" }} />;
    }
    return null; // No icon for other variants
  };

  return (
    <div
      style={{
        position: "fixed",
        top: visible ? "20px" : "-100px", // Slide down effect
        left: "50%",
        transform: "translateX(-50%)",
        zIndex: 9999,
        transition: "top 0.5s ease-in-out", // Smooth sliding animation
        width: "350px", // Fixed width
        height: "50px", // Fixed height
        backgroundColor: "white", // White background
        borderRadius: "10px", // Rounded borders
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", // Light shadow
        display: "flex",
        alignItems: "center", // Align content vertically
        padding: "10px",
      }}
    >
      {visible && (
        <Alert
          variant={variant}
          onClose={() => setVisible(false)}
          style={{
            margin: 0,
            padding: 0,
            border: "none",
            background: "none",
            display: "flex",
            alignItems: "center", // Align icon and message
          }}
        >
          {renderIcon()}
          <span>{message}</span>
        </Alert>
      )}
    </div>
  );
};

export default AlertBox;
