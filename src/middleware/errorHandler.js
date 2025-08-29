const errorHandler = (err, req, res, next) => {
  console.error("Error:", err.stack);

  // Default error response
  const errorResponse = {
    is_success: false,
    error: "Internal server error",
  };

  // Handle different types of errors
  if (err.name === "ValidationError") {
    errorResponse.error = "Validation failed";
    return res.status(400).json(errorResponse);
  }

  if (err.name === "SyntaxError" && err.type === "entity.parse.failed") {
    errorResponse.error = "Invalid JSON format";
    return res.status(400).json(errorResponse);
  }

  // Default to 500 server error
  res.status(500).json(errorResponse);
};

export default errorHandler;
