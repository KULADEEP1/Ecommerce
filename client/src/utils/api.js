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



