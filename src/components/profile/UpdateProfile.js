// React
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

// Styling
import "./Profile.css";
import { Button, Container, Form } from "react-bootstrap";

// Components
import MyAlert from "../utility/MyAlert";

// Contexts
import { AlertContext } from "../../contexts/AlertContext";
import { AuthContext } from "../../contexts/AuthContext";

// Services
import UserService from "../../services/UserService";

function UpdateProfile() {
  const { user } = useContext(AuthContext);
  const { showAlert, alert } = useContext(AlertContext);

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    bio: "",
    avatar: null,
  });

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await UserService.updateUser(formData, user.id);
      navigate(`/profile/${user.id}`);
    } catch (error) {
      showAlert("danger", error);
    }
  };

  const handleChange = (e) => {
    if (e.target.name === "avatar") {
      setFormData({
        ...formData,
        avatar: e.target.files[0],
      });
    } else {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value,
      });
    }
  };
  return (
    <div className="UpdateProfile">
      <Container className="bg-dark p-4 rounded text-light mb-2">
        <h1>Update Profile</h1>
        {alert && <MyAlert message={alert.message} variant={alert.type} />}
        <Form onSubmit={handleUpdate}>
          <Form.Group controlId="formBio">
            <Form.Label>Bio</Form.Label>
            <Form.Control
              as="textarea"
              className="bg-dark text-white no-resize"
              placeholder="Bio"
              name="bio"
              value={formData.bio}
              onChange={handleChange}
              rows={3}
            />
          </Form.Group>

          <Form.Group controlId="formAvatar" className="mb-3">
            <Form.Label>Avatar</Form.Label>
            <Form.Control
              className="bg-dark text-white"
              type="file"
              placeholder="New Password"
              name="avatar"
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

export default UpdateProfile;
