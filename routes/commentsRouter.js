const express = require("express");
const commentsRouter = express.Router();
const { patchComment, deleteComment } = require("../controllers/comments");
const { handles405Errors } = require("../errors");

commentsRouter
  .route("/:comment_id")
  .patch(patchComment)
  .delete(deleteComment)
  .all(handles405Errors);

module.exports = { commentsRouter };
