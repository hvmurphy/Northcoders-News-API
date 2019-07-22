const { fetchUser, fetchUsers } = require("../models/users");

exports.getUser = (req, res, next) => {
  fetchUser(req.params)
    .then(([user]) => {
      if (!user) {
        return Promise.reject({
          status: 404,
          msg: "User Not Found"
        });
      }
      res.status(200).send({ user });
    })
    .catch(next);
};

exports.getUsers = (req, res, next) => {
  fetchUsers()
    .then(users => {
      res.status(200).send({ users });
    })
    .catch(next);
};
