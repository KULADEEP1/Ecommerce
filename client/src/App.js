import React, { useEffect } from "react";
import Layout from "./components/Layout";
import Signup from "./components/Signup";
import Login from "./components/Login";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Homepage from "./components/Homepage";
import { useUser } from "./context/UserContext";
import Contact from "./components/Contact";
import About from "./components/About";
import CreateBlog from "./components/Blogs/CreateBlog";
import { validateTokenAPI, refreshTokenAPI } from "./utils/api";

const App = () => {
  const { setAuthenticated } = useUser();


  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      validateTokenAPI(token)
        .then((response) => {
          const data = response.data;
          if (data.isValid) {
            if (data.timeLeft < 300) {
              refreshAccessToken();
            }
            setAuthenticated(true);
          } else {
            setAuthenticated(false);
            localStorage.removeItem("token");
          }
        })
        .catch((error) => {
          // console.error("Error validating token:", error);
          setAuthenticated(false);
          localStorage.removeItem("token");
        });
    }
  });

  const refreshAccessToken = () => {
    const token = localStorage.getItem("token");
    refreshTokenAPI(token)
      .then((response) => {
        const data = response.data;
        localStorage.removeItem("token");
        localStorage.setItem("token", data.accessToken);
      })
      .catch((error) => {
        console.error("Error refreshing token:", error);
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
