import React, { createContext, useEffect, useState } from "react";
import CommentService from "../services/CommentService";

export const CommentContext = createContext();

export const CommentProvider = ({ children }) => {
  const [comment, setComment] = useState(null);
  const [comments, setComments] = useState([]);

  const fetchCommentsByPostId = async (postId) => {
    try {
      const response = await CommentService.getCommentsByPostId(postId);
      setComments(response);
    } catch (error) {
      throw error;
    }
  };

  const addComment = async (commentData) => {
    try {
      const response = await CommentService.createComment(commentData);
      setComments((prevComments) => [...prevComments, response]);
    } catch (error) {
      throw error;
    }
  };

  const removeComment = async (commentId) => {
    try {
      const response = await CommentService.deleteComment(commentId);
      console.log(response);
      setComments((prevComments) => {
        return prevComments.filter((comment) => comment.id !== commentId);
      });
    } catch (error) {
      throw error;
    }
  };

  return (
    <CommentContext.Provider
      value={{
        comment,
        setComment,
        comments,
        setComments,
        fetchCommentsByPostId,
        addComment,
        removeComment,
      }}
    >
      {children}
    </CommentContext.Provider>
  );
};
