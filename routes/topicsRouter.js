const express = require("express");
const topicsRouter = express.Router();
const { getTopics } = require("../controllers/topics");
const { handles405Errors } = require("../errors");

topicsRouter
  .route("/")
  .get(getTopics)
  .all(handles405Errors);

module.exports = { topicsRouter };
