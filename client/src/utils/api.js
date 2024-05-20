// src/utils/api.js
import axios from "axios";

const API_BASE_URL = "http://localhost:5000";

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
    console.log("Error while creating ", error);
    throw error;
  }
};
