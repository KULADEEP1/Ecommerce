import React from "react";
import ExploreIcon from "@material-ui/icons/Explore";
import CreateIcon from "@material-ui/icons/Create";
import { makeStyles } from "@material-ui/core/styles";
import {
  Container,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Grow,
  CssBaseline,
} from "@material-ui/core";
import Footer from "./Footer";

const useStyles = makeStyles((theme) => ({
  "@global": {
    body: {
      margin: 0,
      padding: 0,
      boxSizing: "border-box",
      overflowX: "hidden",
    },
    html: {
      margin: 0,
      padding: 0,
      boxSizing: "border-box",
      overflowX: "hidden",
    },
  },
  root: {
    textAlign: "center",
    backgroundColor: "#f0f0f0",
    color: "#333",
    minHeight: "100vh",
    width: "100vw",
    overflowX: "hidden",
  },
  header: {
    padding: theme.spacing(8, 0),
    background: "linear-gradient(to bottom, #662d8c, #ed1e79)",
    color: "#fff",
    margin: 0,
  },
  headerContent: {
    maxWidth: 600,
    margin: "0 auto",
  },
  headerTitle: {
    fontSize: "3rem",
    marginBottom: "1rem",
  },
  headerText: {
    fontSize: "1.5rem",
    marginBottom: "2rem",
  },
  buttonContainer: {
    display: "flex",
    justifyContent: "center",
    gap: "1rem",
  },
  exploreButton: {
    background: "linear-gradient(to bottom, #ff512f, #dd2476)",
    color: "#fff",
    border: "none",
    padding: "1rem 1rem",
    fontSize: "1.5rem",
    cursor: "pointer",
    transition: "background-color 0.3s, color 0.3s",
    textDecoration: "none",
    "&:hover": {
      background: "linear-gradient(to bottom, #ff512f, #f09819)",
      color: "#fff",
    },
  },
  mainContent: {
    padding: theme.spacing(8, 0),
    margin: 50,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 10,
    boxShadow: "0px 8px 16px rgba(0, 0, 0, 0.1)",
    transition: "transform 1s, box-shadow 1s",
    "&:hover": {
      transform: "translateY(-12px)",
      boxShadow: "0px 12px 20px rgba(0, 0, 0, 0.2)",
    },
  },
  cardImage: {
    width: "100%",
    height: 200,
    objectFit: "cover",
  },
  cardContent: {
    padding: theme.spacing(2),
  },
  cardTitle: {
    fontSize: "2rem",
    marginBottom: "0.5rem",
    color: "#333",
  },
  cardText: {
    fontSize: "1.2rem",
    color: "#666",
  },
}));

function HomePage() {
  const classes = useStyles();

  return (
    <>
      <CssBaseline />
      <div className={classes.root}>
        <div className={classes.header}>
          <Container className={classes.headerContent}>
            <Typography variant="h1" className={classes.headerTitle}>
              Welcome to Global Blog
            </Typography>
            <Typography variant="h5" className={classes.headerText}>
              Discover fresh perspectives, insightful articles, and engaging
              content on a wide range of topics.
            </Typography>
            <div className={classes.buttonContainer}>
              <Button
                variant="contained"
                className={classes.exploreButton}
                startIcon={<ExploreIcon />}
              >
                Explore Now
              </Button>
              <Button
                variant="contained"
                className={classes.exploreButton}
                startIcon={<CreateIcon />}
              >
                Create Blog
              </Button>
            </div>
          </Container>
        </div>
        <Container className={classes.mainContent}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6} md={4}>
              <Grow in>
                <Card className={classes.card}>
                  <CardMedia
                    component="img"
                    className={classes.cardImage}
                    image="https://source.unsplash.com/400x300/?nature,dark"
                    alt="Nature"
                  />
                  <CardContent className={classes.cardContent}>
                    <Typography variant="h2" className={classes.cardTitle}>
                      Trending Topic
                    </Typography>
                    <Typography
                      variant="body1"
                      className={classes.cardText}
                      gutterBottom
                    >
                      Explore the latest trends and hot topics from around the
                      globe.
                    </Typography>
                  </CardContent>
                </Card>
              </Grow>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Grow in>
                <Card className={classes.card}>
                  <CardMedia
                    component="img"
                    className={classes.cardImage}
                    image="https://source.unsplash.com/400x300/?technology,dark"
                    alt="Technology"
                  />
                  <CardContent className={classes.cardContent}>
                    <Typography variant="h2" className={classes.cardTitle}>
                      Expert Insights
                    </Typography>
                    <Typography
                      variant="body1"
                      className={classes.cardText}
                      gutterBottom
                    >
                      Gain valuable insights and knowledge from industry
                      experts.
                    </Typography>
                  </CardContent>
                </Card>
              </Grow>
            </Grid>
            <Grid item xs={12} sm={12} md={4}>
              <Grow in>
                <Card className={classes.card}>
                  <CardMedia
                    component="img"
                    className={classes.cardImage}
                    image="https://source.unsplash.com/400x300/?community,dark"
                    alt="Community"
                  />
                  <CardContent className={classes.cardContent}>
                    <Typography variant="h2" className={classes.cardTitle}>
                      Community Engagement
                    </Typography>
                    <Typography
                      variant="body1"
                      className={classes.cardText}
                      gutterBottom
                    >
                      Connect with a global community of like-minded
                      individuals.
                    </Typography>
                  </CardContent>
                </Card>
              </Grow>
            </Grid>
          </Grid>
        </Container>
      </div>
      <Footer />
    </>
  );
}

export default HomePage;
