import React from "react";
import { Container } from "react-bootstrap";

import "./Utility.css";

function MyFooter() {
  return (
    <div
      className="MyFooter bg-dark text-light d-flex align-items-center justify-content-center"
      style={{ height: "100%" }}
    >
      <Container as="footer" className="text-center py-3">
        <p>&copy; {new Date().getFullYear()} Queryhub</p>
      </Container>
    </div>
  );
}

export default MyFooter;
