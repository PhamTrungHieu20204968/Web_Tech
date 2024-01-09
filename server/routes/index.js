const usersRouter = require("./users");
const blogsRouter = require("./blogs");
const commentsRouter = require("./comments");

function route(app) {
  app.use("/comments", commentsRouter);
  app.use("/blogs", blogsRouter);
  app.use("/users", usersRouter);
}

module.exports = route;
