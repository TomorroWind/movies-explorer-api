const genericError = (statusCode) => (message) => {
  const error = new Error(message);
  error.statusCode = statusCode;

  return error;
};

const notFoundError = genericError(404);
const badRequestError = genericError(400);
const unauthorizedError = genericError(401);
const forbiddenError = genericError(403);
const conflictError = genericError(409);
const internalServerlError = genericError(500);

module.exports = {
  notFoundError,
  badRequestError,
  unauthorizedError,
  forbiddenError,
  internalServerlError,
  conflictError,
};
