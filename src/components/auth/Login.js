// React
import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";

// Bootstrap
import { Form, Button, Container } from "react-bootstrap";

// Components
import MyAlert from "../utility/MyAlert";

// Services
import AuthService from "../../services/AuthService";

// Context
import { AuthContext } from "../../contexts/AuthContext";
import { AlertContext } from "../../contexts/AlertContext";

function Login() {
  const { loginUser } = useContext(AuthContext);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { alert, showAlert, clearAlert } = useContext(AlertContext);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      await loginUser(formData);
      clearAlert();
      navigate("/home");
    } catch (error) {
      showAlert("danger", error);
    }
  };

  const handleGoogleLogin = () => {
    AuthService.loginWithGoogle();
  };

  return (
    <div className="Login">
      <Container className="bg-dark p-4 rounded text-light mb-2">
        <h1>Login</h1>
        {alert && <MyAlert message={alert.message} variant={alert.type} />}
        <Form onSubmit={handleLogin}>
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

          <Form.Group controlId="formPassword" className="mb-3">
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

export default Login;
