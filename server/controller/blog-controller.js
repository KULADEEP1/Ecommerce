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
      publishDate: new Date(),
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

const getBlogData = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    // console.log(blog);
    if (!blog) {
      return res.status(404).json({ error: "Blog post not found" });
    }
    const username = req.user.username;
    res.status(201).json({ blog, username });
  } catch (error) {
    res.status(500).json({ error: "Error while fetching blog post" });
  }
};

module.exports = { createBlog, getAllBlogs, getBlogData };
