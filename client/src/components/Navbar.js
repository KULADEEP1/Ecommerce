import React from "react";
import { AppBar, Toolbar, Typography } from "@material-ui/core";
import { NavLink, useNavigate } from "react-router-dom";
import { Home, Info, ContactMail } from "@material-ui/icons";
import { useUser } from "../context/UserContext";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  appBar: {
    backgroundColor: "#333",
    height: "100px",
  },
  toolbar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-end",
  },
  link: {
    textDecoration: "none",
    color: "inherit",
    marginLeft: theme.spacing(1),
    display: "flex",
    alignItems: "center",
  },
  activeLink: {
    color: "#4CAF50",
    borderBottom: "2px solid #4CAF50",
  },
  buttonText: {
    marginLeft: theme.spacing(1),
  },
  signupButton: {
    backgroundColor: "#4CAF50",
    color: "#fff",
    marginLeft: "10px",
    padding: theme.spacing(1, 2),
    borderRadius: theme.shape.borderRadius,
    "&:hover": {
      backgroundColor: "#388E3C", // Darker shade of green
    },
    textDecoration: "none",
  },
  loginButton: {
    padding: theme.spacing(1, 2),
    marginLeft: "10px",
    borderRadius: theme.shape.borderRadius,
    border: "2px solid #333",
    textDecoration: "none",
    backgroundColor: "#555",
    color: "#fff",
    "&:hover": {
      backgroundColor: "#777",
      color: "#fff",
    },
  },
  logoutButton: {
    padding: theme.spacing(1, 2),
    marginLeft: "10px",
    borderRadius: theme.shape.borderRadius,
    border: "2px solid #333",
    textDecoration: "none",
    backgroundColor: "red",
    color: "#fff",
    "&:hover": {
      backgroundColor: "#b30000", // Darker shade of red
      color: "#fff",
    },
  },
  
}));

const Navbar = () => {
  const { isAuthenticated, logout } = useUser();
  const navigate = useNavigate();
  const classes = useStyles();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <AppBar position="fixed" className={classes.appBar}>
      <Toolbar className={classes.toolbar}>
        <Typography variant="h6" style={{ flexGrow: 1 }}>
          Global-Blog
        </Typography>
        <div style={{ display: "flex", alignItems: "center" }}>
          <NavLink
            to="/"
            exact
            className={({ isActive }) =>
              `${classes.link} ${isActive ? classes.activeLink : ""}`
            }
          >
            <Home />
            <Typography className={classes.buttonText}>Home</Typography>
          </NavLink>
          <NavLink
            to="/about"
            className={({ isActive }) =>
              `${classes.link} ${isActive ? classes.activeLink : ""}`
            }
          >
            <Info />
            <Typography className={classes.buttonText}>About</Typography>
          </NavLink>
          <NavLink
            to="/contact"
            className={({ isActive }) =>
              `${classes.link} ${isActive ? classes.activeLink : ""}`
            }
          >
            <ContactMail />
            <Typography className={classes.buttonText}>Contact</Typography>
          </NavLink>
          {isAuthenticated ? (
            <Typography
              color="secondary"
              onClick={handleLogout}
              className={classes.logoutButton}
              style={{ marginLeft: "10px", cursor: "pointer" }}
            >
              Logout
            </Typography>
          ) : (
            <>
              <NavLink to="/signup" className={classes.signupButton}>
                Sign Up
              </NavLink>
              <NavLink to="/login" className={classes.loginButton}>
                Login
              </NavLink>
            </>
          )}
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
