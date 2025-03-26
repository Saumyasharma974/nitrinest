// routes/recommendations.js
import express from "express";


import  generateRecommendations  from "../controller/recommendationController.js";
const router = express.Router();

// Endpoint: POST /api/recommendations
router.post("/recommendations", generateRecommendations);

export default router;
