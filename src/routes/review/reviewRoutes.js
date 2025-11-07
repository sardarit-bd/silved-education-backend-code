import express from "express";
import { createReview } from "../../controllers/review/reviewController.js";
import { protect } from "../../middlewares/authMiddleware.js";

const router = express.Router();



router.post("/createreview", protect, createReview);



export default router;