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
import { useUser } from "../context/UserContext";
import { useNavigate } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    textAlign: "center",
    backgroundColor: "#f0f0f0",
    color: "#333",
    minHeight: "100vh",
    width: "100%",
    overflowX: "hidden",
  },
  header: {
    padding: theme.spacing(8, 2),
    background: "linear-gradient(to bottom, #662d8c, #ed1e79)",
    color: "#fff",
  },
  headerContent: {
    maxWidth: 600,
    margin: "0 auto",
    [theme.breakpoints.down("xs")]: {
      padding: theme.spacing(2),
    },
  },
  headerTitle: {
    fontSize: "3rem",
    marginBottom: "1rem",
    [theme.breakpoints.down("xs")]: {
      fontSize: "2rem",
    },
  },
  headerText: {
    fontSize: "1.5rem",
    marginBottom: "2rem",
    [theme.breakpoints.down("xs")]: {
      fontSize: "1rem",
    },
  },
  buttonContainer: {
    display: "flex",
    justifyContent: "center",
    gap: "1rem",
    flexWrap: "wrap",
  },
  exploreButton: {
    background: "linear-gradient(to bottom, #ff512f, #dd2476)",
    color: "#fff",
    border: "none",
    padding: theme.spacing(1, 2),
    fontSize: "1.2rem",
    cursor: "pointer",
    transition: "background-color 0.3s, color 0.3s",
    textDecoration: "none",
    "&:hover": {
      background: "linear-gradient(to bottom, #ff512f, #f09819)",
      color: "#fff",
    },
    [theme.breakpoints.down("xs")]: {
      fontSize: "1rem",
      padding: theme.spacing(1, 1.5),
    },
  },
  mainContent: {
    padding: theme.spacing(8, 2),
    margin: theme.spacing(0, 2),
    [theme.breakpoints.down("xs")]: {
      padding: theme.spacing(4, 2),
      margin: theme.spacing(0, 1),
    },
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
    transition: "transform 0.5s, box-shadow 0.5s",
    "&:hover": {
      transform: "translateY(-12px)",
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
    height: 70,
    fontWeight: 600,
    [theme.breakpoints.down("xs")]: {
      fontSize: "1.5rem",
    },
  },
  cardText: {
    fontSize: "1.1rem",
    color: "#555",
    [theme.breakpoints.down("xs")]: {
      fontSize: "1rem",
    },
  },
}));

function HomePage() {
  const classes = useStyles();
  const navigate = useNavigate();
  const { isAuthenticated } = useUser();
  const handleCreateBlog = () => {
    if (!isAuthenticated) {
      localStorage.removeItem("token");
      localStorage.removeItem("username");
      navigate("/login");
    } else {
      navigate("/create");
    }
  };

  const handleExploreButton = () => {
    if (!isAuthenticated) {
      localStorage.removeItem("token");
      localStorage.removeItem("username");
      navigate("/login");
    } else {
      navigate("/viewall");
    }
  };

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
                onClick={handleExploreButton}
                startIcon={<ExploreIcon />}
              >
                Explore Now
              </Button>
              <Button
                variant="contained"
                className={classes.exploreButton}
                onClick={handleCreateBlog}
                startIcon={<CreateIcon />}
              >
                Create Blog
              </Button>
            </div>
          </Container>
        </div>
        <Container className={classes.mainContent}>
          <Grid container spacing={3} justifyContent="center">
            <Grid item xs={12} sm={6} md={4}>
              <Grow in>
                <Card className={classes.card}>
                  <CardMedia
                    component="img"
                    className={classes.cardImage}
                    image="https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0"
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
                    image="https://images.unsplash.com/photo-1518770660439-4636190af475"
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
            <Grid item xs={12} sm={6} md={4}>
              <Grow in>
                <Card style={{ marginRight: "20px" }} className={classes.card}>
                  <CardMedia
                    component="img"
                    className={classes.cardImage}
                    image="https://images.unsplash.com/photo-1517841905240-472988babdf9"
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
            <Grid item xs={12} sm={6} md={4}>
              <Grow in>
                <Card className={classes.card}>
                  <CardMedia
                    component="img"
                    className={classes.cardImage}
                    image="https://images.unsplash.com/photo-1518770660439-4636190af475"
                    alt="Innovative"
                  />
                  <CardContent className={classes.cardContent}>
                    <Typography variant="h2" className={classes.cardTitle}>
                      Innovative Ideas
                    </Typography>
                    <Typography
                      variant="body1"
                      className={classes.cardText}
                      gutterBottom
                    >
                      Discover innovative ideas and creative solutions.
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
                    image="https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0"
                    alt="Travel"
                  />
                  <CardContent className={classes.cardContent}>
                    <Typography variant="h2" className={classes.cardTitle}>
                      Travel Adventures
                    </Typography>
                    <Typography
                      variant="body1"
                      className={classes.cardText}
                      gutterBottom
                    >
                      Embark on travel adventures and explore new destinations.
                    </Typography>
                  </CardContent>
                </Card>
              </Grow>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Grow in>
                <Card style={{ marginRight: "20px" }} className={classes.card}>
                  <CardMedia
                    component="img"
                    className={classes.cardImage}
                    image="https://images.unsplash.com/photo-1514996937319-344454492b37"
                    alt="Health"
                  />
                  <CardContent className={classes.cardContent}>
                    <Typography variant="h2" className={classes.cardTitle}>
                      Health & Wellness
                    </Typography>
                    <Typography
                      variant="body1"
                      className={classes.cardText}
                      gutterBottom
                    >
                      Learn about health and wellness tips for a better
                      lifestyle.
                    </Typography>
                  </CardContent>
                </Card>
              </Grow>
            </Grid>
          </Grid>
        </Container>
      </div>
    </>
  );
}

export default HomePage;
