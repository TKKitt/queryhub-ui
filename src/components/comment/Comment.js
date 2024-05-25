// React
import React, { useEffect, useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";

// Styling
import "./Comment.css";
import { Trash } from "react-bootstrap-icons";
import { Card, Button } from "react-bootstrap";

import { AuthContext } from "../../contexts/AuthContext";
import { CommentContext } from "../../contexts/CommentContext";

function Comment({ commentData }) {
  const { comment: contextComment, removeComment } = useContext(CommentContext);
  const [comment, setComment] = useState(commentData || contextComment);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    setComment(commentData || contextComment);
  }, [commentData, contextComment]);

  const handleDelete = () => {
    removeComment(comment.id);
  };

  return (
    comment && (
      <div className="Comment">
        <Card className="mt-3 bg-dark text-white mb-3">
          <Card.Header>
            <div className="d-flex align-items-center mb-2">
              {comment && comment.author && (
                <Link
                  to={`/profile/${comment.authorId}`}
                  className="text-white"
                >
                  <Card.Subtitle className="m-2">
                    {comment.author.email}
                  </Card.Subtitle>
                </Link>
              )}
            </div>
          </Card.Header>
          <Card.Body>
            <Card.Text>{comment && comment.content}</Card.Text>
          </Card.Body>
          <Card.Footer>
            <div className="d-flex justify-content-between align-items-center">
              <div>
                Posted On:{" "}
                {comment && new Date(comment.createdAt).toLocaleDateString()}
              </div>
              <div>
                {comment && user && user.id === comment.authorId && (
                  <>
                    <Button
                      variant="danger"
                      size="sm"
                      className="m-1 button-width"
                      onClick={handleDelete}
                    >
                      <Trash /> Delete
                    </Button>
                  </>
                )}
              </div>
            </div>
          </Card.Footer>
        </Card>
      </div>
    )
  );
}

export default Comment;
