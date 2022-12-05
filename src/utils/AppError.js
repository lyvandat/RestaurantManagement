class AppError extends Error {
  constructor(status, message) {
    super(message);

    this.status = status;
    this.message = message;
    this.statusCode = status === "error" ? 500 : 400;

    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = AppError;
