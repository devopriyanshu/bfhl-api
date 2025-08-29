// src/controllers/bfhlController.js
import DataProcessingService from "../services/dataProcessingService.js";
import { HTTP_STATUS } from "../utils/constants.js";

export const processBfhlData = async (req, res, next) => {
  try {
    const { data } = req.body;

    const processedData = DataProcessingService.processArray(data);

    res.status(HTTP_STATUS.OK).json({
      is_success: true,
      user_id: `${process.env.USER_FULL_NAME}_${process.env.USER_DOB}`,
      email: process.env.USER_EMAIL,
      roll_number: process.env.USER_ROLL_NUMBER,
      ...processedData,
    });
  } catch (error) {
    next(error);
  }
};

export const healthCheck = async (req, res) => {
  res.status(HTTP_STATUS.OK).json({
    is_success: true,
    message: "BFHL API is running",
    timestamp: new Date().toISOString(),
  });
};
