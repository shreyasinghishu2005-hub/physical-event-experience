export function errorHandler(error, request, response, next) {
  const statusCode = error.statusCode || 500;

  if (statusCode >= 500) {
    console.error(error);
  }

  response.status(statusCode).json({
    message: error.message || "Internal server error",
    statusCode
  });
}
