const express = require("express");
const { body, validationResult } = require("express-validator");
const router = express.Router();
const Post = require("../models/Post");
const randomAnimalName = require("random-animal-name");
const axios = require("axios");

require("dotenv").config();

const limit = 20;
const commentLimit = 3;
const loadCommentLimit = 15;
const dateDescending = { date_created: -1 };

/**
 * @Desc - Get paginated posts with limit
 * @Endpoint - "/api/posts/"
 * @Method - GET
 */
router.get("/", async (req, res) => {
  try {
    const page = 1;

    const total = await Post.countDocuments();

    /*  const posts = await Post.find({})
      .populate({
        path: "comments",
        options: {
          sort: dateDescending,
          limit: commentLimit,
          skip: 0,
        },
      })
      .sort(dateDescending)
      .limit(limit)
      .skip(page - 1); */
    const posts = await Post.aggregate([
      {
        $addFields: {
          comments_count: {
            $size: "$comments",
          },
        },
      },
      {
        $lookup: {
          from: "comments",
          let: { postId: "$_id" },
          pipeline: [
            {
              $match: {
                $expr: { $eq: ["$post", "$$postId"] },
              },
            },
            { $limit: 3 },
            { $sort: { date_created: 1 } },
          ],
          as: "comments",
        },
      },
    ])
      .sort(dateDescending)
      .limit(limit)
      .skip(page - 1);

    let next = null;
    let prev = null;

    const totalPages = Math.ceil(total / limit);

    if (totalPages - page > 0) {
      next = `/api/posts/${page + 1}`;
    }
    if (page > 1) {
      prev = `/api/posts/${page - 1}`;
    }

    res.status(200).json({ code: 200, next, prev, posts });
  } catch (err) {
    res.status(500).json({ code: 500, msg: "Server error" });
  }
});

/**
 * @Desc - Get paginated posts with specific page
 * @Endpoint - "/api/posts/:page"
 * @param page - the page number
 * @Method - GET
 */
router.get("/:page", async (req, res) => {
  try {
    const page = parseInt(req.params.page);

    const total = await Post.countDocuments();

    const posts = await Post.find()
      .sort(dateDescending)
      .limit(limit)
      .skip(page - 1);

    let next = null;
    let prev = null;

    const totalPages = Math.ceil(total / limit);

    if (totalPages - page > 0) {
      next = `/api/posts/${page + 1}`;
    }
    if (page > 1) {
      prev = `/api/posts/${page - 1}`;
    }

    res.status(200).json({ code: 200, next, prev, posts });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ code: 500, msg: "Server error" });
  }
});

/**
 * @Desc - Get post by id
 * @Endpoint - "/api/posts/id/:id"
 * @param page - the page number
 * @Method - GET
 */
router.get("/id/:id", async (req, res) => {
  try {
    const id = req.params.id;

    const post = await Post.findById(id).populate({
      path: "comments",
      options: { sort: dateDescending, limit: 3 },
    });

    res.status(200).json({ code: 200, post });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ code: 500, msg: "Server error" });
  }
});

/**
 * @Desc - Get post by id with comment pagination
 * @Endpoint - "/api/posts/id/:id/:commentPage"
 * @param page - the page number
 * @Method - GET
 */
router.get("/id/:id/:commentPage", async (req, res) => {
  try {
    const id = req.params.id;
    const commentPage = parseInt(req.params.commentPage);

    const skipIndex = (commentPage - 1) * loadCommentLimit + 3;

    const post = await Post.findById(id).populate({
      path: "comments",
      options: {
        sort: { date_created: 1 },
        skip: skipIndex,
        limit: loadCommentLimit,
      },
    });

    res.status(200).json({ code: 200, post });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ code: 500, msg: "Server error" });
  }
});

/**
 * @Desc - Create new post
 * @Endpoint - "/api/posts/"
 * @Method - POST
 */
router.post(
  "/",
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

    try {
      const { text } = req.body;
      const animalName = randomAnimalName();

      const newPost = new Post({
        title: animalName,
        text: text,
      });

      await newPost.save();

      const telegramBaseURL = `https://api.telegram.org/bot${process.env.TELEGRAM_BOT}`;

      axios.post(telegramBaseURL + "/sendMessage", {
        chat_id: process.env.CHAT_ID,
        text: `New post!, Content: ${text}`,
      });

      res
        .status(200)
        .json({ code: 200, post: newPost, msg: "Post created successfully" });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ code: 500, msg: "Server error" });
    }
  }
);

/**
 * @Desc - Delet  post
 * @Endpoint - "/api/posts/:id"
 * @Method - POST
 */

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await Post.findByIdAndDelete(id);
    res.status(204).json({ code: 200, msg: "Post deleted successfully" });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ code: 500, msg: "Server error" });
  }
});

module.exports = router;
