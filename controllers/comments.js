const { updateComment, removeComment } = require("../models/comments");

exports.patchComment = (req, res, next) => {
  updateComment(req.params, req.body.inc_votes)
    .then(([comment]) => {
      if (!comment) {
        return Promise.reject({
          status: 404,
          msg: "Comment ID does not exist"
        });
      }
      res.status(200).send({ comment });
    })
    .catch(next);
};

exports.deleteComment = (req, res, next) => {
  removeComment(req.params)
    .then(delCommentCount => {
      if (delCommentCount < 1) {
        return Promise.reject({
          status: 404,
          msg: "Comment Not Found"
        });
      }
      res.status(204).send();
    })
    .catch(next);
};
