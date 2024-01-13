const { blogs, comments, users } = require("../models");

class BlogsController {
  // [GET] /
  async getAllBlogs(req, res) {
    try {
      const list = await blogs.findAll({
        include: [
          {
            model: comments,
            include: [users],
          },
          {
            model: users,
          },
        ],
      });
      res.json(list);
    } catch (error) {
      console.log(error);
      res.json("Loi DB");
    }
  }

  // [POST] /
  async createBlog(req, res) {
    const userId = req.user.id;
    const { title, content, image, audio } = req.body;
    try {
      const blog = await blogs.create({ title, content, image, audio, userId });
      res.json(blog);
    } catch (error) {
      console.log(error);
      res.json("Loi DB");
    }
  }

  // [POST] /
  async upload(req, res) {
    res.json("Upload thành công");
  }
}

module.exports = new BlogsController();
