import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Avatar,
  Box,
  Tooltip,
  Menu,
  MenuItem,
  Divider,
  ListItemIcon,
} from "@mui/material";
import { NavLink, useNavigate } from "react-router-dom";
import { Home, Info, ContactMail } from "@mui/icons-material";
import { useUser } from "../context/UserContext";
import { makeStyles } from "@material-ui/core/styles";
import Logout from "@mui/icons-material/Logout";

const useStyles = makeStyles((theme) => ({
  appBar: {
    backgroundColor: "black",
    height: "70px",
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
    color: "#FFD700", // Gold color for active link
    borderBottom: "2px solid #FFD700", // Gold border bottom color
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
  const { isAuthenticated, setAuthenticated } = useUser();
  const navigate = useNavigate();
  const classes = useStyles();

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setAuthenticated(false);
    navigate("/login");
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
            <>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Tooltip title="Account settings">
                  <IconButton
                    onClick={handleMenuOpen}
                    size="small"
                    sx={{ ml: 2 }}
                    aria-controls={open ? "account-menu" : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? "true" : undefined}
                  >
                    <Avatar sx={{ width: 32, height: 32 }}>U</Avatar>
                  </IconButton>
                </Tooltip>
              </Box>
              <Menu
                anchorEl={anchorEl}
                id="account-menu"
                open={open}
                onClose={handleMenuClose}
                onClick={handleMenuClose}
                transformOrigin={{ horizontal: "right", vertical: "top" }}
                anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
              >
                <MenuItem onClick={() => navigate("/profile")}>
                  Profile
                </MenuItem>
                <MenuItem onClick={() => navigate("/account")}>
                  My Blogs
                </MenuItem>
                <Divider />
                <MenuItem onClick={handleLogout}>
                  <ListItemIcon>
                    <Logout fontSize="small" />
                  </ListItemIcon>
                  Logout
                </MenuItem>
              </Menu>
            </>
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
