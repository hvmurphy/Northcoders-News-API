const express = require("express");
const apiRouter = express.Router();
const { topicsRouter } = require("./topicsRouter");
const { usersRouter } = require("./usersRouter");
const { articlesRouter } = require("./articlesRouter");
const { commentsRouter } = require("./commentsRouter");
const { handles405Errors } = require("../errors");
const { getEndpoints } = require("../controllers/api");

apiRouter
  .route("/")
  .get(getEndpoints)
  .all(handles405Errors);

apiRouter.use("/topics", topicsRouter);
apiRouter.use("/users", usersRouter);
apiRouter.use("/articles", articlesRouter);
apiRouter.use("/comments", commentsRouter);

module.exports = apiRouter;
