const express = require("express");
const usersRouter = express.Router();
const { getUser } = require("../controllers");
const { handles405Errors } = require("../errors");

usersRouter
  .route("/:username")
  .get(getUser)
  .all(handles405Errors);

module.exports = { usersRouter };
