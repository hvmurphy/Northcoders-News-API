exports.handles404Errors = (req, res, next) => {
  res.status(404).send({ msg: "Page Not Found" });
};

exports.handles500Errors = (err, req, rex, next) => {
  res.status(500).send({ msg: "Internal Server Error" });
};
