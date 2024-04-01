import express from "express";
import { getMyAppliedJobs } from "../controllers/candidateJobs.js";

const router = express.Router();

router.get("/getMyAppliedJobs", getMyAppliedJobs);

export default router;
