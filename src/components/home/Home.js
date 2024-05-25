// React
import React, { useContext, useState } from "react";

// Context
import { PostContext } from "../../contexts/PostContext";

// Components
import Post from "../post/Post";
import CreatePost from "../post/CreatePost";

// Styling
import { Container } from "react-bootstrap";

function Home() {
  const { posts } = useContext(PostContext);

  return (
    <div className="Home">
      <Container className="mt-5 mb-5">
        <h1>Post Feed</h1>
        <CreatePost />
        {posts && posts.map((post) => <Post key={post.id} postData={post} />)}
      </Container>
    </div>
  );
}

export default Home;
