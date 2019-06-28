const express = require("express");
const commentsRouter = express.Router();
const { patchComment } = require("../controllers");
const { handles405Errors } = require("../errors");

commentsRouter
  .route("/:comment_id")
  .patch(patchComment)
  .all(handles405Errors);

module.exports = { commentsRouter };
