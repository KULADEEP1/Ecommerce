import React from "react";
import {
  Container,
  Typography,
  Box,
  Link,
  IconButton,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import {
  Facebook,
  Twitter,
  Instagram,
  LinkedIn,
  Email,
  Phone,
  Home,
} from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  footer: {
    backgroundColor: theme.palette.grey[900],
    color: theme.palette.grey[300],
    padding: theme.spacing(0, 0),
    borderTop: `4px solid ${theme.palette.secondary.main}`,
    // position: "fixed",
    bottom: 0,
    minWidth: "98.5vw",
    width: "100%",
    marginBottom: "-15px",
    marginLeft: "-8px",
    // marginRight:"25px",
    overflow: "hidden",
  },
  logo: {
    fontWeight: "bold",
    marginBottom: theme.spacing(2),
    color: theme.palette.primary.main,
  },
  link: {
    color: theme.palette.secondary.light,
    textDecoration: "none",
    display: "block",
    marginBottom: theme.spacing(1),
    "&:hover": {
      textDecoration: "underline",
      color: theme.palette.secondary.main,
    },
  },
  socialMedia: {
    display: "flex",
    "& a": {
      marginRight: theme.spacing(2),
      color: theme.palette.grey[300],
      "&:hover": {
        color: theme.palette.secondary.main,
      },
    },
  },
  contact: {
    "& p": {
      display: "flex",
      alignItems: "center",
      marginBottom: theme.spacing(1),
      color: theme.palette.grey[300],
      "& svg": {
        marginRight: theme.spacing(1),
      },
    },
  },
  footerSection: {
    marginBottom: theme.spacing(2),
    flex: 1,
    minWidth: 150, // ensures minimum width for columns
  },
  footerContent: {
    display: "flex",
    flexDirection: "column",
    [theme.breakpoints.up("sm")]: {
      flexDirection: "row",
      justifyContent: "space-between",
    },
  },
}));

const Footer = () => {
  const classes = useStyles();

  return (
    <footer className={classes.footer}>
      <Container maxWidth="lg">
        <Box className={classes.footerContent}>
          <Box className={classes.footerSection}>
            <Typography variant="h5" className={classes.logo}>
              Global-Blog
            </Typography>
          </Box>
          <Box className={classes.footerSection}>
            <Typography variant="h6">Quick Links</Typography>
            <Link href="/" className={classes.link}>
              Home
            </Link>
            <Link href="/about" className={classes.link}>
              About Us
            </Link>
            <Link href="/contact" className={classes.link}>
              Contact
            </Link>
          </Box>
          <Box className={classes.footerSection}>
            <Typography variant="h6">Follow Us</Typography>
            <div className={classes.socialMedia}>
              <IconButton href="https://www.facebook.com" target="_blank">
                <Facebook />
              </IconButton>
              <IconButton href="https://www.twitter.com" target="_blank">
                <Twitter />
              </IconButton>
              <IconButton href="https://www.instagram.com" target="_blank">
                <Instagram />
              </IconButton>
              <IconButton href="https://www.linkedin.com" target="_blank">
                <LinkedIn />
              </IconButton>
            </div>
          </Box>
          <Box className={classes.footerSection}>
            <Typography variant="h6">Contact Us</Typography>
            <Typography variant="body2" component="p">
              <Email /> basettykuladeep@gmail.com
            </Typography>
            <Typography variant="body2" component="p">
              <Phone /> (+91) 85198 26136
            </Typography>
            <Typography variant="body2" component="p">
              <Home /> PDPM IIITDM,jabalpur,India
            </Typography>
          </Box>
        </Box>
      </Container>
    </footer>
  );
};

export default Footer;
