import express from "express";
import { updateProfile } from "../controllers/Candidate.js";
import { addProject } from "../controllers/addProjectController.js";
import { addResume } from "../controllers/addResume.js";

const router = express.Router();

router.post("/update-profile", updateProfile);
router.post("/addProject", addProject);
router.post("/addResume", addResume);

export default router;
