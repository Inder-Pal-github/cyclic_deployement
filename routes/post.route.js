const { Router } = require("express");
const { PostModel } = require("../models/post.model");

const postRouter = Router();

postRouter.get("/", async (req, res) => {
  // we need something to verify which posts to send to user. => token is for authorization  => userId => to send his/her posts

  res.json({message:"all posts"})
});
postRouter.post("/new", async (req, res) => {
  try {
    const post = req.body;
    console.log(post);
    const new_post = new PostModel({ ...post });
    await new_post.save();
    res.status(201).json({ message: "Post created", post: new_post });
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: "Error creating post", error: true });
  }
});
postRouter.patch("/:postId", async (req, res) => {
  res.send("all");
});
postRouter.delete("/:postId", async (req, res) => {
  res.send("all");
});

module.exports = { postRouter };
