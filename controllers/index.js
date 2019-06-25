const { fetchTopics, fetchUser } = require("../models");

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

module.exports = { getTopics, getUser };
