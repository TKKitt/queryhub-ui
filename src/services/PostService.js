import axios from "axios";

const getAllPosts = async () => {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_API_BASE_URL}/posts`,
      {
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error in getAllPosts: ", error);
    console.log(error);
    throw error.response.data.message;
  }
};

const getPostById = async (postId) => {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_API_BASE_URL}/posts/${postId}`,
      {
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error in getPostById: ", error);
    throw error.response.data.message;
  }
};

const getPostsByAuthorId = async (authorId) => {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_API_BASE_URL}/posts/author/${authorId}`,
      {
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error in getPostsByAuthorId: ", error);
    throw error.response.data.message;
  }
};

const createPost = async (postData) => {
  try {
    const response = await axios.post(
      `${process.env.REACT_APP_API_BASE_URL}/posts`,
      postData,
      {
        withCredentials: true,
      }
    );

    return response.data;
  } catch (error) {
    console.error("Error in createPost: ", error);
    throw error.response.data.message;
  }
};

const updatePost = async (postData) => {
  try {
    const response = await axios.put(
      `${process.env.REACT_APP_API_BASE_URL}/posts/${postData.id}`,
      postData,
      { withCredentials: true }
    );
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error in updatePost: ", error);
    throw error.response.data.message;
  }
};

const deletePost = async (postId) => {
  try {
    const response = await axios.delete(
      `${process.env.REACT_APP_API_BASE_URL}/posts/${postId}`,
      {
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error in deletePost: ", error);
    throw error.response.data.message;
  }
};

export default {
  getAllPosts,
  getPostById,
  getPostsByAuthorId,
  createPost,
  updatePost,
  deletePost,
};
