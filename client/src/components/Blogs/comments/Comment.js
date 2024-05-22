// src/components/comments/Comment.js
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Avatar, Typography, Paper, Grid, Box } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  commentContainer: {
    padding: theme.spacing(2),
    backgroundColor: "#fff",
    border: "1px solid #e0e0e0",
    borderRadius: theme.shape.borderRadius,
    marginBottom: theme.spacing(2),
    boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
    transition: "transform 0.2s",
    "&:hover": {
      transform: "scale(1.02)",
    },
  },
  avatar: {
    width: theme.spacing(4),
    height: theme.spacing(4),
    fontSize: "1rem",
    marginRight: theme.spacing(1),
    backgroundColor: theme.palette.primary.main,
  },
  authorDateContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  author: {
    fontWeight: "bold",
    color: theme.palette.primary.dark,
  },
  text: {
    marginTop: theme.spacing(0.5),
    marginBottom: theme.spacing(0.5),
    color: theme.palette.text.primary,
  },
  date: {
    fontSize: "0.8rem",
    color: theme.palette.text.secondary,
  },
}));

const Comment = ({ author, text, date }) => {
  const classes = useStyles();
  return (
    <Paper className={classes.commentContainer}>
      <Grid container wrap="nowrap" spacing={1}>
        <Grid item>
          <Avatar className={classes.avatar}>{author.charAt(0)}</Avatar>
        </Grid>
        <Grid item xs>
          <Box className={classes.authorDateContainer}>
            <Typography variant="subtitle2" className={classes.author}>
              {author}
            </Typography>
            <Typography variant="body2" className={classes.date}>
              {new Date(date).toLocaleDateString()}
            </Typography>
          </Box>
          <Typography variant="body2" className={classes.text}>
            {text}
          </Typography>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default Comment;
