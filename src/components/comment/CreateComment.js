// React
import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// Styling
import { Button, Modal, Form } from "react-bootstrap";
import { PencilSquare, ChatSquareDots } from "react-bootstrap-icons";

// Context
import { CommentContext } from "../../contexts/CommentContext";
import { AlertContext } from "../../contexts/AlertContext";
import { AuthContext } from "../../contexts/AuthContext";

// Components
import MyAlert from "../utility/MyAlert";

function CreateComment({ postId }) {
  const { addComment } = useContext(CommentContext);
  const { user } = useContext(AuthContext);
  const { alert, showAlert, hideAlert } = useContext(AlertContext);
  const navigate = useNavigate();

  const [show, setShow] = useState(false);
  const [content, setContent] = useState("");

  const handleClose = () => {
    setShow(false);
    hideAlert();
  };

  const handleShow = () => setShow(true);

  const handleChange = (e) => {
    setContent(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addComment({ content, postId, authorId: user.id });
      setContent("");
      navigate(`/posts/${postId}`);
    } catch (error) {
      showAlert("danger", error);
    }
  };

  return (
    <>
      <Button
        variant="primary"
        size="sm"
        className="m-1 button-width"
        onClick={handleShow}
      >
        <ChatSquareDots /> Comment
      </Button>

      <Modal show={show} onHide={handleClose} dialogClassName="dark-modal">
        <Modal.Header closeButton>
          <Modal.Title>Create Comment</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {alert && <MyAlert message={alert.message} variant={alert.type} />}
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="content">
              <Form.Label>Content</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="content"
                value={content}
                onChange={handleChange}
                className="bg-dark text-white"
              />
            </Form.Group>

            <Button className="mt-3" variant="primary" type="submit">
              Create
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default CreateComment;
