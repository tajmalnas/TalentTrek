import express from "express";
import {
  addCandidate,
  createJobOpening,
  getAllJobPosts,
  addCandidateMarks,
  allCandidatesApplied,
} from "../controllers/jobOpening.js";
import { getJobPosts } from "../controllers/jobOpening.js";

const router = express.Router();

router.post("/createJob", createJobOpening);
//only for jobs posted by the recruiter
router.get("/getJobPosts/:creatorId", getJobPosts);
router.get("/getAllJobPosts", getAllJobPosts);

router.post("/addCandidate", addCandidate);
router.post("/add-candidate-marks", addCandidateMarks);
router.post("/allCandidatesApplied",allCandidatesApplied)

export default router;
