import axios from "axios";

const getUserById = async (userId) => {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_API_BASE_URL}/users/${userId}`
    );
    return response.data;
  } catch (error) {
    console.error("Error in getUserById: ", error);
    throw error.response.data.message;
  }
};

const updateUser = async (user, userId) => {
  try {
    const formData = new FormData();
    formData.append("bio", user.bio);

    if (user.avatar) {
      formData.append("avatar", user.avatar, user.avatar.name);
    }

    const response = await axios.put(
      `${process.env.REACT_APP_API_BASE_URL}/users/${userId}`,
      formData,
      {
        withCredentials: true,
        headers: {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error in updateUser: ", error);
    throw error.response.data.message;
  }
};

export default {
  getUserById,
  updateUser,
};
