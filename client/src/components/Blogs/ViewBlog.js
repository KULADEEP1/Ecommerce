import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  getBlogDataAPI,
  getAllCommentsAPI,
  deleteCommentAPI,
  addLikeAPI,
  deleteLikeAPI,
  deleteBlogAPI,
} from "../../utils/api";
import { makeStyles } from "@material-ui/core/styles";
import {
  Typography,
  Avatar,
  CircularProgress,
  IconButton,
  Container,
  Box,
  Button,
} from "@material-ui/core";
import { Favorite, FavoriteBorder, Delete } from "@material-ui/icons";
import CommentForm from "./comments/CommentForm";
import Comment from "./comments/Comment";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    minHeight: "120vh",
    width: "100%",
    overflowX: "hidden",
    padding: theme.spacing(1),
    boxSizing: "border-box",
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
    flexWrap: "wrap", // Allow wrapping to prevent overflow
  },
  authorText: {
    marginLeft: theme.spacing(1),
    fontWeight: "bold",
  },
  publishDateText: {
    marginLeft: theme.spacing(1),
    color: "#777",
  },
  likeButton: {
    marginLeft: theme.spacing(1),
  },
  commentsSection: {
    marginTop: theme.spacing(4),
  },
  loadMoreContainer: {
    display: "flex",
    justifyContent: "center",
    marginTop: theme.spacing(2),
  },

  // Responsive container for smaller screens
  containerResponsive: {
    maxWidth: "100%", // Set to 100% for screens <= 768px
    "@media (max-width: 768px)": {
      // Media query for responsiveness
      maxWidth: "100%",
    },
  },
}));

const COMMENTS_BATCH_SIZE = 3;

const ViewBlog = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const { id } = useParams();
  const [blog, setBlog] = useState({});
  const [allComments, setAllComments] = useState([]);
  const [displayedComments, setDisplayedComments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentUser, setCurrentUser] = useState("");
  const [visibleCount, setVisibleCount] = useState(COMMENTS_BATCH_SIZE);
  const [loadingMore, setLoadingMore] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem("token");
        const response = await getBlogDataAPI(id, token);
        if (response.status === 201) {
          setBlog(response.data.blog);
          setCurrentUser(response.data.username);
          setIsLiked(response.data.isLiked);
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

  const fetchComments = async () => {
    try {
      const response = await getAllCommentsAPI(id);
      if (response.status === 201) {
        setAllComments(response.data);
        setDisplayedComments(response.data.slice(0, COMMENTS_BATCH_SIZE));
      } else {
        toast.error("Error while loading comments");
      }
    } catch (error) {
      toast.error("Error while loading comments from server side");
    }
  };

  useEffect(() => {
    fetchComments();
  }, [id]);

  const handleLoadMore = () => {
    setLoadingMore(true);
    setTimeout(() => {
      setVisibleCount((prevCount) => {
        const newCount = prevCount + COMMENTS_BATCH_SIZE;
        setDisplayedComments(allComments.slice(0, newCount));
        setLoadingMore(false);
        return newCount;
      });
    }, 500);
  };

  const handleCommentAdded = () => {
    setVisibleCount(COMMENTS_BATCH_SIZE);
    fetchComments();
  };

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

  const handleDeleteComment = async (id) => {
    try {
      const response = await deleteCommentAPI(id);
      if (response.status === 201) {
        toast.success("Comment Deleted Successfully..");
        fetchComments();
      } else {
        toast.error("Error while Deleting comment..");
      }
    } catch (error) {
      toast.error("Error while Deleting comment Server side..");
    }
  };

  const handleLike = async () => {
    try {
      const token = localStorage.getItem("token");
      if (isLiked) {
        const response = await deleteLikeAPI(id, token);
        if (response.status === 201) {
          setIsLiked(false);
          toast.success("Like Removed Successfully!");
        } else {
          toast.error("Error while removing like.");
        }
      } else {
        const response = await addLikeAPI(id, token);
        if (response.status === 201) {
          setIsLiked(true);
          toast.success("Like Added Successfully!");
        } else {
          toast.error("Error while adding like.");
        }
      }
    } catch (error) {
      toast.error("Error while adding/removing like from server side.");
    }
  };

  const handleBlogDelete = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await deleteBlogAPI(id, token);
      if (response.status === 201) {
        toast.success("Blog Deleted Successfully!");
        navigate("/");
      } else {
        toast.error("Error while deleting blog.");
      }
    } catch (error) {
      toast.error("Error while deleting blog from server side.");
    }
  };

  return (
    <div className={classes.root}>
      <Container maxWidth="xl">
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
            <IconButton
              aria-label="like"
              onClick={handleLike}
              className={classes.likeButton}
              color={isLiked ? "secondary" : "default"}
            >
              {isLiked ? <Favorite /> : <FavoriteBorder />}
            </IconButton>
            {blog.author === currentUser && (
              <IconButton
                aria-label="delete"
                onClick={handleBlogDelete}
                className={classes.likeButton}
                color="default"
              >
                <Delete />
              </IconButton>
            )}
            <Typography variant="body2" className={classes.publishDateText}>
              {new Date(blog.publishDate).toLocaleDateString()}
            </Typography>
          </Box>
          <Typography variant="body1" paragraph>
            {blog.content}
          </Typography>
        </Box>
        {blog.author !== currentUser && (
          <CommentForm
            blogId={id}
            author={blog.author}
            currentUser={currentUser}
            onCommentAdded={handleCommentAdded}
          />
        )}
        <div className={classes.commentsSection}>
          <Typography variant="h6">Comments</Typography>
          {displayedComments.length > 0 ? (
            displayedComments.map((comment) => (
              <Comment
                key={comment._id}
                author={comment.author}
                text={comment.text}
                date={comment.date}
                currentUser={currentUser}
                onDelete={() => handleDeleteComment(comment._id)}
              />
            ))
          ) : (
            <Typography variant="body2" color="textSecondary">
              No comments available.
            </Typography>
          )}
          {visibleCount < allComments.length && (
            <div className={classes.loadMoreContainer}>
              <Button
                variant="contained"
                color="primary"
                onClick={handleLoadMore}
                disabled={loadingMore}
              >
                {loadingMore ? <CircularProgress size={24} /> : "Load More"}
              </Button>
            </div>
          )}
        </div>
      </Container>
    </div>
  );
};

export default ViewBlog;
