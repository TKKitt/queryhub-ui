// React
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

// Bootstrap
import { Form, Button, Container } from "react-bootstrap";

// Components
import MyAlert from "../utility/MyAlert";

// Service
import AuthService from "../../services/AuthService";

// Context
import { AlertContext } from "../../contexts/AlertContext";

function Register() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const { alert, showAlert } = useContext(AlertContext);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      showAlert("danger", "Passwords do not match");
      return;
    }
    try {
      const data = await AuthService.registerUser(formData);
      console.log(data);
      navigate("/login");
    } catch (error) {
      showAlert("danger", error);
    }
  };

  const handleGoogleLogin = () => {
    AuthService.loginWithGoogle();
  };

  return (
    <div className="Register">
      <Container className="bg-dark p-4 rounded text-light">
        <h1>Register</h1>
        {alert && <MyAlert message={alert.message} variant={alert.type} />}
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              className="bg-dark text-white"
              type="email"
              placeholder="Enter email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group controlId="formPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              className="bg-dark text-white"
              type="password"
              placeholder="Password"
              name="password"
              value={formData.password}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group controlId="formConfirmPassword" className="mb-3">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              className="bg-dark text-white"
              type="password"
              placeholder="Confirm Password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
            />
          </Form.Group>

          <Button className="button-width me-3" variant="light" type="submit">
            Submit
          </Button>

          <Button
            className="button-width"
            variant="light"
            type="button"
            onClick={handleGoogleLogin}
          >
            Google
          </Button>
        </Form>
      </Container>
    </div>
  );
}

export default Register;
