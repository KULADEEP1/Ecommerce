import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
} from "@material-ui/core";
import { Link } from "react-router-dom";
import EventAvailableIcon from "@material-ui/icons/EventAvailable";

const Navbar = () => {
  return (
    <AppBar position="static" style={{ backgroundColor: "#333" }}>
      <Toolbar style={{ display: "flex", justifyContent: "space-between" }}>
        <IconButton edge="start" color="inherit" aria-label="logo">
          <EventAvailableIcon />
        </IconButton>
        <Typography variant="h6" style={{ flexGrow: 1 }}>
          EMS
        </Typography>
        <div style={{ display: "flex", alignItems: "center" }}>
          <Button color="inherit" style={{ marginLeft: "10px" }}>
            Home
          </Button>
          <Button color="inherit" style={{ marginLeft: "10px" }}>
            About
          </Button>
          <Button color="inherit" style={{ marginLeft: "10px" }}>
            Services
          </Button>
          <Button color="inherit" style={{ marginLeft: "10px" }}>
            Contact
          </Button>
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
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
