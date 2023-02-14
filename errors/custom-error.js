
class CustomSPIError extends Error{
  constructor(message, statusCode){
    super(message);
    this.statusCode = statusCode;
  }
}

function createCustomError(meg, statusCode){
  return new CustomAPIError(msg, statusCode)
}

module.exports = { createCustomError, CustomSPIError }