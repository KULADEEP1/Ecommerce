import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Container,
  Typography,
  Grid,
  Link,
  IconButton,
} from "@material-ui/core";
import FacebookIcon from "@material-ui/icons/Facebook";
import TwitterIcon from "@material-ui/icons/Twitter";
import InstagramIcon from "@material-ui/icons/Instagram";
import LinkedInIcon from "@material-ui/icons/LinkedIn";

const useStyles = makeStyles((theme) => ({
  footer: {
    backgroundColor: "#333",
    marginTop: "auto", // Change to auto
    color: "#fff",
    padding: theme.spacing(4, 0),
    bottom: 0,
    width: "100%",
  },
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  title: {
    marginBottom: theme.spacing(2),
    fontSize: "1.5rem",
    fontWeight: "bold",
  },
  link: {
    color: "#fff",
    textDecoration: "none",
    margin: theme.spacing(0.5),
    "&:hover": {
      textDecoration: "underline",
    },
  },
  socialIcons: {
    marginTop: theme.spacing(2),
  },
  iconButton: {
    color: "#fff",
    "&:hover": {
      color: "#f09819",
    },
  },
  copyRight: {
    marginTop: theme.spacing(3),
    fontSize: "0.875rem",
  },
}));

function Footer() {
  const classes = useStyles();

  return (
    <div className={classes.footer}>
      <Container className={classes.container}>
        <Typography variant="h6" className={classes.title}>
          Global Blog
        </Typography>
        <Grid container justifyContent="center">
          <Link href="#" className={classes.link}>
            Home
          </Link>
          <Link href="#" className={classes.link}>
            About
          </Link>
          <Link href="#" className={classes.link}>
            Services
          </Link>
          <Link href="#" className={classes.link}>
            Contact
          </Link>
        </Grid>
        <div className={classes.socialIcons}>
          <IconButton
            href="https://www.facebook.com"
            target="_blank"
            className={classes.iconButton}
          >
            <FacebookIcon />
          </IconButton>
          <IconButton
            href="https://www.twitter.com"
            target="_blank"
            className={classes.iconButton}
          >
            <TwitterIcon />
          </IconButton>
          <IconButton
            href="https://www.instagram.com"
            target="_blank"
            className={classes.iconButton}
          >
            <InstagramIcon />
          </IconButton>
          <IconButton
            href="https://www.linkedin.com"
            target="_blank"
            className={classes.iconButton}
          >
            <LinkedInIcon />
          </IconButton>
        </div>
        <Typography className={classes.copyRight}>
          &copy; {new Date().getFullYear()} Global Blog. All rights reserved.
        </Typography>
      </Container>
    </div>
  );
}

export default Footer;
