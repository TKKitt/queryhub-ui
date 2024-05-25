// React
import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";

// Context
import { PostContext } from "../../contexts/PostContext";
import { CommentContext } from "../../contexts/CommentContext";

// Styling
import { Container, Row, Col } from "react-bootstrap";

// Components
import Post from "./Post";
import Comment from "../comment/Comment";

function ViewPost() {
  const { post, fetchPostById } = useContext(PostContext);
  const { comments, fetchCommentsByPostId } = useContext(CommentContext);
  const { id } = useParams();

  useEffect(() => {
    fetchPostById(id);
    fetchCommentsByPostId(id);
  }, [id]);

  if (!post) return <h1>Loading...</h1>;

  return (
    <div className="ViewPost">
      <Container className="mt-5">
        <Row>
          <Col>
            <Post post={post} />
          </Col>
        </Row>
        <Row>
          <Col>
            <h1>Comments</h1>
            {comments.map((comment) => (
              <Comment key={comment.id} commentData={comment} />
            ))}
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default ViewPost;
