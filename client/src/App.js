import React, { useEffect } from "react";
import Layout from "./components/Layout";
import Signup from "./components/Signup";
import Login from "./components/Login";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Outlet,
  Navigate,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Homepage from "./components/Homepage";
import { useUser } from "./context/UserContext";
import Contact from "./components/Contact";
import About from "./components/About";
import CreateBlog from "./components/Blogs/CreateBlog";
import { validateTokenAPI, refreshTokenAPI } from "./utils/api";

const PrivateRoute = ({ isAuthenticated }) => {
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};

const App = () => {
  const { login, logout, isAuthenticated } = useUser();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      validateTokenAPI(token)
        .then((response) => {
          const data = response.data;
          if (data.isValid) {
            login(data.user, token);
            if (data.timeLeft < 300) {
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
            <Route element={<PrivateRoute isAuthenticated={isAuthenticated} login={login} />}>
              <Route path="/create" element={<CreateBlog />} />
            </Route>
          </Routes>
        </Layout>
      </Router>
    </>
  );
};

export default App;
