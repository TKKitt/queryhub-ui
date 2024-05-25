// React
import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";

// Styling
import "./Post.css";
import { Trash, ChatSquareDots } from "react-bootstrap-icons";
import { Card, Button, Image } from "react-bootstrap";

// Context
import { PostContext } from "../../contexts/PostContext";
import { AuthContext } from "../../contexts/AuthContext";

// Components
import UpdatePost from "./UpdatePost";
import CreateComment from "../comment/CreateComment";

function Post({ postData }) {
  const { post: contextPost, removePost } = useContext(PostContext);
  const [post, setPost] = useState(postData || contextPost);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    setPost(postData || contextPost);
  }, [postData, contextPost]);

  const handleDelete = () => {
    removePost(post.id);
    navigate("/home");
  };

  return (
    <Card className="mt-3 bg-dark text-white post-card">
      <Card.Header>
        <div className="d-flex align-items-center mb-2">
          {post && post.author && (
            <>
              <Image
                src={`${process.env.REACT_APP_API_BASE_URL}/uploads/${post.author.avatar}`}
                roundedCircle
                width="75"
                height="75"
                className="mr-2 avatar"
              />
              <Link to={`/profile/${post.authorId}`} className="text-white">
                <Card.Subtitle className="m-2">
                  {post.author.email}
                </Card.Subtitle>
              </Link>
            </>
          )}
        </div>
        <Card.Title>
          {post && (
            <Link to={`/posts/${post.id}`} className="text-white">
              {post.title}
            </Link>
          )}
        </Card.Title>
      </Card.Header>
      <Card.Body>
        <Card.Text>{post && post.content}</Card.Text>
      </Card.Body>
      <Card.Footer>
        <div className="d-flex justify-content-between align-items-center">
          <div>
            Posted On: {post && new Date(post.createdAt).toLocaleDateString()}
          </div>
          <div>
            {post && user && user.id === post.authorId && (
              <>
                <UpdatePost post={post} />
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
            {post && user && <CreateComment postId={post.id} />}
          </div>
        </div>
      </Card.Footer>
    </Card>
  );
}

export default Post;
