// React
import React, { useContext } from "react";

// CSS
import "./Utility.css";

// Bootstrap
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Offcanvas from "react-bootstrap/Offcanvas";

// Contexts
import { AuthContext } from "../../contexts/AuthContext";

// Images
import logo from "../../images/logo.png";
import { useNavigate } from "react-router-dom";

function MyNav() {
  const { user, isLoading, logoutUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logoutUser();
    navigate("/login");
  };

  return (
    <div className="MyNav">
      <Navbar
        data-bs-theme="dark"
        expand="md"
        className="bg-body-tertiary mb-3"
      >
        <Container fluid>
          <Navbar.Brand href="/home">
            <img src={logo} alt="logo" width="175" height="50" />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="offcanvasNavbar-expand-md" />
          <Navbar.Offcanvas
            id="offcanvasNavbar-expand-md"
            aria-labelledby="offcanvasNavbarLabel-expand-md"
            placement="end"
          >
            <Offcanvas.Header closeButton>
              <Offcanvas.Title id="offcanvasNavbarLabel-expand-md">
                Offcanvas
              </Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <Nav className="justify-content-end flex-grow-1 pe-3">
                <Nav.Link href="/home">Home</Nav.Link>
                <NavDropdown
                  title={
                    isLoading
                      ? "Loading..."
                      : user
                      ? user.email
                      : "Login / Register"
                  }
                  id="offcanvasNavbarDropdown-expand-md"
                >
                  {user ? (
                    <>
                      <NavDropdown.Item href={`/profile/${user.id}`}>
                        Profile
                      </NavDropdown.Item>
                      <NavDropdown.Divider />
                      <NavDropdown.Item onClick={handleLogout}>
                        Logout
                      </NavDropdown.Item>
                    </>
                  ) : (
                    <>
                      <NavDropdown.Item href="/register">
                        Register
                      </NavDropdown.Item>
                      <NavDropdown.Item href="/login">Login</NavDropdown.Item>
                    </>
                  )}
                </NavDropdown>
              </Nav>
              <Form className="d-flex">
                <Form.Control
                  type="search"
                  placeholder="Search"
                  className="me-2"
                  aria-label="Search"
                />
                <Button variant="outline-success">Search</Button>
              </Form>
            </Offcanvas.Body>
          </Navbar.Offcanvas>
        </Container>
      </Navbar>
    </div>
  );
}

export default MyNav;
