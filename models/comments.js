const connection = require("../db/connection");

exports.updateComment = (comment_id, votesToAdd) => {
  if (!votesToAdd) {
    votesToAdd = 0;
  }
  return connection("comments")
    .where(comment_id)
    .increment("votes", votesToAdd)
    .returning("*");
};

exports.removeComment = comment_id => {
  return connection("comments")
    .where(comment_id)
    .del();
};
