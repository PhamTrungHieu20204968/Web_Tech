const express = require("express");
const router = express.Router();
const commentsController = require("../controllers/CommentsController");

router.delete("/:id", commentsController.deleteComment);
router.post("/", commentsController.createComment);

module.exports = router;
