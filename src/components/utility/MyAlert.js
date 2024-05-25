import React from "react";
import Alert from "react-bootstrap/Alert";

function MyAlert({ variant, message }) {
  if (!message) {
    return null;
  }

  return <Alert variant={variant}>{message}</Alert>;
}

export default MyAlert;
