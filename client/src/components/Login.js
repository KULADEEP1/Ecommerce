import React from "react";
import {
  Container,
  TextField,
  Button,
  Link,
  Typography,
  withStyles,
  InputAdornment,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import {
  Lock as LockIcon,
  Mail as MailIcon,
  PersonAdd as PersonAddIcon,
} from "@material-ui/icons";
import { useState } from "react";
import { toast } from "react-toastify";
import { loginAPI } from "../utils/api";
import { useNavigate } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  formContainer: {
    marginTop: "10px",
    textAlign: "center",
  },
  form: {
    maxWidth: "500px",
    maxHeight: "600px",
    margin: "0 auto",
    padding: "30px",
    borderRadius: "10px",
    boxShadow: "0 10px 30px rgba(0, 0, 0, 0.3)", // Add shadow effect
    backgroundColor: "#f5f5f5",
  },
  title: {
    marginBottom: "20px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  icon: {
    marginRight: "10px",
  },
  textField: {
    width: "100%",
    marginBottom: "15px",
  },
  LoginButton: {
    width: "100%",
    borderRadius: "5px",
    textTransform: "none",
    backgroundColor: "#4CAF50",
    marginBottom: "15px",
  },
  linkContainer: {
    marginTop: "-2px",
  },
}));

const styles = {
  root: {
    "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
      borderColor: "#ccc", // Change this color to match the background
    },
  },
};

const CustomTextField = withStyles(styles)(TextField);

const Login = () => {
  const classes = useStyles();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await loginAPI({
        email,
        password,
      });

      if (response.status === 201) {
        toast.success("Login successful");
        console.log(response);
        navigate("/Homepage");
      } else {
        toast.error("Signup failed");
        navigate("/login");
      }
    } catch (error) {
      console.error("There was an error loging in!", error);
      toast.error("There was an error loging in!");
    }
  };

  return (
    <Container className={classes.formContainer}>
      <form className={classes.form} onSubmit={handleLoginSubmit}>
        <Typography variant="h5" className={classes.title}>
          <PersonAddIcon className={classes.icon} />
          Login to your Account
        </Typography>
        <CustomTextField
          className={classes.textField}
          placeholder="Email"
          variant="outlined"
          type="email"
          required
          onChange={(e) => setEmail(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <MailIcon />
              </InputAdornment>
            ),
          }}
        />
        <CustomTextField
          className={classes.textField}
          placeholder="Password"
          variant="outlined"
          type="password"
          required
          onChange={(e) => setPassword(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <LockIcon />
              </InputAdornment>
            ),
          }}
        />
        <Button
          variant="contained"
          color="primary"
          className={classes.LoginButton}
          disableElevation
          type="submit"
        >
          Login
        </Button>
        <div className={classes.linkContainer}>
          <span>Don't have an account? </span>
          <Link href="#" color="primary">
            Sign In
          </Link>
        </div>
      </form>
    </Container>
  );
};

export default Login;
