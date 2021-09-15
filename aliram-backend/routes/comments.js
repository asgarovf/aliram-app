const express = require("express");
const Post = require("../models/Post");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const Comment = require("../models/Comment");
const mongoose = require("mongoose");
const randomAnimalName = require("random-animal-name");
const axios = require("axios");

/**
 * @Desc - Create comment for a post
 * @Endpoint - "/api/comments/:post"
 * @Method - POST
 */
router.post(
  "/:post",
  body("text")
    .exists()
    .withMessage("Post text is required")
    .isLength({ min: 2, max: 500 })
    .withMessage("Length should be between 2 and 500"),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const postId = req.params.post;
    const { text } = req.body;

    try {
      const post = await Post.findById(postId);

      if (!post) {
        return res.status(400).json({ msg: "Post not found" });
      }

      const animalName = randomAnimalName();

      const newComment = new Comment({
        title: animalName,
        post: mongoose.Types.ObjectId(postId),
        text,
      });

      post.comments.push(newComment);

      await newComment.save();
      await post.save();

      const telegramBaseURL = `https://api.telegram.org/bot${process.env.TELEGRAM_BOT}`;

      axios.post(telegramBaseURL + "/sendMessage", {
        chat_id: process.env.CHAT_ID,
        text: `New comment!, Post: ${post.title},  Content: ${text}`,
      });

      return res.status(200).json({
        code: 200,
        comment: newComment,
      });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ code: 500, msg: "Server error" });
    }
  }
);

router.delete("/all", async (req, res) => {
  try {
    await Comment.deleteMany({});

    return res.status(200).json({
      code: 204,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ code: 500, msg: "Server error" });
  }
});

module.exports = router;
