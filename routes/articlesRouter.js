const express = require("express");
const articlesRouter = express.Router();
const { getArticle, patchArticle, postComment } = require("../controllers");

articlesRouter
  .route("/:article_id")
  .get(getArticle)
  .patch(patchArticle);

articlesRouter.route("/:article_id/comments").post(postComment);

module.exports = { articlesRouter };
