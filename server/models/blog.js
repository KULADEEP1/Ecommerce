const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    content: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
      enum: ["Technology", "Lifestyle", "Travel", "Food", "Finance","Sports","Health","Business"],
    },
    author: {
      type: String,
      required: true,
      trim: true,
    },
    featuredImage: {
      data: Buffer, // Store image data as Buffer
      contentType: String, // Store content type of the image
    },
    publishDate: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Blog = mongoose.model("Blog", blogSchema);

module.exports = Blog;
