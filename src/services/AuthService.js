import axios from "axios";

const registerUser = async (userData) => {
  try {
    const response = await axios.post(
      `${process.env.REACT_APP_API_BASE_URL}/auth/register`,
      userData,
      {
        withCredentials: true,
      }
    );

    return response.data;
  } catch (error) {
    console.error("Error in registerUser: ", error);
    throw error.response.data.message;
  }
};

const loginUser = async (userData) => {
  try {
    const response = await axios.post(
      `${process.env.REACT_APP_API_BASE_URL}/auth/login`,
      userData,
      {
        withCredentials: true,
      }
    );

    return response.data;
  } catch (error) {
    console.error("Error in loginUser: ", error);
    throw error.response.data.message;
  }
};

const loginWithGoogle = () => {
  window.location.href = `${process.env.REACT_APP_API_BASE_URL}/auth/google`;
};

const checkAuthentication = async () => {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_API_BASE_URL}/auth/checkAuthentication`,
      {
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error in checkAuthentication: ", error);
    throw error.response.data.message;
  }
};

const logoutUser = async () => {
  try {
    await axios.post(
      `${process.env.REACT_APP_API_BASE_URL}/auth/logout`,
      {},
      { withCredentials: true }
    );
  } catch (error) {
    console.error("Error in logoutUser: ", error);
    throw error.response.data.message;
  }
};

const updatePassword = async (passwordData, id) => {
  try {
    await axios.put(
      `${process.env.REACT_APP_API_BASE_URL}/auth/${id}/password`,
      passwordData,
      { withCredentials: true }
    );
  } catch (error) {
    console.error("Error in updateUserPassword: ", error);
    throw error.response.data.message;
  }
};

export default {
  registerUser,
  loginUser,
  loginWithGoogle,
  checkAuthentication,
  logoutUser,
  updatePassword,
};
