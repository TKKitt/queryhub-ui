import React, { createContext, useEffect, useState } from "react";
import PostService from "../services/PostService";

export const PostContext = createContext();

export const PostProvider = ({ children }) => {
  const [post, setPost] = useState(null);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await PostService.getAllPosts();
      setPosts(response);
    } catch (error) {
      throw error;
    }
  };

  const fetchPostById = async (id) => {
    try {
      const response = await PostService.getPostById(id);
      setPost(response);
    } catch (error) {
      throw error;
    }
  };

  const fetchPostsByAuthorId = async (id) => {
    try {
      const response = await PostService.getPostsByAuthorId(id);
      setPosts(response);
    } catch (error) {
      throw error;
    }
  };

  const addPost = async (postData) => {
    try {
      const response = await PostService.createPost(postData);
      setPosts((prevPosts) => [...prevPosts, response]);
    } catch (error) {
      console.log("Error: " + error);
      throw error;
    }
  };

  const editPost = async (updatedPost) => {
    try {
      const response = await PostService.updatePost(updatedPost);
      console.log(response);
      setPosts((prevPosts) => {
        return prevPosts.map((post) =>
          post.id === updatedPost.id ? updatedPost : post
        );
      });
    } catch (error) {
      console.log("Error: " + error);
      throw error;
    }
  };

  const removePost = async (postId) => {
    try {
      const response = await PostService.deletePost(postId);
      console.log(response);
      setPosts((prevPosts) => {
        return prevPosts.filter((post) => post.id !== postId);
      });
    } catch (error) {
      throw error;
    }
  };

  return (
    <PostContext.Provider
      value={{
        post,
        setPost,
        posts,
        setPosts,
        fetchPosts,
        fetchPostById,
        fetchPostsByAuthorId,
        addPost,
        editPost,
        removePost,
      }}
    >
      {children}
    </PostContext.Provider>
  );
};
