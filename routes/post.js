const express = require("express");
const router = express.Router();
const Post = require("../models/Post");

// Get All Post
router.get("/posts", async (req, res) => {
  try {
    const posts = await Post.find();
    res.json(posts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get Single Post
router.get("/post/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const post = await Post.findById(id);
    res.json(post);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
});

// Create A Post
router.post("/post", async (req, res) => {
  const { title, desc } = req.body;
  const newPost = new Post({
    title,
    desc
  });

  try {
    const post = await newPost.save();
    res.status(201).json(post);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete Single Post
router.delete("/post/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const post = await Post.findByIdAndDelete({ _id: id });
    res.json(post);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
});

// Edit Single Post
router.put("/post/:id", async (req, res) => {
  const id = req.params.id;
  const { title, desc } = req.body;
  try {
    const post = await Post.findByIdAndUpdate(
      { _id: id },
      { title, desc },
      { new: true }
    );
    res.json(post);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
