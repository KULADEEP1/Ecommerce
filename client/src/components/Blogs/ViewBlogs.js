import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useUser } from "../../context/UserContext";
import { useNavigate } from "react-router-dom";
import { getBlogsDataAPI } from "../../utils/api";
import {
  Container,
  Grid,
  CssBaseline,
  Button,
  Box,
  CircularProgress,
} from "@material-ui/core";
import BlogCard from "./BlogCard";
import { makeStyles } from "@material-ui/core/styles";
import { ExpandMore as ExpandMoreIcon } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
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
}));

const ViewBlogs = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const { isAuthenticated } = useUser();
  const [blogsData, setBlogsData] = useState([]);
  const [visibleBlogs, setVisibleBlogs] = useState(3);
  const [loading, setLoading] = useState(false);
  const [buttonLoading, setButtonLoading] = useState(false); // State for button loading

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
    setButtonLoading(true); // Set button loading state to true
    setTimeout(() => {
      setVisibleBlogs((prevVisibleBlogs) => prevVisibleBlogs + 3);
      setButtonLoading(false); // Set button loading state to false after timeout
    }, 1000); // Simulating network delay
  };

  return (
    <>
      <CssBaseline />
      <Container style={{ marginTop: "40px" }}>
        {loading ? (
          <div style={{ display: "flex", justifyContent: "center" }}>
            <CircularProgress />
          </div>
        ) : (
          <Grid container spacing={3} justifyContent="center">
            {blogsData.slice(0, visibleBlogs).map((blog, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <BlogCard blog={blog} />
              </Grid>
            ))}
          </Grid>
        )}
        {visibleBlogs < blogsData.length && (
          <Box className={classes.loadMoreBox}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleLoadMore}
              startIcon={<ExpandMoreIcon />}
              disabled={buttonLoading} // Disable button when button is loading
            >
              {buttonLoading ? <CircularProgress size={24} /> : "Load More"}
            </Button>
          </Box>
        )}
      </Container>
    </>
  );
};

export default ViewBlogs;
