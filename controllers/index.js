//if time seperate into seperate controller files

const {
  fetchTopics,
  fetchUser,
  fetchArticle,
  updateArticleVotes,
  addComment,
  fetchComments,
  updateComment,
  removeComment,
  fetchJSON
} = require("../models");

function getTopics(req, res, next) {
  fetchTopics()
    .then(topics => {
      res.status(200).send({ topics });
    })
    .catch(next);
}

function getUser(req, res, next) {
  fetchUser(req.params)
    .then(user => {
      if (user.length === 0) {
        return Promise.reject({
          status: 404,
          msg: "User Not Found"
        });
      }
      res.status(200).send({ user });
    })
    .catch(next);
}
function getArticle(req, res, next) {
  fetchArticle(req.params, req.query)
    .then(article => {
      if (article.length === 0) {
        return Promise.reject({
          status: 404,
          msg: "No Articles Found"
        });
      }
      res.status(200).send({ article });
    })
    .catch(next);
}

function patchArticle(req, res, next) {
  updateArticleVotes(req.params, req.body)
    .then(changedArticle => {
      res.status(200).send({ changedArticle });
    })
    .catch(next);
}

function postComment(req, res, next) {
  addComment(req.params, req.body)
    .then(newComment => {
      res.status(200).send({ newComment });
    })
    .catch(next);
}

function getComments(req, res, next) {
  fetchComments(req.params, req.query)
    .then(comments => {
      res.status(200).send({ comments });
    })
    .catch(next);
}

function patchComment(req, res, next) {
  updateComment(req.params, req.body)
    .then(changedComment => {
      res.status(200).send({ changedComment });
    })
    .catch(next);
}

function deleteComment(req, res, next) {
  removeComment(req.params)
    .then(delCommentCount => {
      res.status(204).send();
    })
    .catch(next);
}

function getJSON(req, res, next) {
  fetchJSON().then(json => {
    console.log(json);
    res.status(200).send();
  });
}

module.exports = {
  getTopics,
  getUser,
  getArticle,
  patchArticle,
  postComment,
  getComments,
  patchComment,
  deleteComment,
  getJSON
};
