const {errors} = require("schema/lib/validation");

class ApiError extends Error {
  status;
  errors;

  constructor(status, message, errors = []) {
    super(message);
    this.status = status
    this.errors = errors
  }

  static UnauthorizedError() {
    return new ApiError(401, "Not authorized")
  }

  static BadRequest(message) {
    return new ApiError(400, message, errors)
  }
}

module.exports = ApiError
