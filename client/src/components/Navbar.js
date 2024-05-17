import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
} from "@material-ui/core";
import { Link } from "react-router-dom";
import { Home, Info, ContactMail } from "@material-ui/icons";
import EventAvailableIcon from "@material-ui/icons/EventAvailable";
import { useUser } from "../context/UserContext";

const Navbar = () => {
  const { isAuthenticated } = useUser();
  return (
    <AppBar
      position="fixed"
      style={{ backgroundColor: "#333", height: "100px" }}
    >
      <Toolbar style={{ display: "flex", justifyContent: "space-between" }}>
        <IconButton edge="start" color="inherit" aria-label="logo">
          <EventAvailableIcon />
        </IconButton>
        <Typography variant="h6" style={{ flexGrow: 1 }}>
          Global-Blog
        </Typography>
        <div style={{ display: "flex", alignItems: "center" }}>
          <Button
            color="inherit"
            style={{ marginLeft: "10px" }}
            startIcon={<Home />}
          >
            Home
          </Button>
          <Button
            color="inherit"
            style={{ marginLeft: "10px" }}
            startIcon={<Info />}
          >
            About
          </Button>
          <Button
            color="inherit"
            style={{ marginLeft: "10px" }}
            startIcon={<ContactMail />}
          >
            Contact
          </Button>
          {!isAuthenticated && 
            <>
              
              <Link to="/signup">
                <Button
                  variant="contained"
                  color="primary"
                  style={{ marginLeft: "10px", backgroundColor: "#4CAF50" }}
                >
                  Sign Up
                </Button>
              </Link>
              <Link to="/login">
                <Button
                  variant="contained"
                  color="inherit"
                  style={{ marginLeft: "10px", border: "2px solid white" }}
                >
                  Login
                </Button>
              </Link>
              
            </>
          }
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
