const { blogs, comments } = require("../models");

class CommentsController {
  // [POST] /
  async createComment(req, res) {
    const userId = req.user.id;
    const { content, parent, edited, blogId } = req.body;
    try {
      const comment = await comments.create({
        content,
        parent,
        edited,
        userId,
        blogId,
      });
      res.json(comment);
    } catch (error) {
      console.log(error);
      res.json("Loi DB");
    }
  }

  // [DELETE] /:id
  async deleteComment(req, res) {
    const id = parseInt(req.params.id);
    try {
      await comments.destroy({ where: { id } });
      res.json("ok");
    } catch (error) {
      console.log(error);
      res.json("Loi DB");
    }
  }
}

module.exports = new CommentsController();
