import React, { useEffect, useState } from "react";
import Layout from "./components/Layout";
import Signup from "./components/Signup";
import Login from "./components/Login";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  Outlet,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Homepage from "./components/Homepage";
import { useUser } from "./context/UserContext";
import Contact from "./components/Contact";
import About from "./components/About";
import CreateBlog from "./components/Blogs/CreateBlog";

const App = () => {
  const { login, logout } = useUser();
  const [accessToken, setAccessToken] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    console.log(token);
    if (token) {
      fetch("http://localhost:5000/validate-token", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${token}`,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.isValid) {
            login(data.user, token);
            setAccessToken(token);
            console.log("oldtoken", token);
            console.log(data.timeLeft);
            const refreshThreshold = 300;
            if (data.timeLeft < refreshThreshold) {
              refreshAccessToken();
            }
          } else {
            logout();
          }
        })
        .catch((error) => {
          console.error("Error validating token:", error);
          logout();
        });
    }
  }, [login, logout]);

  const refreshAccessToken = () => {
    const token = localStorage.getItem("token");
    fetch("http://localhost:5000/refresh-token", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${token}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to refresh token");
        }
        return response.json();
      })
      .then((data) => {
        localStorage.removeItem("token");
        localStorage.setItem("token", data.accessToken);
        console.log("refresh", data.accessToken);
        setAccessToken(data.accessToken);
      })
      .catch((error) => {
        console.error("Error refreshing token:", error);
        // Handle error refreshing token
        // For example, you can log the error or show a notification to the user
      });
  };

  return (
    <>
      <Router>
        <Layout>
          <ToastContainer
            theme="colored"
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
          />
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/create" element={<CreateBlog />} />
          </Routes>
        </Layout>
      </Router>
    </>
  );
};

export default App;
