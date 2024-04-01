import express from "express";
import { FeedbackData, getFeedback } from "../controllers/Feedback.js";
const router = express.Router();

router.post("/", FeedbackData);
router.get("/getFeedback", getFeedback);

export default router;
