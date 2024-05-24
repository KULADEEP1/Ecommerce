import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  IconButton,
  Button,
} from "@material-ui/core";
import { Favorite, FavoriteBorder } from "@material-ui/icons";
import { Link } from "react-router-dom";
import { deleteLikeAPI, addLikeAPI, getBlogDataAPI } from "../../utils/api";
import { toast } from "react-toastify";

const useStyles = makeStyles((theme) => ({
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
    transition: "transform 0.5s, box-shadow 0.5s",
    "&:hover": {
      transform: "translateY(-8px)",
      boxShadow: "0 8px 30px rgba(0, 0, 0, 0.2)",
    },
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    height: 550,
    marginBottom:"15px",
    [theme.breakpoints.down("sm")]: {
      height: "auto",
    },
  },
  cardImage: {
    width: "100%",
    height: 200,
    objectFit: "cover",
  },
  cardContent: {
    flexGrow: 1,
    padding: theme.spacing(3),
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  cardTitle: {
    fontSize: "1.8rem",
    marginBottom: theme.spacing(1),
    color: "#222",
    height:80,
    fontWeight: 600,
  },
  cardText: {
    fontSize: "1.1rem",
    color: "#555",
    marginBottom: theme.spacing(2),
    flexGrow: 1,
    minHeight: "100px", 
  },
  cardFooter: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  footerIcons: {
    color: "#888",
  },
  authorName: {
    color: "#888",
    fontSize: "0.9rem",
    marginTop: theme.spacing(1),
  },
  readMoreButton: {
    marginLeft: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
}));

function BlogCard({ blog }) {
  const classes = useStyles();
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await getBlogDataAPI(blog._id, token);
        if (response.status === 201) {
          setIsLiked(response.data.isLiked);
        } else {
          toast.error("Failed to fetch blog data");
        }
      } catch (error) {
        toast.error("Error fetching blog data");
      }
    };
    fetchData();
  }, [blog._id]);

  const handleLike = async () => {
    try {
      const token = localStorage.getItem("token");
      if (isLiked) {
        const response = await deleteLikeAPI(blog._id, token);
        if (response.status === 201) {
          setIsLiked(false);
          toast.success("Like Removed Successfully!");
        } else {
          toast.error("Error while removing like.");
        }
      } else {
        const response = await addLikeAPI(blog._id, token);
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

  return (
    <Card className={classes.card}>
      <CardMedia
        component="img"
        className={classes.cardImage}
        image={`data:${blog.contentType};base64,${blog.imageBase64}`}
        alt={blog.title}
      />
      <CardContent className={classes.cardContent}>
        <Typography variant="h2" className={classes.cardTitle}>
          {blog.title.substring(0, 30)}...
        </Typography>
        <Typography variant="subtitle1" className={classes.cardText}>
          {blog.content.substring(0, 140)}...
        </Typography>
        <Typography variant="subtitle2" className={classes.authorName}>
          By {blog.author} on {new Date(blog.publishDate).toLocaleDateString()}
        </Typography>
        <div className={classes.cardFooter}>
          <IconButton
            aria-label="like"
            onClick={handleLike}
            className={classes.likeButton}
            color={isLiked ? "secondary" : "default"}
          >
            {isLiked ? <Favorite /> : <FavoriteBorder />}
          </IconButton>
          <Button
            variant="contained"
            color="primary"
            component={Link}
            to={`/viewblog/${blog._id}`}
            className={classes.readMoreButton}
          >
            Read More
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

export default BlogCard;
