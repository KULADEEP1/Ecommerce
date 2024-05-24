import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { getBlogsDataAPI } from "../../utils/api";
import {
  Container,
  Grid,
  CssBaseline,
  Button,
  Box,
  CircularProgress,
  Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import BlogCard from "./BlogCard";

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: "100vh",
    background: "linear-gradient(to right, #ffefba, #ffffff)",
    padding: theme.spacing(4, 2),
    [theme.breakpoints.down("xs")]: {
      padding: theme.spacing(2, 1),
    },
  },
  loadMoreButton: {
    display: "flex",
    justifyContent: "center",
    marginTop: theme.spacing(4),
  },
  loadMoreBox: {
    display: "flex",
    justifyContent: "center",
    padding: theme.spacing(2),
  },
  categoryButtons: {
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap",
    marginBottom: theme.spacing(4),
  },
  categoryButton: {
    background: "linear-gradient(to bottom, #ff512f, #dd2476)",
    color: "#fff",
    border: "none",
    padding: theme.spacing(1, 2),
    fontSize: "1rem",
    cursor: "pointer",
    transition: "background-color 0.3s, color 0.3s",
    margin: theme.spacing(0.5),
    textDecoration: "none",
    "&:hover": {
      background: "linear-gradient(to bottom, #ff512f, #f09819)",
      color: "#fff",
    },
    "&.selected": {
      background: "linear-gradient(to bottom, #ff512f, #f09819)",
    },
    [theme.breakpoints.down("xs")]: {
      fontSize: "0.8rem",
      padding: theme.spacing(0.8, 1.5),
    },
  },
  noBlogsMessage: {
    textAlign: "center",
    marginTop: theme.spacing(4),
    fontSize: "1.2rem",
    color: "#555",
  },
}));

const ViewBlogs = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const [blogsData, setBlogsData] = useState([]);
  const [visibleBlogs, setVisibleBlogs] = useState(6);
  const [loading, setLoading] = useState(false);
  const [buttonLoading, setButtonLoading] = useState(false);
  const categories = [
    "Travel",
    "Health",
    "Technology",
    "Lifestyle",
    "Food",
    "Finance",
    "Sports",
    "Business",
  ];
  const [selectedCategory, setSelectedCategory] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    }
  }, [navigate]);

  const getBlogsData = async () => {
    try {
      setLoading(true);
      const response = await getBlogsDataAPI();
      if (response.status === 201) {
        setBlogsData(response.data);
      } else {
        toast.error("Data could not be shown due to server error...!");
      }
    } catch (error) {
      toast.error("Data could not be shown due to server error...!");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getBlogsData();
  }, []);

  const handleLoadMore = async () => {
    setButtonLoading(true);
    setTimeout(() => {
      setVisibleBlogs((prevVisibleBlogs) => prevVisibleBlogs + 3);
      setButtonLoading(false);
    }, 1000);
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setVisibleBlogs(6); // Reset the number of visible blogs when category changes
  };

  const filteredBlogs = selectedCategory
    ? blogsData.filter((blog) => blog.category === selectedCategory)
    : blogsData;

  return (
    <>
      <CssBaseline />
      <div className={classes.root}>
        <Container maxWidth="xl" style={{ marginTop: "40px" }}>
          {loading ? (
            <div style={{ display: "flex", justifyContent: "center" }}>
              <CircularProgress />
            </div>
          ) : (
            <>
              <Box className={classes.categoryButtons}>
                <Button
                  className={`${classes.categoryButton} ${
                    selectedCategory === "" ? "selected" : ""
                  }`}
                  onClick={() => handleCategoryChange("")}
                >
                  All
                </Button>
                {categories.map((category, index) => (
                  <Button
                    key={index}
                    className={`${classes.categoryButton} ${
                      selectedCategory === category ? "selected" : ""
                    }`}
                    onClick={() => handleCategoryChange(category)}
                  >
                    {category}
                  </Button>
                ))}
              </Box>
              {filteredBlogs.length === 0 ? (
                <Typography className={classes.noBlogsMessage}>
                  No blogs available in this category.
                </Typography>
              ) : (
                <Grid container spacing={3} justifyContent="center">
                  {filteredBlogs.slice(0, visibleBlogs).map((blog, index) => (
                    <Grid item xs={12} sm={6} md={4} key={index}>
                      <BlogCard blog={blog} />
                    </Grid>
                  ))}
                </Grid>
              )}
            </>
          )}
          {visibleBlogs < filteredBlogs.length && (
            <Box className={classes.loadMoreBox}>
              <Button
                variant="contained"
                color="primary"
                onClick={handleLoadMore}
                disabled={buttonLoading}
              >
                {buttonLoading ? <CircularProgress size={24} /> : "Load More"}
              </Button>
            </Box>
          )}
        </Container>
      </div>
    </>
  );
};

export default ViewBlogs;
