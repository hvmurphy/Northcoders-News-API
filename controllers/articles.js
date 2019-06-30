const {
  fetchArticle,
  updateArticleVotes,
  addComment,
  fetchComments
} = require("../models/articles");

exports.getArticleByID = (req, res, next) => {
  fetchArticle(req.params, req.query)
    .then(([article]) => {
      if (!article) {
        return Promise.reject({
          status: 404,
          msg: "No Article Found"
        });
      }
      res.status(200).send({ article });
    })
    .catch(next);
};

exports.patchArticle = (req, res, next) => {
  updateArticleVotes(req.params, req.body.inc_votes)
    .then(([article]) => {
      if (!article) {
        return Promise.reject({
          status: 404,
          msg: "Article ID does not exist"
        });
      }
      res.status(200).send({ article });
    })
    .catch(next);
};

exports.postComment = (req, res, next) => {
  addComment(req.params, req.body)
    .then(comment => {
      res.status(201).send({ comment });
    })
    .catch(next);
};

exports.getComments = (req, res, next) => {
  fetchComments(req.params, req.query)
    .then(comments => {
      res.status(200).send({ comments });
    })
    .catch(next);
};

exports.getArticles = (req, res, next) => {
  fetchArticle(req.params, req.query)
    .then(articles => {
      if (articles.length === 0) {
        return Promise.reject({
          status: 404,
          msg: "No Articles Found"
        });
      }
      res.status(200).send({ articles });
    })
    .catch(next);
};
