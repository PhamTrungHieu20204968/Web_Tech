const express = require("express");
const router = express.Router();
const blogsController = require("../controllers/BlogsController");

router.get("/",blogsController.getAllBlogs);
router.post("/",blogsController.createBlog);

module.exports = router;
