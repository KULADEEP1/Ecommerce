const Blog = require("../models/blog");

const createBlog = async (req, res) => {
  const { title, content, category } = req.body;

  try {
    const newBlog = new Blog({
      title,
      content,
      category,
      author: req.user.username,
      filename: req.file.originalname,
      contentType: req.file.mimetype,
      imageBase64: req.file.buffer.toString("base64"),
    });

    await newBlog.save();
    res.status(201).json({ message: "Blog post created successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error while creating the blog post" });
  }
};

const getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find();
    res.status(201).json(blogs);
  } catch (error) {
    res.status(500).json({ error: "Error while fetching blog posts" });
  }
}; 

module.exports = { createBlog, getAllBlogs };
