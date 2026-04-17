export function errorHandler(error, request, response, next) {
  console.error(error);
  response.status(500).json({
    message: error.message || "Internal server error"
  });
}