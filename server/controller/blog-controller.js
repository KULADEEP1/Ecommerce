const Blog = require("../models/blog");
const fs = require("fs");

const createBlog = async (req, res) => {
  try {
    const { title, content, category, author, publishDate } = req.body;
    const featuredImage = {
      data: fs.readFileSync(req.file.path), // Read image data from file
      contentType: req.file.mimetype, // Get content type of the image
    };

    const newBlog = new Blog({
      title,
      content,
      category,
      author,
      featuredImage,
      publishDate,
    });

    await newBlog.save();
    return res.status(201).json({ msg: "Blog added successfully" });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ error: "Blog not added due to server error" });
  }
};

module.exports = { createBlog };
