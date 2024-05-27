// src/utils/api.js
import axios from "axios";

const API_BASE_URL = "http://localhost:5000";
// const API_BASE_URL = "https://blog-mern-backend-ua18.onrender.com";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// API call for signup
export const signupAPI = (data) => {
  return api.post("/signup", data);
};

// API call for login
export const loginAPI = (data) => {
  return api.post("/login", data);
};

export const validateTokenAPI = (data) => {
  return api.post(
    "/validate-token",
    {},
    {
      headers: {
        Authorization: `${data}`,
      },
    }
  );
};

export const refreshTokenAPI = (data) => {
  return api.post(
    "/refresh-token",
    {},
    {
      headers: {
        Authorization: `${data}`,
      },
    }
  );
};

export const createBlogAPI = async (formData, token) => {
  try {
    const response = await api.post("/create", formData, {
      headers: {
        "Content-type": "multipart/form-data",
        Authorization: `${token}`,
      },
    });
    return response;
  } catch (error) {
    // console.log("Error while creating ", error);
    throw error;
  }
};

export const getBlogsDataAPI = async () => {
  try {
    const response = await api.get("/getallblogs");
    return response;
  } catch (error) {
    // console.log("Error while getting blogs data", error);
    throw error;
  }
};

export const getBlogDataAPI = async (id, token) => {
  try {
    const response = await api.get(`/viewblog/${id}`, {
      headers: {
        Authorization: `${token}`,
      },
    });
    return response;
  } catch (error) {
    // console.log("Error while fetching blog data", error);
    throw error;
  }
};

export const newCommentAPI = async (currentUser, text, id) => {
  try {
    const response = await api.post(`/newcomment/${id}`, { currentUser, text });
    return response;
  } catch (error) {
    // console.log("Error adding new comment", error);
    throw error;
  }
};

export const getAllCommentsAPI = async (id) => {
  try {
    const response = await api.get(`/getallcomments/${id}`);
    return response;
  } catch (error) {
    // console.log(error);
    throw error;
  }
};

export const deleteCommentAPI = async (id, token) => {
  try {
    const response = await api.delete(`/deletecomment/${id}`);
    return response;
  } catch (error) {
    // console.log(error);
    throw error;
  }
};

export const addLikeAPI = async (id, token) => {
  try {
    const response = await api.post(
      `/newlike/${id}`,
      {},
      {
        headers: {
          Authorization: `${token}`,
        },
      }
    );
    return response;
  } catch (error) {
    // console.log(error);
    throw error;
  }
};

export const deleteLikeAPI = async (id, token) => {
  try {
    const response = await api.delete(`/removelike/${id}`, {
      headers: {
        Authorization: `${token}`,
      },
    });
    return response;
  } catch (error) {
    throw error;
  }
};
export const getUserBlogsAPI = async (username) => {
  try {
    const response = await api.post("/userblogs", { username });
    return response;
  } catch (error) {
    throw error;
  }
};

export const deleteBlogAPI = async (id, token) => {
  try {
    const response = await api.delete(`/deleteblog/${id}`, {
      headers: {
        Authorization: `${token}`,
      },
    });
    return response;
  } catch (error) {
    throw error;
  }
};
