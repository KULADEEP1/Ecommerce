import React, { useEffect, useState } from "react";
import { getUserBlogsAPI } from "../../utils/api";
import { toast } from "react-toastify";
import {
  CircularProgress,
  Container,
  Typography,
  Grid,
  Box,
} from "@material-ui/core";
import BlogCard from "./BlogCard";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: "100vh",
    background: "linear-gradient(to right, #ffefba, #ffffff)",
    padding: theme.spacing(4, 2),
    [theme.breakpoints.down("xs")]: {
      padding: theme.spacing(2, 1),
    },
  },
  noBlogs: {
    textAlign: "center",
    marginTop: theme.spacing(4),
    color: "#757575",
  },
}));

const UserBlogs = () => {
  const classes = useStyles();
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(false);
  const username = localStorage.getItem("username");
  const fetchUserBlogsData = async () => {
    setLoading(true);
    try {
      const response = await getUserBlogsAPI(username);
      if (response.status === 201) {
        setBlogs(response.data);
      } else {
        toast.error("Server error unable to load blogs");
      }
    } catch (error) {
      toast.error("Unable to get data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (username) {
      fetchUserBlogsData();
    } else {
      toast.error("No username found in local storage");
    }
  }, [username]);

  return (
    <Container className={classes.root}>
      <Typography variant="h3" gutterBottom>
        {username.toUpperCase()}'s Blogs
      </Typography>
      {loading ? (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          minHeight="50vh"
        >
          <CircularProgress />
        </Box>
      ) : (
        <Grid container spacing={3}>
          {blogs.length > 0 ? (
            blogs.map((blog) => (
              <Grid item xs={12} sm={6} md={4} key={blog._id}>
                <BlogCard blog={blog} />
              </Grid>
            ))
          ) : (
            <Grid item xs={12}>
              <Typography variant="h2" className={classes.noBlogs}>
                No blogs found
              </Typography>
            </Grid>
          )}
        </Grid>
      )}
    </Container>
  );
};

export default UserBlogs;
