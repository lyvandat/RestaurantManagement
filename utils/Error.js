class AppError extends Error {
  AppError(status, message) {
    super();

    this.status = status;
    this.message = message;
    this.statusCode = status === "error" ? 500 : 400;

    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = AppError;
