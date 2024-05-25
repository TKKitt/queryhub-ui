// React
import React, { useState, useContext, useEffect } from "react";

// Styling
import { Button, Modal, Form } from "react-bootstrap";
import { PencilSquare } from "react-bootstrap-icons";

// Context
import { PostContext } from "../../contexts/PostContext";
import { AlertContext } from "../../contexts/AlertContext";

// Components
import MyAlert from "../utility/MyAlert";

function UpdatePost({ post: initialPost }) {
  const { post: contextPost, editPost } = useContext(PostContext);
  const [show, setShow] = useState(false);
  const [updatedPost, setUpdatedPost] = useState(initialPost || contextPost);
  const { alert, showAlert, hideAlert } = useContext(AlertContext);

  useEffect(() => {
    setUpdatedPost(initialPost || contextPost);
  }, [initialPost?.id, contextPost?.id]);

  const handleClose = () => {
    setShow(false);
    hideAlert();
  };

  const handleShow = () => setShow(true);

  const handleChange = (event) => {
    setUpdatedPost((prevPost) => ({
      ...prevPost,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await editPost(updatedPost);
      handleClose();
    } catch (error) {
      console.error("New error: ", error);
      showAlert("danger", error);
    }
  };

  return (
    <>
      <Button
        variant="warning"
        size="sm"
        className="m-1 button-width"
        onClick={handleShow}
      >
        <PencilSquare /> Update
      </Button>

      <Modal show={show} onHide={handleClose} dialogClassName="dark-modal">
        <Modal.Header closeButton>
          <Modal.Title>Update Post</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {alert && <MyAlert message={alert.message} variant={alert.type} />}
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formTitle">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                name="title"
                value={updatedPost.title}
                onChange={handleChange}
                className="bg-dark text-white"
              />
            </Form.Group>

            <Form.Group controlId="formContent">
              <Form.Label>Content</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="content"
                value={updatedPost.content}
                onChange={handleChange}
                className="bg-dark text-white"
              />
            </Form.Group>

            <Button className="mt-3" variant="warning" type="submit">
              Update
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default UpdatePost;
