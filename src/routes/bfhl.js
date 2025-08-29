import { Router } from "express";
const router = Router();
import { processBfhlData, healthCheck } from "../controllers/bfhlController.js";
import { validateBfhlRequest } from "../middleware/validation.js";

// POST /bfhl - Main endpoint
router.post("/", validateBfhlRequest, processBfhlData);

// GET /bfhl - Health check (optional)
router.get("/", healthCheck);

export default router;
