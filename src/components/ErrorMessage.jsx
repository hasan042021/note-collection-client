import React, { useState } from "react";
import { Alert, Toast, ToastContainer } from "react-bootstrap";
import { ExclamationCircleFill } from "react-bootstrap-icons";

const ErrorMessage = ({ variant = "info", children }) => {
  const [show, setShow] = useState(true);
  return (
    <ToastContainer className="p-3" position="bottom-start">
      <Toast
        bg={variant}
        className="text-white"
        onClose={() => setShow(false)}
        show={show}
        delay={5000}
        autohide
        animation="true"
      >
        <Toast.Header>
          <ExclamationCircleFill />
          <strong className="me-auto">Error!</strong>
          <small>1 second ago</small>
        </Toast.Header>
        <Toast.Body>{children}</Toast.Body>
      </Toast>
    </ToastContainer>
  );
};

export default ErrorMessage;
