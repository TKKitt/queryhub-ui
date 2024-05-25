import axios from "axios";

const getCommentsByPostId = async (postId) => {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_API_BASE_URL}/comments/post/${postId}`
    );
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error in getCommentsByPostId: ", error);
    throw error.response.data.message;
  }
};

const createComment = async (commentData) => {
  try {
    const response = await axios.post(
      `${process.env.REACT_APP_API_BASE_URL}/comments`,
      commentData,
      {
        withCredentials: true,
      }
    );
    console.log("response.data: ", response.data);
    return response.data;
  } catch (error) {
    console.error("Error in createComment: ", error);
    throw error.response.data.message;
  }
};

const deleteComment = async (commentId) => {
  try {
    const response = await axios.delete(
      `${process.env.REACT_APP_API_BASE_URL}/comments/${commentId}`,
      {
        withCredentials: true,
      }
    );
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error in deleteComment: ", error);
    throw error.response.data.message;
  }
};

export default {
  getCommentsByPostId,
  createComment,
  deleteComment,
};
