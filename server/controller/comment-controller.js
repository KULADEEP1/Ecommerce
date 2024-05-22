const Comment = require("../models/comment");

const newComment = async (req, res) => {
  try {
    const { currentUser, text } = req.body;
    const blogId = req.params.id;
    const newcomment = new Comment({
      author: currentUser,
      text,
      blogId,
      date: new Date(),
    });
    await newcomment.save();
    res.status(201).json({ message: "Comment added successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error while creating new comment" });
  }
};

const getAllComments = async (req, res) => {
  try {
    const allComments = await Comment.find({ blogId: req.params.id });
    res.status(201).json(allComments);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error while getting all comments" });
  }
};

module.exports = { newComment, getAllComments };
