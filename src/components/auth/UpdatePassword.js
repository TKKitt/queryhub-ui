// React
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

// Styling
import { Form, Button, Container } from "react-bootstrap";
import context from "react-bootstrap/esm/AccordionContext";

// Components
import MyAlert from "../utility/MyAlert";

// Context
import { AuthContext } from "../../contexts/AuthContext";
import { AlertContext } from "../../contexts/AlertContext";

// Service
import AuthService from "../../services/AuthService";

function UpdatePassword() {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const [formData, setFormData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });

  const { alert, showAlert } = useContext(AlertContext);

  const handleUpdate = async (e) => {
    e.preventDefault();

    if (formData.newPassword !== formData.confirmNewPassword) {
      showAlert("danger", "Passwords do not match");
      return;
    }

    try {
      await AuthService.updatePassword(formData, user.id);
      navigate(`/profile/${user.id}`);
    } catch (error) {
      showAlert("danger", error);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="UpdatePassword">
      <Container className="bg-dark p-4 rounded text-light mb-2">
        <h1>Update Password</h1>
        {alert && <MyAlert message={alert.message} variant={alert.type} />}
        <Form onSubmit={handleUpdate}>
          <Form.Group controlId="formOldPassword">
            <Form.Label>Current Password</Form.Label>
            <Form.Control
              className="bg-dark text-white"
              type="password"
              placeholder="Current Password"
              name="oldPassword"
              value={formData.oldPassword}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group controlId="formNewPassword" className="mb-3">
            <Form.Label>New Password</Form.Label>
            <Form.Control
              className="bg-dark text-white"
              type="password"
              placeholder="New Password"
              name="newPassword"
              value={formData.newPassword}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group controlId="formConfirmNewPassword" className="mb-3">
            <Form.Label>Confirm New Password</Form.Label>
            <Form.Control
              className="bg-dark text-white"
              type="password"
              placeholder="Confirm New Password"
              name="confirmNewPassword"
              value={formData.confirmNewPassword}
              onChange={handleChange}
            />
          </Form.Group>

          <Button className="button-width me-3" variant="warning" type="submit">
            Update
          </Button>
        </Form>
      </Container>
    </div>
  );
}

export default UpdatePassword;
