const express = require("express");
const articlesRouter = express.Router();
const {
  getArticleByID,
  patchArticle,
  postComment,
  getComments,
  getArticles
} = require("../controllers/articles");
const { handles405Errors } = require("../errors");

articlesRouter
  .route("/")
  .get(getArticles)
  .all(handles405Errors);

articlesRouter
  .route("/:article_id")
  .get(getArticleByID)
  .patch(patchArticle)
  .all(handles405Errors);

articlesRouter
  .route("/:article_id/comments")
  .post(postComment)
  .get(getComments)
  .all(handles405Errors);

module.exports = { articlesRouter };
