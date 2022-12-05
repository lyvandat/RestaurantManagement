// send for developers
const sendErrorDev = (err, req, res) => {
  res.status(err.statusCode).json({
    status: err.status,
    err: err,
    message: err.message,
    stack: err.stack,
  });
};

// send for users
const sendErrorProd = (err, req, res) => {};

module.exports = (err, req, res, next) => {
  let error = { ...err };
  error.statusCode = err.statusCode || 500;
  error.message = err.message || "something wrong with server";
  error.status = err.status || "error";
  if (process.env.NODE_ENV === "development") {
    sendErrorDev(error, req, res);
  } else {
  }
};
