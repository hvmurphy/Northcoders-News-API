const express = require("express");
const articlesRouter = express.Router();
const {
  getArticle,
  patchArticle,
  postComment,
  getComments
} = require("../controllers");
const { handles405Errors } = require("../errors");

articlesRouter
  .route("/")
  .get(getArticle)
  .patch(patchArticle)
  .all(handles405Errors);

articlesRouter
  .route("/:article_id")
  .get(getArticle)
  .patch(patchArticle)
  .all(handles405Errors);

articlesRouter
  .route("/:article_id/comments")
  .post(postComment)
  .get(getComments)
  .all(handles405Errors);

module.exports = { articlesRouter };
