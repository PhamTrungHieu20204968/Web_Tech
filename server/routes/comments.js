const express = require("express");
const router = express.Router();
const commentsController = require("../controllers/CommentsController");
const { validateToken } = require("../middlewares/AuthMiddleware");

router.delete("/:id", commentsController.deleteComment);
router.post("/", validateToken, commentsController.createComment);

module.exports = router;
