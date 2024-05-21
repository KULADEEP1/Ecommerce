import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Fade,
  CssBaseline,
} from "@material-ui/core";

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
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
    transition: "transform 0.5s, box-shadow 0.5s",
    "&:hover": {
      transform: "translateY(-8px)",
      boxShadow: "0 8px 30px rgba(0, 0, 0, 0.2)",
    },
  },
  cardImage: {
    width: "100%",
    height: 250,
    objectFit: "cover",
  },
  cardContent: {
    padding: theme.spacing(3),
  },
  cardTitle: {
    fontSize: "1.8rem",
    marginBottom: theme.spacing(1),
    color: "#222",
    fontWeight: 600,
  },
  cardText: {
    fontSize: "1.1rem",
    color: "#555",
  },
}));

function About() {
  const classes = useStyles();

  return (
    <>
      <CssBaseline />
      <div className={classes.root}>
        <div className={classes.header}>
          <Container className={classes.headerContent}>
            <Typography variant="h1" className={classes.headerTitle}>
              About Us
            </Typography>
            <Typography variant="h5" className={classes.headerText}>
              Our mission, vision, and the story behind Global Blog.
            </Typography>
          </Container>
        </div>
        <Container className={classes.mainContent}>
          <Grid container spacing={4} justifyContent="center">
            <Grid item xs={12} sm={6} md={4}>
              <Fade in timeout={1000}>
                <Card className={classes.card}>
                  <CardMedia
                    component="img"
                    className={classes.cardImage}
                    image="https://source.unsplash.com/600x400/?team"
                    alt="Our Team"
                  />
                  <CardContent className={classes.cardContent}>
                    <Typography variant="h2" className={classes.cardTitle}>
                      Our Team
                    </Typography>
                    <Typography variant="body1" className={classes.cardText}>
                      Meet the talented individuals who drive our success.
                    </Typography>
                  </CardContent>
                </Card>
              </Fade>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Fade in timeout={1200}>
                <Card className={classes.card}>
                  <CardMedia
                    component="img"
                    className={classes.cardImage}
                    image="https://source.unsplash.com/600x400/?mission"
                    alt="Our Mission"
                  />
                  <CardContent className={classes.cardContent}>
                    <Typography variant="h2" className={classes.cardTitle}>
                      Our Mission
                    </Typography>
                    <Typography variant="body1" className={classes.cardText}>
                      Committed to delivering quality content and insights.
                    </Typography>
                  </CardContent>
                </Card>
              </Fade>
            </Grid>
            <Grid item xs={12} sm={12} md={4}>
              <Fade in timeout={1400}>
                <Card className={classes.card}>
                  <CardMedia
                    component="img"
                    className={classes.cardImage}
                    image="https://source.unsplash.com/600x400/?vision"
                    alt="Our Vision"
                  />
                  <CardContent className={classes.cardContent}>
                    <Typography variant="h2" className={classes.cardTitle}>
                      Our Vision
                    </Typography>
                    <Typography variant="body1" className={classes.cardText}>
                      To inspire and inform a global audience through our blog.
                    </Typography>
                  </CardContent>
                </Card>
              </Fade>
            </Grid>
          </Grid>
        </Container>
      </div>
    </>
  );
}

export default About;
