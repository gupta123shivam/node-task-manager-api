const { CustomSPIError } = require("../errors/custom-error");

const errorHandler = (err, req, res, next) => {
  if (err instanceof CustomSPIError) {
    return res.status(err.statusCode).json({ err: err.message });
  }
  return res.status(500).json({ msg: "Something went wrong" });
};

module.exports = errorHandler;
