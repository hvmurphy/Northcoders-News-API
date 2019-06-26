exports.handlesCustomErrors = (err, req, res, next) => {
  if (err.status) {
    res.status(err.status).send({ msg: err.msg });
  } else {
    next(err);
  }
};

exports.handlesPSQL400Errors = (err, req, res, next) => {
  const codes = ["42703", "22P02", "23502"];

  if (codes.includes(err.code)) {
    res.status(400).send({ msg: "Bad Request" });
  } else {
    next(err);
  }
};

exports.handlesPSQL422errors = (err, req, res, next) => {
  const codes = ["23503"];
  if (codes.includes(err.code)) {
    res.status(422).send({ msg: "Foreign Key Does Not Exist" });
  } else {
    next(err);
  }
};

exports.handles404Errors = (req, res, next) => {
  res.status(404).send({ msg: "Page Not Found" });
};

exports.handles500Errors = (err, req, rex, next) => {
  res.status(500).send({ msg: "Internal Server Error" });
};
