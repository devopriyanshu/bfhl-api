export const validateBfhlRequest = (req, res, next) => {
  const { data } = req.body;

  // Check if data exists and is an array
  if (!data || !Array.isArray(data)) {
    return res.status(400).json({
      is_success: false,
      error: "Invalid input: 'data' must be an array",
    });
  }

  // Validate array is not empty (optional - based on requirements)
  if (data.length === 0) {
    return res.status(400).json({
      is_success: false,
      error: "Input array cannot be empty",
    });
  }

  next();
};
