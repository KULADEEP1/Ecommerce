const Comment = require("../models/comment");

const newComment = async (req,res) => {
  try {
    const { currentUser, text } = req.body;
    const blogId = req.params.id;
    const newcomment = new Comment({
      author:currentUser,
      text,
      blogId,
      date: new Date(),
    });
    await newcomment.save();
    res.status(201).json({message:"Comment added successfully"})
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error while creating new comment" });
  }
};

module.exports={newComment}
