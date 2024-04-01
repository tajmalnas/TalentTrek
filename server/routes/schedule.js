import express from "express";
import { createSlots } from "../controllers/interviewSlotController.js";

const router = express.Router();

router.post("/createSchedule", createSlots);

export default router;