// React
import React, { useContext, useState } from "react";

// Styling
import { Form, Button, Container } from "react-bootstrap";

// Components
import MyAlert from "../utility/MyAlert";

// Context
import { AuthContext } from "../../contexts/AuthContext";
import { PostContext } from "../../contexts/PostContext";
import { AlertContext } from "../../contexts/AlertContext";

function CreatePost() {
  const { user } = useContext(AuthContext);
  const { addPost } = useContext(PostContext);
  const { alert, showAlert } = useContext(AlertContext);

  const [formData, setFormData] = useState({
    title: "",
    content: "",
  });

  if (!user) {
    return null;
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await addPost(formData);
      setFormData({ title: "", content: "" });
    } catch (error) {
      showAlert("danger", error);
    }
  };

  return (
    <Container className="mt-3 text-white bg-dark rounded p-3">
      <h2>Create Post</h2>
      {alert && <MyAlert message={alert.message} variant={alert.type} />}
      <Form onSubmit={handleSubmit} className="text-white">
        <Form.Group controlId="postTitle">
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Enter post title"
            className="bg-dark text-white"
          />
        </Form.Group>

        <Form.Group controlId="postContent">
          <Form.Label>Content</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            name="content"
            value={formData.content}
            onChange={handleChange}
            placeholder="Enter post content"
            className="bg-dark text-white"
          />
        </Form.Group>

        <Button className="mt-3" variant="success" type="submit">
          Create
        </Button>
      </Form>
    </Container>
  );
}

export default CreatePost;
