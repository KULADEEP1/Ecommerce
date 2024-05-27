import React, { useState } from "react";
import {
  Container,
  TextField,
  Button,
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
import { toast } from "react-toastify";
import { loginAPI } from "../utils/api";
import { useNavigate, Link } from "react-router-dom";
import { useUser } from "../context/UserContext";

const useStyles = makeStyles((theme) => ({
  formContainer: {
    marginTop: "10px",
    textAlign: "center",
  },
  form: {
    maxWidth: "500px",
    maxHeight: "600px",
    margin: "50px auto",
    padding: "30px",
    borderRadius: "10px",
    boxShadow: "0 10px 30px rgba(0, 0, 0, 0.3)",
    backgroundColor: "#f5f5f5",
    transition: "transform 1s, box-shadow 1s",
    "&:hover": {
      transform: "translateY(0px)",
      boxShadow: "0px 12px 20px rgba(0, 0, 0, 1)",
    },
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
      borderColor: "#ccc",
    },
  },
};

const CustomTextField = withStyles(styles)(TextField);

const Login = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const { setAuthenticated } = useUser();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await loginAPI({ email, password });

      if (response.status === 201) {
        toast.success("Login successful");
        const { token, user } = response.data;
        localStorage.setItem("token", token);
        localStorage.setItem("username", user.username);
        setAuthenticated(true);
        navigate("/", { replace: true });
      } else {
        setAuthenticated(false);
        localStorage.removeItem("token");
        localStorage.removeItem("username");
        toast.error("Login failed");
      }
    } catch (error) {
      toast.error("Invalid Credentials!");
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
          <Link to="/signup" style={{ textDecoration: "none", color: "blue" }}>
            Sign up
          </Link>
        </div>
      </form>
    </Container>
  );
};

export default Login;
