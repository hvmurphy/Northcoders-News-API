const express = require("express");
const app = express();
const apiRouter = require("./routes/apiRouter");
const { handles404Errors, handles500Errors } = require("./errors");

app.use("/api", apiRouter);

app.use("/*", handles404Errors);

app.use(handles500Errors);

module.exports = app;
