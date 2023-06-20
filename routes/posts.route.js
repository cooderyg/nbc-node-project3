const express = require("express");
const router = express.Router();
const authMiddleeware = require("../middlewares/auth-middleware");
const { Posts } = require("../models");

router.post("/posts", authMiddleeware, async (req, res) => {
  // 게시글을 생성하는 사용자의 정보를 가지고 올 것

  const { userId } = res.locals.user;
  const { title, content } = req.body;

  const post = await Posts.create({
    UserId: userId,
    title,
    content,
  });

  res.status(201).json({ data: post });
});

// 게시글 목록 조회
router.get("/posts", async (req, res) => {
  const posts = await Posts.findAll({
    attributes: ["postId", "title", "createdAt", "updatedAt"],
    order: [["createdAt", "DESC"]],
  });

  return res.status(200).json({ data: posts });
});

// 게시글 상세 조회
router.get("/posts/:postId", async (req, res) => {
  const { postId } = req.params;
  const post = await Posts.findOne({
    attributes: ["postId", "title", "content", "createdAt", "updatedAt"],
    where: { postId },
  });

  return res.status(200).json({ data: post });
});

module.exports = router;
