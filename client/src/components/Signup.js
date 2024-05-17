import React from "react";
import {
  Container,
  TextField,
  Button,
  Checkbox,
  FormControlLabel,
  Link,
  Typography,
  withStyles,
  InputAdornment,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import {
  Lock as LockIcon,
  Mail as MailIcon,
  AccountCircle as AccountCircleIcon,
  PersonAdd as PersonAddIcon,
} from "@material-ui/icons";
import { useState } from "react";
import { toast } from "react-toastify";
import { signupAPI } from "../utils/api";
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
  textFieldInput: {
    borderRadius: "5px",
    backgroundColor: "#fff",
  },
  formControlLabel: {
    marginBottom: "15px",
    textAlign: "left",
  },
  signUpButton: {
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

const Signup = () => {
  const classes = useStyles();
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSignupSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      const response = await signupAPI({
        username,
        email,
        password,
        confirmPassword,
      });

      if (response.status === 201) {
        toast.success("Signup successful");
        console.log(response);
        navigate("/login");
      } else {
        toast.error("Signup failed");
        navigate("/signup");
      }
    } catch (error) {
      console.error("There was an error signing up!", error);
      toast.error("There was an error signing up!");
    }
  };

  return (
    <Container className={classes.formContainer}>
      <form className={classes.form} onSubmit={handleSignupSubmit}>
        <Typography variant="h5" className={classes.title}>
          <PersonAddIcon className={classes.icon} />
          Create an Account
        </Typography>
        <CustomTextField
          className={classes.textField}
          placeholder="Username"
          variant="outlined"
          required
          onChange={(e) => setUsername(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <AccountCircleIcon />
              </InputAdornment>
            ),
          }}
        />
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
        <CustomTextField
          className={classes.textField}
          placeholder="Confirm Password"
          variant="outlined"
          type="password"
          required
          onChange={(e) => setConfirmPassword(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <LockIcon />
              </InputAdornment>
            ),
          }}
        />
        <FormControlLabel
          control={<Checkbox color="primary" />}
          label="I agree to the terms and conditions"
          required
          className={classes.formControlLabel}
        />
        <Button
          variant="contained"
          color="primary"
          className={classes.signUpButton}
          disableElevation
          type="submit"
        >
          Sign Up
        </Button>
        <div className={classes.linkContainer}>
          <span>Already have an account? </span>
          <Link href="#" color="primary">
            Sign In
          </Link>
        </div>
      </form>
    </Container>
  );
};

export default Signup;
