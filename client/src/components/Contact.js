import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Container,
  Typography,
  Grid,
  TextField,
  Button,
  CssBaseline,
  Paper,
} from "@material-ui/core";
import Footer from "./Footer";

const useStyles = makeStyles((theme) => ({
  root: {
    textAlign: "center",
    backgroundColor: "#f9f9f9",
    color: "#444",
    minHeight: "100vh",
    width: "100%",
    overflowX: "hidden",
  },
  header: {
    padding: theme.spacing(10, 0),
    // backgroundColor: "#1c1c1e",
    background: "linear-gradient(to bottom, #662d8c, #ed1e79)",
    color: "#fff",
    textAlign: "left",
  },
  headerContent: {
    maxWidth: 700,
    margin: "0 auto",
    padding: theme.spacing(0, 2),
  },
  headerTitle: {
    fontSize: "3.5rem",
    fontWeight: 700,
    marginBottom: theme.spacing(2),
  },
  headerText: {
    fontSize: "1.5rem",
    fontWeight: 300,
    marginBottom: theme.spacing(4),
  },
  mainContent: {
    padding: theme.spacing(10, 0),
    width: "100%",
  },
  formContainer: {
    padding: theme.spacing(4),
    backgroundColor: "#fff",
    borderRadius: 12,
    boxShadow: "0 4px 20px rgba(0, 0, 0, 0.5)",
  },
  formField: {
    marginBottom: theme.spacing(2),
  },
  submitButton: {
    marginTop: theme.spacing(2),
    padding: theme.spacing(1.5, 4),
  },
  contactInfo: {
    marginTop: theme.spacing(6),
  },
  contactItem: {
    marginBottom: theme.spacing(2),
  },
  contactTitle: {
    fontSize: "1.5rem",
    fontWeight: 600,
    color: "#333",
  },
  contactText: {
    fontSize: "1.2rem",
    color: "#555",
  },
}));

function Contact() {
  const classes = useStyles();

  return (
    <>
      <CssBaseline />
      <div className={classes.root}>
        <div className={classes.header}>
          <Container className={classes.headerContent}>
            <Typography variant="h1" className={classes.headerTitle}>
              Contact Us
            </Typography>
            <Typography variant="h5" className={classes.headerText}>
              We'd love to hear from you! Please reach out with any questions or
              feedback.
            </Typography>
          </Container>
        </div>
        <Container className={classes.mainContent}>
          <Grid container spacing={4} justifyContent="center">
            <Grid item xs={12} md={6}>
              <Paper className={classes.formContainer}>
                <Typography variant="h5" gutterBottom>
                  Get in Touch
                </Typography>
                <form noValidate autoComplete="off">
                  <TextField
                    label="Name"
                    variant="outlined"
                    fullWidth
                    className={classes.formField}
                  />
                  <TextField
                    label="Email"
                    variant="outlined"
                    fullWidth
                    className={classes.formField}
                  />
                  <TextField
                    label="Message"
                    variant="outlined"
                    fullWidth
                    multiline
                    minRows={4}
                    className={classes.formField}
                  />
                  <Button
                    variant="contained"
                    color="primary"
                    className={classes.submitButton}
                  >
                    Submit
                  </Button>
                </form>
              </Paper>
            </Grid>
            <Grid item xs={12} md={6} className={classes.contactInfo}>
              <div className={classes.contactItem}>
                <Typography variant="h6" className={classes.contactTitle}>
                  Email
                </Typography>
                <Typography className={classes.contactText}>
                  basettykuladeep@gmail.com
                </Typography>
              </div>
              <div className={classes.contactItem}>
                <Typography variant="h6" className={classes.contactTitle}>
                  Phone
                </Typography>
                <Typography className={classes.contactText}>
                  +91 85198 26136
                </Typography>
              </div>
              <div className={classes.contactItem}>
                <Typography variant="h6" className={classes.contactTitle}>
                  Address
                </Typography>
                <Typography className={classes.contactText}>
                  PDPM IIITDM jabalpur,Dumna road,Jabalpur,India
                </Typography>
              </div>
            </Grid>
          </Grid>
        </Container>
      </div>
      <Footer />
    </>
  );
}

export default Contact;
