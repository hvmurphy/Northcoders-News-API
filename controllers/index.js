const {
  fetchTopics,
  fetchUser,
  fetchArticle,
  updateArticleVotes
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
  fetchArticle(req.params)
    .then(article => {
      if (article.length === 0) {
        return Promise.reject({
          status: 404,
          msg: "User Not Found"
        });
      }
      res.status(200).send({ article });
    })
    .catch(next);
}

function patchArticle(req, res, next) {
  updateArticleVotes(req.params, req.body)
    .then(changedArticle => {
      console.log(changedArticle);
      res.status(200).send({ changedArticle });
    })
    .catch(next);
}

module.exports = { getTopics, getUser, getArticle, patchArticle };
