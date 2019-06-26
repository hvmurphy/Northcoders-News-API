const express = require("express");
const app = express();
const apiRouter = require("./routes/apiRouter");
const {
  handlesCustomErrors,
  handles404Errors,
  handles500Errors
} = require("./errors");

app.use(express.json());

app.use("/api", apiRouter);

app.use(handlesCustomErrors);
app.use("/*", handles404Errors);
app.use(handles500Errors);

module.exports = app;
