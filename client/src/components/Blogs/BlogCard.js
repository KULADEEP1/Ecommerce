import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  IconButton,
  Button,
  Box,
} from "@material-ui/core";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ChatBubbleIcon from "@material-ui/icons/ChatBubble";
import { Link } from "react-router-dom";

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
  },
  cardImage: {
    width: "100%",
    height: 200,
    objectFit: "cover",
  },
  cardContent: {
    padding: theme.spacing(3),
    position: "relative",
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
    marginBottom: theme.spacing(2),
  },
  cardFooter: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: theme.spacing(2),
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
    position: "absolute",
    bottom: theme.spacing(3),
    right: theme.spacing(3),
  },
}));

function BlogCard({ blog }) {
  const classes = useStyles();

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
          {blog.title.substring(0, 50)}...
        </Typography>
        <Typography variant="subtitle1" className={classes.cardText}>
          {blog.content.substring(0, 150)}...
        </Typography>
        <Typography variant="subtitle2" className={classes.authorName}>
          By {blog.author} on {new Date(blog.publishDate).toLocaleDateString()}
        </Typography>
        <div className={classes.cardFooter}>
          <div>
            <IconButton aria-label="like" className={classes.footerIcons}>
              <FavoriteIcon />
            </IconButton>
            <IconButton aria-label="comment" className={classes.footerIcons}>
              <ChatBubbleIcon />
            </IconButton>
          </div>
          <Box className={classes.readMoreButton}>
            <Button
              variant="contained"
              color="primary"
              component={Link}
              to={`/viewblog/${blog._id}`}
            >
              Read More
            </Button>
          </Box>
        </div>
      </CardContent>
    </Card>
  );
}

export default BlogCard;
