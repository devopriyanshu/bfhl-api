// src/app.js
import express, { json, urlencoded } from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import dotenv from "dotenv";

import bfhlRoutes from "./routes/bfhl.js";
import errorHandler from "./middleware/errorHandler.js";

dotenv.config();

const app = express();

// Security middleware
app.use(helmet());

// CORS configuration
app.use(
  cors({
    origin:
      process.env.NODE_ENV === "production"
        ? ["https://yourdomain.com"] // Replace with your actual domain
        : ["http://localhost:3000", "http://localhost:3001"],
    credentials: true,
  })
);

// Logging
if (process.env.NODE_ENV !== "production") {
  app.use(morgan("dev"));
}

// Body parsing middleware
app.use(json({ limit: "10mb" }));
app.use(urlencoded({ extended: true }));

// Health check endpoint
app.get("/", (req, res) => {
  res.json({
    message: "BFHL API Server is running",
    version: "1.0.0",
    endpoints: {
      main: "/bfhl",
    },
  });
});

// Routes
app.use("/bfhl", bfhlRoutes);

// 404 handler
app.use("*", (req, res) => {
  res.status(404).json({
    is_success: false,
    error: "Endpoint not found",
  });
});

// Error handling middleware (should be last)
app.use(errorHandler);

export default app;
