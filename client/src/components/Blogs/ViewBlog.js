import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getBlogDataAPI, getAllCommentsAPI } from "../../utils/api";
import { makeStyles } from "@material-ui/core/styles";
import {
  Typography,
  Avatar,
  CircularProgress,
  IconButton,
  Container,
  Box,
} from "@material-ui/core";
import { Favorite } from "@material-ui/icons";
import CommentForm from "./comments/CommentForm";
import Comment from "./comments/Comment";
import { toast } from "react-toastify";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  avatar: {
    marginRight: "5px",
  },
  image: {
    width: "100%",
    height: "auto",
    marginBottom: theme.spacing(2),
  },
  authorContainer: {
    display: "flex",
    alignItems: "center",
    marginBottom: theme.spacing(1),
  },
  authorText: {
    marginLeft: theme.spacing(1),
    fontWeight: "bold",
  },
  publishDateText: {
    marginLeft: theme.spacing(2),
    color: "#777",
  },
  likeButton: {
    marginLeft: "auto",
  },
  commentsSection: {
    marginTop: theme.spacing(4),
  },
}));

const ViewBlog = () => {
  const classes = useStyles();
  const [blog, setBlog] = useState({});
  const [allComments, setAllComments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentUser, setCurrentUser] = useState("");
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem("token");
        const response = await getBlogDataAPI(id, token);
        if (response.status === 201) {
          setBlog(response.data.blog);
          setCurrentUser(response.data.username);
        } else {
          setError("Failed to fetch blog data");
        }
      } catch (error) {
        setError("Error fetching blog data");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await getAllCommentsAPI(id);
        if (response.status === 201) {
          setAllComments(response.data);
        } else {
          toast.error("Error while loading comments");
        }
      } catch (error) {
        console.log(error);
        toast.error("Error while loading comments from server side");
      }
    };
    fetchComments();
  }, [id]);

  useEffect(() => {
    console.log(allComments);
  }, [allComments]);

  if (loading) {
    return (
      <div className={classes.root}>
        <CircularProgress />
      </div>
    );
  }

  if (error) {
    return (
      <div className={classes.root}>
        <Typography variant="h6" color="error">
          {error}
        </Typography>
      </div>
    );
  }

  return (
    <Container className={classes.root}>
      <Box>
        <img
          src={`data:${blog.contentType};base64,${blog.imageBase64}`}
          alt={blog.title}
          className={classes.image}
        />
        <Typography variant="h4" gutterBottom>
          {blog.title}
        </Typography>
        <Box className={classes.authorContainer}>
          <Avatar />
          <Typography
            variant="subtitle1"
            component="span"
            className={classes.authorText}
          >
            {blog.author}
          </Typography>
          <Typography variant="body2" className={classes.publishDateText}>
            {new Date(blog.publishDate).toLocaleDateString()}
          </Typography>
          <IconButton aria-label="like" className={classes.likeButton}>
            <Favorite />
          </IconButton>
        </Box>
        <Typography variant="body1" paragraph>
          {blog.content}
        </Typography>
      </Box>
      <CommentForm blogId={id} currentUser={currentUser} />
      <div className={classes.commentsSection}>
        <Typography variant="h6">Comments</Typography>
        {allComments.length > 0 ? (
          allComments.map((comment) => (
            <Comment
              key={comment._id}
              author={comment.author}
              text={comment.text}
              date={comment.date}
            />
          ))
        ) : (
          <Typography variant="body2" color="textSecondary">
            No comments available.
          </Typography>
        )}
      </div>
    </Container>
  );
};

export default ViewBlog;
