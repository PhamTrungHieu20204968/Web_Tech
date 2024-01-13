const express = require("express");
const router = express.Router();
const blogsController = require("../controllers/BlogsController");
const { validateToken } = require("../middlewares/AuthMiddleware");

router.get("/", blogsController.getAllBlogs);
router.post("/", validateToken, blogsController.createBlog);
router.post("/upload", blogsController.upload);

module.exports = router;
