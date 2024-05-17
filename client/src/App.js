import React from "react";
import { useEffect } from "react";
import Layout from "./components/Layout";
import Signup from "./components/Signup";
import Login from "./components/Login";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Homepage from "./components/Homepage";
import { useUser } from "./context/UserContext";
const App = () => {
  const { login, logout } = useUser();
  useEffect(() => {
    const token = localStorage.getItem("token");
    console.log(token);
    if (token) {
      fetch("http://localhost:5000/validate-token", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-token": token,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.isValid) {
            login(data.user, token);
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
            <Route exact path="/" element={<Homepage />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </Layout>
      </Router>
    </>
  );
};

export default App;
