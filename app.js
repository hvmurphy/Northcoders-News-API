const express = require("express");
const app = express();
const apiRouter = require("./routes/apiRouter");
const cors = require("cors");
const {
  handlesPSQL400Errors,
  handlesPSQL422errors,
  handlesCustomErrors,
  handles404Errors,
  handles500Errors
} = require("./errors");

app.use(cors());

app.use(express.json());

app.use("/api", apiRouter);

app.use(handlesPSQL400Errors);
app.use(handlesPSQL422errors);
app.use(handlesCustomErrors);
app.use("/*", handles404Errors);
app.use(handles500Errors);

module.exports = app;
